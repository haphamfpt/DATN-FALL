import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import OrderTracking from "./Component/OrderTracking";
import ProductReviewForm from "./Component/ProductReviewForm";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price || 0
  );

const getStatusBadge = (status) => {
  const map = {
    pending: { text: "Chờ xác nhận", color: "bg-warning text-dark" },
    confirmed: { text: "Đã xác nhận", color: "bg-primary text-white" },
    shipped: { text: "Đang giao hàng", color: "bg-info text-white" },
    delivered: { text: "Đã giao hàng", color: "bg-success text-white" },
    complete: { text: "Hoàn thành", color: "bg-success text-white" },
    cancelled: { text: "Đã hủy", color: "bg-danger text-white" },
    refund_pending: {
      text: "Đang xử lý hoàn tiền",
      color: "bg-warning text-dark",
    },
    refunded: { text: "Đã hoàn tiền", color: "bg-secondary text-white" },
  };
  return (
    map[status] || {
      text: status || "Không xác định",
      color: "bg-secondary text-white",
    }
  );
};

const getPaymentBadge = (status) => {
  const map = {
    paid: { text: "Đã thanh toán", color: "bg-success text-white" },
    pending: { text: "Chưa thanh toán", color: "bg-warning text-dark" },
    failed: { text: "Thanh toán thất bại", color: "bg-danger text-white" },
  };
  return (
    map[status] || {
      text: status || "Không xác định",
      color: "bg-secondary text-white",
    }
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [refund, setRefund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [confirmingReceived, setConfirmingReceived] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để xem chi tiết đơn hàng!");
        setTimeout(() => navigate("/login"), 1800);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "Không thể tải thông tin đơn hàng"
          );
        }

        const data = await res.json();
        setOrder(data.order);
        setRefund(data.refund || null);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Không tìm thấy đơn hàng");
        setTimeout(() => navigate("/profile"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const getDisplayStatus = () => {
    if (!order) return "unknown";

    if (refund?.refund_status === "pending") return "refund_pending";
    if (refund?.refund_status === "success") return "refunded";
    if (
      refund?.refund_status === "failed" ||
      refund?.refund_status === "rejected"
    ) {
      return "cancelled";
    }

    return order.orderStatus;
  };

  const getEffectivePaymentInfo = () => {
    if (refund) {
      const refundStatus = refund.refund_status;

      if (refundStatus === "pending" || refundStatus === "confirm") {
        return { text: "Đang hoàn tiền", color: "bg-warning text-dark" };
      }
      if (refundStatus === "success") {
        return { text: "Đã hoàn tiền", color: "bg-success text-white" };
      }
      if (refundStatus === "failed" || refundStatus === "rejected") {
        return { text: "Hoàn tiền thất bại", color: "bg-danger text-white" };
      }
    }

    return getPaymentBadge(order?.paymentStatus);
  };

  const displayStatus = getDisplayStatus();
  const statusInfo = getStatusBadge(displayStatus);
  const paymentInfo = getEffectivePaymentInfo();

  const canCancel =
    ["pending", "confirmed"].includes(order?.orderStatus) &&
    !["pending", "success", "confirm"].includes(refund?.refund_status);

  const canCancelOnline =
    canCancel && order?.paymentMethod === "online" && refund === null;

  const canConfirmReceived = order?.orderStatus === "delivered";

  const isOrderCompleted = order?.orderStatus === "complete";

  const handleCancelOrder = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    setCancelling(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Hủy đơn hàng thất bại");

      toast.success("Hủy đơn hàng thành công!");
      setOrder((prev) => ({ ...prev, orderStatus: "cancelled" }));
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra khi hủy đơn");
    } finally {
      setCancelling(false);
    }
  };

  const handleConfirmReceived = async () => {
    if (
      !window.confirm(
        "Xác nhận bạn đã nhận được hàng và muốn hoàn thành đơn hàng?"
      )
    )
      return;

    setConfirmingReceived(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/orders/${id}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xác nhận thất bại");

      toast.success("Đã xác nhận nhận hàng thành công!");
      setOrder((prev) => ({ ...prev, orderStatus: "complete" }));
    } catch (err) {
      toast.error(err.message || "Không thể xác nhận nhận hàng");
    } finally {
      setConfirmingReceived(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3.5rem", height: "3.5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fw-bold text-muted">
          Đang tải thông tin đơn hàng...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <Toaster position="top-center" />
        <h4 className="text-muted">Không tìm thấy đơn hàng</h4>
        <Link to="/profile" className="btn btn-outline-primary mt-3 px-4">
          Quay lại trang cá nhân
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1100px" }}>
        <div className="d-flex align-items-center mb-4">
          <Link
            to="/profile"
            className="btn btn-link text-dark text-decoration-none ps-0"
          >
            ← Quay lại đơn hàng
          </Link>
          <h2 className="fw-bold ms-3 mb-0">
            Đơn hàng #{order._id?.slice(-8)?.toUpperCase() || "—"}
          </h2>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="row text-center text-md-start mb-4 g-3">
                <div className="col-md-4">
                  <p className="text-muted mb-1 small fw-medium">Trạng thái</p>
                  <span className={`badge fs-6 px-4 py-2 ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>

                <div className="col-md-4">
                  <p className="text-muted mb-1 small fw-medium">Thanh toán</p>
                  <span className={`badge fs-6 px-4 py-2 ${paymentInfo.color}`}>
                    {paymentInfo.text}
                  </span>
                </div>

                <div className="col-md-4">
                  <p className="text-muted mb-1 small fw-medium">Ngày đặt</p>
                  <p className="fw-medium">
                    {new Date(order.createdAt).toLocaleString("vi-VN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>

              <OrderTracking status={order.orderStatus} />

              <div className="mt-4 text-end">
                {canCancel && order.paymentMethod === "cod" && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="btn btn-outline-danger px-4 me-2"
                  >
                    {cancelling ? "Đang xử lý..." : "Hủy đơn hàng"}
                  </button>
                )}

                {canCancelOnline && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="btn btn-outline-danger px-4 me-2"
                  >
                    {cancelling ? "Đang xử lý..." : "Hủy & Yêu cầu hoàn tiền"}
                  </button>
                )}

                {refund?.refund_status === "pending" && (
                  <button className="btn btn-warning px-4 me-2" disabled>
                    ⏳ Đang xử lý hoàn tiền
                  </button>
                )}

                {refund?.refund_status === "success" && (
                  <button className="btn btn-secondary px-4 me-2" disabled>
                    ✓ Đã hoàn tiền
                  </button>
                )}

                {canConfirmReceived && (
                  <button
                    onClick={handleConfirmReceived}
                    disabled={confirmingReceived}
                    className="btn btn-success px-4"
                  >
                    {confirmingReceived
                      ? "Đang xử lý..."
                      : "Tôi đã nhận được hàng"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-bold mb-4">Thông tin nhận hàng</h5>
              <div className="text-muted small">
                <p className="mb-2">
                  <strong>Người nhận:</strong>{" "}
                  {order.shippingAddress?.fullName || "—"}
                </p>
                <p className="mb-2">
                  <strong>SĐT:</strong> {order.shippingAddress?.phone || "—"}
                </p>
                <p className="mb-2">
                  <strong>Địa chỉ:</strong>{" "}
                  {order.shippingAddress?.address || "—"}
                </p>
                {order.shippingAddress?.note && (
                  <p className="mb-0">
                    <strong>Ghi chú:</strong> {order.shippingAddress.note}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
              <h5 className="fw-bold mb-4">Tóm tắt thanh toán</h5>
              <div className="d-flex justify-content-between mb-2 text-muted small">
                <span>Tạm tính ({order.items?.length || 0} sản phẩm)</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-muted small">
                <span>Phí vận chuyển</span>
                <span>
                  {order.shippingFee > 0
                    ? formatPrice(order.shippingFee)
                    : "Miễn phí"}
                </span>
              </div>
              {order.discountAmount > 0 && order.voucher && (
                <div className="d-flex justify-content-between mb-2 text-success small fw-bold">
                  <span>Giảm ({order.voucher.code})</span>
                  <span>-{formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <hr className="my-3" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5">Tổng cộng</span>
                <span className="text-danger fw-bold fs-4">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>
              <div className="mt-3 small text-muted">
                Phương thức:{" "}
                <strong>
                  {order.paymentMethod === "cod"
                    ? "Thanh toán khi nhận hàng (COD)"
                    : "Thanh toán trực tuyến (VNPay)"}
                </strong>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-4">
                Sản phẩm trong đơn hàng
                {isOrderCompleted && (
                  <span className="text-success ms-3 small fw-normal">
                    (Bạn có thể đánh giá sản phẩm)
                  </span>
                )}
              </h5>

              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="d-flex gap-4 py-4 border-bottom"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <img
                    src={item.image || "/images/placeholder-product.jpg"}
                    alt={item.name}
                    className="rounded shadow-sm object-fit-cover"
                    style={{ width: "100px", height: "100px" }}
                    onError={(e) =>
                      (e.target.src = "/images/placeholder-product.jpg")
                    }
                  />

                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-2">{item.name}</h6>

                    <div className="small text-muted mb-3">
                      {item.color && (
                        <span className="me-4">
                          Màu: <strong>{item.color}</strong>
                        </span>
                      )}
                      {item.size && (
                        <span>
                          Size: <strong>{item.size}</strong>
                        </span>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
                      <div>
                        <span className="text-danger fw-bold fs-5">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-muted ms-2">
                          × {item.quantity}
                        </span>
                      </div>
                      <strong className="fs-5">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>

                    {isOrderCompleted && (
                      <ProductReviewForm
                        productId={
                          typeof item.product === "object"
                            ? item.product._id
                            : item.product
                        }
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
