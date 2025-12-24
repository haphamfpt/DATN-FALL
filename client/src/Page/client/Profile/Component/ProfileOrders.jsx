import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Không thể tải đơn hàng");

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        toast.error(err.message || "Lỗi khi tải đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center">Đang tải đơn hàng...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-bag fs-1 text-muted mb-3"></i>
        <p className="text-muted fs-5">Bạn chưa có đơn hàng nào</p>
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
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="fw-bold">#{order._id.slice(-8)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
                <td>{order.items.length} sản phẩm</td>
                <td className="text-danger fw-bold">{formatPrice(order.totalAmount)}</td>
                <td>
                  <span className={`badge ${
                    order.orderStatus === "delivered" ? "bg-success" :
                    order.orderStatus === "cancelled" ? "bg-danger" :
                    "bg-warning"
                  }`}>
                    {order.orderStatus === "pending" ? "Chờ xác nhận" :
                     order.orderStatus === "confirmed" ? "Đã xác nhận" :
                     order.orderStatus === "shipped" ? "Đang giao" :
                     order.orderStatus === "delivered" ? "Đã giao" :
                     "Đã hủy"}
                  </span>
                </td>
                <td>
                  <span className={`badge ${order.paymentStatus === "paid" ? "bg-success" : "bg-secondary"}`}>
                    {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                  </span>
                </td>
                <td>
                  <Link to={`/order/${order._id}`} className="btn btn-outline-primary btn-sm">
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileOrders;