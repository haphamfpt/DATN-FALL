import asyncHandler from 'express-async-handler';
import Voucher from '../models/Voucher.js';

export const getVouchers = asyncHandler(async (req, res) => {
  const vouchers = await Voucher.find({ is_active: true })
    .sort({ createdAt: -1 });

  res.json(vouchers);
});

export const getVoucherById = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);

  if (voucher) {
    res.json(voucher);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy mã giảm giá');
  }
});

export const createVoucher = asyncHandler(async (req, res) => {
  const {
    voucher_code,
    voucher_value,
    voucher_type,
    max_price,
    rank_price,
    start_datetime,
    end_datetime,
    quantity,
    for_user_ids
  } = req.body;

  const exists = await Voucher.findOne({
    voucher_code: voucher_code.toUpperCase().trim()
  });
  if (exists) {
    res.status(400);
    throw new Error('Mã giảm giá đã tồn tại');
  }

  const voucher = await Voucher.create({
    voucher_code: voucher_code.toUpperCase().trim(),
    voucher_value,
    voucher_type,
    max_price: max_price || 0,
    rank_price: rank_price || 0,
    start_datetime,
    end_datetime,
    quantity,
    used_quantity: 0,
    for_user_ids: for_user_ids || [],
    is_active: true
  });

  res.status(201).json(voucher);
});

export const updateVoucher = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);

  if (!voucher) {
    res.status(404);
    throw new Error('Không tìm thấy mã giảm giá');
  }

  if (req.body.voucher_code) {
    const exists = await Voucher.findOne({
      voucher_code: req.body.voucher_code.toUpperCase(),
      _id: { $ne: voucher._id }
    });
    if (exists) {
      res.status(400);
      throw new Error('Mã giảm giá đã được sử dụng');
    }
    voucher.voucher_code = req.body.voucher_code.toUpperCase();
  }

  Object.assign(voucher, req.body);
  const updatedVoucher = await voucher.save();

  res.json(updatedVoucher);
});

export const deleteVoucher = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);

  if (!voucher) {
    res.status(404);
    throw new Error('Không tìm thấy mã giảm giá');
  }

  await voucher.deleteOne();
  res.json({ message: 'Đã xóa mã giảm giá thành công' });
});

export const applyVoucher = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;
  const user = req.user;

  if (!code || subtotal == null) {
    return res.status(400).json({
      valid: false,
      message: 'Vui lòng cung cấp mã giảm giá và tổng tiền tạm tính',
    });
  }

  const trimmedCode = code.trim().toUpperCase();

  const voucher = await Voucher.findOne({
    voucher_code: trimmedCode,
    is_active: true,
    start_datetime: { $lte: new Date() },
    end_datetime: { $gte: new Date() },
    $expr: { $lt: ['$used_quantity', '$quantity'] },
  });

  if (!voucher) {
    return res.status(400).json({
      valid: false,
      message: 'Mã giảm giá không hợp lệ, đã hết hạn hoặc hết lượt sử dụng',
    });
  }

  if (subtotal < voucher.rank_price) {
    return res.status(400).json({
      valid: false,
      message: `Đơn hàng cần tối thiểu ${formatPrice(voucher.rank_price)} để sử dụng mã này`,
    });
  }

  if (voucher.for_user_ids.length > 0) {
    if (!user) {
      return res.status(401).json({
        valid: false,
        message: 'Vui lòng đăng nhập để sử dụng mã giảm giá này',
      });
    }
    if (!voucher.for_user_ids.includes(user._id)) {
      return res.status(403).json({
        valid: false,
        message: 'Mã giảm giá này không áp dụng cho tài khoản của bạn',
      });
    }
  }

  let discountAmount = 0;
  if (voucher.voucher_type === 'fixed') {
    discountAmount = voucher.voucher_value;
  } else if (voucher.voucher_type === 'percent') {
    discountAmount = (subtotal * voucher.voucher_value) / 100;
    if (voucher.max_price > 0 && discountAmount > voucher.max_price) {
      discountAmount = voucher.max_price;
    }
  }

  res.json({
    valid: true,
    discountAmount, // ← frontend dùng cái này để trừ vào tổng
    voucher: {
      code: voucher.voucher_code,
      type: voucher.voucher_type,
      value: voucher.voucher_value,
      max_price: voucher.max_price || 0,
    },
    message: `Áp dụng mã ${voucher.voucher_code} thành công! Giảm ${formatPrice(discountAmount)}`,
  });
});

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);