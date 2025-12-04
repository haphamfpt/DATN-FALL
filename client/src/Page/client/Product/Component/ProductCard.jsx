import React from "react";
import { Star, Heart } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function ProductCard({ product }) {
  return (
    <div className="col-6 col-md-4 col-lg-4 mb-4">
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100 hover-shadow transition-all">
        <div className="position-relative">
          <img
            src="https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg"
            className="card-img-top"
            alt={product.name}
            style={{ height: "280px", objectFit: "cover" }}
          />
          {product.sale && (
            <span className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 small fw-bold">
              SALE
            </span>
          )}
          <button className="position-absolute top-0 end-0 btn btn-link p-2">
            <Heart size={22} className="text-muted" />
          </button>
        </div>

        <div className="card-body p-3">
          <h6 className="fw-bold mb-2 line-clamp-2">{product.name}</h6>

          <div className="d-flex align-items-center gap-1 mb-2">
            <Star size={16} className="text-warning fill-warning" />
            <span className="small fw-bold">{product.rating}</span>
            <span className="text-muted small">({product.reviews})</span>
          </div>

          <div className="mb-2">
            <small className="text-muted">Màu: </small>
            {product.colors.map((c, i) => (
              <span key={i} className="badge bg-light text-dark border me-1">{c}</span>
            ))}
          </div>

          <div className="mb-3">
            <small className="text-muted">Size: </small>
            {product.sizes.map((s, i) => (
              <span key={i} className="badge bg-secondary text-white me-1">{s}</span>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="fs-5 fw-bold text-danger">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <del className="text-muted small">{formatPrice(product.oldPrice)}</del>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}