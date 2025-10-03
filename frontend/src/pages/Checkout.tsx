import { FC, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

/**
 * Checkout Page
 * - Hiển thị danh sách sản phẩm trong giỏ
 * - Form nhập thông tin thanh toán
 * - Gọi API tạo đơn hàng (sau này nối Laravel)
 */
const Checkout: FC = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // State lưu thông tin khách hàng
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("cod"); // cod hoặc online

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    // Fake xử lý đơn hàng (sau này gọi API Laravel)
    const order = {
      customer: { name, address, phone },
      payment,
      items: cart,
      total,
    };

    console.log("Order:", order);

    alert("Đặt hàng thành công!");
    clearCart();
    navigate("/orders"); // chuyển sang trang lịch sử đơn hàng
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* 🔹 Form thanh toán */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Phương thức thanh toán
            </label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              <option value="online">Thanh toán online</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Đặt hàng
          </button>
        </form>

        {/* 🔹 Danh sách sản phẩm */}
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
