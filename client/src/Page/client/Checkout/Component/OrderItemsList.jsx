import React from "react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function OrderItemsList({ items }) {
  return (
    <div className="bg-white rounded-3 shadow-sm p-4 mt-4">
      <h5 className="fw-bold mb-4">Sản phẩm trong đơn hàng</h5>

      {items.map((item) => (
        <div key={item.id} className="d-flex gap-3 py-3 border-bottom last:border-0">
          <img
            src={item.image}
            alt={item.name}
            className="rounded object-cover"
            style={{ width: "80px", height: "80px" }}
          />
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-1">{item.name}</h6>
            <div className="text-muted small mb-2">
              <span className="me-3">Màu: <strong>{item.color}</strong></span>
              <span>Size: <strong>{item.size}</strong></span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-danger fw-bold">{formatPrice(item.price)}</span>
              <span className="text-muted">× {item.quantity}</span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}