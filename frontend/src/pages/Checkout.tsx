import { FC, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout: FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("cod");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Giỏ hàng trống!");

    console.log("Order:", { name, address, phone, payment, cart });
    alert("✅ Đặt hàng thành công!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Họ và tên"
            required
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            required
            className="w-full border px-4 py-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            required
            className="w-full border px-4 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="online">Thanh toán online</option>
          </select>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Đặt hàng
          </button>
        </form>

        <div>
          <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Chưa có sản phẩm nào.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.title}
                className="flex justify-between mb-2 border-b pb-2"
              >
                <span>{item.title}</span>
                <span>
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </span>
              </div>
            ))
          )}
          <p className="text-right font-bold mt-4 text-lg">
            Tổng cộng: {total.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
