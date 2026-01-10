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
  editingStock,
  stockInput,
  onStartEditStock,
  onUpdateStock,
  onCancelEditStock,
  onDeleteVariant,
  onAddVariant,
}) => {
  const handleUpdateVariant = async (variantId) => {
    const updatePayload = {};

    if (editingPrice[variantId]) {
      const newPrice = Number(priceInput[variantId]);
      if (isNaN(newPrice) || newPrice < 0) {
        toast.error("Giá bán không hợp lệ");
        return;
      }
      updatePayload.sale_price = newPrice;
    }

    if (editingStock[variantId]) {
      const newStock = Number(stockInput[variantId]);
      if (isNaN(newStock) || newStock < 0) {
        toast.error("Tồn kho không hợp lệ");
        return;
      }
      updatePayload.stock = newStock;
    }

    if (Object.keys(updatePayload).length === 0) {
      toast("Không có thay đổi nào để cập nhật", { icon: "ℹ️" });
      return;
    }

    try {
      await api.put(`/variants/admin/${variantId}`, updatePayload);

      toast.success("Cập nhật thành công!");

      if (updatePayload.sale_price !== undefined) onUpdatePrice(variantId);
      if (updatePayload.stock !== undefined) onUpdateStock(variantId);
    } catch (err) {
      toast.error("Cập nhật thất bại: " + (err.response?.data?.message || ""));
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
            {variants.map((v) => {
              const isEditing = editingPrice[v._id] || editingStock[v._id];

              return (
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

                  <td className="text-center fw-bold">{v.size?.name || "—"}</td>

                  <td className="text-center text-secondary">
                    {v.import_price > 0
                      ? `${v.import_price.toLocaleString()}đ`
                      : "—"}
                  </td>

                  <td className="text-center">
                    {editingPrice[v._id] ? (
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        style={{ width: 110, display: "inline-block" }}
                        value={priceInput[v._id] ?? ""}
                        onChange={(e) =>
                          onStartEditPrice(v._id, e.target.value)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleUpdateVariant(v._id)
                        }
                        autoFocus
                      />
                    ) : (
                      <span
                        className="text-danger fw-bold cursor-pointer fs-5"
                        onClick={() => onStartEditPrice(v._id, v.sale_price)}
                      >
                        {v.sale_price?.toLocaleString() || "0"}đ
                      </span>
                    )}
                  </td>

                  <td className="text-center">
                    {editingStock[v._id] ? (
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        style={{ width: 90, display: "inline-block" }}
                        value={stockInput[v._id] ?? ""}
                        onChange={(e) =>
                          onStartEditStock(v._id, e.target.value)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleUpdateVariant(v._id)
                        }
                      />
                    ) : (
                      <span
                        className={`fw-bold cursor-pointer ${
                          v.stock > 0 ? "text-success" : "text-danger"
                        }`}
                        onClick={() => onStartEditStock(v._id, v.stock || 0)}
                      >
                        {v.stock || 0}
                      </span>
                    )}
                  </td>

                  <td className="text-center">
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-1"
                          onClick={() => handleUpdateVariant(v._id)}
                        >
                          <Save />
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            onCancelEditPrice(v._id);
                            onCancelEditStock(v._id);
                          }}
                        >
                          <X />
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(v._id)}
                      >
                        <Trash />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariantsTable;
