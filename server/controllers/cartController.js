// controllers/cartController.js
import Cart from "../models/Cart.js";
import Variant from "../models/Variant.js";

// Hàm populate chung
const populateCart = (cart) => {
  return cart.populate({
    path: "items.variant",
    select: "sale_price stock",
    populate: [
      { path: "product", select: "name slug images" },
      { path: "color", select: "attribute_color_name attribute_color_code" },
      { path: "size", select: "attribute_size_name" },
    ],
  });
};

// Tính tổng tiền
const calculateTotalAmount = (cart) => {
  return cart.items.reduce((sum, item) => {
    return sum + (item.variant?.sale_price || 0) * item.quantity;
  }, 0);
};

// Lấy giỏ hàng
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    await populateCart(cart);

    const totalAmount = calculateTotalAmount(cart);

    res.json({
      success: true,
      count: cart.items.length,
      totalAmount,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Thêm vào giỏ hàng
export const addToCart = async (req, res) => {
  const { variantId, quantity = 1 } = req.body;

  if (!variantId) {
    return res.status(400).json({ success: false, message: "Thiếu variantId" });
  }

  try {
    const variant = await Variant.findById(variantId).select("stock sale_price");
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant không tồn tại" });
    }

    if (variant.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Chỉ còn ${variant.stock} sản phẩm trong kho`,
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.variant.toString() === variantId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ variant: variantId, quantity });
    }

    await cart.save();
    await populateCart(cart);

    const totalAmount = calculateTotalAmount(cart);

    res.json({
      success: true,
      count: cart.items.length,
      totalAmount,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật số lượng
export const updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { variantId } = req.params;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ success: false, message: "Số lượng phải ≥ 1" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Giỏ hàng không tồn tại" });
    }

    const item = cart.items.find((i) => i.variant.toString() === variantId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Sản phẩm không có trong giỏ" });
    }

    const variant = await Variant.findById(variantId).select("stock");
    if (quantity > variant.stock) {
      return res.status(400).json({
        success: false,
        message: `Chỉ còn ${variant.stock} sản phẩm trong kho`,
      });
    }

    item.quantity = quantity;
    await cart.save();
    await populateCart(cart);

    const totalAmount = calculateTotalAmount(cart);

    res.json({
      success: true,
      totalAmount,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa 1 sản phẩm khỏi giỏ
export const removeItem = async (req, res) => {
  const { variantId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Giỏ hàng không tồn tại" });
    }

    cart.items = cart.items.filter(
      (item) => item.variant.toString() !== variantId
    );

    await cart.save();
    await populateCart(cart);

    const totalAmount = calculateTotalAmount(cart);

    res.json({
      success: true,
      count: cart.items.length,
      totalAmount,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Làm trống giỏ hàng
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Giỏ hàng không tồn tại" });
    }

    res.json({
      success: true,
      message: "Đã làm trống giỏ hàng",
      data: { items: [], totalAmount: 0 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};