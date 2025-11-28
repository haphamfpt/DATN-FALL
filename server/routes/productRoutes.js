import express from "express";
import multer from "multer";
import path from "path";
import {
  getAdminProducts,
  getAdminProductById,
  createProductWithVariants,
  updateProductWithVariants,
  deleteProduct,
} from "../controllers/productController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "img-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Chỉ chấp nhận file ảnh!"));
  },
});

const router = express.Router();

router
  .route("/admin")
  .get(getAdminProducts)
  .post(upload.array("images", 10), createProductWithVariants);

router
  .route("/admin/:id")
  .get(getAdminProductById)
  .put(upload.array("images", 10), updateProductWithVariants)
  .delete(deleteProduct);

export default router;