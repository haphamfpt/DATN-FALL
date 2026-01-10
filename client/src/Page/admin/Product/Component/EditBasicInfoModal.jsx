import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../../../utils/axiosInstance";

const EditBasicInfoModal = ({ product, categories, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    short_description: "",
    tags: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category?._id || product.category || "",
        description: product.description || "",
        short_description: product.short_description || "",
        tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
      });
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) return toast.error("Vui lòng nhập tên sản phẩm");
    if (!formData.category) return toast.error("Vui lòng chọn danh mục");
    if (!formData.description.trim())
      return toast.error("Vui lòng nhập mô tả chi tiết");

    try {
      await api.put(`/products/admin/${product._id}/basic`, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });

      toast.success("Cập nhật thông tin thành công!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Chỉnh sửa thông tin sản phẩm</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
            <div className="row g-4 p-3">
              {/* Tên - Thương hiệu */}
              <div className="col-lg-8">
                <label className="form-label fw-semibold">Tên sản phẩm *</label>
                <input
                  className="form-control form-control-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="col-lg-4">
                <label className="form-label fw-semibold">Thương hiệu</label>
                <input
                  className="form-control form-control-lg"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>

              {/* Danh mục */}
              <div className="col-12">
                <label className="form-label fw-semibold">Danh mục *</label>
                <select
                  className="form-select form-select-lg"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.product_category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mô tả chi tiết */}
              <div className="col-12">
                <label className="form-label fw-semibold">Mô tả chi tiết *</label>
                <textarea
                  rows="6"
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Mô tả ngắn</label>
                <input
                  className="form-control"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Tags (phân cách bằng dấu phẩy)</label>
                <input
                  className="form-control"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="sale, new, cotton, hot"
                />
              </div>

              <div className="col-12 mt-4">
                <div className="alert alert-info mb-0 small">
                  Chỉnh sửa thông tin sản phẩm
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button className="btn btn-primary px-5" onClick={handleSubmit}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBasicInfoModal;