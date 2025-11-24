import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import Variant from '../models/Variant.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { category, color, size, minPrice, maxPrice } = req.query;

  let query = { is_active: true };

  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.sale_price = {};
    if (minPrice) query.sale_price.$gte = Number(minPrice);
    if (maxPrice) query.sale_price.$lte = Number(maxPrice);
  }

  const products = await Product.find(query)
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  if (color || size) {
    const variantFilter = {};
    if (color) variantFilter.color = color;
    if (size) variantFilter.size = size;

    const variantProducts = await Variant.find(variantFilter).distinct('product');
    const filteredProducts = products.filter(p => variantProducts.includes(p._id));
    return res.json(filteredProducts);
  }

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name');

  if (!product) {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }

  const variants = await Variant.find({ product: product._id })
    .populate('color', 'name code')
    .populate('size', 'name');

  res.json({
    ...product.toObject(),
    variants
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, description, images, variants } = req.body;

  const product = await Product.create({
    name,
    category,
    description,
    short_description: description.slice(0, 160),
    images,
    has_variants: variants && variants.length > 0,
    is_active: true
  });

  if (variants && variants.length > 0) {
    const variantData = variants.map(v => ({
      ...v,
      product: product._id
    }));
    await Variant.insertMany(variantData);
  }

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }

  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Không tìm thấy sản phẩm');
  }

  await Variant.deleteMany({ product: product._id });
  await product.deleteOne();
  res.json({ message: 'Đã xóa sản phẩm và tất cả variant' });
});