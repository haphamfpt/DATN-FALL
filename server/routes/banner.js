import express from "express";
import {
  getActiveBanners,
  getAllBannersAdmin,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

router.get("/", getActiveBanners);
router.get("/admin", getAllBannersAdmin);
router.post("/", createBanner);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

export default router;
