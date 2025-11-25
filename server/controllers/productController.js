import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Variant from "../models/Variant.js";

const getAdminProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const products = await Product.find({})
    .populate("category", "product_category_name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments();

  res.json({
    products,
    pagination: { page, pages: Math.ceil(total / limit), total },
  });
});

const getAdminProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "product_category_name"
  );

  if (!product) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  const variants = await Variant.find({ product: product._id })
    .populate("color", "attribute_color_name attribute_color_code")
    .populate("size", "attribute_size_name");

  res.json({
    ...product.toObject(),
    variants,
  });
});

const createProductWithVariants = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    description,
    short_description,
    images,
    colors,
    sizes,
    listed_price,
    sale_price,
    import_price,
    stock_per_variant = 0,
    is_active = true,
    is_featured = false,
    tags = [],
  } = req.body;

  if (!name || !category || !description) {
    res.status(400);
    throw new Error("Vui lòng nhập đầy đủ tên, danh mục và mô tả");
  }

  const hasVariants = colors && sizes && colors.length > 0 && sizes.length > 0;

  const product = await Product.create({
    name,
    category,
    brand: brand || "",
    description,
    short_description: short_description || "",
    images: images || [],
    price: sale_price || listed_price || 0,
    sale_price: sale_price || listed_price || 0,
    import_price: import_price || 0,
    has_variants: hasVariants,
    is_active,
    is_featured,
    tags,
  });

  if (hasVariants) {
    const variantsToCreate = [];

    for (const colorId of colors) {
      for (const sizeId of sizes) {
        variantsToCreate.push({
          product: product._id,
          color: colorId,
          size: sizeId,
          listed_price: listed_price || 0,
          sale_price: sale_price || listed_price || 0,
          import_price: import_price || 0,
          stock: stock_per_variant,
          is_show: true,
        });
      }
    }

    await Variant.insertMany(variantsToCreate);
  }

  const finalProduct = await Product.findById(product._id).populate(
    "category",
    "product_category_name"
  );

  res.status(201).json({
    message: "Tạo sản phẩm thành công!",
    product: finalProduct,
    variantCount: hasVariants ? colors.length * sizes.length : 0,
  });
});
const updateProductWithVariants = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  const {
    colors,
    sizes,
    listed_price,
    sale_price,
    import_price,
    stock_per_variant,
    ...productData
  } = req.body;

  const hasVariants = colors && sizes && colors.length > 0 && sizes.length > 0;

  Object.assign(product, {
    ...productData,
    has_variants: hasVariants,
    price: sale_price || listed_price || product.price,
    sale_price: sale_price || listed_price || product.sale_price,
  });

  await product.save();

  if (hasVariants) {
    await Variant.deleteMany({ product: product._id });

    const newVariants = [];
    for (const colorId of colors) {
      for (const sizeId of sizes) {
        newVariants.push({
          product: product._id,
          color: colorId,
          size: sizeId,
          listed_price: listed_price || product.price,
          sale_price: sale_price || product.sale_price,
          import_price: import_price || product.import_price,
          stock: stock_per_variant ?? 0,
          is_show: true,
        });
      }
    }
    await Variant.insertMany(newVariants);
  } else {
    await Variant.deleteMany({ product: product._id });
  }

  const updatedProduct = await Product.findById(product._id).populate(
    "category",
    "product_category_name"
  );

  res.json({
    message: "Cập nhật thành công!",
    product: updatedProduct,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Không tìm thấy sản phẩm");
  }

  await Variant.deleteMany({ product: product._id });
  await product.deleteOne();

  res.json({ message: "Đã xóa sản phẩm và tất cả biến thể" });
});

export {
  getAdminProducts,
  getAdminProductById,
  createProductWithVariants,
  updateProductWithVariants,
  deleteProduct,
};
