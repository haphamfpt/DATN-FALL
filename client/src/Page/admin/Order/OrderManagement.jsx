import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { Eye, BoxSeam } from "react-bootstrap-icons";
import { format } from "date-fns";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Lỗi tải đơn hàng admin:", err);
      toast.error(
        err.response?.data?.message || "Không thể tải danh sách đơn hàng!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus("");
    setShowStatusModal(true);
  };

  const closeModals = () => {
    setShowDetailModal(false);
    setShowStatusModal(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  const adminStatusFlow = [
    { value: "pending", label: "Chờ xác nhận" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "shipped", label: "Đang giao" },
    { value: "delivered", label: "Đã giao hàng" },
  ];

  const getNextValidStatuses = (currentStatus) => {
    const currentIndex = adminStatusFlow.findIndex(
      (s) => s.value === currentStatus
    );
    if (currentIndex === -1 || currentIndex >= adminStatusFlow.length - 1) {
      return [];
    }
    return adminStatusFlow.slice(currentIndex + 1);
  };

  const updateOrderStatus = async () => {
    if (!newStatus) {
      toast.error("Vui lòng chọn trạng thái mới!");
      return;
    }

    const nextStatuses = getNextValidStatuses(selectedOrder.orderStatus);
    const isValid = nextStatuses.some((s) => s.value === newStatus);

    if (!isValid) {
      toast.error("Không thể chọn trạng thái này! Vui lòng chọn đúng thứ tự.");
      return;
    }

    try {
      const res = await api.put(`/admin/orders/${selectedOrder._id}/status`, {
        orderStatus: newStatus,
      });

      const updatedOrder = res.data.data || res.data;

      if (updatedOrder.orderStatus === "cancelled") {
        toast.error(
          "Đơn hàng đã bị hủy! (Có thể do khách hàng yêu cầu hoặc hệ thống tự động xử lý)",
          {
            duration: 7000,
            style: {
              background: "#dc3545",
              color: "#fff",
              fontWeight: "bold",
            },
          }
        );

        await fetchOrders();
      } else {
        setOrders((prev) =>
          prev.map((o) => (o._id === selectedOrder._id ? updatedOrder : o))
        );
        toast.success("Cập nhật trạng thái đơn hàng thành công!");
      }

      closeModals();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Cập nhật trạng thái thất bại!";
      toast.error(errorMsg);

      if (err.response?.data?.order?.orderStatus === "cancelled") {
        toast.error("Đơn hàng đã bị hủy trong quá trình xử lý!", {
          duration: 7000,
        });
        await fetchOrders();
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-warning text-dark",
      confirmed: "bg-info",
      shipped: "bg-primary",
      delivered: "bg-secondary",
      complete: "bg-success",
      cancelled: "bg-danger",
      refund_pending: "bg-warning text-dark",
      refunded: "bg-dark",
    };
    return `badge ${badges[status] || "bg-secondary"}`;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipped: "Đang giao",
      delivered: "Đã giao hàng",
      complete: "Hoàn thành",
      cancelled: "Đã hủy",
      refund_pending: "Đang hoàn tiền",
      refunded: "Đã hoàn tiền",
    };
    return texts[status] || status;
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      paid: "bg-success",
      pending: "bg-warning text-dark",
      failed: "bg-danger",
    };
    return `badge ${badges[status] || "bg-secondary"}`;
  };

  const getPaymentText = (status) => {
    const texts = {
      paid: "Đã thanh toán",
      pending: "Chưa thanh toán",
      failed: "Thanh toán thất bại",
    };
    return texts[status] || status;
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container py-4">
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">
                Đang tải dữ liệu...
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có đơn hàng nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái đơn</th>
                      <th>Ngày đặt</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="ps-4 fw-bold">
                          #{order._id.slice(-8).toUpperCase()}
                        </td>
                        <td>
                          <div>{order.shippingAddress?.fullName || "N/A"}</div>
                          <small className="text-secondary">
                            {order.shippingAddress?.phone ||
                              "Không có số điện thoại"}
                          </small>
                        </td>
                        <td>{order.items?.length || 0} sản phẩm</td>
                        <td className="fw-bold text-danger">
                          {formatCurrency(order.totalAmount || 0)}
                        </td>
                        <td className="text-center">
                          <span
                            className={getPaymentStatusBadge(
                              order.paymentStatus
                            )}
                          >
                            {getPaymentText(order.paymentStatus)}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className={getStatusBadge(order.orderStatus)}>
                            {getStatusText(order.orderStatus)}
                          </span>
                        </td>
                        <td className="small">
                          {order.createdAt
                            ? format(
                                new Date(order.createdAt),
                                "dd/MM/yyyy HH:mm"
                              )
                            : "N/A"}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-info me-2"
                            onClick={() => openDetailModal(order)}
                            title="Xem chi tiết"
                          >
                            <Eye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => openStatusModal(order)}
                            disabled={[
                              "complete",
                              "cancelled",
                              "refunded",
                              "refund_pending",
                            ].includes(order.orderStatus)}
                            title="Cập nhật trạng thái"
                          >
                            <BoxSeam />
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

      {showDetailModal && selectedOrder && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && closeModals()}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Chi tiết đơn hàng #{selectedOrder._id.slice(-8).toUpperCase()}
                </h5>
                <button className="btn-close" onClick={closeModals}></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-lg-8">
                    <h6 className="fw-bold mb-3">Sản phẩm</h6>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead className="table-light">
                          <tr>
                            <th>Hình ảnh</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                <img
                                  src={item.image || "/placeholder.jpg"}
                                  alt={item.name}
                                  className="rounded"
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                  }}
                                />
                              </td>
                              <td>
                                <div className="fw-semibold">{item.name}</div>
                                <small className="text-muted">
                                  {item.color && `Màu: ${item.color}`}
                                  {item.size && ` | Size: ${item.size}`}
                                </small>
                              </td>
                              <td>{item.quantity}</td>
                              <td>{formatCurrency(item.price)}</td>
                              <td className="fw-bold">
                                {formatCurrency(item.price * item.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <h6 className="fw-bold mb-3">Thông tin thanh toán</h6>
                    <div className="bg-light p-3 rounded mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Tạm tính</span>
                        <span>{formatCurrency(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Phí vận chuyển</span>
                        <span>{formatCurrency(selectedOrder.shippingFee)}</span>
                      </div>
                      {selectedOrder.discountAmount > 0 && (
                        <div className="d-flex justify-content-between mb-2 text-success">
                          <span>
                            Giảm giá{" "}
                            {selectedOrder.voucher?.code &&
                              `(mã ${selectedOrder.voucher.code})`}
                          </span>
                          <span>
                            -{formatCurrency(selectedOrder.discountAmount)}
                          </span>
                        </div>
                      )}
                      <hr />
                      <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Tổng cộng</span>
                        <span className="text-danger">
                          {formatCurrency(selectedOrder.totalAmount)}
                        </span>
                      </div>
                    </div>

                    <h6 className="fw-bold mb-3">Địa chỉ giao hàng</h6>
                    <div className="small text-muted">
                      <div>
                        <strong>
                          {selectedOrder.shippingAddress.fullName}
                        </strong>
                      </div>
                      <div>{selectedOrder.shippingAddress.phone}</div>
                      <div>{selectedOrder.shippingAddress.address}</div>
                      {selectedOrder.shippingAddress.note && (
                        <div>
                          <strong>Ghi chú:</strong>{" "}
                          {selectedOrder.shippingAddress.note}
                        </div>
                      )}
                    </div>

                    <h6 className="fw-bold mt-4 mb-3">Trạng thái</h6>
                    <div>
                      <div className="mb-2">
                        <span
                          className={`badge ${getPaymentStatusBadge(
                            selectedOrder.paymentStatus
                          )} me-2`}
                        >
                          Thanh toán:{" "}
                          {getPaymentText(selectedOrder.paymentStatus)}
                        </span>
                      </div>
                      <span
                        className={`badge ${getStatusBadge(
                          selectedOrder.orderStatus
                        )}`}
                      >
                        Đơn hàng: {getStatusText(selectedOrder.orderStatus)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModals}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedOrder && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => e.target === e.currentTarget && closeModals()}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  Cập nhật trạng thái đơn hàng #
                  {selectedOrder._id.slice(-8).toUpperCase()}
                </h5>
                <button className="btn-close" onClick={closeModals}></button>
              </div>

              <div className="modal-body">
                <p className="text-muted small mb-4">
                  Trạng thái hiện tại:{" "}
                  <strong className={getStatusBadge(selectedOrder.orderStatus)}>
                    {getStatusText(selectedOrder.orderStatus)}
                  </strong>
                </p>

                <label className="form-label fw-semibold">
                  Chọn trạng thái tiếp theo:
                </label>

                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">-- Chọn trạng thái --</option>
                  {getNextValidStatuses(selectedOrder.orderStatus).map(
                    (status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    )
                  )}
                </select>

                {getNextValidStatuses(selectedOrder.orderStatus).length ===
                  0 && (
                  <div className="alert alert-info mt-3 mb-0 small">
                    Đơn hàng đã hoàn thành hoặc không thể cập nhật thêm trạng
                    thái
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModals}>
                  Hủy
                </button>
                <button
                  className="btn btn-dark"
                  onClick={updateOrderStatus}
                  disabled={!newStatus}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderManagement;