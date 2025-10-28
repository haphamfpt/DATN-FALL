import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// 📦 Trang người dùng
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
import OrderSuccess from "./pages/OrderSuccess";
import ProfileUser from "./pages/ProfileUser/Page";
import UserAccount from "./pages/ProfileUser/profile/UserAccount";
import BlogDetail from "./pages/BlogDetail";
import OrdersHistory from "./pages/OrdersHistory";

// ⚙️ Trang quản trị
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Attributes from "./pages/admin/Attributes";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Revenue from "./pages/admin/Revenue";
import Blogs from "./pages/admin/Blogs";
import Comments from "./pages/admin/Comments";

function App() {
  const isLoggedIn = () => !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* ✅ Header và Footer chỉ xuất hiện cho trang user */}
        <Header />
        <ScrollToTop />

        <main className="flex-1 pt-20">
          <Routes>
            {/* === 👤 PHẦN NGƯỜI DÙNG (CLIENT) === */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/category/:category" element={<Shop />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrdersHistory />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<UserPage />} />

            {/* 🔐 Auth routes */}
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

            {/* 👤 Hồ sơ người dùng */}
            <Route path="/account" element={<ProfileUser />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<UserAccount />} />
            </Route>

            {/* === 🧭 PHẦN QUẢN TRỊ (ADMIN) === */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="attributes" element={<Attributes />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="comments" element={<Comments />} />
            </Route>

            {/* ❌ Nếu URL không hợp lệ → quay về Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
