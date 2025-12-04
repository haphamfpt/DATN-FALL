import React from "react";
import { formatPrice } from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";
const CartSummary = ({ subtotal, shipping, total, totalItems }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded shadow-sm p-4" style={{ top: "100px" }}>
      <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Tạm tính ({totalItems} sản phẩm)</span>
        <strong className="text-dark">{formatPrice(subtotal)}</strong>
      </div>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Phí vận chuyển</span>
        <span>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fs-5 fw-bold">Tổng cộng</span>
        <span className="fs-4 fw-bold text-danger">{formatPrice(total)}</span>
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="btn btn-dark w-100 py-3 fw-bold text-uppercase mb-3"
      >
        Thanh toán ngay
      </button>

      <div className="text-center small text-muted">
        <i className="bi bi-shield-check me-2"></i>
        Mua sắm an toàn & bảo mật
      </div>
    </div>
  );
};

export default CartSummary;
