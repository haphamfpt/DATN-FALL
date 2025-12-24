import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [updating, setUpdating] = useState(false);

  const handleDecrease = async () => {
    if (item.quantity <= 1 || updating) return;
    setUpdating(true);
    await onUpdateQuantity(item.variantId, item.quantity - 1);
    setUpdating(false);
  };

  const handleIncrease = async () => {
    if (item.quantity >= item.maxStock || updating) return;
    setUpdating(true);
    await onUpdateQuantity(item.variantId, item.quantity + 1);
    setUpdating(false);
  };

  const handleRemove = async () => {
    if (updating) return;
    setUpdating(true);
    await onRemove(item.variantId);
    setUpdating(false);
  };

  return (
    <>
      {updating && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-90"
          style={{ zIndex: 9999 }}
        >
          <div className="spinner-border text-danger mb-4" style={{ width: "4rem", height: "4rem" }} role="status">
            <span className="visually-hidden">Đang xử lý...</span>
          </div>
          <h4 className="fw-bold text-danger">Đang cập nhật giỏ hàng...</h4>
          <p className="text-muted">Vui lòng chờ một chút</p>
        </div>
      )}

      <div
        className="p-4 border-bottom d-grid align-items-center"
        style={{
          gridTemplateColumns: "2fr 1fr 1.2fr 1fr 0.5fr",
          gap: "1rem",
          pointerEvents: updating ? "none" : "auto", 
          opacity: updating ? 0.6 : 1,
        }}
      >
        <div className="d-flex gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="rounded"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
          <div>
            <h6 className="fw-bold mb-1">{item.name}</h6>
            <div className="text-muted small">
              <span>Màu: {item.color}</span>
              <span className="mx-2">|</span>
              <span>Size: {item.size}</span>
            </div>

            {!item.inStock && <span className="badge bg-danger mt-2 d-block">Hết hàng</span>}
            {item.quantity >= item.maxStock && item.inStock && (
              <small className="text-danger d-block mt-1">Đã đạt tối đa trong kho</small>
            )}
          </div>
        </div>

        <div className="text-center fw-bold text-danger">{formatPrice(item.price)}</div>

        <div className="d-flex justify-content-center">
          <div
            className="d-flex align-items-stretch border rounded overflow-hidden"
            style={{ width: "140px", height: "48px" }}
          >
            <button
              className="btn btn-outline-secondary border-0 rounded-0 flex-fill"
              onClick={handleDecrease}
              disabled={updating || item.quantity <= 1}
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>
            <div
              className="d-flex align-items-center justify-content-center bg-white fw-bold fs-5"
              style={{ minWidth: "50px" }}
            >
              {item.quantity}
            </div>
            <button
              className="btn btn-outline-secondary border-0 rounded-0 flex-fill"
              onClick={handleIncrease}
              disabled={updating || item.quantity >= item.maxStock}
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="text-end fw-bold">{formatPrice(item.price * item.quantity)}</div>

        <div className="text-center">
          <button
            className="btn btn-link text-muted p-0"
            onClick={handleRemove}
            disabled={updating}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;