import Order from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email phone")
      .populate({
        path: "items.product",
        select: "name images",
      })
      .populate({
        path: "items.variant",
        select: "color size",
        populate: [
          { path: "color", select: "attribute_color_name" },
          { path: "size", select: "attribute_size_name" },
        ],
      });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedAdminStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
    ];

    if (!allowedAdminStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Trạng thái không hợp lệ hoặc không được phép cập nhật bởi admin",
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    const statusFlow = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
    ];

    const currentIdx = statusFlow.indexOf(order.orderStatus);
    const newIdx = statusFlow.indexOf(orderStatus);

    if (
      currentIdx === -1 ||
      newIdx === -1 || 
      newIdx !== currentIdx + 1 
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Không thể cập nhật trạng thái này",
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
