import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./Page/client/Layout";
import LayoutAdmin from "./Page/admin/Layout.jsx";

// Client Pages
import Home from "./Page/client/Home/Home.jsx";
import BlogList from "./Page/client/Blog/BlogList/BlogList.jsx";
import BlogDetail from "./Page/client/Blog/BlogDetail/BlogDetail.jsx";
import ContactForm from "./Page/client/Contact/ContactForm.jsx";
import Voucher from "./Page/client/Voucher/Voucher.jsx";
import ProductDetail from "./Page/client/ProductDetail/ProductDetail.jsx";
import Cart from "./Page/client/Cart/Cart.jsx";
import Checkout from "./Page/client/Checkout/Checkout.jsx";
import Product from "./Page/client/Product/Product.jsx";
import Profile from "./Page/client/Profile/Profile.jsx";
import OrderSuccess from "./Page/client/Checkout/OrderSuccess.jsx";
import OrderDetail from "./Page/client/OrderDetail/OrderDetail.jsx";

// Auth
import AuthPage from "./Page/auth/AuthPage";

// Admin Protected Route
import AdminRoute from "./component/admin/AdminRoute.jsx";

// Admin Pages
import AdminWelcome from "./Page/admin/Welcome/AdminWelcome.jsx";
import CategoryManagement from "./Page/admin/Category/CategoryManagement.jsx";
import BannerManagement from "./Page/admin/Banner/BannerManagement.jsx";
import VoucherManagement from "./Page/admin/Voucher/VoucherManagement.jsx";
import BlogManagement from "./Page/admin/Blog/BlogManagement.jsx";
import ContactManagement from "./Page/admin/Contact/ContactManagement.jsx";
import VariantAttributesManagement from "./Page/admin/Variant/VariantAttributesManagement.jsx";
import ProductManagement from "./Page/admin/Product/ProductManagement.jsx";
import OrderManagement from "./Page/admin/Order/OrderManagement.jsx";
import UserManagement from "./Page/admin/User/UserManagement.jsx";

// 404
import NotFound from "./Page/NotFound.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* ==================== CLIENT ROUTES ==================== */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Product />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="voucher" element={<Voucher />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ==================== AUTH ROUTES ==================== */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* ==================== ADMIN ROUTES (PROTECTED) ==================== */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<AdminWelcome />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="banners" element={<BannerManagement />} />
            <Route path="vouchers" element={<VoucherManagement />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="contacts" element={<ContactManagement />} />
            <Route path="variants" element={<VariantAttributesManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="order" element={<OrderManagement />} />
            <Route path="customers" element={<UserManagement/>}></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;