import { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Header: FC = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Aveline Shop
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link to="/" className="hover:text-black">
            Trang chủ
          </Link>
          <Link to="/shop" className="hover:text-black">
            Sản Phẩm
          </Link>
          <Link to="/blog" className="hover:text-black">
            Bài viết
          </Link>
          <Link to="/contact" className="hover:text-black">
            Liên hệ
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden sm:block border rounded-md px-3 py-1 text-sm bg-gray-50"
          />

          {/* Cart */}
          <Link to="/cart" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!user ? (
            <>
              <Link to="/auth/login" className="hover:text-black">
                Đăng nhập
              </Link>
              <Link
                to="/auth/register"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Chào bạn đến với Aveline Shop{user}</span>
              <button onClick={logout} className="text-red-600 hover:underline">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
