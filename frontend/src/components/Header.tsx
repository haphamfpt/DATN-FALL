import { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Header: FC = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

<<<<<<< HEAD
                {/* Search + user/cart actions */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="hidden sm:block border rounded-md px-3 py-1 text-sm bg-gray-50"
                    />
                    <Link
                        to="auth/login"
                        className="px-3 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                        Login
                    </Link>
                    <Link
                        to="/cart"
                        className="px-3 py-1 bg-black text-white rounded text-sm"
                    >
                        Cart (0)
                    </Link>
                </div>
=======
  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MaleFashion
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/shop" className="hover:text-black">
            Shop
          </Link>
          <Link to="/blog" className="hover:text-black">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-black">
            Contact
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-4">
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
              <Link to="/login" className="hover:text-black">
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Xin chào, {user}</span>
              <button onClick={logout} className="text-red-600 hover:underline">
                Logout
              </button>
>>>>>>> 694bd7caf5b0245dbfa315571f43906ddf909e1b
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
