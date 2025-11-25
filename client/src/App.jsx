import { Routes, Route } from "react-router-dom";

import Layout from "./Page/client/Layout";
import LayoutAdmin from "./Page/admin/Layout.jsx";

import Home from "./Page/client/Home/Home.jsx";
import BlogList from "./Page/client/Blog/BlogList/BlogList.jsx";
import ContactForm from "./Page/client/Contact/ContactForm.jsx";

import AuthPage from "./Page/auth/AuthPage";
import AdminWelcome from "./Page/admin/Welcome/AdminWelcome.jsx";
import NotFound from "./Page/NotFound.jsx";
import CategoryManagement from "./Page/admin/Category/CategoryManagement.jsx";
import BannerManagement from "./Page/admin/Banner/BannerManagement.jsx";
import VoucherManagement from "./Page/admin/Voucher/VoucherManagement.jsx";
import BlogManagement from "./Page/admin/Blog/BlogManagement.jsx";
import BlogDetail from "./Page/client/Blog/BlogDetail/BlogDetail.jsx";
import ContactManagement from "./Page/admin/Contact/ContactManagement.jsx";
import VariantAttributesManagement from "./Page/admin/Variant/VariantAttributesManagement.jsx";
import ProductManagement from "./Page/admin/Product/ProductManagement.jsx";
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogList/>}></Route>
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={ <ContactForm/> }></Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminWelcome/>}></Route>
          <Route path="categories" element={<CategoryManagement />}></Route>
          <Route path="banners" element={<BannerManagement />}></Route>
          <Route path="vouchers" element={<VoucherManagement/>}></Route>
          <Route path="blogs" element={<BlogManagement/>}></Route>
          <Route path="contacts" element={<ContactManagement/>}></Route>
          <Route path="variants" element={<VariantAttributesManagement/>}></Route>
          <Route path="products" element={<ProductManagement/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;