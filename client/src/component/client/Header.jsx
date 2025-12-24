import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCart, BsPerson, BsBoxArrowRight } from "react-icons/bs";
import { useState } from "react";

const Header = () => {
  const [totalItems] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <header className="bg-white shadow sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
            Aveline
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Liên hệ</Link>
              </li>
            </ul>

            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm..."
                aria-label="Search"
              />
            </form>

            <div className="d-flex align-items-center gap-3">
              <Link to="/cart" className="btn btn-outline-danger position-relative">
                <BsCart size={24} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="dropdown user-dropdown"> 
                  <button
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BsPerson size={20} />
                    Xin chào, {user.name || user.email.split("@")[0]}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                        <BsPerson /> Thông tin cá nhân
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger d-flex align-items-center gap-2"
                        onClick={handleLogout}
                      >
                        <BsBoxArrowRight /> Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;