import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./pages/admin/LayoutAdmin.tsx";
import LayoutUser from "./pages/user/LayoutUser.tsx";
import CategorysAdmin from "./pages/admin/CategorysAdmin.tsx";
import ProductsAdmin from "./pages/admin/ProductsAdmin.tsx";
import CategorysProvider from "./context/CategoryContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthForm from "./pages/user/AuthForm.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProductProvider from "./context/ProductContext.tsx";
import HomePage from "./components/User/HomePage.tsx";
import BlogsAdmin from "./pages/admin/BlogsAdmin.tsx";
import BlogProvider from "./context/BlogContext.tsx";
import UpdateBlogAdmin from "./pages/admin/UpdateBlogAdmin.tsx";
import UsersAdmin from "./pages/admin/UsersAdmin.tsx";
import VouchersAdmin from "./pages/admin/VouchersAdmin.tsx";
import BlogPage from "./components/User/BlogPage.tsx";
import DetailProduct from "./components/User/DetailProduct.tsx";
import ProductList from "./components/User/ProductListPage.tsx";
import ScrollToTop from "./utils/ScrollTop.tsx";
import NewsPage from "./components/User/NewsPage.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import Order from "./components/Cart/Order.tsx";
import OrdersAdmin from "./pages/admin/OrdersAdmin.tsx";
import ContactUs from "./components/User/ContactUs.tsx";
import DetailOrders from "./components/User/DetailOrder.tsx";
import PrivateAdmin from "./middlewares/PrivateAdmin.tsx";
import DetailOrder from "./pages/admin/DetailOrder.tsx";
import DashboardAdmin from "./pages/admin/DashboardAdmin.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <ProductProvider>
                        <CategorysProvider>
                            <BlogProvider>
                                <ScrollToTop />
                                <Routes>
                                    <Route path="" element={<App />}>
                                        {/* User */}
                                        <Route element={<LayoutUser />}>
                                            <Route
                                                index
                                                element={<HomePage />}
                                            />
                                            <Route
                                                path="order"
                                                element={<Order />}
                                            />
                                            <Route
                                                path="news/:slug"
                                                element={<NewsPage />}
                                            />
                                            <Route
                                                path="news"
                                                element={<BlogPage />}
                                            />
                                            <Route
                                                path="detail/:slug"
                                                element={<DetailProduct />}
                                            />
                                            <Route
                                                path="products"
                                                element={<ProductList />}
                                            />
                                            <Route
                                                path="contact"
                                                element={<ContactUs />}
                                            />
                                            <Route
                                                path="products/:slug"
                                                element={<ProductList />}
                                            />
                                            <Route
                                                path="detailOrder"
                                                element={<DetailOrders />}
                                            />
                                            <Route
                                                path="register"
                                                element={<AuthForm />}
                                            />
                                            <Route
                                                path="login"
                                                element={<AuthForm isLogin />}
                                            />
                                        </Route>
                                        {/* Admin */}
                                        <Route
                                            path="/admin"
                                            element={<PrivateAdmin />}
                                        >
                                            <Route
                                                path="/admin"
                                                element={<LayoutAdmin />}
                                            >
                                                <Route
                                                    index
                                                    element={<DashboardAdmin />}
                                                />
                                                <Route
                                                    path="categorys"
                                                    element={<CategorysAdmin />}
                                                />
                                                <Route
                                                    path="products"
                                                    element={<ProductsAdmin />}
                                                />
                                                <Route
                                                    path="orders"
                                                    element={<OrdersAdmin />}
                                                />
                                                <Route
                                                    path="orders/detail/:_id"
                                                    element={<DetailOrder />}
                                                />
                                                <Route
                                                    path="users"
                                                    element={<UsersAdmin />}
                                                />
                                                <Route
                                                    path="blogs"
                                                    element={<BlogsAdmin />}
                                                />
                                                <Route
                                                    path="blogs/:_id"
                                                    element={
                                                        <UpdateBlogAdmin />
                                                    }
                                                />
                                                <Route
                                                    path="vouchers"
                                                    element={<VouchersAdmin />}
                                                />
                                            </Route>
                                        </Route>
                                    </Route>
                                </Routes>
                            </BlogProvider>
                        </CategorysProvider>
                    </ProductProvider>
                </CartProvider>
            </AuthProvider>
            <ToastContainer autoClose={3000} newestOnTop />
        </BrowserRouter>
    </React.StrictMode>,
);
