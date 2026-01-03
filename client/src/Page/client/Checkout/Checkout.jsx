import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DeliveryInfoForm from "./Component/DeliveryInfoForm.jsx";
import OrderItemsList from "./Component/OrderItemsList.jsx";
import OrderSummary from "./Component/OrderSummary.jsx";

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    provinceName: "",
    districtName: "",
    wardName: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Vui lòng đăng nhập để thanh toán!");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Không thể tải giỏ hàng");
        }

        const data = await res.json();
        setCart(data);
      } catch (err) {
        toast.error(err.message);
        if (err.message.toLowerCase().includes("token")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => navigate("/login"), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const cartItems = cart?.data?.items || [];
  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal >= 800000 ? 0 : 30000;
  const total = subtotal + shipping;
  const totalItems = cart?.count || 0;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 fw-bold">Đang chuẩn bị đơn hàng...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <Toaster position="top-center" />
        <h3 className="mb-4 fw-bold">Giỏ hàng trống</h3>
        <p className="text-muted mb-4">Bạn chưa có sản phẩm nào để thanh toán.</p>
        <a href="/shop" className="btn btn-danger btn-lg px-5">
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        <h2 className="fw-bold mb-5 text-center text-dark">Thanh toán đơn hàng</h2>

        <div className="row g-5">
          <div className="col-lg-8">
            <DeliveryInfoForm formData={formData} onChange={handleChange} />

            <OrderItemsList
              items={cartItems.map((cartItem) => ({
                id: cartItem._id,
                name: cartItem.variant?.product?.name || "Sản phẩm",
                color: cartItem.variant?.color?.attribute_color_name || "N/A",
                size: cartItem.variant?.size?.attribute_size_name || "N/A",
                price: cartItem.variant?.sale_price || 0,
                quantity: cartItem.quantity,
                image: cartItem.variant?.product?.images?.[0]?.url || "/placeholder.jpg",
              }))}
            />
          </div>

          <div className="col-lg-4">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              totalItems={totalItems}
              formData={formData}
              cart={cart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;