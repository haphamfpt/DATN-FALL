import { FC } from "react";

/**
 * Footer
 * - Chứa thông tin contact + bản quyền
 */
const Footer: FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Cột 1: Giới thiệu */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">MaleFashion</h2>
          <p className="text-sm">
            Shop thời trang nam cao cấp, mang đến phong cách trẻ trung và hiện
            đại.
          </p>
        </div>

        {/* Cột 2: Menu */}
        <div>
          <h3 className="text-white font-semibold mb-4">Danh mục</h3>
          <ul className="space-y-2 text-sm">
            <li>Thời trang</li>
            <li>Phụ kiện</li>
            <li>Khuyến mãi</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        {/* Cột 3: Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
          <p>Email: support@malefashion.com</p>
          <p>Phone: +84 123 456 789</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        © 2025 MaleFashion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
