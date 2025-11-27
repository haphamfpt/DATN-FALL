import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { PencilSquare, Trash, PlusLg } from "react-bootstrap-icons";
import { format } from "date-fns";

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);

  const [formData, setFormData] = useState({
    voucher_code: "",
    voucher_value: "",
    voucher_type: "fixed",
    max_price: "",
    rank_price: "",
    start_datetime: "",
    end_datetime: "",
    quantity: "",
    for_user_ids: [],
  });

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/vouchers");
      setVouchers(res.data || []);
    } catch {
      toast.error("Không thể tải danh sách mã giảm giá!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (voucher = null) => {
    setEditingVoucher(voucher);
    if (voucher) {
      setFormData({
        voucher_code: voucher.voucher_code,
        voucher_value: voucher.voucher_value,
        voucher_type: voucher.voucher_type,
        max_price: voucher.max_price || "",
        rank_price: voucher.rank_price || "",
        start_datetime: voucher.start_datetime ? format(new Date(voucher.start_datetime), "yyyy-MM-dd'T'HH:mm") : "",
        end_datetime: voucher.end_datetime ? format(new Date(voucher.end_datetime), "yyyy-MM-dd'T'HH:mm") : "",
        quantity: voucher.quantity,
        for_user_ids: voucher.for_user_ids || [],
      });
    } else {
      setFormData({
        voucher_code: "",
        voucher_value: "",
        voucher_type: "fixed",
        max_price: "",
        rank_price: "",
        start_datetime: "",
        end_datetime: "",
        quantity: "",
        for_user_ids: [],
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVoucher(null);
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const res = await api.post("/vouchers", formData);
      setVouchers([...vouchers, res.data]);
      toast.success("Thêm mã giảm giá thành công!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Thêm mã giảm giá thất bại!");
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const res = await api.put(`/vouchers/${editingVoucher._id}`, formData);
      setVouchers(vouchers.map((v) => (v._id === editingVoucher._id ? res.data : v)));
      toast.success("Cập nhật mã giảm giá thành công!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) return;

    try {
      await api.delete(`/vouchers/${id}`);
      setVouchers(vouchers.filter((v) => v._id !== id));
      toast.success("Xóa mã giảm giá thành công!");
    } catch {
      toast.error("Không thể xóa mã giảm giá!");
    }
  };

  const validateForm = () => {
    if (!formData.voucher_code.trim()) return toast.error("Mã giảm giá không được để trống!");
    if (!formData.voucher_value || formData.voucher_value <= 0) return toast.error("Giá trị giảm phải lớn hơn 0!");
    if (!formData.voucher_value || formData.voucher_value >= formData.rank_price) return toast.error("Giá trị giảm phải nhỏ hơn đơn hàng tối thiểu");
    if (!formData.rank_price || formData.rank_price < 0) return toast.error("Đơn tối thiểu không hợp lệ!");
    if (!formData.start_datetime) return toast.error("Chọn ngày bắt đầu!");
    if (!formData.start_datetime || formData.start_datetime < new Date()) return toast.error("Ngày bắt đầu không được nhỏ hơn thời điểm hiện tại.");
    if (!formData.end_datetime) return toast.error("Chọn ngày kết thúc!");
    if (new Date(formData.start_datetime) >= new Date(formData.end_datetime))
      return toast.error("Ngày kết thúc phải sau ngày bắt đầu!");
    if (!formData.quantity || formData.quantity < 1) return toast.error("Số lượng phải ≥ 1!");

    return true;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-dark px-4" onClick={() => openModal()}>
            <PlusLg className="me-2" />
            Thêm mã giảm giá
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : vouchers.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có mã giảm giá nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Mã</th>
                      <th>Loại</th>
                      <th>Giá trị</th>
                      <th>Đơn tối thiểu</th>
                      <th>Số lượng</th>
                      <th>Đã dùng</th>
                      <th>Thời gian</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vouchers.map((v, index) => {
                      const now = new Date();
                      const isActive =
                        v.is_active &&
                        new Date(v.start_datetime) <= now &&
                        new Date(v.end_datetime) >= now &&
                        v.used_quantity < v.quantity;

                      return (
                        <tr key={v._id}>
                          <td className="ps-4 fw-bold">{index + 1}</td>
                          <td className="fw-bold">{v.voucher_code}</td>
                          <td>
                            <span className={`badge ${v.voucher_type === "percent" ? "bg-primary" : "bg-success"}`}>
                              {v.voucher_type === "percent" ? "%" : "₫"}
                            </span>
                          </td>
                          <td>
                            {v.voucher_type === "percent"
                              ? `${v.voucher_value}% ${v.max_price > 0 ? `(tối đa ${formatCurrency(v.max_price)})` : ""}`
                              : formatCurrency(v.voucher_value)}
                          </td>
                          <td>{formatCurrency(v.rank_price)}</td>
                          <td>{v.quantity}</td>
                          <td>{v.used_quantity}</td>
                          <td className="small">
                            {format(new Date(v.start_datetime), "dd/MM/yyyy HH:mm")} <br />
                            → {format(new Date(v.end_datetime), "dd/MM/yyyy HH:mm")}
                          </td>
                          <td className="text-center">
                            <span className={`badge ${isActive ? "bg-success" : "bg-secondary"}`}>
                              {isActive ? "Đang hoạt động" : "Không khả dụng"}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openModal(v)}
                            >
                              <PencilSquare />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(v._id)}
                            >
                              <Trash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editingVoucher ? "Sửa mã giảm giá" : "Thêm mã giảm giá mới"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mã giảm giá *</label>
                    <input
                      type="text"
                      name="voucher_code"
                      className="form-control"
                      value={formData.voucher_code}
                      onChange={handleInputChange}
                      placeholder="SUMMER2025"
                      autoFocus
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Loại giảm giá</label>
                    <select
                      name="voucher_type"
                      className="form-select"
                      value={formData.voucher_type}
                      onChange={handleInputChange}
                    >
                      <option value="fixed">Giảm cố định (₫)</option>
                      <option value="percent">Giảm theo %</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      {formData.voucher_type === "percent" ? "Phần trăm giảm (%) *" : "Giá trị giảm (₫) *"}
                    </label>
                    <input
                      type="number"
                      name="voucher_value"
                      className="form-control"
                      value={formData.voucher_value}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>

                  {formData.voucher_type === "percent" && (
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Giảm tối đa (₫)</label>
                      <input
                        type="number"
                        name="max_price"
                        className="form-control"
                        value={formData.max_price}
                        onChange={handleInputChange}
                        placeholder="Không giới hạn thì để trống"
                      />
                    </div>
                  )}

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Đơn hàng tối thiểu (₫) *</label>
                    <input
                      type="number"
                      name="rank_price"
                      className="form-control"
                      value={formData.rank_price}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Số lượng sử dụng *</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Ngày bắt đầu *</label>
                    <input
                      type="datetime-local"
                      name="start_datetime"
                      className="form-control"
                      value={formData.start_datetime}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Ngày kết thúc *</label>
                    <input
                      type="datetime-local"
                      name="end_datetime"
                      className="form-control"
                      value={formData.end_datetime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button
                  className="btn btn-dark"
                  onClick={editingVoucher ? handleUpdate : handleCreate}
                >
                  {editingVoucher ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoucherManagement;