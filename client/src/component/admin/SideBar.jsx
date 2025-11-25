// src/components/admin/Sidebar.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BiHomeAlt,
  BiShoppingBag,
  BiCategory,
  BiPackage,
  BiCube,
  BiBookContent,
  BiImage,
  BiGift,
  BiUser,
  BiLogOut,
  BiPhone
} from "react-icons/bi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split("/").pop();

  const menuItems = [
    { id: "dashboard", label: "Thống kê", icon: <BiHomeAlt size={20} />, path: "/admin/dashboard" },
    { id: "order", label: "Đơn hàng", icon: <BiShoppingBag size={20} />, path: "/admin/order" },
    { id: "categories", label: "Danh mục", icon: <BiCategory size={20} />, path: "/admin/categories" },
    { id: "products", label: "Sản phẩm", icon: <BiPackage size={20} />, path: "/admin/products" },
    { id: "variants", label: "Biến thể", icon: <BiCube size={20} />, path: "/admin/variants" },
    { id: "blogs", label: "Bài viết", icon: <BiBookContent size={20} />, path: "/admin/blogs" },
    { id: "banners", label: "Banner", icon: <BiImage size={20} />, path: "/admin/banners" },
    { id: "vouchers", label: "Voucher", icon: <BiGift size={20} />, path: "/admin/vouchers" },
    { id: "customers", label: "Khách hàng", icon: <BiUser size={20} />, path: "/admin/customers" },
    { id: "contacts", label: "Liên hệ", icon: <BiPhone size={20} />, path: "/admin/contacts" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-white shadow"
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className="text-center mb-4 pb-3 border-bottom">
        <h3 className="fw-bold text-dark">
          Aveline
        </h3>
        <small className="text-muted">Admin Dashboard</small>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => {
          const isActive = currentPath === item.id;

          return (
            <li key={item.id} className="nav-item mb-1">
              <button
                onClick={() => handleNavigate(item.path)}
                className={`nav-link d-flex align-items-center gap-3 text-start w-100 rounded-pill transition-all ${
                  isActive
                    ? "bg-teal text-white shadow-sm"
                    : "text-dark hover-bg-light"
                }`}
                style={{
                  backgroundColor: isActive ? "#14b8a6" : "transparent",
                }}
              >
                {item.icon}
                <span className="fw-medium">{item.label}</span>
                {isActive && <div className="ms-auto w-1 h-8 bg-teal-400 rounded-full"></div>}
              </button>
            </li>
          );
        })}
      </ul>

      <hr className="text-muted" />
      <button className="btn btn-outline-danger d-flex align-items-center gap-3 w-100 rounded-pill">
        <BiLogOut size={20} />
        <span className="fw-medium">Đăng xuất</span>
      </button>
    </div>
  );
};

export default Sidebar;