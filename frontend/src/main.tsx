import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
<<<<<<< HEAD
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
=======

import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
>>>>>>> 81e228bdd2660120b60290be3d72c596885eeb00

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <AuthProvider>
<<<<<<< HEAD
=======
          {/* ✅ phải bọc App trong CartProvider */}
>>>>>>> 81e228bdd2660120b60290be3d72c596885eeb00
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
