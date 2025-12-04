import React from "react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function PriceRangeFilter({ value, onChange }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-3">Khoảng giá</h6>
      <div className="px-2">
        <input
          type="range"
          className="form-range"
          min="0"
          max="1500000"
          step="50000"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="d-flex justify-content-between small text-muted">
          <span>0đ</span>
          <span>{formatPrice(value)}</span>
        </div>
      </div>
    </div>
  );
}