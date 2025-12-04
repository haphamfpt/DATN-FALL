import React, { useState } from "react";
import DeliveryInfoForm from "./Component/DeliveryInfoForm";
import OrderItemsList from "./Component/OrderItemsList";
import OrderSummary from "./Component/OrderSummary";

const cartItems = [
  {
    id: 1,
    name: "Áo Thun Thể Thao ProFlex",
    color: "Đen",
    size: "L",
    price: 450000,
    quantity: 1,
    image: "https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg",
  },
  {
    id: 2,
    name: "Quần Short Gym Training",
    color: "Xám",
    size: "M",
    price: 380000,
    quantity: 2,
    image: "https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg",
  },
  {
    id: 3,
    name: "Áo Khoác Chạy Bộ Windbreaker",
    color: "Xanh Navy",
    size: "XL",
    price: 890000,
    quantity: 1,
    image: "https://resource.nhuahvt.com/0x0/tmp/chup-anh-san-pham-phang-1596647399.jpg",
  },
];

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 35000;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="container py-5" style={{ maxWidth: "1200px" }}>
        <h2 className="fw-bold mb-5 text-center text-dark">Thanh toán đơn hàng</h2>

        <div className="row g-5">
          <div className="col-lg-8">
            <DeliveryInfoForm formData={formData} onChange={handleChange} />
            <OrderItemsList items={cartItems} />
          </div>

          <div className="col-lg-4">
            <OrderSummary
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
}