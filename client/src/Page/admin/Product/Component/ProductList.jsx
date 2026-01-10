import React, { useState } from "react";
import {
  PencilSquare,
  Trash,
  PlusLg,
  ChevronDown,
  ChevronUp,
} from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import api from "../../../../utils/axiosInstance";
import ProductVariantsTable from "./ProductVariantsTable";
import Step2VariantsSelector from "./Step/Step2VariantsSelector";
import Step3VariantsTable from "./Step/Step3VariantsTable";

const ProductList = ({
  products = [],
  loading,
  onAdd,
  onEdit,
  onDelete,
  colors,
  sizes,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const [editingPrice, setEditingPrice] = useState({});
  const [priceInput, setPriceInput] = useState({});

  const [editingStock, setEditingStock] = useState({});
  const [stockInput, setStockInput] = useState({});

  const [showAddVariantFlow, setShowAddVariantFlow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [step, setStep] = useState(2);
  const [selectedNewVariants, setSelectedNewVariants] = useState([]);

  const toggleExpand = (productId) => {
    setExpandedRow(expandedRow === productId ? null : productId);
  };

  const handleStartEditPrice = (variantId, value) => {
    setEditingPrice((prev) => ({ ...prev, [variantId]: true }));
    setPriceInput((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleUpdatePriceSuccess = (variantId) => {
    setEditingPrice((prev) => ({ ...prev, [variantId]: false }));
    setPriceInput((prev) => {
      const newInput = { ...prev };
      delete newInput[variantId];
      return newInput;
    });
    onDelete();
  };

  const handleCancelEditPrice = (variantId) => {
    setEditingPrice((prev) => ({ ...prev, [variantId]: false }));
    setPriceInput((prev) => {
      const newInput = { ...prev };
      delete newInput[variantId];
      return newInput;
    });
  };

  const handleStartEditStock = (variantId, value) => {
    setEditingStock((prev) => ({ ...prev, [variantId]: true }));
    setStockInput((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleUpdateStockSuccess = (variantId) => {
    setEditingStock((prev) => ({ ...prev, [variantId]: false }));
    setStockInput((prev) => {
      const newInput = { ...prev };
      delete newInput[variantId];
      return newInput;
    });
    onDelete();
  };

  const handleCancelEditStock = (variantId) => {
    setEditingStock((prev) => ({ ...prev, [variantId]: false }));
    setStockInput((prev) => {
      const newInput = { ...prev };
      delete newInput[variantId];
      return newInput;
    });
  };

  const handleDeleteVariant = async (productId, variantId) => {
    try {
      await api.delete(`/variants/admin/${variantId}`);
      toast.success("Đã xóa biến thể");
      onDelete();
    } catch {
      toast.error("Xóa thất bại");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Xóa sản phẩm này? Tất cả biến thể sẽ bị xóa!")) return;
    try {
      await api.delete(`/products/admin/${id}`);
      toast.success("Đã xóa sản phẩm!");
      onDelete();
    } catch {
      toast.error("Xóa thất bại!");
    }
  };

  const openAddVariant = (product) => {
    setCurrentProduct(product);
    setShowAddVariantFlow(true);
    setStep(2);
    setSelectedNewVariants([]);
  };

  const handleVariantsGenerated = (generatedVariants) => {
    const existingKeys = new Set(
      (currentProduct?.variants || []).map(
        (v) => `${v.color?._id || v.color}-${v.size?._id || v.size}`
      )
    );

    const trulyNew = generatedVariants.filter((v) => {
      const key = `${v.colorId}-${v.sizeId}`;
      return !existingKeys.has(key);
    });

    if (trulyNew.length === 0) {
      toast.error("Tất cả kết hợp màu + size bạn chọn đã tồn tại rồi!");
      return;
    }

    setSelectedNewVariants(
      trulyNew.map((v) => ({
        ...v,
        enabled: true,
        sale_price: v.sale_price || "",
        import_price: v.import_price || "",
        stock: v.stock || "",
      }))
    );

    setStep(3);
  };

  const handleSaveNewVariants = (enabledVariants) => {
    setShowAddVariantFlow(false);
    onDelete();
  };

  if (loading) return <div className="text-center py-5">Đang tải...</div>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-dark px-4" onClick={onAdd}>
          <PlusLg className="me-2" /> Thêm sản phẩm mới
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          {products.length === 0 ? (
            <div className="text-center py-5 text-secondary">
              Chưa có sản phẩm nào
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="table-light text-secondary small text-uppercase">
                  <tr>
                    <th className="ps-4">STT</th>
                    <th>Sản phẩm</th>
                    <th>Danh mục</th>
                    <th className="text-center">Biến thể</th>
                    <th className="text-center">Giá từ</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <React.Fragment key={p._id}>
                      <tr
                        className={expandedRow === p._id ? "table-active" : ""}
                      >
                        <td className="ps-4 fw-bold">{i + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            {p.images?.[0] && (
                              <img
                                src={p.images[0].url}
                                alt={p.name}
                                className="rounded"
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <div>
                              <div className="fw-bold">{p.name}</div>
                              <small className="text-muted">
                                {p.brand || "—"}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{p.category?.product_category_name || "N/A"}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => toggleExpand(p._id)}
                          >
                            {p.total_variants || 0}{" "}
                            {expandedRow === p._id ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )}
                          </button>
                        </td>
                        <td className="text-center text-danger fw-bold">
                          {p.min_price > 0
                            ? `${p.min_price.toLocaleString()}đ`
                            : "—"}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => onEdit(p)}
                          >
                            <PencilSquare />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProduct(p._id)}
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>

                      {expandedRow === p._id && (
                        <tr>
                          <td colSpan="6" className="p-0 bg-light">
                            <ProductVariantsTable
                              productId={p._id}
                              variants={p.variants || []}
                              editingPrice={editingPrice}
                              priceInput={priceInput}
                              onStartEditPrice={handleStartEditPrice}
                              onUpdatePrice={handleUpdatePriceSuccess}
                              onCancelEditPrice={handleCancelEditPrice}
                              editingStock={editingStock}
                              stockInput={stockInput}
                              onStartEditStock={handleStartEditStock}
                              onUpdateStock={handleUpdateStockSuccess}
                              onCancelEditStock={handleCancelEditStock}
                              onDeleteVariant={handleDeleteVariant}
                              onAddVariant={() => openAddVariant(p)}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showAddVariantFlow && currentProduct && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Thêm biến thể mới - {currentProduct.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddVariantFlow(false)}
                />
              </div>

              <div className="modal-body p-0">
                {step === 2 && (
                  <Step2VariantsSelector
                    colors={colors}
                    sizes={sizes}
                    currentVariants={currentProduct.variants || []}
                    onNext={handleVariantsGenerated}
                  />
                )}

                {step === 3 && (
                  <Step3VariantsTable
                    product={{
                      _id: currentProduct._id,
                      variants: selectedNewVariants,
                    }}
                    onBack={() => setStep(2)}
                    onSuccess={handleSaveNewVariants}
                    isAddingVariantOnly={true}
                  />
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddVariantFlow(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
