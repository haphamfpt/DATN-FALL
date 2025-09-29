import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateAdmin = () => {
  const admin = JSON.parse(localStorage.getItem("user") as string)?.role;
  if (admin == "admin") {
    return <Outlet />;
  } else {
    toast.warning("Bạn không có quyền truy cập");
    return <Navigate to="/" />;
  }
};

export default PrivateAdmin;
