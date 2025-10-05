import { FC } from "react";

/**
 * Footer - Sportwear Theme
 * - Chứa thông tin contact, liên kết nhanh và bản quyền
 */
const Footer: FC = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* 🔹 Cột 1: Giới thiệu */}
        <div>
          <h2 className="text-yellow-500 text-xl font-bold mb-4">
            Aveline Shop
          </h2>
          <p className="text-sm leading-relaxed">
            Cửa hàng thời trang thể thao chính hãng – mang đến phong cách năng
            động, khỏe khoắn và đậm chất cá tính. Đồng hành cùng bạn trên mọi
            hành trình luyện tập.
          </p>
        </div>

        {/* 🔹 Cột 2: Danh mục nhanh */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-4">Danh mục</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">
              Áo thể thao
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Quần thể thao
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Giày chạy bộ
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Phụ kiện gym
            </li>
          </ul>
        </div>

        {/* 🔹 Cột 3: Liên hệ */}
        <div>
          <h3 className="text-yellow-500 font-semibold mb-4">Liên hệ</h3>
          <p className="text-sm">Email: support@avelinesport.vn</p>
          <p className="text-sm">Hotline: 0123 456 789</p>
          <p className="text-sm">Địa chỉ: 123 Nguyễn Văn Cừ, Hà Nội</p>
          <div className="flex space-x-4 mt-3">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-400 transition"
            >
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Bản quyền */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
        © 2025 Aveline Sportwear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
