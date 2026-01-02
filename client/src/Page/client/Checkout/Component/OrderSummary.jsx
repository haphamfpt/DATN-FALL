import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard, Package, Check, Tag, Clipboard, X } from "lucide-react";

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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setVoucherCode(text.trim().toUpperCase());
      toast.success("Đã dán mã!");
    } catch (err) {
      toast.error("Không thể dán mã. Vui lòng thử lại!");
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error("Vui lòng nhập hoặc dán mã giảm giá!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để sử dụng mã giảm giá!");
      navigate("/login");
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
        throw new Error(data.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn");
      }

      setDiscount(data.discountAmount || 0);
      setAppliedVoucher({
        code: voucherCode.toUpperCase(),
        discountAmount: data.discountAmount || 0,
        type: data.voucher?.voucher_type,
        value: data.voucher?.voucher_value,
        max_price: data.voucher?.max_price || 0,
      });
      setVoucherCode("");
      toast.success(
        `Áp dụng mã "${voucherCode.toUpperCase()}" thành công! Giảm ${formatPrice(
          data.discountAmount
        )}`
      );
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
        toast.success("Đặt hàng thành công!");
        navigate("/order-success", { state: { orderId: data.order._id } });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: "100px" }}>
      <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <Tag size={22} className="text-danger" />
        Tóm tắt đơn hàng
      </h4>

      <div className="mb-4 p-3 border rounded-3 bg-light">
        <h6 className="fw-bold mb-3">Mã giảm giá</h6>

        {appliedVoucher ? (
          <div className="bg-success-subtle border border-success rounded-3 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-bold text-success fs-5 me-3">
                  {appliedVoucher.code}
                </span>
                <span className="text-success fw-bold">
                  − {formatPrice(appliedVoucher.discountAmount)}
                </span>
              </div>
              <button
                onClick={handleRemoveVoucher}
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              >
                <X size={16} />
                Bỏ
              </button>
            </div>
          </div>
        ) : (
          <div className="input-group"> 
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
              className="btn btn-outline-secondary"
              type="button"
              onClick={handlePaste}
              title="Dán mã"
              disabled={applyingVoucher}
            >
              <Clipboard size={18} />
            </button>
            <button
              onClick={handleApplyVoucher}
              disabled={applyingVoucher || !voucherCode.trim()}
              className="btn btn-danger fw-bold"
            >
              {applyingVoucher ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Áp dụng"
              )}
            </button>
          </div>
        )}

        <small className="text-muted d-block mt-2">
          Dán mã từ trang khuyến mãi hoặc sao chép từ nơi khác
        </small>
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
          <span>Giảm giá (mã {appliedVoucher.code})</span>
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
          className={`d-block border rounded-3 p-3 mb-3 cursor-pointer transition-all ${paymentMethod === "cod"
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
          className={`d-block border rounded-3 p-3 cursor-pointer transition-all ${paymentMethod === "online"
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
              <small className="text-muted">Visa, MasterCard, ATM...</small>
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