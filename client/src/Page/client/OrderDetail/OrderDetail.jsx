import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import OrderTracking from "./Component/OrderTracking";
import ProductReviewForm from "./Component/ProductReviewForm"; 

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const getStatusBadge = (status) => {
  const map = {
    pending: { text: "Chờ xác nhận", color: "bg-warning text-dark" },
    confirmed: { text: "Đã xác nhận", color: "bg-primary" },
    shipped: { text: "Đang giao hàng", color: "bg-info" },
    delivered: { text: "Đã giao hàng", color: "bg-success" },
    complete: { text: "Hoàn thành", color: "bg-success" },
    cancelled: { text: "Đã hủy", color: "bg-danger" },
    refund_pending: { text: "Đang hoàn tiền", color: "bg-warning text-dark" },
    refunded: { text: "Đã hoàn tiền", color: "bg-secondary" },
  };
  return map[status] || { text: status, color: "bg-secondary" };
};

const getPaymentBadge = (status) => {
  const map = {
    paid: { text: "Đã thanh toán", color: "bg-success" },
    pending: { text: "Chưa thanh toán", color: "bg-warning text-dark" },
    failed: { text: "Thanh toán thất bại", color: "bg-danger" },
  };
  return map[status] || { text: status, color: "bg-secondary" };
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Vui lòng đăng nhập để xem chi tiết đơn hàng!");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Không thể tải đơn hàng");
        }

        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        toast.error(err.message || "Không tìm thấy đơn hàng");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này không?")) return;

    const token = localStorage.getItem("token");
    setCancelling(true);

    try {
      const res = await fetch(`/api/orders/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Hủy đơn thất bại");

      toast.success("Hủy đơn hàng thành công!");
      setOrder({ ...order, orderStatus: "cancelled" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3 fw-bold">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <Toaster position="top-center" />
        <h3>Không tìm thấy đơn hàng</h3>
        <Link to="/profile" className="btn btn-outline-dark mt-3">
          Quay lại tài khoản
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusBadge(order.orderStatus);
  const paymentInfo = getPaymentBadge(order.paymentStatus);
  const isCompleted = order.orderStatus === "complete";

  const canCancel =
    (order.orderStatus === "pending" || order.orderStatus === "confirmed") &&
    !["cancelled", "shipped", "delivered", "complete"].includes(order.orderStatus);

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1000px" }}>
        <div className="d-flex align-items-center mb-4">
          <Link to="/profile" className="btn btn-link text-dark text-decoration-none">
            ← Quay lại
          </Link>
          <h2 className="fw-bold ms-3 mb-0">
            Đơn hàng #{order._id.slice(-8).toUpperCase()}
          </h2>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <div className="row text-center text-md-start mb-4">
                <div className="col-md-4 mb-3 mb-md-0">
                  <p className="text-muted mb-1 small">Trạng thái đơn hàng</p>
                  <span className={`badge fs-6 px-4 py-2 ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <p className="text-muted mb-1 small">Thanh toán</p>
                  <span className={`badge fs-6 px-4 py-2 ${paymentInfo.color}`}>
                    {paymentInfo.text}
                  </span>
                </div>
                <div className="col-md-4">
                  <p className="text-muted mb-1 small">Ngày đặt hàng</p>
                  <p className="fw-bold">
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <OrderTracking status={order.orderStatus} />

              {canCancel && (
                <div className="mt-4 text-end">
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="btn btn-outline-danger px-4"
                  >
                    {cancelling ? "Đang xử lý..." : "Hủy đơn hàng"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h5 className="fw-bold mb-4">Thông tin nhận hàng</h5>
              <div className="text-muted">
                <p className="mb-2">
                  <strong>Người nhận:</strong> {order.shippingAddress.fullName}
                </p>
                <p className="mb-2">
                  <strong>Số điện thoại:</strong> {order.shippingAddress.phone}
                </p>
                <p className="mb-2">
                  <strong>Địa chỉ:</strong> {order.shippingAddress.address}
                </p>
                {order.shippingAddress.note && (
                  <p className="mb-0">
                    <strong>Ghi chú:</strong> {order.shippingAddress.note}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h5 className="fw-bold mb-4">Tóm tắt thanh toán</h5>
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Tạm tính ({order.items.length} sản phẩm)</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Phí vận chuyển</span>
                <span>{order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}</span>
              </div>
              {order.discountAmount > 0 && order.voucher && (
                <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                  <span>Giảm giá (mã {order.voucher.code})</span>
                  <span>- {formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <hr className="my-3" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5">Tổng cộng</span>
                <span className="text-danger fw-bold fs-4">{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="mt-3 small text-muted">
                Phương thức:{" "}
                <strong>
                  {order.paymentMethod === "cod"
                    ? "Thanh toán khi nhận hàng (COD)"
                    : "Thanh toán Online (VNPay)"}
                </strong>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h5 className="fw-bold mb-4">
                Sản phẩm trong đơn hàng
                {isCompleted && (
                  <span className="text-success ms-3 small fw-normal">
                    (Bạn có thể đánh giá từng sản phẩm)
                  </span>
                )}
              </h5>

              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="d-flex gap-4 py-4 border-bottom"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="rounded shadow-sm"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />

                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-2">{item.name}</h6>

                    <div className="small text-muted mb-3">
                      <span className="me-4">
                        Màu: <strong>{item.color || "Không có"}</strong>
                      </span>
                      <span>
                        Size: <strong>{item.size || "Không có"}</strong>
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="text-danger fw-bold fs-5">{formatPrice(item.price)}</span>
                        <span className="text-muted ms-2">× {item.quantity}</span>
                      </div>
                      <strong className="fs-5">{formatPrice(item.price * item.quantity)}</strong>
                    </div>

                    {isCompleted && (
                      <ProductReviewForm
                        productId={item.product}
                        productName={item.name}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;