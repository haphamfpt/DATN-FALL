import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Không thể tải đơn hàng");

        const data = await res.json();
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" />
        <p className="mt-3">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h4>Không tìm thấy đơn hàng</h4>
        <Link to="/" className="btn btn-danger mt-3">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
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

        <h2 className="fw-bold mb-3 text-success">
          Đặt hàng thành công!
        </h2>

        <p className="text-muted mb-4 fs-5">
          Cảm ơn bạn đã mua sắm tại <b>Aveline</b>.
        </p>

        <div className="bg-light rounded-4 p-4 mb-4 text-start">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Mã đơn hàng</span>
            <span className="fw-semibold">#{order._id}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Phương thức thanh toán</span>
            <span className="fw-semibold">
              {order.paymentMethod === "online"
                ? "Thanh toán VNPay"
                : "Thanh toán khi nhận hàng"}
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span className="text-muted">Tổng thanh toán</span>
            <span className="fw-bold text-danger fs-5">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link
            to="/profile"
            className="btn btn-outline-dark btn-lg px-5 rounded-pill"
          >
            Xem đơn hàng
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
  );
};

export default OrderSuccess;
