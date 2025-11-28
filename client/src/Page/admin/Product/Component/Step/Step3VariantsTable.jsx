import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../../../utils/axiosInstance";

const Step3VariantsTable = ({ product, onBack, onSuccess }) => {
  const [variants, setVariants] = useState(() => {
    if (!product?.variants || product.variants.length === 0) return [];
    return product.variants.map((v) => ({
      ...v,
      enabled: v.enabled ?? true,
    }));
  });

  const updateVariant = (index, field, value) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const toggleVariant = (tempId) => {
    setVariants((prev) =>
      prev.map((v) => (v.tempId === tempId ? { ...v, enabled: !v.enabled } : v))
    );
  };

  const toggleAll = (checked) => {
    setVariants((prev) => prev.map((v) => ({ ...v, enabled: checked })));
  };

  const handleSubmit = async () => {
    const enabledVariants = variants.filter((v) => v.enabled);

    if (enabledVariants.length === 0) {
      return toast.error("Vui lòng chọn ít nhất 1 biến thể!");
    }

    for (const v of enabledVariants) {
      const price = Number(v.sale_price);
      const stock = Number(v.stock);

      if (!v.sale_price || price <= 0) {
        return toast.error(
          `Nhập giá bán hợp lệ cho: ${v.colorName} - ${v.sizeName}`
        );
      }
      if (v.stock === "" || stock < 0) {
        return toast.error(
          `Nhập tồn kho hợp lệ cho: ${v.colorName} - ${v.sizeName}`
        );
      }
    }

    const payload = {
      name: product.name?.trim(),
      brand: product.brand?.trim() || "",
      category: product.category,
      description: product.description?.trim(),
      short_description: product.short_description?.trim() || "",
      tags: product.tags
        ? product.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      images: product.images || [],
      variants: enabledVariants.map((v) => ({
        color: v.colorId,
        size: v.sizeId,
        sale_price: Number(v.sale_price),
        import_price: Number(v.import_price || 0),
        stock: Number(v.stock),
      })),
    };

    // Xử lý upload ảnh mới
    if (product.newImageFiles && product.newImageFiles.length > 0) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      product.newImageFiles.forEach((file) => formData.append("images", file));

      try {
        if (product._id) {
          await api.put(`/products/admin/${product._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await api.post("/products/admin", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
        toast.success("Thành công!");
        onSuccess();
      } catch (err) {
        toast.error(err.response?.data?.message || "Lỗi khi tải ảnh!");
      }
      return;
    }

    // Gửi JSON thường
    try {
      if (product._id) {
        await api.put(`/products/admin/${product._id}`, payload);
      } else {
        await api.post("/products/admin", payload);
      }
      toast.success("Thành công!");
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  if (variants.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-4">Chưa có biến thể nào được tạo.</p>
        <button className="btn btn-outline-primary" onClick={onBack}>
          Quay lại bước 2 để tạo biến thể
        </button>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h6 className="fw-bold text-warning mb-4">
        Bước 3: Nhập giá & tồn kho ({variants.filter((v) => v.enabled).length}{" "}
        biến thể đang bật)
      </h6>

      <div
        className="table-responsive"
        style={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light sticky-top">
            <tr>
              <th width="60" className="text-center">
                <input
                  type="checkbox"
                  checked={
                    variants.length > 0 && variants.every((v) => v.enabled)
                  }
                  onChange={(e) => toggleAll(e.target.checked)}
                />
              </th>
              <th width="140">Màu sắc</th>
              <th width="100" className="text-center">
                Size
              </th>
              <th width="180">Giá bán (VND) *</th>
              <th width="160">Giá nhập (VND)</th>
              <th width="140">Tồn kho *</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, i) => (
              <tr
                key={v.tempId}
                className={!v.enabled ? "text-muted bg-light" : ""}
              >
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={!!v.enabled}
                    onChange={() => toggleVariant(v.tempId)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: v.colorCode || "#ccc",
                        borderRadius: 6,
                        border: "2px solid #fff",
                        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                      }}
                    />
                    <span className="fw-500">{v.colorName}</span>
                  </div>
                </td>
                <td className="text-center fw-bold">{v.sizeName}</td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={v.sale_price || ""}
                    onChange={(e) =>
                      updateVariant(i, "sale_price", e.target.value)
                    }
                    disabled={!v.enabled}
                    placeholder="299000"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={v.import_price || ""}
                    onChange={(e) =>
                      updateVariant(i, "import_price", e.target.value)
                    }
                    disabled={!v.enabled}
                    placeholder="0"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={v.stock || ""}
                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                    min="0"
                    disabled={!v.enabled}
                    placeholder="100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Quay lại
        </button>
        <button className="btn btn-dark btn-lg px-5" onClick={handleSubmit}>
          {product._id ? "Cập nhật sản phẩm" : "Hoàn tất tạo sản phẩm"}
        </button>
      </div>
    </div>
  );
};

export default Step3VariantsTable;
