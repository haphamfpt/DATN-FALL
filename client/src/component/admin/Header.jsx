import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    var displayName = "Quản trị viên";
    var displayEmail = "admin@aveline.com";
    var avatarLetters = "AD";
  } else {
    var displayName = user.name && user.name.trim() !== "" ? user.name : "Quản trị viên";
    var displayEmail = user.email || "admin@aveline.com";

    const nameParts = displayName.split(" ").filter(part => part.length > 0);
    if (nameParts.length >= 2) {
      avatarLetters = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else if (nameParts.length === 1) {
      avatarLetters = nameParts[0].slice(0, 2).toUpperCase();
    } else {
      avatarLetters = "AD";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];

    toast.success("Đăng xuất thành công!");

    navigate("/login", { replace: true });
  };

  return (
    <header
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top"
      style={{ marginLeft: "280px", height: "70px", zIndex: 1030, transition: "margin-left 0.3s ease" }}
    >
      <div className="container-fluid px-4">
        <button
          className="btn d-lg-none me-3 p-0"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list fs-3 text-dark"></i>
        </button>

        <form className="d-none d-md-flex me-auto" style={{ maxWidth: "400px" }}>
          {/* <input
            type="search"
            className="form-control bg-light border-0"
            placeholder="Tìm kiếm đơn hàng, sản phẩm..."
          /> */}
        </form>

        <div className="d-flex align-items-center gap-4">


          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <div className="fw-semibold text-dark">{displayName}</div>
              <small className="text-muted">{displayEmail}</small>
            </div>

            <div
              className="d-flex align-items-center justify-content-center text-white fw-bold rounded-circle shadow-sm"
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                fontSize: "18px",
              }}
              title={displayName}
            >
              {avatarLetters}
            </div>
          </div>

          <button
            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
            onClick={handleLogout}
            title="Đăng xuất"
          >
            <FiLogOut size={18} />
            <span className="d-none d-xl-inline">Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;