import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { PencilSquare, Trash, PlusLg } from "react-bootstrap-icons";

const VariantAttributesManagement = () => {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("color");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    attribute_color_name: "",
    attribute_color_code: "#000000",
    attribute_size_name: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [colorRes, sizeRes] = await Promise.all([
        api.get("/attributes/colors"),
        api.get("/attributes/sizes"),
      ]);
      setColors(colorRes.data || []);
      setSizes(sizeRes.data || []);
    } catch {
      toast.error("Không thể tải dữ liệu màu/kích thước!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (type === "color") {
      setFormData({
        attribute_color_name: item?.attribute_color_name || "",
        attribute_color_code: item?.attribute_color_code || "#000000",
        attribute_size_name: "",
      });
    } else {
      setFormData({
        attribute_color_name: "",
        attribute_color_code: "#000000",
        attribute_size_name: item?.attribute_size_name || "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      attribute_color_name: "",
      attribute_color_code: "#000000",
      attribute_size_name: "",
    });
  };

  const handleSubmit = async () => {
    if (modalType === "color") {
      if (!formData.attribute_color_name.trim()) {
        return toast.error("Tên màu không được để trống!");
      }
      try {
        if (editingItem) {
          const res = await api.put(`/attributes/colors/${editingItem._id}`, {
            attribute_color_name: formData.attribute_color_name,
            attribute_color_code: formData.attribute_color_code,
          });
          setColors(colors.map((c) => (c._id === editingItem._id ? res.data : c)));
          toast.success("Cập nhật màu thành công!");
        } else {
          const res = await api.post("/attributes/colors", {
            attribute_color_name: formData.attribute_color_name,
            attribute_color_code: formData.attribute_color_code,
          });
          setColors([...colors, res.data]);
          toast.success("Thêm màu thành công!");
        }
        closeModal();
      } catch {
        toast.error("Lỗi khi lưu màu!");
      }
    } else {
      if (!formData.attribute_size_name.trim()) {
        return toast.error("Tên kích thước không được để trống!");
      }
      try {
        if (editingItem) {
          const res = await api.put(`/attributes/sizes/${editingItem._id}`, {
            attribute_size_name: formData.attribute_size_name,
          });
          setSizes(sizes.map((s) => (s._id === editingItem._id ? res.data : s)));
          toast.success("Cập nhật kích thước thành công!");
        } else {
          const res = await api.post("/attributes/sizes", {
            attribute_size_name: formData.attribute_size_name,
          });
          setSizes([...sizes, res.data]);
          toast.success("Thêm kích thước thành công!");
        }
        closeModal();
      } catch {
        toast.error("Lỗi khi lưu kích thước!");
      }
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Xóa ${type === "color" ? "màu" : "kích thước"} này?`)) return;
    try {
      const endpoint = type === "color" ? `/attributes/colors/${id}` : `/attributes/sizes/${id}`;
      await api.delete(endpoint);
      if (type === "color") {
        setColors(colors.filter((c) => c._id !== id));
      } else {
        setSizes(sizes.filter((s) => s._id !== id));
      }
      toast.success("Xóa thành công!");
    } catch {
      toast.error("Không thể xóa (đang được sử dụng trong sản phẩm?)");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-dark btn-sm" onClick={() => openModal("color")}>
                <PlusLg className="me-1" size={14} /> Thêm màu
              </button>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-4 text-secondary">Đang tải...</div>
                ) : colors.length === 0 ? (
                  <div className="text-center py-4 text-secondary">Chưa có màu nào</div>
                ) : (
                  <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">Màu</th>
                        <th>Tên</th>
                        <th className="text-end pe-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colors.map((color) => (
                        <tr key={color._id}>
                          <td className="ps-4">
                            <div
                              className="rounded-circle border"
                              style={{
                                width: 32,
                                height: 32,
                                backgroundColor: color.attribute_color_code,
                                boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                              }}
                            ></div>
                          </td>
                          <td>{color.attribute_color_name}</td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openModal("color", color)}
                            >
                              <PencilSquare size={14} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete("color", color._id)}
                            >
                              <Trash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-dark btn-sm" onClick={() => openModal("size")}>
                <PlusLg className="me-1" size={14} /> Thêm size
              </button>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-4 text-secondary">Đang tải...</div>
                ) : sizes.length === 0 ? (
                  <div className="text-center py-4 text-secondary">Chưa có kích thước nào</div>
                ) : (
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">STT</th>
                        <th>Tên kích thước</th>
                        <th className="text-end pe-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizes.map((size, index) => (
                        <tr key={size._id}>
                          <td className="ps-4 text-muted">{index + 1}</td>
                          <td className="fw-medium">{size.attribute_size_name}</td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openModal("size", size)}
                            >
                              <PencilSquare size={14} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete("size", size._id)}
                            >
                              <Trash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingItem
                    ? modalType === "color"
                      ? "Sửa màu"
                      : "Sửa kích thước"
                    : modalType === "color"
                    ? "Thêm màu mới"
                    : "Thêm kích thước mới"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {modalType === "color" ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Tên màu</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.attribute_color_name}
                        onChange={(e) =>
                          setFormData({ ...formData, attribute_color_name: e.target.value })
                        }
                        placeholder="Đen, Trắng, Xanh Navy..."
                      />
                    </div>
                    <div>
                      <label className="form-label fw-semibold">Mã màu</label>
                      <div className="d-flex gap-3">
                        <input
                          type="color"
                          className="form-control form-control-color"
                          style={{ width: 80, height: 48 }}
                          value={formData.attribute_color_code}
                          onChange={(e) =>
                            setFormData({ ...formData, attribute_color_code: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          className="form-control"
                          value={formData.attribute_color_code}
                          onChange={(e) =>
                            setFormData({ ...formData, attribute_color_code: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="form-label fw-semibold">Tên kích thước</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.attribute_size_name}
                      onChange={(e) =>
                        setFormData({ ...formData, attribute_size_name: e.target.value })
                      }
                      placeholder="S, M, L, XL, 38, 39..."
                      autoFocus
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button className="btn btn-dark" onClick={handleSubmit}>
                  {editingItem ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VariantAttributesManagement;