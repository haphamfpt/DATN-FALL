import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ShopDetail from "./pages/ShopDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProfileUser from "./pages/ProfileUser/Page";
import UserAccount from "./pages/ProfileUser/profile/UserAccount";

function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          {/* ProfileUser */}
          <Route path="/account" element={<ProfileUser />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<UserAccount />} />
          </Route>
        </Routes>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
