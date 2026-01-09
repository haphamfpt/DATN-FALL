import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.use(protect);

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email avatar")
      .populate("product", "name slug images")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách bình luận" });
  }
});

router.patch("/:id/toggle-hidden", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }

    review.is_hidden = !review.is_hidden;
    await review.save();

    await review.populate("user", "name email avatar");
    await review.populate("product", "name slug images");

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi thay đổi trạng thái ẩn/hiện" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }

    await review.deleteOne();
    res.json({ message: "Xóa bình luận thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa bình luận" });
  }
});

export default router;