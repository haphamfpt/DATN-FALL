import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Variant from "../models/Variant.js";
import Voucher from "../models/Voucher.js";
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";

const vnpay = new VNPay({
  tmnCode: "MB5OBCG0",
  secureSecret: "P19QHQMBXVFF1A0NZPI55DAA86O37LG9",
  vnpayHost: "https://sandbox.vnpayment.vn",
  testMode: true,
  hashAlgorithm: "SHA512",
  loggerFn: ignoreLogger,
});

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
      return res.status(400).json({ success: false, message: "Giỏ hàng trống" });
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
          message: `Đơn hàng cần đạt tối thiểu ${voucher.rank_price.toLocaleString("vi-VN")}đ để sử dụng mã này`,
        });
      }

      if (voucher.for_user_ids.length > 0 && !voucher.for_user_ids.includes(userId)) {
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
      orderData.vnp_TxnRef = `AVL${Date.now()}${Math.floor(Math.random() * 1000)}`;
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

    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const isValid = vnpay.verifyReturnUrl(vnpParams, secureHash);

    const paidAmount = Number(vnpParams.vnp_Amount) / 100;

    if (isValid && vnpParams.vnp_ResponseCode === "00") {
      const order = await Order.findOne({ vnp_TxnRef: vnpParams.vnp_TxnRef });

      if (!order || paidAmount !== order.totalAmount) {
        return res.redirect(
          `${process.env.CLIENT_URL || "http://localhost:5173"}/order-success?status=invalid`
        );
      }

      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      await order.save();

      if (order.voucher?.voucherId) {
        await Voucher.findByIdAndUpdate(order.voucher.voucherId, {
          $inc: { used_quantity: 1 },
        });
      }

      return res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:5173"}/order-success?orderId=${order._id}`
      );
    }

    await Order.findOneAndUpdate(
      { vnp_TxnRef: vnpParams.vnp_TxnRef },
      { paymentStatus: "failed" }
    );

    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:5173"}/order-success?status=failed`
    );
  } catch (error) {
    console.error("VNPay return error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
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
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
      .populate("items.product", "name images")
      .populate("items.variant", "color size");

    if (!order) return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};