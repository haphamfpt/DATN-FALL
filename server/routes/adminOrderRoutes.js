import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { admin } from "../middlewares/authMiddleware.js"; 
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";

const router = express.Router();

router.use(protect, admin);

router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);

export default router;