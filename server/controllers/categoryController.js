import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ product_category_name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Tạo danh mục mới 
export const createCategory = asyncHandler(async (req, res) => {
  const { product_category_name } = req.body;

  const category = await Category.create({
    product_category_name,
  });

  res.status(201).json(category);
});

//Cập nhật danh mục
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Không tìm thấy danh mục");
  }

  category.product_category_name =
    req.body.product_category_name || category.product_category_name;

  const updated = await category.save();
  res.json(updated);
});

//Xóa danh mục
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Không tìm thấy danh mục");
  }

  await category.deleteOne();
  res.json({ message: "Đã xóa danh mục thành công" });
});
