import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Variant from "../models/Variant.js";
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";

const vnpay = new VNPay({
  tmnCode:'MB5OBCG0',
  secureSecret:'P19QHQMBXVFF1A0NZPI55DAA86O37LG9',
  vnpayHost: "https://sandbox.vnpayment.vn",
  testMode: true,
  hashAlgorithm: "SHA512",
  loggerFn: ignoreLogger,
});

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "cod" } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.variant",
      select: "sale_price stock product",
      populate: { path: "product", select: "name images" },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Giỏ hàng trống" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const variant = item.variant;
      if (variant.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm ${variant.product.name} chỉ còn ${variant.stock} trong kho`,
        });
      }

      totalAmount += variant.sale_price * item.quantity;

      orderItems.push({
        product: variant.product._id,
        variant: variant._id,
        quantity: item.quantity,
        price: variant.sale_price,
        name: variant.product.name,
        color: variant.color?.attribute_color_name || "",
        size: variant.size?.attribute_size_name || "",
        image: variant.product.images?.[0]?.url || "",
      });

      variant.stock -= item.quantity;
      await variant.save();
    }

    if (paymentMethod === "online") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const vnpParams = {
        vnp_Amount: totalAmount,
        vnp_IpAddr: req.ip || "127.0.0.1",
        vnp_TxnRef: Date.now().toString(),
        vnp_OrderInfo: `Thanh toán đơn hàng Aveline #${Date.now()}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: process.env.VNP_RETURN_URL || "http://localhost:5173/order-success",
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date(), "yyyyMMddHHmmss"),
        vnp_ExpireDate: dateFormat(tomorrow, "yyyyMMddHHmmss"),
      };

      const paymentUrl = vnpay.buildPaymentUrl(vnpParams);

      const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod: "online",
        paymentStatus: "pending",
        vnp_TxnRef: vnpParams.vnp_TxnRef,
      });

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });

      return res.json({
        success: true,
        paymentUrl,
        orderId: order._id,
      });
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod: "cod",
      paymentStatus: "pending",
    });

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công!",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const vnpayReturn = async (req, res) => {
  const vnpParams = req.query;
  const secureHash = vnpParams.vnp_SecureHash;

  delete vnpParams.vnp_SecureHash;
  delete vnpParams.vnp_SecureHashType;

  const sortedParams = Object.keys(vnpParams).sort().reduce((obj, key) => {
    obj[key] = vnpParams[key];
    return obj;
  }, {});

  const signData = new URLSearchParams(sortedParams).toString();
  const calculatedHash = vnpay.verifyReturnUrl(signData, secureHash);

  if (calculatedHash && vnpParams.vnp_ResponseCode === "00") {
    await Order.findOneAndUpdate(
      { vnp_TxnRef: vnpParams.vnp_TxnRef },
      { paymentStatus: "paid", orderStatus: "confirmed" }
    );

    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/order-success?status=success`);
  } else {
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/order-success?status=failed`);
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