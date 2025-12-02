import { Card, Badge } from "react-bootstrap";
import { ShoppingCart, Zap } from "react-feather";
import { Link } from "react-router-dom";
import "./ProductCard.css";
const ProductCard = ({ product }) => {
  const colors = product.variants
    ? Array.from(
        new Map(
          product.variants
            .filter((v) => v.color?.code)
            .map((v) => [v.color.code, v.color])
        ).values()
      )
    : [];

  return (
    <Card className="product-card h-100 border-0 shadow-lg rounded-4 overflow-hidden position-relative transition-all">
      {product.isNew && (
        <Badge className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill badge-new z-index-10">
          <Zap size={14} className="me-1" /> MỚI
        </Badge>
      )}

      {colors.length > 0 && (
        <div className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-center gap-2 pb-3 z-index-10">
          {colors.slice(0, 5).map((color, idx) => (
            <div
              key={idx}
              className="color-swatch"
              style={{
                backgroundColor: color.code,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "2px solid #fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              title={color.name}
            />
          ))}
          {colors.length > 5 && (
            <span className="text-white fw-bold small bg-dark px-2 py-1 rounded">
              +{colors.length - 5}
            </span>
          )}
        </div>
      )}

      <div className="position-relative overflow-hidden">
        <Link to={`/product/${product.slug}`} className="text-decoration-none">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="product-img"
            loading="lazy"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="product-img-overlay"></div>
        </Link>

        <div className="quick-add-btn">
          <Link to={`/product/${product.slug}`}>
            <button className="btn btn-light rounded-circle shadow-lg p-3">
              <ShoppingCart size={24} />
            </button>
          </Link>
        </div>
      </div>

      <Card.Body className="p-4 d-flex flex-column bg-white">
        <small className="text-muted text-uppercase tracking-wider mb-2">
          {product.category}
        </small>

        <Card.Title className="fw-bold fs-5 mb-2 text-dark line-clamp-2">
          <Link
            to={`/product/${product.slug}`}
            className="text-decoration-none text-dark hover-text-primary"
          >
            {product.name}
          </Link>
        </Card.Title>

        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 mb-2">
            {product.oldPrice && (
              <span className="text-muted text-decoration-line-through fs-6">
                {product.oldPrice}
              </span>
            )}
            <span className="text-danger fw-bold fs-4">{product.price}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
