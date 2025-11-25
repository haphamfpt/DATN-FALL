import Banner from '../models/Banner.js';
import asyncHandler from 'express-async-handler';

const getActiveBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ active: true })
  res.json(banners);
});

const getAllBannersAdmin = asyncHandler(async (req, res) => {
  const banners = await Banner.find({})
    .sort({ createdAt: -1 })
    .select('-__v');

  res.json(banners);
});

const createBanner = asyncHandler(async (req, res) => {
  const { image, active } = req.body;

  if (!image || !image.trim()) {
    res.status(400);
    throw new Error('URL ảnh banner là bắt buộc');
  }

  const banner = await Banner.create({
    image: image.trim(),
    active: active ?? true,
  });

  res.status(201).json(banner);
});

const updateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    res.status(404);
    throw new Error('Không tìm thấy banner');
  }

  const { image, active } = req.body;

  if (image !== undefined) banner.image = image.trim();
  if (active !== undefined) banner.active = active;

  const updatedBanner = await banner.save();
  res.json(updatedBanner);
});

const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    res.status(404);
    throw new Error('Không tìm thấy banner');
  }

  await banner.deleteOne();
  res.json({ message: 'Xóa banner thành công' });
});

export {
  getActiveBanners,
  getAllBannersAdmin,
  createBanner,
  updateBanner,
  deleteBanner,
};