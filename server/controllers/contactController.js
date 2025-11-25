import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Vui lòng nhập tên, email và tin nhắn");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Gửi liên hệ thành công!",
    data: contact,
  });
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

const markAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!contact) {
    res.status(404);
    throw new Error("Không tìm thấy tin nhắn");
  }

  res.json({ message: "Đã đánh dấu đã đọc", contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Không tìm thấy tin nhắn");
  }

  await contact.deleteOne();
  res.json({ message: "Đã xóa tin nhắn" });
});

export { createContact, getContacts, markAsRead, deleteContact };