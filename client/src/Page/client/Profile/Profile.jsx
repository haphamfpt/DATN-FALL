import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const [user, setUser] = useState(null);

  const [infoForm, setInfoForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser) {
        toast.error("Vui lòng đăng nhập để xem thông tin cá nhân!");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      setUser(storedUser);
      setInfoForm({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
      });

      setLoading(false);
    };

    loadUser();
  }, [navigate]);

  const handleInfoChange = (e) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

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

      if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

      const updatedUser = { ...user, ...infoForm };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success("Cập nhật thông tin thành công!");
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
    } finally {
      setSavingInfo(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp!");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải ít nhất 6 ký tự!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

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

      if (!res.ok) throw new Error(data.message || "Đổi mật khẩu thất bại");

      toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message || "Mật khẩu hiện tại không đúng");
    } finally {
      setChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-danger"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 fw-bold">Đang tải thông tin cá nhân...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        <h2 className="fw-bold mb-5 text-center text-dark">
          Tài khoản của tôi
        </h2>

        <div className="row">
          <div className="col-lg-3 mb-4 mb-lg-0">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <div className="d-flex align-items-center mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNUOgjEhHpfUqnVk-Tp2uN1AhrrzXhwdX9A&s"
                  alt="Avatar"
                  className="rounded-circle me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                  <h6 className="fw-bold mb-0">{user?.name || "Người dùng"}</h6>
                  <small className="text-muted">{user?.email}</small>
                </div>
              </div>

              <hr className="my-4" />

              <nav className="nav flex-column">
                <button
                  className={`nav-link btn btn-link text-start fw-semibold px-3 py-3 rounded ${
                    activeTab === "info" ? "bg-danger text-white" : "text-dark"
                  }`}
                  onClick={() => setActiveTab("info")}
                >
                  <i className="bi bi-person me-3"></i>
                  Thông tin cá nhân
                </button>

                <button
                  className={`nav-link btn btn-link text-start fw-semibold px-3 py-3 rounded ${
                    activeTab === "orders"
                      ? "bg-danger text-white"
                      : "text-dark"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <i className="bi bi-bag me-3"></i>
                  Đơn hàng của tôi
                </button>
              </nav>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="bg-white rounded-3 shadow-sm p-4 p-md-5">
              {activeTab === "info" && (
                <>
                  <h4 className="fw-bold mb-4">Thông tin cá nhân</h4>

                  <div className="row g-3 mb-5">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Họ và tên
                      </label>
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
                      <small className="text-muted">
                        Email không thể thay đổi
                      </small>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveInfo}
                    disabled={savingInfo}
                    className="btn btn-danger btn-lg px-5 py-3 fw-bold me-3"
                  >
                    {savingInfo ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Đang lưu...
                      </>
                    ) : (
                      "Lưu thông tin"
                    )}
                  </button>

                  <hr className="my-5" />

                  <h5 className="fw-bold mb-4 text-danger">Đổi mật khẩu</h5>

                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="form-control form-control-lg"
                        placeholder="Nhập mật khẩu cũ"
                        autoComplete="current-password"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="form-control form-control-lg"
                        placeholder="Ít nhất 6 ký tự"
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={handleChangePassword}
                      disabled={
                        changingPassword ||
                        !passwordForm.currentPassword ||
                        !passwordForm.newPassword ||
                        !passwordForm.confirmPassword
                      }
                      className="btn btn-outline-danger btn-lg px-5 py-3 fw-bold"
                    >
                      {changingPassword ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Đang đổi mật khẩu...
                        </>
                      ) : (
                        "Đổi mật khẩu"
                      )}
                    </button>
                  </div>
                </>
              )}

              {activeTab === "orders" && (
                <>
                  <h4 className="fw-bold mb-4">Đơn hàng của tôi</h4>
                  <div className="text-center py-5">
                    <i className="bi bi-bag fs-1 text-muted mb-3"></i>
                    <p className="text-muted fs-5">Bạn chưa có đơn hàng nào</p>
                    <a href="/shop" className="btn btn-danger btn-lg px-5">
                      Mua sắm ngay
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
