import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard, Package, Check, Tag } from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export default function OrderSummary({
  subtotal,
  shipping,
  total,
  totalItems,
  formData,
  cart, 
}) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [applyingVoucher, setApplyingVoucher] = useState(false);
  const [discount, setDiscount] = useState(0); 
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const navigate = useNavigate();

  const finalTotal = total - discount;

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập!");
      return;
    }

    setApplyingVoucher(true);

    try {
      const res = await fetch("/api/vouchers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: voucherCode.trim().toUpperCase(),
          subtotal,
          cartItems: cart?.data?.items || [], 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Mã giảm giá không hợp lệ");
      }

      setDiscount(data.discountAmount);
      setAppliedVoucher(data.voucher);
      toast.success(`Áp dụng mã "${voucherCode.toUpperCase()}" thành công! Giảm ${formatPrice(data.discountAmount)}`);
      setVoucherCode("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setApplyingVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setDiscount(0);
    setAppliedVoucher(null);
    setVoucherCode("");
    toast.success("Đã bỏ áp dụng mã giảm giá");
  };

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
      const orderData = {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          note: formData.note || "",
        },
        paymentMethod,
      };

      if (appliedVoucher) {
        orderData.voucherCode = appliedVoucher.code;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
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
    <div className="bg-white rounded-3 shadow-sm p-4" style={{ position: "sticky", top: "100px" }}>
      <h4 className="fw-bold mb-4">Tóm tắt đơn hàng</h4>

      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <Tag size={20} className="text-danger" />
          <h5 className="fw-bold mb-0">Mã giảm giá</h5>
        </div>

        {appliedVoucher ? (
          <div className="border rounded-3 p-3 bg-success-subtle border-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-bold text-success me-2">{appliedVoucher.code}</span>
                <small className="text-success">− {formatPrice(discount)}</small>
              </div>
              <button
                onClick={handleRemoveVoucher}
                className="btn btn-sm btn-outline-danger"
              >
                Bỏ áp dụng
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mã giảm giá"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleApplyVoucher()}
              disabled={applyingVoucher}
            />
            <button
              onClick={handleApplyVoucher}
              disabled={applyingVoucher || !voucherCode.trim()}
              className="btn btn-outline-danger px-4"
            >
              {applyingVoucher ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Áp dụng"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Tạm tính ({totalItems} sản phẩm)</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="d-flex justify-content-between mb-3 text-muted">
        <span>Phí vận chuyển</span>
        <span>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
      </div>

      {discount > 0 && (
        <div className="d-flex justify-content-between mb-3 text-success fw-bold">
          <span>Giảm giá</span>
          <span>- {formatPrice(discount)}</span>
        </div>
      )}

      <hr className="my-4" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fs-5 fw-bold">Tổng cộng</span>
        <span className="fs-4 fw-bold text-danger">{formatPrice(finalTotal)}</span>
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
            {paymentMethod === "cod" && <Check size={24} className="text-danger" />}
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
              className={paymentMethod === "online" ? "text-danger" : "text-muted"}
            />
            <div className="flex-grow-1">
              <div className="fw-bold">Thanh toán Online (VNPay)</div>
              <small className="text-muted">Visa, MasterCard, ATM, Internet Banking...</small>
            </div>
            {paymentMethod === "online" && <Check size={24} className="text-danger" />}
          </div>
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={placingOrder}
        className="btn btn-danger w-100 py-3 fw-bold text-uppercase"
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