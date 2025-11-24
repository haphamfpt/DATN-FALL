import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 mt-5">
      <div className="container">
        <div className="row">

          {/* Cột 1: Giới thiệu */}
          <div className="col-md-4 mb-4">
            <h5 className="text-warning fw-bold mb-3">Aveline Shop</h5>
            <p className="small">
              Cửa hàng thời trang thể thao chính hãng – mang đến phong cách năng
              động, khỏe khoắn và đậm chất cá tính. Đồng hành cùng bạn trên mọi
              hành trình luyện tập.
            </p>
          </div>

          {/* Cột 2: Danh mục */}
          <div className="col-md-4 mb-4">
            <h6 className="text-warning fw-semibold mb-3">Danh mục</h6>
            <ul className="list-unstyled small">
              {["Áo thể thao", "Quần thể thao", "Giày chạy bộ", "Phụ kiện gym"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-light text-decoration-none">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div className="col-md-4 mb-4">
            <h6 className="text-warning fw-semibold mb-3">Liên hệ</h6>
            <p className="small mb-1">Email: support@avelinesport.vn</p>
            <p className="small mb-1">Hotline: 0123 456 789</p>
            <p className="small mb-2">Địa chỉ: 123 FPT, Hà Nội</p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-2">
              <Link to="#" className="text-light text-decoration-none">Facebook</Link>
              <Link to="#" className="text-light text-decoration-none">Instagram</Link>
              <Link to="#" className="text-light text-decoration-none">TikTok</Link>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="text-center text-secondary small border-top pt-3 mt-3">
          © 2025 Aveline Sportwear. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
