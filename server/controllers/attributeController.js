import asyncHandler from "express-async-handler";
import Color from "../models/Color.js";
import Size from "../models/Size.js";

export const getColors = asyncHandler(async (req, res) => {
  const colors = await Color.find({}).sort({ attribute_color_name: 1 });
  res.json(colors);
});

export const createColor = asyncHandler(async (req, res) => {
  const { attribute_color_id, attribute_color_code, attribute_color_name } =
    req.body;

  const color = await Color.create({
    attribute_color_code,
    attribute_color_name,
  });

  res.status(201).json(color);
});

export const updateColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    res.status(404);
    throw new Error("Không tìm thấy màu");
  }

  Object.assign(color, req.body);
  await color.save();
  res.json(color);
});

export const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!color) {
    res.status(404);
    throw new Error("Không tìm thấy màu");
  }
  await color.deleteOne();
  res.json({ message: "Đã xóa màu thành công" });
});

export const getSizes = asyncHandler(async (req, res) => {
  const sizes = await Size.find({}).sort({ attribute_size_name: 1 });
  res.json(sizes);
});

export const createSize = asyncHandler(async (req, res) => {
  const { attribute_size_name } = req.body;

  const size = await Size.create({
    attribute_size_name,
  });

  res.status(201).json(size);
});

export const updateSize = asyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);
  if (!size) {
    res.status(404);
    throw new Error("Không tìm thấy size");
  }

  Object.assign(size, req.body);
  await size.save();
  res.json(size);
});

export const deleteSize = asyncHandler(async (req, res) => {
  const size = await Size.findById(req.params.id);
  if (!size) {
    res.status(404);
    throw new Error("Không tìm thấy size");
  }
  await size.deleteOne();
  res.json({ message: "Đã xóa size thành công" });
});
