import express from "express";
import {
  getAdminProducts,
  getAdminProductById,
  createProductWithVariants,
  updateProductWithVariants,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/admin").get(getAdminProducts).post(createProductWithVariants);
router
  .route("/admin/:id")
  .get(getAdminProductById)
  .put(updateProductWithVariants)
  .delete(deleteProduct);

export default router;
