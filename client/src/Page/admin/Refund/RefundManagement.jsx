import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { PencilSquare, Trash, PlusLg, CheckCircle, XCircle } from "react-bootstrap-icons";

const RefundManagement = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [actionType, setActionType] = useState(""); 

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/refunds");
      setRefunds(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách yêu cầu hoàn tiền!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  const openActionModal = (refund, type) => {
    setSelectedRefund(refund);
    setActionType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRefund(null);
    setActionType("");
  };

  const handleConfirmRefund = async () => {
    if (!selectedRefund) return;

    try {
      const res = await api.put(`/admin/refunds/${selectedRefund._id}/confirm`);
      const updated = res.data;

      setRefunds((prev) =>
        prev.map((r) => (r._id === selectedRefund._id ? updated : r))
      );

      toast.success("Đã xác nhận hoàn tiền thành công!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xác nhận hoàn tiền thất bại!");
    }
  };

  const handleRejectRefund = async () => {
    if (!selectedRefund) return;

    try {
      const res = await api.put(`/admin/refunds/${selectedRefund._id}/reject`);
      const updated = res.data;

      setRefunds((prev) =>
        prev.map((r) => (r._id === selectedRefund._id ? updated : r))
      );

      toast.success("Đã từ chối yêu cầu hoàn tiền!");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Từ chối hoàn tiền thất bại!");
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: { text: "Chờ xử lý", color: "bg-warning text-dark" },
      confirm: { text: "Đã xác nhận", color: "bg-info text-white" },
      success: { text: "Hoàn thành", color: "bg-success text-white" },
      failed: { text: "Thất bại", color: "bg-danger text-white" },
      rejected: { text: "Đã từ chối", color: "bg-secondary text-white" },
    };
    const info = map[status] || { text: status, color: "bg-secondary" };
    return `badge ${info.color} px-3 py-2`;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount || 0) + "đ";

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("vi-VN") : "—";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : refunds.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có yêu cầu hoàn tiền nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Số tiền</th>
                      <th>Lý do</th>
                      <th>Trạng thái</th>
                      <th>Ngày yêu cầu</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {refunds.map((refund, index) => (
                      <tr key={refund._id}>
                        <td className="ps-4 fw-bold">{index + 1}</td>
                        <td>
                          #{refund.order?._id?.slice(-8)?.toUpperCase() || "—"}
                        </td>
                        <td>{refund.user?.name || refund.user?.email || "N/A"}</td>
                        <td className="fw-bold text-danger">
                          {formatCurrency(refund.refund_amount)}
                        </td>
                        <td className="text-muted small">
                          {refund.refund_reason || "Không có lý do"}
                        </td>
                        <td>
                          <span className={getStatusBadge(refund.refund_status)}>
                            {refund.refund_status === "pending"
                              ? "Chờ xử lý"
                              : refund.refund_status === "confirm"
                              ? "Đã xác nhận"
                              : refund.refund_status === "success"
                              ? "Hoàn thành"
                              : refund.refund_status === "failed"
                              ? "Thất bại"
                              : "Đã từ chối"}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {formatDate(refund.createdAt)}
                        </td>
                        <td className="text-center">
                          {refund.refund_status === "pending" && (
                            <>
                              <button
                                className="btn btn-sm btn-outline-success me-2"
                                onClick={() => openActionModal(refund, "confirm")}
                                title="Xác nhận hoàn tiền"
                              >
                                <CheckCircle />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => openActionModal(refund, "reject")}
                                title="Từ chối hoàn tiền"
                              >
                                <XCircle />
                              </button>
                            </>
                          )}
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

      {/* ====================== MODAL XÁC NHẬN / TỪ CHỐI ====================== */}
      {showModal && selectedRefund && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {actionType === "confirm"
                    ? "Xác nhận hoàn tiền"
                    : "Từ chối hoàn tiền"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <p className="mb-1">
                  Đơn hàng:{" "}
                  <strong>
                    #{selectedRefund.order?._id?.slice(-8)?.toUpperCase() || "—"}
                  </strong>
                </p>
                <p className="mb-1">
                  Số tiền:{" "}
                  <strong className="text-danger">
                    {formatCurrency(selectedRefund.refund_amount)}
                  </strong>
                </p>
                <p className="mb-3">
                  Lý do: <em>{selectedRefund.refund_reason || "Không có"}</em>
                </p>

                {actionType === "confirm" ? (
                  <div className="alert alert-success small mb-0">
                    Bạn có chắc chắn muốn <strong>XÁC NHẬN</strong> hoàn tiền cho
                    khách hàng này?
                  </div>
                ) : (
                  <div className="alert alert-danger small mb-0">
                    Bạn có chắc chắn muốn <strong>TỪ CHỐI</strong> yêu cầu hoàn
                    tiền này?
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                <button
                  className={`btn ${
                    actionType === "confirm" ? "btn-success" : "btn-danger"
                  }`}
                  onClick={
                    actionType === "confirm"
                      ? handleConfirmRefund
                      : handleRejectRefund
                  }
                >
                  {actionType === "confirm" ? "Xác nhận" : "Từ chối"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RefundManagement;