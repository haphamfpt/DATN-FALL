import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function ProductCard({ product }) {
  const hasSale = product.variants.some((v) => v.sale_price < v.import_price);

  return (
    <Link to={`/product/${product.slug}`} className="text-decoration-none text-dark">
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100 hover-shadow transition-all">
        <div className="position-relative">
          <img
            src={product.images[0]?.url || "/placeholder.jpg"}
            className="card-img-top"
            alt={product.name}
            style={{ height: "280px", objectFit: "cover" }}
          />
          {hasSale && (
            <span className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 small fw-bold">
              SALE
            </span>
          )}
          <button className="position-absolute top-0 end-0 btn btn-link p-2" onClick={(e) => e.preventDefault()}>
            <Heart size={22} className="text-muted" />
          </button>
        </div>

        <div className="card-body p-3">
          <h6 className="fw-bold mb-2 line-clamp-2">{product.name}</h6>

          <div className="d-flex align-items-center gap-1 mb-2">
            <Star size={16} className="text-warning fill-warning" />
            <span className="small fw-bold">4.8</span>
            <span className="text-muted small">(128)</span>
          </div>

          {/* Hiển thị số lượng màu & size */}
          <small className="text-muted d-block mb-2">
            {product.total_variants} biến thể • Từ {formatPrice(product.min_price)}
          </small>

          <div className="d-flex align-items-center gap-2">
            <span className="fs-5 fw-bold text-danger">
              {formatPrice(product.min_price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}