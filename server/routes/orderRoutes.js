import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  vnpayReturn,
  cancelOrder
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vnpay-return", vnpayReturn);

router.use(protect);
router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id", cancelOrder)

export default router;