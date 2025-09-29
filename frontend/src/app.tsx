import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import UserPage from "./pages/UserPage";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/register";
import Auth from "./pages/Auth/page";
function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
