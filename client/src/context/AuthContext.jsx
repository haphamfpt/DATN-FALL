import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          if (window.location.pathname.startsWith("/admin") && parsedUser.role !== "admin") {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Lỗi khôi phục đăng nhập:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);