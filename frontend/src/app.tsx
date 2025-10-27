import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import UserPage from "./pages/UserPage";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/register";
import Auth from "./pages/Auth/page";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ShopDetail from "./pages/ShopDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess"; // ✅ Thêm dòng này

import ProfileUser from "./pages/ProfileUser/Page";
import UserAccount from "./pages/ProfileUser/profile/UserAccount";
import BlogDetail from "./pages/BlogDetail";
import OrdersHistory from "./pages/OrdersHistory";

function App() {
  const isLoggedIn = () => !!localStorage.getItem("token");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop />
      <main className="flex-1 pt-20">
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:category" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          {/* 🛒 Giỏ hàng & Thanh toán */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />{" "}
          <Route path="/orders" element={<OrdersHistory />} />
          {/* ✅ Thêm route này */}
          {/* Blog & Liên hệ */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Người dùng */}
          <Route path="/user" element={<UserPage />} />
          {/* Auth routes */}
          <Route path="/auth" element={<Auth />}>
            <Route
              index
              element={
                isLoggedIn() ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="login" replace />
                )
              }
            />
            <Route
              path="login"
              element={isLoggedIn() ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="register"
              element={
                isLoggedIn() ? <Navigate to="/" replace /> : <Register />
              }
            />
          </Route>
          {/* Hồ sơ người dùng */}
          <Route path="/account" element={<ProfileUser />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<UserAccount />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
