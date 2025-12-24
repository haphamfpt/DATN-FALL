import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard, Package, Check } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price
  );

export default function OrderSummary({
  subtotal,
  shipping,
  total,
  totalItems,
  formData,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập!");
      navigate("/login");
      return;
    }

    setPlacingOrder(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: {
            fullName: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            note: formData.note || "",
          },
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Đặt hàng thất bại");

      if (paymentMethod === "online") {
        window.location.href = data.paymentUrl;
      } else {
        toast.success("Đặt hàng COD thành công!");
        navigate("/order-success", { state: { orderId: data.order._id } });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4" style={{ top: "100px" }}>
      <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Tạm tính ({totalItems} sản phẩm)</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Phí vận chuyển</span>
        <span>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fs-5 fw-bold">Tổng cộng</span>
        <span className="fs-4 fw-bold text-danger">{formatPrice(total)}</span>
      </div>

      <div className="mb-4">
        <h5 className="fw-bold mb-3">Phương thức thanh toán</h5>

        <label
          className={`d-block border rounded-3 p-3 mb-3 cursor-pointer transition-all ${
            paymentMethod === "cod"
              ? "border-danger bg-danger-subtle shadow-sm"
              : "border-light"
          }`}
          onClick={() => setPaymentMethod("cod")}
        >
          <div className="d-flex align-items-center gap-3">
            <Package
              size={28}
              className={paymentMethod === "cod" ? "text-danger" : "text-muted"}
            />
            <div className="flex-grow-1">
              <div className="fw-bold">Thanh toán khi nhận hàng (COD)</div>
              <small className="text-muted">Nhận hàng rồi mới thanh toán</small>
            </div>
            {paymentMethod === "cod" && (
              <Check size={24} className="text-danger" />
            )}
          </div>
        </label>

        <label
          className={`d-block border rounded-3 p-3 cursor-pointer transition-all ${
            paymentMethod === "online"
              ? "border-danger bg-danger-subtle shadow-sm"
              : "border-light"
          }`}
          onClick={() => setPaymentMethod("online")}
        >
          <div className="d-flex align-items-center gap-3">
            <CreditCard
              size={28}
              className={
                paymentMethod === "online" ? "text-danger" : "text-muted"
              }
            />
            <div className="flex-grow-1">
              <div className="fw-bold">Thanh toán Online (VNPay)</div>
              <small className="text-muted">
                Visa, MasterCard, ATM, Internet Banking...
              </small>
            </div>
            {paymentMethod === "online" && (
              <Check size={24} className="text-danger" />
            )}
          </div>
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className="btn btn-danger w-100 py-3 fw-bold text-uppercase mb-3"
      >
        {placingOrder ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Đang xử lý...
          </>
        ) : paymentMethod === "cod" ? (
          "Đặt hàng ngay"
        ) : (
          "Thanh toán ngay"
        )}
      </button>
    </div>
  );
}
