import { FC, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

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
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }
    const order = { name, address, phone, payment, cart, total };
    console.log("Order:", order);
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
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
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
          <Link
            to="/cart"
            className="block text-center text-yellow-600 mt-3 hover:underline"
          >
            ← Quay lại giỏ hàng
          </Link>
        </form>

        {/* Tóm tắt đơn hàng */}
        <div>
          <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Chưa có sản phẩm nào.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <p className="font-semibold text-red-600">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              ))}
              <p className="text-right font-bold text-lg mt-4">
                Tổng cộng: {total.toLocaleString("vi-VN")}đ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
