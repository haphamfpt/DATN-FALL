import express from "express";
import {
  createReview,
  getReviewsByProduct,
  deleteReview,
  toggleHelpful,
} from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:productId", getReviewsByProduct);

router.use(protect);
router.post("/:productId", createReview);
router.delete("/:id", deleteReview);
router.post("/:id/helpful", toggleHelpful);

export default router;