import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [savingInfo, setSavingInfo] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [infoForm, setInfoForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInfoChange = (e) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    const token = localStorage.getItem("token");
    setSavingInfo(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(infoForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const updatedUser = { ...user, ...infoForm };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Cập nhật thông tin thành công!");
    } catch (err) {
      toast.error(err.message || "Cập nhật thất bại");
    } finally {
      setSavingInfo(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu mới không khớp!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải ít nhất 6 ký tự!");
      return;
    }

    const token = localStorage.getItem("token");
    setChangingPassword(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Đổi mật khẩu thành công! Đăng nhập lại nhé.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message || "Mật khẩu hiện tại sai");
    } finally {
      setChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
      <h4 className="fw-bold mb-4">Thông tin cá nhân</h4>

      <div className="row g-3 mb-5">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={infoForm.name}
            onChange={handleInfoChange}
            className="form-control form-control-lg"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            value={infoForm.email}
            className="form-control form-control-lg bg-light"
            disabled
          />
          <small className="text-muted">Email không thể thay đổi</small>
        </div>
      </div>

      <button
        onClick={handleSaveInfo}
        disabled={savingInfo}
        className="btn btn-danger btn-lg px-5 py-3 fw-bold me-3"
      >
        {savingInfo ? "Đang lưu..." : "Lưu thông tin"}
      </button>

      <hr className="my-5" />

      <h5 className="fw-bold mb-4 text-danger">Đổi mật khẩu</h5>

      <div className="row g-3 mb-4">
        <div className="col-12">
          <label className="form-label fw-semibold">Mật khẩu hiện tại</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            className="form-control form-control-lg"
            placeholder="Nhập mật khẩu cũ"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="form-control form-control-lg"
            placeholder="Ít nhất 6 ký tự"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            className="form-control form-control-lg"
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>
      </div>

      <button
        onClick={handleChangePassword}
        disabled={changingPassword}
        className="btn btn-outline-danger btn-lg px-5 py-3 fw-bold"
      >
        {changingPassword ? "Đang đổi..." : "Đổi mật khẩu"}
      </button>
    </>
  );
};

export default ProfileInfo;
