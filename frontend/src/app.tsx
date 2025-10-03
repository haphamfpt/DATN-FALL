import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< HEAD
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import UserPage from "./pages/UserPage";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/register";
import Auth from "./pages/Auth/page";
=======
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ShopDetail from "./pages/ShopDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

>>>>>>> 694bd7caf5b0245dbfa315571f43906ddf909e1b
function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user" element={<UserPage />} />
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
=======
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
>>>>>>> 694bd7caf5b0245dbfa315571f43906ddf909e1b
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
