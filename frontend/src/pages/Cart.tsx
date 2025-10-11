import { FC, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart: FC = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  // ✅ Danh sách voucher hợp lệ (có thể mở rộng sau)
  const validVouchers: Record<string, number> = {
    GIAM10: 0.1, // giảm 10%
    VIP20: 0.2, // giảm 20%
    FREESHIP: 0.05, // giảm 5%
  };

  // ✅ Toggle chọn 1 sản phẩm
  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ✅ Chọn tất cả
  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // ✅ Xóa sản phẩm đã chọn
  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để xóa!");
      return;
    }
    selectedItems.forEach((id) => removeFromCart(id, ""));
    setSelectedItems([]);
  };

  // ✅ Tính tổng tiền
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const selectedTotal = cart
    .filter((i) => selectedItems.includes(i.id))
    .reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ✅ Áp dụng voucher
  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      alert("Vui lòng nhập mã giảm giá!");
      return;
    }

    if (validVouchers[code]) {
      const rate = validVouchers[code];
      setDiscount(rate);
      setAppliedVoucher(code);
      alert(
        `🎉 Áp dụng thành công mã ${code}! Giảm ${(rate * 100).toFixed(0)}%`
      );
    } else {
      alert("❌ Mã giảm giá không hợp lệ!");
      setDiscount(0);
      setAppliedVoucher(null);
    }
  };

  // ✅ Thanh toán sản phẩm đã chọn
  const handleCheckoutSelected = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }

    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.id)
    );

    // ✅ Lưu sản phẩm + mã giảm giá
    const checkoutData = {
      products: selectedProducts,
      discountRate: discount,
      voucher: appliedVoucher,
    };

    sessionStorage.setItem("selectedProducts", JSON.stringify(checkoutData));
    navigate("/checkout?mode=selected");
  };

  if (cart.length === 0)
    return <p className="text-center py-20 text-gray-500">Giỏ hàng trống.</p>;

  // ✅ Tổng tiền sau giảm
  const discountedTotal = selectedTotal - selectedTotal * discount;

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Giỏ hàng</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="p-3 text-center">
              <input
                type="checkbox"
                checked={selectedItems.length === cart.length}
                onChange={toggleSelectAll}
                className="scale-125 accent-yellow-500 cursor-pointer"
              />
            </th>
            <th className="p-3 text-left">Sản phẩm</th>
            <th className="p-3 text-center">Giá</th>
            <th className="p-3 text-center">Số lượng</th>
            <th className="p-3 text-center">Thành tiền</th>
            <th className="p-3 text-center">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={`${item.id}-${item.title}`} className="border-b">
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="scale-125 accent-yellow-500 cursor-pointer"
                />
              </td>
              <td className="p-3 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded bg-gray-100"
                />
                <span>{item.title}</span>
              </td>
              <td className="p-3 text-center text-yellow-600">
                {item.price.toLocaleString("vi-VN")}đ
              </td>
              <td className="p-3 text-center">
                <div className="inline-flex border rounded items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.title, item.quantity - 1)
                    }
                    className="px-3 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.title, item.quantity + 1)
                    }
                    className="px-3 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-3 text-center font-semibold">
                {(item.price * item.quantity).toLocaleString("vi-VN")}đ
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => removeFromCart(item.id, item.title)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Voucher + tổng tiền */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Nhập mã giảm giá..."
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className="border p-2 rounded w-60"
          />
          <button
            onClick={handleApplyVoucher}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
          >
            Áp dụng
          </button>
          {appliedVoucher && (
            <p className="text-green-600 font-medium text-sm">
              ✅ Mã {appliedVoucher} được áp dụng!
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">
            Tổng tiền đã chọn:{" "}
            <span className="text-yellow-600 text-xl">
              {selectedTotal.toLocaleString("vi-VN")}đ
            </span>
          </p>
          {discount > 0 && (
            <p className="text-sm text-green-600">
              Giảm {discount * 100}% → Còn{" "}
              <span className="font-semibold">
                {discountedTotal.toLocaleString("vi-VN")}đ
              </span>
            </p>
          )}
          <button
            onClick={handleCheckoutSelected}
            className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Thanh toán sản phẩm đã chọn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
