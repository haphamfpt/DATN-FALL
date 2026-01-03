import express from "express";
import { getAdminStats } from "../controllers/dasboardController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAdminStats);

export default router;