import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top"
      style={{ marginLeft: "280px", height: "70px", zIndex: 1030 }}
    >
      <div className="container-fluid px-4">
        <button className="btn d-lg-none me-3" onClick={toggleSidebar}>
          <i className="bi bi-list fs-3"></i>
        </button>

        <form
          className="d-none d-md-flex me-auto"
          style={{ maxWidth: "400px" }}
        ></form>

        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <div className="fw-semibold text-dark">Quản trị viên</div>
              <small className="text-muted">admin@aveline.com</small>
            </div>
            <div
              className="d-flex align-items-center justify-content-center text-white fw-bold rounded-circle"
              style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#14b8a6",
              }}
            >
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
