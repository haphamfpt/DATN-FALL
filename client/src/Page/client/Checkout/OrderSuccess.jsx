import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total, paymentMethod } = location.state || {};

  return (
    <div className="container py-5 text-center" style={{ maxWidth: "800px" }}>
      <div className="mb-5">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
      </div>
      <h2 className="fw-bold mb-4">Đặt hàng thành công!</h2>
      <p className="lead text-muted mb-4">
        Cảm ơn bạn đã tin tưởng mua sắm tại Aveline.
        <br />
        Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
      </p>

      {orderId && (
        <p className="mb-4">
          Mã đơn hàng: <strong>{orderId}</strong>
        </p>
      )}

      <div className="bg-light rounded-3 p-4 mb-5">
        <p className="mb-2">Tổng tiền: <strong className="text-danger">{total?.toLocaleString("vi-VN")}₫</strong></p>
        <p>Phương thức thanh toán: <strong>{paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Online"}</strong></p>
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <Link to="/profile" className="btn btn-outline-dark btn-lg px-5">
          Xem đơn hàng
        </Link>
        <Link to="/shop" className="btn btn-danger btn-lg px-5">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;