import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCart } from "react-icons/bs"; 
const Header = () => {
  const totalItems = 0;

  return (
    <header className="bg-white shadow sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
            Aveline
          </Link>

          {/* Toggle button for mobile */}
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

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Liên hệ
                </Link>
              </li>
            </ul>

            {/* Right: Search + Cart + Auth */}
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm..."
                aria-label="Search"
              />
            </form>

            <div className="d-flex align-items-center">
              {/* Cart */}
              <Link to="/cart" className="btn btn-outline-danger position-relative me-3">
                <BsCart size={24} /> 
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth */}
              <Link to="/login" className="btn btn-outline-primary me-2">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
