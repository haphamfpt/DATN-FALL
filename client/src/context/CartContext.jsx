import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCartCount(data.count || 0);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.error("Lỗi lấy số lượng giỏ hàng:", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const refreshCartCount = () => {
    fetchCartCount();
  };

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};