import Cart from "../models/Cart.js";
import Variant from "../models/Variant.js";

const calcTotal = async (cart) => {
  await cart.populate({
    path: "items.variant",
    select: "sale_price stock",
  });
  return cart.items.reduce((sum, item) => {
    return sum + (item.variant?.variant?.sale_price || 0) * item.quantity;
  }, 0);
};

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.variant",
      populate: [
        { path: "product", select: "name slug images" },
        { path: "color", select: "attribute_color_name attribute_color_code" },
        { path: "size", select: "attribute_size_name" },
      ],
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const totalAmount = await calcTotal(cart);

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

export const addToCart = async (req, res) => {
  const { variantId, quantity = 1 } = req.body;

  if (!variantId) {
    return res.status(400).json({ success: false, message: "Thiếu variantId" });
  }

  try {
    const variant = await Variant.findById(variantId).select(
      "stock sale_price"
    );
    if (!variant)
      return res
        .status(404)
        .json({ success: false, message: "Sản phẩm không tồn tại" });
    if (variant.stock < quantity)
      return res
        .status(400)
        .json({ success: false, message: "Không đủ hàng trong kho" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id });

    const itemIndex = cart.items.findIndex(
      (item) => item.variant.toString() === variantId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ variant: variantId, quantity });
    }

    await cart.save();

    await cart.populate({
      path: "items.variant",
      populate: [
        { path: "product", select: "name slug images" },
        { path: "color", select: "attribute_color_name attribute_color_code" },
        { path: "size", select: "attribute_size_name" },
      ],
    });

    const totalAmount = await calcTotal(cart);

    res.json({
      success: true,
      totalAmount,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Số lượng phải ≥ 1" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Giỏ hàng trống" });

    const item = cart.items.find(
      (i) => i.variant.toString() === req.params.variantId
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm trong giỏ" });

    const variant = await Variant.findById(req.params.variantId).select(
      "stock"
    );
    if (quantity > variant.stock) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Chỉ còn ${variant.stock} sản phẩm trong kho`,
        });
    }

    item.quantity = quantity;
    await cart.save();

    const totalAmount = await calcTotal(cart);

    res.json({ success: true, totalAmount, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Giỏ hàng không tồn tại" });

    cart.items = cart.items.filter(
      (item) => item.variant.toString() !== req.params.variantId
    );
    await cart.save();

    const totalAmount = await calcTotal(cart);

    res.json({ success: true, totalAmount, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ success: true, message: "Đã làm trống giỏ hàng" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
