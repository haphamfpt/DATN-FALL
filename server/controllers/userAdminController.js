import User from "../models/User.js";

export const getUserList = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user list:", error);
    res.status(500).json({ message: "Không thể tải danh sách người dùng" });
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user detail:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }
    res.status(500).json({ message: "Lỗi server khi lấy thông tin người dùng" });
  }
};