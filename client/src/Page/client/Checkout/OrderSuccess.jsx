import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext"; 
import toast, { Toaster } from "react-hot-toast"; 

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

const OrderSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const orderId = new URLSearchParams(search).get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { refreshCartCount } = useCart();

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    if (typeof refreshCartCount === "function") {
      refreshCartCount();
    }

    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Phiên đăng nhập đã hết hạn!");
          navigate("/login");
          return;
        }

        const res = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Không thể tải đơn hàng");
        }

        const data = await res.json();
        setOrder(data.order);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
        toast.error(error.message || "Không thể tải thông tin đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate, refreshCartCount]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 fw-bold">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h4 className="mb-4">Không tìm thấy đơn hàng</h4>
        <p className="text-muted mb-4">
          Có thể đơn hàng không tồn tại hoặc bạn chưa đăng nhập.
        </p>
        <Link to="/" className="btn btn-danger btn-lg px-5">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5 d-flex justify-content-center">
        <div
          className="card shadow-lg border-0 text-center p-5"
          style={{ maxWidth: "700px", width: "100%", borderRadius: "20px" }}
        >
          <div className="mb-4">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: "5.5rem" }}
            ></i>
          </div>

          <h2 className="fw-bold mb-3 text-success">Đặt hàng thành công!</h2>

          <p className="text-muted mb-4 fs-5">
            Cảm ơn bạn đã mua sắm tại <b>Aveline</b>.
          </p>

          <div className="bg-light rounded-4 p-4 mb-4 text-start">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Mã đơn hàng</span>
              <span className="fw-semibold">#{order._id.toUpperCase()}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Phương thức thanh toán</span>
              <span className="fw-semibold">
                {order.paymentMethod === "online"
                  ? "Thanh toán VNPay"
                  : "Thanh toán khi nhận hàng (COD)"}
              </span>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-muted">Tổng thanh toán</span>
              <span className="fw-bold text-danger fs-4">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>

          <p className="text-muted mb-4">
            Chúng tôi sẽ sớm xử lý và giao hàng đến bạn trong thời gian sớm nhất.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link
              to="/profile?tab=orders"
              className="btn btn-outline-dark btn-lg px-5 rounded-pill"
            >
              Xem chi tiết đơn hàng
            </Link>

            <Link
              to="/shop"
              className="btn btn-danger btn-lg px-5 rounded-pill"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;