import express from 'express';
import Banner from '../models/Banner.js';

const router = express.Router();

// API lấy tất cả banner đang bật (dùng cho trang chủ)
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ active: true }).sort({ _id: 1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

export default router;