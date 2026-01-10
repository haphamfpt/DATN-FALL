import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Variant from "../models/Variant.js";
import Voucher from "../models/Voucher.js";
import Refund from "../models/Refund.js";
import fetch from "node-fetch";
import crypto from "crypto";
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";

const vnpay = new VNPay({
  tmnCode: "MB5OBCG0",
  secureSecret: "P19QHQMBXVFF1A0NZPI55DAA86O37LG9",
  vnpayHost: "https://sandbox.vnpayment.vn",
  testMode: true,
  hashAlgorithm: "SHA512",
  loggerFn: ignoreLogger,
});

function createRefundChecksum(params, secureSecret) {
  const fields = [
    params.vnp_RequestId || "",
    params.vnp_Version || "",
    params.vnp_Command || "",
    params.vnp_TmnCode || "",
    params.vnp_TransactionType || "",
    params.vnp_TxnRef || "",
    params.vnp_Amount || "",
    params.vnp_TransactionNo || "",
    params.vnp_TransactionDate || "",
    params.vnp_CreateBy || "",
    params.vnp_CreateDate || "",
    params.vnp_IpAddr || "",
    params.vnp_OrderInfo || "",
  ];

  const dataString = fields.join("|");
  return crypto
    .createHmac("sha512", secureSecret)
    .update(dataString)
    .digest("hex")
    .toUpperCase();
}

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "cod", voucherCode } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.variant",
      select: "sale_price stock product color size",
      populate: [
        {
          path: "product",
          select: "name images",
        },
        {
          path: "color",
          select: "attribute_color_name",
        },
        {
          path: "size",
          select: "attribute_size_name",
        },
      ],
    });

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Giỏ hàng trống" });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const variant = item.variant;

      if (variant.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm "${variant.product.name}" (màu: ${variant.color?.attribute_color_name}, size: ${variant.size?.attribute_size_name}) chỉ còn ${variant.stock} trong kho`,
        });
      }

      const itemTotal = variant.sale_price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: variant.product._id,
        variant: variant._id,
        quantity: item.quantity,
        price: variant.sale_price,
        name: variant.product.name,
        color: variant.color?.attribute_color_name || "N/A",
        size: variant.size?.attribute_size_name || "N/A",
        image: variant.product.images?.[0]?.url || "",
      });

      variant.stock -= item.quantity;
      await variant.save();
    }

    let discountAmount = 0;
    let appliedVoucher = null;

    if (voucherCode) {
      const code = voucherCode.trim().toUpperCase();
      const voucher = await Voucher.findOne({
        voucher_code: code,
        is_active: true,
        start_datetime: { $lte: new Date() },
        end_datetime: { $gte: new Date() },
        $expr: { $lt: ["$used_quantity", "$quantity"] },
      });

      if (!voucher) {
        return res.status(400).json({
          success: false,
          message: "Mã giảm giá không hợp lệ, đã hết hạn hoặc hết lượt sử dụng",
        });
      }

      if (subtotal < voucher.rank_price) {
        return res.status(400).json({
          success: false,
          message: `Đơn hàng cần đạt tối thiểu ${voucher.rank_price.toLocaleString(
            "vi-VN"
          )}đ để sử dụng mã này`,
        });
      }

      if (
        voucher.for_user_ids.length > 0 &&
        !voucher.for_user_ids.includes(userId)
      ) {
        return res.status(403).json({
          success: false,
          message: "Mã giảm giá này không áp dụng cho tài khoản của bạn",
        });
      }

      if (voucher.voucher_type === "fixed") {
        discountAmount = voucher.voucher_value;
      } else if (voucher.voucher_type === "percent") {
        discountAmount = Math.round((subtotal * voucher.voucher_value) / 100);
        if (voucher.max_price > 0 && discountAmount > voucher.max_price) {
          discountAmount = voucher.max_price;
        }
      }

      appliedVoucher = {
        code: voucher.voucher_code,
        voucherId: voucher._id,
        type: voucher.voucher_type,
        value: voucher.voucher_value,
        max_price: voucher.max_price || 0,
      };
    }

    const shippingFee = subtotal >= 800000 ? 0 : 30000;
    const totalAmount = subtotal + shippingFee - discountAmount;

    const orderData = {
      user: userId,
      items: orderItems,
      subtotal,
      shippingFee,
      discountAmount,
      totalAmount,
      voucher: appliedVoucher || null,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
    };

    if (paymentMethod === "online") {
      orderData.vnp_TxnRef = `AVL${Date.now()}${Math.floor(
        Math.random() * 1000
      )}`;
    }

    const order = await Order.create(orderData);

    if (paymentMethod === "online") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const vnpParams = {
        vnp_Amount: totalAmount,
        vnp_IpAddr: req.ip || "127.0.0.1",
        vnp_TxnRef: order.vnp_TxnRef,
        vnp_OrderInfo: `Thanh toán đơn hàng Aveline #${order._id}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: "http://localhost:5000/api/orders/vnpay-return",
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date(), "yyyyMMddHHmmss"),
        vnp_ExpireDate: dateFormat(tomorrow, "yyyyMMddHHmmss"),
      };

      const paymentUrl = vnpay.buildPaymentUrl(vnpParams);

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });

      return res.json({
        success: true,
        paymentUrl,
        orderId: order._id,
      });
    }

    if (appliedVoucher) {
      await Voucher.findByIdAndUpdate(appliedVoucher.voucherId, {
        $inc: { used_quantity: 1 },
      });
    }

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công!",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi server khi tạo đơn hàng",
    });
  }
};

export const vnpayReturn = async (req, res) => {
  try {
    const vnpParams = { ...req.query };
    const secureHash = vnpParams.vnp_SecureHash;

    // Xóa các trường hash để verify
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const isValid = vnpay.verifyReturnUrl(vnpParams, secureHash);

    const paidAmount = Number(vnpParams.vnp_Amount) / 100;

    // Tìm order theo vnp_TxnRef
    const order = await Order.findOne({ vnp_TxnRef: vnpParams.vnp_TxnRef });

    if (!order) {
      console.error(
        `[VNPAY RETURN] Order not found for TxnRef: ${vnpParams.vnp_TxnRef}`
      );
      return res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/order-success?status=order_not_found`
      );
    }

    // Thanh toán thành công
    if (isValid && vnpParams.vnp_ResponseCode === "00") {
      // Kiểm tra số tiền khớp (phòng chống giả mạo)
      if (Math.abs(paidAmount - order.totalAmount) > 0.01) {
        console.error(`[VNPAY RETURN] Amount mismatch`, {
          orderId: order._id,
          expected: order.totalAmount,
          received: paidAmount,
        });

        return res.redirect(
          `${
            process.env.CLIENT_URL || "http://localhost:5173"
          }/order-success?status=invalid_amount`
        );
      }

      // Cập nhật trạng thái
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";

      // Lưu đầy đủ thông tin giao dịch từ VNPay
      order.vnp_TransactionNo = vnpParams.vnp_TransactionNo;
      order.vnp_BankCode = vnpParams.vnp_BankCode;
      order.vnp_BankTranNo = vnpParams.vnp_BankTranNo;
      order.vnp_CardType = vnpParams.vnp_CardType;
      order.vnp_PayDate = vnpParams.vnp_PayDate;
      order.vnp_ResponseCode = vnpParams.vnp_ResponseCode;

      // Lưu toàn bộ params để dễ đối chiếu sau này
      order.vnpayResponse = vnpParams;

      await order.save();

      // Tăng số lần dùng voucher nếu có
      if (order.voucher?.voucherId) {
        await Voucher.findByIdAndUpdate(order.voucher.voucherId, {
          $inc: { used_quantity: 1 },
        });
      }

      console.log(`[VNPAY SUCCESS] Order ${order._id} thanh toán thành công`);

      return res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/order-success?orderId=${order._id}`
      );
    }

    // Thanh toán thất bại
    order.paymentStatus = "failed";
    order.vnp_ResponseCode = vnpParams.vnp_ResponseCode || "unknown_error";
    order.vnpayResponse = vnpParams;
    await order.save();

    console.warn(
      `[VNPAY FAILED] Order ${order._id} - Code: ${vnpParams.vnp_ResponseCode}`
    );

    return res.redirect(
      `${
        process.env.CLIENT_URL || "http://localhost:5173"
      }/order-success?status=failed`
    );
  } catch (error) {
    console.error("[VNPAY RETURN ERROR]:", error);
    return res.redirect(
      `${
        process.env.CLIENT_URL || "http://localhost:5173"
      }/order-success?status=error`
    );
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name images")
      .populate("items.variant", "color size");

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate("items.product", "name images")
      .populate("items.variant", "color size");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const refund = await Refund.findOne({
      order: order._id,
    });

    res.json({
      success: true,
      order,
      refund,
    });
  } catch (error) {
    console.error("Get order detail error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    const allowedToCancel = ["pending", "confirmed"];
    if (!allowedToCancel.includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Không thể hủy đơn hàng ở trạng thái này",
      });
    }

    order.orderStatus = "cancelled";
    await order.save();

    if (order.paymentMethod === "online" && order.paymentStatus === "paid") {
      const existedRefund = await Refund.findOne({ order: order._id });

      if (!existedRefund) {
        await Refund.create({
          order: order._id,
          user: order.user,
          payment_method: "vnpay",
          transaction_id: order.vnp_TxnRef,
          refund_amount: order.totalAmount,
          refund_reason: "Khách hàng hủy đơn hàng",
          refund_status: "pending",
        });
      }
    }

    return res.json({
      success: true,
      message:
        order.paymentMethod === "online" && order.paymentStatus === "paid"
          ? "Hủy đơn thành công, yêu cầu hoàn tiền đang được xử lý"
          : "Hủy đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    console.error("Lỗi hủy đơn hàng:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    if (order.orderStatus !== "delivered") {
      return res.status(400).json({
        success: false,
        message:
          "Chỉ có thể xác nhận nhận hàng khi đơn ở trạng thái 'Đã giao hàng'",
      });
    }

    order.orderStatus = "complete";
    await order.save();

    res.json({
      success: true,
      message: "Đã xác nhận nhận hàng thành công",
      data: order,
    });
  } catch (error) {
    console.error("Lỗi xác nhận hoàn thành:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const processRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    if (order.paymentMethod !== "online" || order.paymentStatus !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Đơn hàng không đủ điều kiện hoàn tiền",
      });
    }

    if (!order.vnp_TransactionNo || !order.vnp_PayDate) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin giao dịch VNPay",
      });
    }

    const refund = await Refund.findOne({ order: order._id });
    if (!refund || refund.refund_status !== "confirm") {
      return res.status(400).json({
        success: false,
        message: "Yêu cầu hoàn tiền chưa được xác nhận",
      });
    }

    const now = new Date();
    const requestId = `REF${Date.now()}`;

    const refundParams = {
      vnp_RequestId: requestId,
      vnp_Version: "2.1.0",
      vnp_Command: "refund",
      vnp_TmnCode: "MB5OBCG0",
      vnp_TransactionType: "02",
      vnp_TxnRef: order.vnp_TxnRef,
      vnp_Amount: (order.totalAmount * 100).toString(),
      vnp_TransactionNo: order.vnp_TransactionNo.toString(),
      vnp_TransactionDate: order.vnp_PayDate.toString(),
      vnp_CreateBy: "admin",
      vnp_CreateDate: dateFormat(now, "yyyyMMddHHmmss"),
      vnp_IpAddr: req.ip || "127.0.0.1",
      vnp_OrderInfo: `Hoan tien don hang ${order._id}`,
    };

    refundParams.vnp_SecureHash = createRefundChecksum(
      refundParams,
      "P19QHQMBXVFF1A0NZPI55DAA86O37LG9"
    );

    const response = await fetch(
      "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refundParams),
      }
    );

    const result = await response.json();

    refund.refund_response = result;
    refund.refunded_at = now;

    if (result.vnp_ResponseCode === "00") {
      refund.refund_status = "success";
      order.paymentStatus = "refunded";
      order.orderStatus = "cancelled";
      await order.save();
    } else {
      refund.refund_status = "failed";
    }

    await refund.save();

    return res.json({
      success: result.vnp_ResponseCode === "00",
      responseCode: result.vnp_ResponseCode,
      responseMessage: result.vnp_Message,
      refund,
    });
  } catch (err) {
    console.error("Refund error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Route này dùng để nhận kết quả refund ASYNC từ VNPay (nếu có cấu hình IPN/Return URL riêng cho refund)
 * Trong sandbox thường trả về sync, nhưng production nên thiết lập IPN
 */
export const vnpayRefundReturn = async (req, res) => {
  try {
    const refundParams = { ...req.query };
    const secureHash = refundParams.vnp_SecureHash;

    delete refundParams.vnp_SecureHash;

    const isValid = vnpay.verifyReturnUrl(refundParams, secureHash);

    if (!isValid) {
      console.warn("[REFUND RETURN] Invalid secure hash");
      return res
        .status(400)
        .json({ success: false, message: "Invalid secure hash" });
    }

    const txnRef = refundParams.vnp_TxnRef;
    const order = await Order.findOne({ vnp_TxnRef: txnRef });

    if (!order) {
      console.error("[REFUND RETURN] Order not found:", txnRef);
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const refund = await Refund.findOne({ order: order._id });

    if (!refund) {
      console.warn(
        "[REFUND RETURN] Refund record not found for order:",
        order._id
      );
    }

    if (refundParams.vnp_ResponseCode === "00") {
      if (refund) {
        refund.refund_status = "success";
        refund.refund_response = refundParams;
        refund.refunded_at = new Date();
        await refund.save();
      }

      order.paymentStatus = "refunded";
      order.orderStatus = "cancelled";
      await order.save();

      console.log("[REFUND SUCCESS] Order:", order._id);
    } else {
      console.warn("[REFUND FAILED] Code:", refundParams.vnp_ResponseCode);
    }

    return res.json({
      success: true,
      message: "Đã nhận kết quả hoàn tiền từ VNPay",
      code: refundParams.vnp_ResponseCode,
      txnRef,
    });
  } catch (error) {
    console.error("VNPay refund return error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi xử lý kết quả hoàn tiền",
      error: error.message,
    });
  }
};
