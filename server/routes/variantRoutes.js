import express from "express";
import asyncHandler from "express-async-handler";
import Variant from "../models/Variant.js";

const router = express.Router();

router.put(
  "/admin/:id",
  asyncHandler(async (req, res) => {
    const { sale_price, stock } = req.body;

    const updateData = {};

    if (sale_price !== undefined) {
      const price = Number(sale_price);
      if (isNaN(price) || price < 0) {
        res.status(400);
        throw new Error("Giá bán không hợp lệ (phải là số >= 0)");
      }
      updateData.sale_price = price;
    }

    if (stock !== undefined) {
      const qty = Number(stock);
      if (isNaN(qty) || qty < 0) {
        res.status(400);
        throw new Error("Tồn kho không hợp lệ (phải là số >= 0)");
      }
      updateData.stock = qty;
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400);
      throw new Error("Không có dữ liệu để cập nhật");
    }

    const updatedVariant = await Variant.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updatedVariant) {
      res.status(404);
      throw new Error("Không tìm thấy biến thể");
    }

    res.json({
      success: true,
      message: "Cập nhật thành công",
      variant: updatedVariant,
    });
  })
);

router.delete(
  "/admin/:id",
  asyncHandler(async (req, res) => {
    const variant = await Variant.findById(req.params.id);
    if (!variant) {
      res.status(404);
      throw new Error("Không tìm thấy biến thể");
    }

    await variant.deleteOne();
    res.json({ success: true, message: "Đã xóa biến thể" });
  })
);

router.post(
  "/admin",
  asyncHandler(async (req, res) => {
    const {
      product,
      color,
      size,
      sale_price,
      import_price = 0,
      stock = 0,
    } = req.body;

    const existing = await Variant.findOne({ product, color, size });
    if (existing) {
      res.status(409);
      throw new Error(
        `Biến thể với màu ${color} và size ${size} đã tồn tại cho sản phẩm này`
      );
    }

    if (!product || !color || !size || sale_price === undefined) {
      res.status(400);
      throw new Error(
        "Thiếu thông tin bắt buộc: product, color, size, sale_price"
      );
    }

    const price = Number(sale_price);
    if (isNaN(price) || price < 0) {
      res.status(400);
      throw new Error("Giá bán không hợp lệ (phải là số >= 0)");
    }

    const qty = Number(stock);
    if (isNaN(qty) || qty < 0) {
      res.status(400);
      throw new Error("Tồn kho không hợp lệ (phải là số >= 0)");
    }

    const newVariant = new Variant({
      product,
      color,
      size,
      sale_price: price,
      import_price: Number(import_price),
      stock: qty,
    });

    const savedVariant = await newVariant.save();

    res.status(201).json({
      success: true,
      message: "Tạo biến thể thành công",
      variant: savedVariant,
    });
  })
);
export default router;
