import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< HEAD
=======
import ScrollToTop from "./components/ScrollToTop";
>>>>>>> 81e228bdd2660120b60290be3d72c596885eeb00

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

<<<<<<< HEAD
import ProfileUser from "./pages/ProfileUser/Page";
import UserAccount from "./pages/ProfileUser/profile/UserAccount";
function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
=======
function App() {
  const isLoggedIn = () => !!localStorage.getItem("token");
>>>>>>> 81e228bdd2660120b60290be3d72c596885eeb00

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop />
      <main className="flex-1 pt-20">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<UserPage />} />

=======
          {/* Trang chính */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/category/:category" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          {/* 🛒 Giỏ hàng & Thanh toán */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />{" "}
          {/* ✅ Thêm route này */}
          {/* Blog & Liên hệ */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Người dùng */}
          <Route path="/user" element={<UserPage />} />
>>>>>>> 81e228bdd2660120b60290be3d72c596885eeb00
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
<<<<<<< HEAD
          {/* ProfileUser */}
=======
          {/* Hồ sơ người dùng */}
>>>>>>> 81e228bdd2660120b60290be3d72c596885eeb00
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
