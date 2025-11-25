import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { PencilSquare, Trash, PlusLg } from "react-bootstrap-icons";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    active: true,
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/banners/admin");
      setBanners(res.data || []);
    } catch {
      toast.error("Không thể tải danh sách banner!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openModal = (banner = null) => {
    setEditingBanner(banner);
    setFormData({
      image: banner ? banner.image : "",
      active: banner ? banner.active : true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBanner(null);
    setFormData({ image: "", active: true });
  };

  const handleCreate = async () => {
    const image = formData.image.trim();
    if (!image) return toast.error("URL ảnh không được để trống!");

    try {
      const res = await api.post("/banners", {
        image,
        active: formData.active,
      });
      setBanners([...banners, res.data]);
      toast.success("Thêm banner thành công!");
      closeModal();
    } catch {
      toast.error("Thêm banner thất bại!");
    }
  };

  const handleUpdate = async () => {
    const image = formData.image.trim();
    if (!image) return toast.error("URL ảnh không được để trống!");

    try {
      const res = await api.put(`/banners/${editingBanner._id}`, {
        image,
        active: formData.active,
      });
      setBanners(
        banners.map((b) => (b._id === editingBanner._id ? res.data : b))
      );
      toast.success("Cập nhật banner thành công!");
      closeModal();
    } catch {
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa banner này?")) return;

    try {
      await api.delete(`/banners/${id}`);
      setBanners(banners.filter((b) => b._id !== id));
      toast.success("Xóa banner thành công!");
    } catch {
      toast.error("Không thể xóa banner!");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-dark px-4" onClick={() => openModal()}>
            <PlusLg className="me-2" />
            Thêm banner
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : banners.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có banner nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Ảnh banner</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Ngày tạo</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map((banner, index) => (
                      <tr key={banner._id}>
                        <td className="ps-4 fw-bold">{index + 1}</td>
                        <td style={{ width: "320px" }}>
                          <img
                            src={banner.image}
                            alt="Banner"
                            className="img-fluid rounded"
                            style={{width:"500px", height: "100px", objectFit: "cover" }}
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/600x200/eeeeee/999999?text=Ảnh+lỗi")
                            }
                          />
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge ${
                              banner.active ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {banner.active ? "Hiển thị" : "Ẩn"}
                          </span>
                        </td>
                        <td className="text-center text-muted small">
                          {new Date(banner.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openModal(banner)}
                          >
                            <PencilSquare />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(banner._id)}
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
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingBanner ? "Sửa banner" : "Thêm banner mới"}
                </h5>
              </div>

              <div className="modal-body">
                <label className="form-label fw-semibold">
                  URL ảnh banner <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="image"
                  className="form-control mb-3"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/banner.jpg"
                  autoFocus
                />

                    {formData.image && (
                  <div className="text-center mb-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="img-fluid rounded border"
                      style={{ maxHeight: "250px" }}
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/800x300?text=Ảnh+không+tồn+tại")
                      }
                    />
                  </div>
                )}

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="active"
                    id="activeCheck"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="activeCheck">
                    Hiển thị banner này
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button
                  className="btn btn-dark"
                  onClick={editingBanner ? handleUpdate : handleCreate}
                >
                  {editingBanner ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BannerManagement;