import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Variant from "../models/Variant.js";

const getAdminProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;

  const products = await Product.find({})
    .populate("category", "product_category_name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await Product.countDocuments();
  const productIds = products.map((p) => p._id);

  const variants = await Variant.find({ product: { $in: productIds } })
    .select("product color size import_price sale_price stock sku")
    .populate({
      path: "color",
      select: "attribute_color_name attribute_color_code",
    })
    .populate({
      path: "size",
      select: "attribute_size_name",
    })
    .lean();

  const variantsByProduct = {};
  variants.forEach((v) => {
    const productId = v.product.toString();

    if (!variantsByProduct[productId]) {
      variantsByProduct[productId] = [];
    }

    variantsByProduct[productId].push({
      _id: v._id,
      name:
        v.name ||
        `${v.color?.attribute_color_name || "Màu"} - ${
          v.size?.attribute_size_name || "Size"
        }`,
      color: v.color
        ? {
            name: v.color.attribute_color_name,
            code: v.color.attribute_color_code,
          }
        : null,
      size: v.size
        ? {
            name: v.size.attribute_size_name,
          }
        : null,
      import_price: v.import_price,
      sale_price: v.sale_price,
      stock: v.stock,
      sku: v.sku,
    });
  });

  const enhancedProducts = products.map((p) => {
    const productVariants = variantsByProduct[p._id.toString()] || [];
    const prices = productVariants.map((v) => v.sale_price).filter(Boolean);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

    return {
      ...p,
      total_variants: productVariants.length,
      min_price: minPrice,
      variants: productVariants,
    };
  });

  res.json({
    products: enhancedProducts,
    pagination: {
      page,
      total,
      pages: Math.ceil(total / limit),
    },
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
    mainImage: product.images[0]?.url || "",
    gallery: product.images,
  });
});

const createProductWithVariants = asyncHandler(async (req, res) => {
  let payload = {};

  if (req.body.data) {
    try {
      payload = JSON.parse(req.body.data);
    } catch (err) {
      res.status(400);
      throw new Error("Dữ liệu JSON không hợp lệ");
    }
  } else if (req.body.name) {
    payload = req.body;
  } else {
    res.status(400);
    throw new Error("Không nhận được dữ liệu sản phẩm");
  }

  const {
    name,
    category,
    brand = "",
    description,
    short_description = "",
    images: oldImages = [],
    tags = [],
    variants = [],
  } = payload;

  if (!name?.trim())
    return res.status(400).json({ message: "Tên sản phẩm là bắt buộc" });
  if (!category)
    return res.status(400).json({ message: "Vui lòng chọn danh mục" });
  if (!description?.trim())
    return res.status(400).json({ message: "Mô tả sản phẩm là bắt buộc" });

  let finalImages = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      finalImages.push({
        url: `/uploads/products/${file.filename}`,
        alt: name.trim(),
      });
    });
  }

  if (finalImages.length === 0) {
    res.status(400);
    throw new Error("Vui lòng tải lên ít nhất 1 ảnh");
  }

  const product = await Product.create({
    name: name.trim(),
    category,
    brand: brand.trim(),
    description: description.trim(),
    short_description: short_description.trim() || "",
    images: finalImages,
    tags: tags.map((t) => t.trim()).filter(Boolean),
    has_variants: variants.length > 0,
    is_active: true,
    is_featured: false,
    slug: name
      .trim()
      .toLowerCase()
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-"),
  });

  // 6. Tạo variants
  if (variants.length > 0) {
    const variantDocs = variants.map((v) => ({
      product: product._id,
      color: v.color,
      size: v.size,
      sale_price: Number(v.sale_price),
      import_price: Number(v.import_price) || 0,
      stock: Number(v.stock) || 0,
      is_show: true,
    }));

    await Variant.insertMany(variantDocs);
  }

  // 7. Trả về kết quả
  const finalProduct = await Product.findById(product._id).populate(
    "category",
    "product_category_name"
  );

  res.status(201).json({
    message: "Tạo sản phẩm thành công!",
    product: finalProduct,
    variantCount: variants.length,
  });
});

const updateProductWithVariants = asyncHandler(async (req, res) => {
  let payload = {};

  if (req.body.data) {
    payload = JSON.parse(req.body.data);
  } else if (req.body.name) {
    payload = req.body;
  } else {
    res.status(400);
    throw new Error("Dữ liệu không hợp lệ");
  }

  const {
    name,
    category,
    brand = "",
    description,
    short_description = "",
    images: clientImages = [],
    tags = [],
    variants = [],
  } = payload;

  const productId = req.params.id;

  if (!name?.trim() || !category || !description?.trim()) {
    res.status(400);
    throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
  }

  let finalImages = [];

  clientImages.forEach((img) => {
    if (img.url && !img.isNew) {
      finalImages.push({
        url: img.url,
        alt: img.alt || name,
      });
    }
  });

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      finalImages.push({
        url: `/uploads/products/${file.filename}`,
        alt: name,
      });
    });
  }

  if (finalImages.length === 0) {
    res.status(400);
    throw new Error("Vui lòng tải lên ít nhất 1 ảnh");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name: name.trim(),
      category,
      brand: brand.trim(),
      description: description.trim(),
      short_description: short_description.trim() || "",
      images: finalImages,
      tags: tags.map((t) => t.trim()).filter(Boolean),
      has_variants: variants.length > 0,
    },
    { new: true }
  );

  await Variant.deleteMany({ product: productId });
  if (variants.length > 0) {
    const variantDocs = variants.map((v) => ({
      product: updatedProduct._id,
      color: v.color,
      size: v.size,
      sale_price: Number(v.sale_price),
      import_price: Number(v.import_price) || 0,
      stock: Number(v.stock) || 0,
      is_show: true,
    }));
    await Variant.insertMany(variantDocs);
  }

  res.json({
    message: "Cập nhật sản phẩm thành công!",
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

  res.json({ message: "Đã xóa sản phẩm và tất cả biến thể!" });
});

export {
  getAdminProducts,
  getAdminProductById,
  createProductWithVariants,
  updateProductWithVariants,
  deleteProduct,
};
