import React, { useState } from "react";
import { CreditCard, Package, Check } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price
  );

export default function OrderSummary({
  subtotal,
  shipping,
  total,
  totalItems,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div
      className="bg-white rounded-3 shadow-sm p-4"
      style={{ top: "100px" }}
    >
      <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Tạm tính ({totalItems} sản phẩm)</span>
        <span>{formatPrice(subtotal)}</span>
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

      <div className="mb-4">
        <h5 className="fw-bold mb-3">Phương thức thanh toán</h5>

        <label
          className={`d-block border rounded-3 p-3 mb-3 cursor-pointer transition-all
            ${
              paymentMethod === "cod"
                ? "border-danger bg-danger-subtle shadow-sm"
                : "border-light hover:border-gray-300"
            }`}
          onClick={() => setPaymentMethod("cod")}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0">
              <Package
                size={28}
                className={
                  paymentMethod === "cod" ? "text-danger" : "text-muted"
                }
              />
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold">Thanh toán khi nhận hàng (COD)</div>
              <small className="text-muted">
                Nhận hàng rồi mới thanh toán tiền
              </small>
            </div>
            {paymentMethod === "cod" && (
              <Check size={24} className="text-danger" />
            )}
          </div>
        </label>

        <label
          className={`d-block border rounded-3 p-3 cursor-pointer transition-all
            ${
              paymentMethod === "online"
                ? "border-danger bg-danger-subtle shadow-sm"
                : "border-light hover:border-gray-300"
            }`}
          onClick={() => setPaymentMethod("online")}
        >
          <div className="d-flex align-items-center gap-3">
            <div className="flex-shrink-0">
              <CreditCard
                size={28}
                className={
                  paymentMethod === "online" ? "text-danger" : "text-muted"
                }
              />
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold">Thanh toán Online</div>
              <small className="text-muted">
                {paymentMethod === "online"
                  ? "Visa, MasterCard, Momo, ZaloPay, Banking..."
                  : "Thanh toán ngay qua cổng thanh toán an toàn"}
              </small>
            </div>
            {paymentMethod === "online" && (
              <Check size={24} className="text-danger" />
            )}
          </div>
        </label>
      </div>

      <button className="btn btn-danger w-100 py-3 fw-bold text-uppercase mb-3">
        {paymentMethod === "cod"
          ? "Đặt hàng & thanh toán khi nhận"
          : "Thanh toán ngay"}
      </button>

      <div className="text-center small text-muted mb-3">
        Thanh toán an toàn • Miễn phí đổi trả 30 ngày
      </div>

      <div className="pt-4 border-top text-success small">
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-truck fs-4"></i>
          <div>
            <div className="fw-bold">Giao hàng nhanh</div>
            <div>Nội thành 1-2 ngày • Ngoại tỉnh 3-5 ngày</div>
          </div>
        </div>
      </div>
    </div>
  );
}
