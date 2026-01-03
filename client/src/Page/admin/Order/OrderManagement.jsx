import React, { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import { Eye, BoxSeam, Truck, CheckCircle, XCircle } from "react-bootstrap-icons";
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
            console.error("Lỗi tải đơn hàng admin:", err.response?.data);
            toast.error(err.response?.data?.message || "Không thể tải danh sách đơn hàng!");
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
        setNewStatus(order.orderStatus);
        setShowStatusModal(true);
    };

    const closeModals = () => {
        setShowDetailModal(false);
        setShowStatusModal(false);
        setSelectedOrder(null);
    };

    const updateOrderStatus = async () => {
        if (!newStatus || newStatus === selectedOrder.orderStatus) {
            toast.error("Vui lòng chọn trạng thái mới!");
            return;
        }

        try {
            const res = await api.put(`/admin/orders/${selectedOrder._id}/status`, {
                orderStatus: newStatus,
            });

            setOrders(orders.map((o) => (o._id === selectedOrder._id ? res.data : o)));
            toast.success("Cập nhật trạng thái thành công!");
            closeModals();
        } catch (err) {
            toast.error(err.response?.data?.message || "Cập nhật thất bại!");
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN").format(value) + "đ";
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: "bg-warning",
            confirmed: "bg-info",
            processing: "bg-primary",
            shipped: "bg-secondary",
            delivered: "bg-success",
            cancelled: "bg-danger",
        };
        return `badge ${badges[status] || "bg-secondary"}`;
    };

    const getStatusText = (status) => {
        const texts = {
            pending: "Chờ xác nhận",
            confirmed: "Đã xác nhận",
            processing: "Đang xử lý",
            shipped: "Đã giao vận chuyển",
            delivered: "Đã giao hàng",
            cancelled: "Đã hủy",
        };
        return texts[status] || status;
    };

    const getPaymentStatusBadge = (status) => {
        return status === "paid" ? "bg-success" : status === "failed" ? "bg-danger" : "bg-warning";
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container py-4">
                <h3 className="mb-4 fw-bold">Quản lý đơn hàng</h3>

                <div className="card shadow-sm border-0">
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-5 text-secondary">Đang tải...</div>
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
                                                <td className="ps-4 fw-bold">#{order._id.slice(-8).toUpperCase()}</td>
                                                <td>
                                                    <div>{order.shippingAddress?.fullName || "N/A"}</div>
                                                    <small className="text-secondary">{order.shippingAddress?.phone}</small>
                                                </td>
                                                <td>{order.items.length} sản phẩm</td>
                                                <td className="fw-bold text-danger">{formatCurrency(order.totalAmount)}</td>
                                                <td className="text-center">
                                                    <span className={`badge ${getPaymentStatusBadge(order.paymentStatus)}`}>
                                                        {order.paymentStatus === "paid" ? "Đã thanh toán" : order.paymentStatus === "failed" ? "Thất bại" : "Chưa thanh toán"}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <span className={getStatusBadge(order.orderStatus)}>
                                                        {getStatusText(order.orderStatus)}
                                                    </span>
                                                </td>
                                                <td className="small">
                                                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
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

            {/* Modal chi tiết đơn hàng */}
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
                                                                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <div className="fw-semibold">{item.name}</div>
                                                                <small>
                                                                    {item.color && `Màu: ${item.color}`} {item.size && `| Size: ${item.size}`}
                                                                </small>
                                                            </td>
                                                            <td>{item.quantity}</td>
                                                            <td>{formatCurrency(item.price)}</td>
                                                            <td className="fw-bold">{formatCurrency(item.price * item.quantity)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <h6 className="fw-bold mb-3">Thông tin đơn hàng</h6>
                                        <div className="bg-light p-3 rounded">
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
                                                    <span>Giảm giá {selectedOrder.voucher?.code && `(${selectedOrder.voucher.code})`}</span>
                                                    <span>-{formatCurrency(selectedOrder.discountAmount)}</span>
                                                </div>
                                            )}
                                            <hr />
                                            <div className="d-flex justify-content-between fw-bold fs-5">
                                                <span>Tổng cộng</span>
                                                <span className="text-danger">{formatCurrency(selectedOrder.totalAmount)}</span>
                                            </div>
                                        </div>

                                        <h6 className="fw-bold mt-4 mb-3">Địa chỉ giao hàng</h6>
                                        <div className="small">
                                            <div><strong>{selectedOrder.shippingAddress.fullName}</strong></div>
                                            <div>{selectedOrder.shippingAddress.phone}</div>
                                            <div>{selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.ward},</div>
                                            <div>{selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.province}</div>
                                        </div>

                                        <h6 className="fw-bold mt-4 mb-3">Trạng thái</h6>
                                        <div>
                                            <span className={`badge ${getPaymentStatusBadge(selectedOrder.paymentStatus)} me-2`}>
                                                Thanh toán: {selectedOrder.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                                            </span>
                                            <br />
                                            <span className={`badge ${getStatusBadge(selectedOrder.orderStatus)} mt-2`}>
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

            {/* Modal cập nhật trạng thái */}
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
                                    Cập nhật trạng thái đơn hàng #{selectedOrder._id.slice(-8).toUpperCase()}
                                </h5>
                                <button className="btn-close" onClick={closeModals}></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label fw-semibold">Chọn trạng thái mới</label>
                                <select
                                    className="form-select"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                >
                                    <option value="pending">Chờ xác nhận</option>
                                    <option value="confirmed">Đã xác nhận</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="shipped">Đã giao vận chuyển</option>
                                    <option value="delivered">Đã giao hàng</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModals}>
                                    Hủy
                                </button>
                                <button className="btn btn-dark" onClick={updateOrderStatus}>
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