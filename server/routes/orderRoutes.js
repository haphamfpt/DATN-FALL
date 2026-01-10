import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  vnpayReturn,
  cancelOrder,
  completeOrder,
  processRefund,
  vnpayRefundReturn
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vnpay-return", vnpayReturn);

router.use(protect);
router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id", cancelOrder);
router.put("/:id/complete", completeOrder);
router.post("/:id/process-refund", protect, processRefund); // ← thêm

router.post("/vnpay-refund-return", vnpayRefundReturn);

export default router;