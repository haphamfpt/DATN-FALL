import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Variant from "../models/Variant.js";

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
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const variant = item.variant;
      if (variant.stock < item.quantity) {
        return res.status(400).json({
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

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công!",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tạo đơn hàng" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name images")
      .populate("items.variant", "color size");

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
      .populate("items.product", "name images")
      .populate("items.variant", "color size");

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (order.orderStatus !== "pending") {
      return res.status(400).json({ message: "Không thể hủy đơn hàng này" });
    }

    for (const item of order.items) {
      const variant = await Variant.findById(item.variant);
      if (variant) {
        variant.stock += item.quantity;
        await variant.save();
      }
    }

    order.orderStatus = "cancelled";
    order.cancelledReason = req.body.reason || "Khách hủy";
    await order.save();

    res.json({ success: true, message: "Đã hủy đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy đơn hàng" });
  }
};

export default {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
};