import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ProfileSidebar from "./Component/ProfileSidebar.jsx";
import ProfileInfo from "./Component/ProfileInfo.jsx";
import ProfileOrders from "./Component/ProfileOrders.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser) {
        toast.error("Vui lòng đăng nhập để xem thông tin cá nhân!");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      setUser(storedUser);
      setLoading(false);
    };

    loadUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 fw-bold">Đang tải thông tin cá nhân...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        <h2 className="fw-bold mb-5 text-center text-dark">Tài khoản của tôi</h2>

        <div className="row">
          <div className="col-lg-3 mb-4 mb-lg-0">
            <ProfileSidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="col-lg-9">
            <div className="bg-white rounded-3 shadow-sm p-4 p-md-5">
              {activeTab === "info" && <ProfileInfo user={user} setUser={setUser} />}
              {activeTab === "orders" && <ProfileOrders />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;