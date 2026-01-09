import express from "express";
import {
  createReview,
  getReviewsByProduct,
  deleteReview,
  toggleHelpful,
  hasUserReviewed
} from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/product/:productId", getReviewsByProduct);
router.post("/:productId", protect, createReview);
router.delete("/:id", deleteReview);
router.post("/:id/helpful", toggleHelpful);
router.get("/has-reviewed/:productId", protect, hasUserReviewed);

router.patch("/:id/toggle-hidden", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Không tìm thấy" });

    review.is_hidden = !review.is_hidden;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;