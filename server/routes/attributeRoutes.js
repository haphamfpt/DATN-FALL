import express from "express";
import {
  getColors,
  createColor,
  updateColor,
  deleteColor,
  getSizes,
  createSize,
  updateSize,
  deleteSize,
} from "../controllers/attributeController.js";

const router = express.Router();

router.get("/colors", getColors);
router.post("/colors", createColor);
router.put("/colors/:id", updateColor);
router.delete("/colors/:id", deleteColor);

router.get("/sizes", getSizes);
router.post("/sizes", createSize);
router.put("/sizes/:id", updateSize);
router.delete("/sizes/:id", deleteSize);

export default router;
