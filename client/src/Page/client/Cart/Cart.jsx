import React from "react";
import CartItem from "./Component/CartItem";
import CartSummary from "./Component/CartSummary";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Áo Thun Thể Thao ProFlex",
      color: "Đen",
      size: "L",
      price: 450000,
      quantity: 1,
      image:
        "https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Quần Short Gym Training",
      color: "Xám",
      size: "M",
      price: 380000,
      quantity: 2,
      image:
        "https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Áo Khoác Chạy Bộ Windbreaker",
      color: "Xanh Navy",
      size: "XL",
      price: 890000,
      quantity: 1,
      image:
        "https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg",
      inStock: true,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 30000;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
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

              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-4">
              <a href="/" className="btn btn-outline-dark px-4">
                <i className="bi bi-arrow-left me-2"></i> Tiếp tục mua sắm
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
