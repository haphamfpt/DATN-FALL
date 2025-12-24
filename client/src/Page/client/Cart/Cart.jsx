import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CartItem from "./Component/CartItem.jsx"; 
import CartSummary from "./Component/CartSummary.jsx";
import { useCart } from "../../../context/CartContext.jsx"; 

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không thể tải giỏ hàng");
      }

      setCart(data);
    } catch (err) {
      console.error("Lỗi tải giỏ hàng:", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
         navigate("/login");
        return;
      }

      await fetchCart();
      setLoading(false);
    };

    loadCart();
  }, [navigate]);

  const updateQuantity = async (variantId, newQuantity) => {
    if (newQuantity < 1) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/cart/${variantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Cập nhật số lượng thất bại");

      toast.success("Đã cập nhật số lượng!");
      await fetchCart(); 
      refreshCartCount(); 
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
    }
  };

  const removeItem = async (variantId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/cart/${variantId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Xóa sản phẩm thất bại");

      toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
      await fetchCart(); 
      refreshCartCount(); 
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
    }
  };

  const cartItems = cart?.data?.items || [];
  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal >= 800000 ? 0 : 30000;
  const total = subtotal + shipping;
  const totalItems = cart?.count || 0;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-danger"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Đang tải giỏ hàng...</span>
        </div>
        <p className="mt-3 fw-bold">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <Toaster position="top-center" />
        <h3 className="mb-4 fw-bold">Giỏ hàng của bạn đang trống</h3>
        <p className="text-muted mb-4">Hãy thêm những sản phẩm bạn yêu thích nào!</p>
        <a href="/shop" className="btn btn-danger btn-lg px-5 py-3">
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        <h2
          className="fw-bold mb-5 text-center text-uppercase"
          style={{ letterSpacing: "2px" }}
        >
          Giỏ hàng của bạn
        </h2>

        <div className="row g-5">
          <div className="col-lg-8">
            <div className="bg-white rounded shadow-sm overflow-hidden">
              <div
                className="bg-light border-bottom px-4 py-3 d-none d-md-grid"
                style={{
                  gridTemplateColumns: "2fr 1fr 1.2fr 1fr 0.5fr",
                  gap: "1rem",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  color: "#555",
                }}
              >
                <div>Sản phẩm</div>
                <div className="text-center">Đơn giá</div>
                <div className="text-center">Số lượng</div>
                <div className="text-end">Thành tiền</div>
                <div></div>
              </div>

              {cartItems.map((cartItem) => {
                const item = {
                  id: cartItem._id,
                  name: cartItem.variant?.product?.name || "Sản phẩm",
                  color: cartItem.variant?.color?.attribute_color_name || "N/A",
                  size: cartItem.variant?.size?.attribute_size_name || "N/A",
                  price: cartItem.variant?.sale_price || 0,
                  quantity: cartItem.quantity,
                  image:
                    cartItem.variant?.product?.images?.[0]?.url ||
                    "/placeholder.jpg",
                  inStock:
                    (cartItem.variant?.stock || 0) >= cartItem.quantity,
                  variantId: cartItem.variant?._id,
                  maxStock: cartItem.variant?.stock || 0,
                };

                return (
                  <CartItem
                    key={cartItem._id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                );
              })}
            </div>

            <div className="mt-4">
              <a href="/shop" className="btn btn-outline-dark px-4">
                ← Tiếp tục mua sắm
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;