import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  vnpayReturn,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);
router.get("/vnpay/return", vnpayReturn);

export default router;