import React from "react";
import { Trash, PlusLg, Save, X } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import api from "../../../../utils/axiosInstance";

const ProductVariantsTable = ({
  productId,
  variants = [],
  editingPrice,
  priceInput,
  onStartEditPrice,
  onUpdatePrice,
  onCancelEditPrice,
  onDeleteVariant,
  onAddVariant, 
}) => {
  const handleUpdatePrice = async (variantId) => {
    const newPrice = priceInput[variantId];
    const price = Number(newPrice);
    if (isNaN(price) || price < 0) {
      toast.error("Giá không hợp lệ");
      return;
    }

    try {
      await api.put(`/variants/admin/${variantId}/price`, {
        sale_price: price,
      });
      toast.success("Cập nhật giá thành công!");
      onUpdatePrice(variantId);
    } catch {
      toast.error("Cập nhật giá thất bại");
    }
  };

  const handleDelete = (variantId) => {
    if (!window.confirm("Xóa biến thể này?")) return;
    onDeleteVariant(productId, variantId);
  };

  if (!variants || variants.length === 0) {
    return (
      <div className="text-muted text-center py-4">
        Chưa có biến thể nào
        <div className="mt-3">
          <button className="btn btn-success btn-sm" onClick={onAddVariant}>
            <PlusLg className="me-1" /> Thêm biến thể đầu tiên
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Quản lý biến thể</h6>
        <button className="btn btn-success btn-sm" onClick={onAddVariant}>
          <PlusLg /> Thêm biến thể
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered mb-0">
          <thead className="table-secondary">
            <tr>
              <th className="text-center">Màu</th>
              <th className="text-center">Kích thước</th>
              <th className="text-center">Giá gốc</th>
              <th className="text-center">Giá bán</th>
              <th className="text-center">Tồn kho</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v._id}>
                <td className="text-center">
                  {v.color ? (
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div
                        className="border rounded-circle"
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: v.color.code || "#ccc",
                          border: "2px solid #eee",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                        title={v.color.name}
                      />
                      <span className="fw-medium">{v.color.name}</span>
                    </div>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>

                <td className="text-center fw-bold">
                  {v.size?.name || "—"}
                </td>

                <td className="text-center text-secondary">
                  {v.import_price > 0
                    ? `${v.import_price.toLocaleString()}đ`
                    : "—"}
                </td>

                <td className="text-center">
                  {editingPrice[v._id] ? (
                    <div className="d-flex gap-1 justify-content-center align-items-center">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        style={{ width: 110 }}
                        value={priceInput[v._id] || ""}
                        onChange={(e) =>
                          onStartEditPrice(v._id, e.target.value)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleUpdatePrice(v._id)
                        }
                        autoFocus
                      />
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleUpdatePrice(v._id)}
                      >
                        <Save />
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onCancelEditPrice(v._id)}
                      >
                        <X />
                      </button>
                    </div>
                  ) : (
                    <span
                      className="text-danger fw-bold cursor-pointer fs-5"
                      onClick={() => onStartEditPrice(v._id, v.sale_price)}
                    >
                      {v.sale_price.toLocaleString()}đ
                    </span>
                  )}
                </td>

                <td className="text-center">
                  <span
                    className={
                      v.stock > 0 ? "text-success fw-bold" : "text-danger"
                    }
                  >
                    {v.stock || 0}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(v._id)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariantsTable;