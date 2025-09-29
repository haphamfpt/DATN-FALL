import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  user: IUser | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
  updateProfile: (user: IUser) => void;
  isAdmin: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  // const { dispatch } = useCart();
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") as string) || "";
      setUser(user);
    }
  }, []);

  const login = (token: string, user: IUser) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.role == "admin" ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = (user: IUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
