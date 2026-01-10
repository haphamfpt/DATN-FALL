import express from "express";
import { protect } from "../middlewares/authMiddleware.js"; 
import {
  getAllRefunds,
  confirmRefund,
  rejectRefund,
} from "../controllers/refundController.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllRefunds);

router.put("/:id/confirm", confirmRefund);

router.put("/:id/reject", rejectRefund);

export default router;