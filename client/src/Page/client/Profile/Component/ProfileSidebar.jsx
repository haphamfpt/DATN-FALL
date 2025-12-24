import React from "react";

const ProfileSidebar = ({ user, activeTab, setActiveTab }) => {
  return (
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
            activeTab === "orders" ? "bg-danger text-white" : "text-dark"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          <i className="bi bi-bag me-3"></i>
          Đơn hàng của tôi
        </button>
      </nav>
    </div>
  );
};

export default ProfileSidebar;