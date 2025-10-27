import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import App from "./app";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            {/* ✅ Toaster hiển thị thông báo thêm giỏ, mua ngay, v.v. */}
            <Toaster position="top-right" reverseOrder={false} />
          </CartProvider>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
