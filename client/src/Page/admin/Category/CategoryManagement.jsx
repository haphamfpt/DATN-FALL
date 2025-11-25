import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { PencilSquare, Trash, PlusLg, X } from "react-bootstrap-icons";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ product_category_name: "" });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch {
      toast.error("Không thể tải danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ product_category_name: e.target.value });
  };

  const openModal = (category = null) => {
    setEditingCategory(category);
    setFormData({
      product_category_name: category ? category.product_category_name : "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ product_category_name: "" });
  };

  const handleCreate = async () => {
    const name = formData.product_category_name.trim();
    if (!name) return toast.error("Tên danh mục không được để trống!");
    try {
      const res = await api.post("/categories", {
        product_category_name: name,
      });
      setCategories([...categories, res.data]);
      toast.success("Thêm danh mục thành công!");
      closeModal();
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const handleUpdate = async () => {
    const name = formData.product_category_name.trim();
    if (!name) return toast.error("Tên danh mục không được để trống!");
    try {
      const res = await api.put(`/categories/${editingCategory._id}`, {
        product_category_name: name,
      });
      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id ? res.data : cat
        )
      );
      toast.success("Cập nhật thành công!");
      closeModal();
    } catch {
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("Xóa thành công!");
    } catch {
      toast.error("Không thể xóa danh mục!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-dark px-4" onClick={() => openModal()}>
            <PlusLg className="me-2" />
            Thêm danh mục
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : categories.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có danh mục nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Tên danh mục</th>
                      <th className="text-center">Ngày tạo</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td className="ps-4 fw-bold">{index + 1}</td>
                        <td>{cat.product_category_name}</td>
                        <td className="text-center text-muted small">
                          {new Date(cat.createdAt).toLocaleDateString("vi-VN")}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openModal(cat)}
                          >
                            <PencilSquare />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(cat._id)}
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
                </h5>
              </div>

              <div className="modal-body">
                <label className="form-label fw-semibold">Tên danh mục</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.product_category_name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Áo thun nam..."
                  autoFocus
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button
                  className="btn btn-dark"
                  onClick={editingCategory ? handleUpdate : handleCreate}
                >
                  {editingCategory ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryManagement;
