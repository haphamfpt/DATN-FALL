import express from "express";
import asyncHandler from "express-async-handler";
import Variant from "../models/Variant.js";

const router = express.Router();

router.put("/admin/:id", asyncHandler(async (req, res) => {
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
      context: 'query'       
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
}));

router.delete("/admin/:id", asyncHandler(async (req, res) => {
  const variant = await Variant.findById(req.params.id);
  if (!variant) {
    res.status(404);
    throw new Error("Không tìm thấy biến thể");
  }

  await variant.deleteOne();
  res.json({ success: true, message: "Đã xóa biến thể" });
}));

export default router;