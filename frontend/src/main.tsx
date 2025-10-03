import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./index.css";
<<<<<<< HEAD
import { MantineProvider } from "@mantine/core";
=======
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
>>>>>>> 694bd7caf5b0245dbfa315571f43906ddf909e1b

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <MantineProvider>
        <App />
      </MantineProvider>
=======
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
>>>>>>> 694bd7caf5b0245dbfa315571f43906ddf909e1b
    </BrowserRouter>
  </React.StrictMode>
);
