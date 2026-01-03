import express from "express";
import { getUserList, getUserDetail } from "../controllers/userAdminController.js";

const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";

router.use(protect);           

router.get("/users", getUserList);

router.get("/users/:id", getUserDetail);

export default router;