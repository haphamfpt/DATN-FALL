import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price || 0);

const getStatusBadge = (status) => {
  const map = {
    pending: { text: "Chờ xác nhận", color: "bg-warning text-dark" },
    confirmed: { text: "Đã xác nhận", color: "bg-primary text-white" },
    shipped: { text: "Đang giao", color: "bg-info text-white" },
    delivered: { text: "Đã giao", color: "bg-success text-white" },
    complete: { text: "Hoàn thành", color: "bg-success text-white" },
    cancelled: { text: "Đã hủy", color: "bg-danger text-white" },
    refund_pending: { text: "Đang hoàn tiền", color: "bg-warning text-dark" },
    refunded: { text: "Đã hoàn tiền", color: "bg-secondary text-white" },
  };
  return map[status] || { text: status || "Không xác định", color: "bg-secondary text-white" };
};

const getPaymentBadge = (paymentStatus, orderStatus) => {
  if (orderStatus === "cancelled" || orderStatus === "refund_pending" || orderStatus === "refunded") {
    if (orderStatus === "refund_pending") {
      return { text: "Đang hoàn tiền", color: "bg-warning text-dark" };
    }
    if (orderStatus === "refunded") {
      return { text: "Đã hoàn tiền", color: "bg-success text-white" };
    }
    return { text: "Hoàn tiền", color: "bg-warning text-dark" };
  }

  const map = {
    paid: { text: "Đã thanh toán", color: "bg-success text-white" },
    pending: { text: "Chưa thanh toán", color: "bg-warning text-dark" },
    failed: { text: "Thanh toán thất bại", color: "bg-danger text-white" },
  };

  return map[paymentStatus] || { text: paymentStatus || "Không xác định", color: "bg-secondary text-white" };
};

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Vui lòng đăng nhập để xem đơn hàng!");
        return;
      }

      try {
        const res = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Không thể tải danh sách đơn hàng");
        }

        const data = await res.json();
        setOrders(data.orders || data || []);
      } catch (err) {
        toast.error(err.message || "Lỗi khi tải đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 text-muted">Đang tải danh sách đơn hàng...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-bag fs-1 text-muted mb-3"></i>
        <p className="text-muted fs-5 mb-4">Bạn chưa có đơn hàng nào</p>
        <Link to="/shop" className="btn btn-danger btn-lg px-5">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <>
      <h4 className="fw-bold mb-4">Đơn hàng của tôi</h4>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Mã đơn</th>
              <th>Ngày đặt</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const statusInfo = getStatusBadge(order.orderStatus);
              const paymentInfo = getPaymentBadge(order.paymentStatus, order.orderStatus);

              return (
                <tr key={order._id}>
                  <td className="fw-bold">#{order._id.slice(-8).toUpperCase()}</td>
                  <td className="small">
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{order.items?.length || 0} sản phẩm</td>
                  <td className="text-danger fw-bold">{formatPrice(order.totalAmount)}</td>
                  <td>
                    <span className={`badge fs-6 px-3 py-2 ${statusInfo.color}`}>
                      {statusInfo.text}
                    </span>
                  </td>
                  <td>
                    <span className={`badge fs-6 px-3 py-2 ${paymentInfo.color}`}>
                      {paymentInfo.text}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/order/${order._id}`}
                      className="btn btn-outline-primary btn-sm px-3"
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileOrders;