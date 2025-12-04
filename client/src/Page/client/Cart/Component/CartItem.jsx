import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

const CartItem = ({ item }) => {
  return (
    <div
      className="p-4 border-bottom d-grid align-items-center"
      style={{
        gridTemplateColumns: "2fr 1fr 1.2fr 1fr 0.5fr",
        gap: "1rem",
      }}
    >
      <div className="d-flex gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="rounded"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
          }}
        />
        <div>
          <h6 className="fw-bold mb-1">{item.name}</h6>
          <div className="text-muted small">
            <span>Màu: {item.color}</span>
            <span className="mx-2">|</span>
            <span>Size: {item.size}</span>
          </div>

          {!item.inStock && (
            <span className="badge bg-danger mt-2">Hết hàng</span>
          )}
        </div>
      </div>

      <div className="text-center fw-bold text-danger">
        {formatPrice(item.price)}
      </div>

      <div className="d-flex justify-content-center">
        <div
          className="d-flex align-items-stretch border rounded overflow-hidden"
          style={{ width: "140px", height: "48px" }}
        >
          <button className="btn btn-outline-secondary border-0 rounded-0 flex-fill">
            <Minus size={18} strokeWidth={2.5} />
          </button>
          <div
            className="d-flex align-items-center justify-content-center bg-white fw-bold fs-5"
            style={{ minWidth: "50px" }}
          >
            {item.quantity}
          </div>
          <button className="btn btn-outline-secondary border-0 rounded-0 flex-fill">
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="text-end fw-bold">
        {formatPrice(item.price * item.quantity)}
      </div>

      <div className="text-center">
        <button className="btn btn-link text-muted p-0">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
