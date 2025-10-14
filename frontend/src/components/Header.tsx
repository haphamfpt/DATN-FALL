import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 h-16">
        {/* 🔹 Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wide"
        >
          Aveline<span className="text-yellow-500">Sport</span>
        </Link>

        {/* 🔹 Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-yellow-500 transition-all duration-200 font-medium"
          >
            Trang chủ
          </Link>
          <Link
            to="/shop"
            className="text-gray-700 hover:text-yellow-500 transition-all duration-200 font-medium"
          >
            Sản phẩm
          </Link>
          <Link
            to="/blog"
            className="text-gray-700 hover:text-yellow-500 transition-all duration-200 font-medium"
          >
            Tin tức
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-yellow-500 transition-all duration-200 font-medium"
          >
            Giới thiệu
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-yellow-500 transition-all duration-200 font-medium"
          >
            Liên hệ
          </Link>
        </nav>

        {/* 🔹 Icons */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-700 hover:text-yellow-500 transition">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-2 bg-yellow-500 text-xs text-black font-bold rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>
          <button className="text-gray-700 hover:text-yellow-500 transition">
            <User size={22} />
          </button>

          {/* 🔹 Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-yellow-500 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <nav className="flex flex-col text-center py-3">
            {[
              { label: "Trang chủ", path: "/" },
              { label: "Sản phẩm", path: "/shop" },
              { label: "Tin tức", path: "/blog" },
              { label: "Giới thiệu", path: "/about" },
              { label: "Liên hệ", path: "/contact" },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="py-2 text-gray-700 hover:text-yellow-500 transition font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
