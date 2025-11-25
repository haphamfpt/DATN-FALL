import { Card, Button, Badge } from "react-bootstrap";
import { ShoppingCart, Zap } from "react-feather";
import { Link } from "react-router-dom";
import "./ProductCard.css"
const ProductCard = ({ product }) => {
  return (
    <Card className="product-card h-100 border-0 shadow-lg rounded-4 overflow-hidden position-relative transition-all">
      {product.isNew && (
        <Badge className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill badge-new">
          <Zap size={14} /> MỚI
        </Badge>
      )}
      {product.sale && (
        <Badge className="position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill badge-sale">
          -{product.sale}%
        </Badge>
      )}

      <div className="position-relative overflow-hidden">
        <Link to={`/product/${product.slug || product.id}`} className="text-decoration-none">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
          <div className="product-img-overlay"></div>
        </Link>

        <div className="quick-add-btn">
          <Button variant="light" size="lg" className="rounded-circle shadow-lg p-3">
            <ShoppingCart size={24} />
          </Button>
        </div>
      </div>

      <Card.Body className="p-4 d-flex flex-column bg-white">
        {product.category && (
          <small className="text-muted text-uppercase tracking-wider mb-2">
            {product.category}
          </small>
        )}

        <Card.Title className="fw-bold fs-5 mb-2 text-dark line-clamp-2">
          <Link
            to={`/product/${product.slug || product.id}`}
            className="text-decoration-none text-dark hover-text-primary"
          >
            {product.name}
          </Link>
        </Card.Title>

        {product.rating && (
          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-warning ${i < Math.floor(product.rating) ? "fas" : "far"} fa-star`}
                style={{ fontSize: "0.9rem" }}
              >
                ★
              </span>
            ))}
            <small className="text-muted ms-2">({product.reviews || 0})</small>
          </div>
        )}

        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 mb-3">
            {product.oldPrice && (
              <span className="text-muted text-decoration-line-through fs-6">
                {product.oldPrice}
              </span>
            )}
            <span className="text-danger fw-bold fs-4">
              {product.price}
            </span>
          </div>

        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;