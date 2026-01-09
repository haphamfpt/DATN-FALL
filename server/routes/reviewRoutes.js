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
router.get("/has-reviewed/:productId", hasUserReviewed);

export default router;