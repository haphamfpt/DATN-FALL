import Refund from "../models/Refund.js";

export const getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find()
      .populate({
        path: "order",
        select: "_id totalAmount paymentMethod vnp_TxnRef",
      })
      .populate({
        path: "user",
        select: "name email phone",
      })
      .sort({ createdAt: -1 }); 

    res.json(refunds);
  } catch (error) {
    console.error("Get refunds error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const confirmRefund = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id)
      .populate("order")
      .populate("user");

    if (!refund) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu hoàn tiền" });
    }

    if (refund.refund_status !== "pending") {
      return res.status(400).json({ message: "Yêu cầu này đã được xử lý trước đó" });
    }


    refund.refund_status = "confirm"; 
    refund.refunded_at = new Date();
    await refund.save();

    await refund.populate([
      { path: "order", select: "_id totalAmount" },
      { path: "user", select: "name email" },
    ]);

    res.json(refund);
  } catch (error) {
    console.error("Confirm refund error:", error);
    res.status(500).json({ message: "Xác nhận hoàn tiền thất bại" });
  }
};

export const rejectRefund = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id).populate("order");

    if (!refund) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu hoàn tiền" });
    }

    if (refund.refund_status !== "pending") {
      return res.status(400).json({ message: "Yêu cầu này đã được xử lý trước đó" });
    }

    refund.refund_status = "rejected";
    await refund.save();

    await refund.populate([
      { path: "order", select: "_id totalAmount" },
      { path: "user", select: "name email" },
    ]);

    res.json(refund);
  } catch (error) {
    console.error("Reject refund error:", error);
    res.status(500).json({ message: "Từ chối hoàn tiền thất bại" });
  }
};