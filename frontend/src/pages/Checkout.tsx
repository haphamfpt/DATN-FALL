import { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout: FC = () => {
  const { cart } = useContext(CartContext);
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [voucher, setVoucher] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Lấy danh sách sản phẩm và mã giảm giá
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");

    if (mode === "selected") {
      const selectedData = sessionStorage.getItem("selectedProducts");
      if (selectedData) {
        const parsed = JSON.parse(selectedData);
        setCheckoutItems(parsed.products || []);
        setDiscountRate(parsed.discountRate || 0);
        setVoucher(parsed.voucher || null);
      }
    } else {
      setCheckoutItems(cart);
    }
  }, [location, cart]);

  // ✅ Lấy dữ liệu người dùng lưu trước đó
  useEffect(() => {
    const savedInfo = localStorage.getItem("checkoutInfo");
    if (savedInfo) {
      setFormData(JSON.parse(savedInfo));
    }
  }, []);

  // ✅ Lưu form mỗi khi người dùng nhập
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    localStorage.setItem("checkoutInfo", JSON.stringify(updated)); // Tự động lưu
  };

  // ✅ Tính toán tiền
  const totalBeforeDiscount = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = totalBeforeDiscount * discountRate;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  // ✅ Xác nhận thanh toán
  const handleConfirmOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: formData,
      products: checkoutItems,
      total: totalAfterDiscount,
      discountRate,
      voucher,
      createdAt: new Date().toLocaleString(),
    };

    // Lưu đơn hàng vào localStorage (giả lập backend)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // ✅ Dọn session và điều hướng
    sessionStorage.removeItem("selectedProducts");
    navigate("/order-success", { state: { order } });
  };

  if (checkoutItems.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500">
        Không có sản phẩm để thanh toán.
      </p>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
        💳 Thanh toán đơn hàng
      </h1>

      {/* 🔹 SẢN PHẨM */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Sản phẩm trong đơn
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-center">Giá</th>
              <th className="p-3 text-center">Số lượng</th>
              <th className="p-3 text-center">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {checkoutItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded bg-gray-50"
                  />
                  <span className="font-medium text-gray-800">
                    {item.title}
                  </span>
                </td>
                <td className="p-3 text-center text-yellow-600 font-medium">
                  {item.price.toLocaleString("vi-VN")}đ
                </td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-center font-semibold">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-6 space-y-1">
          <p className="text-gray-600">
            Tổng trước giảm:{" "}
            <span className="font-medium">
              {totalBeforeDiscount.toLocaleString("vi-VN")}đ
            </span>
          </p>

          {discountRate > 0 && (
            <>
              <p className="text-green-600">
                Mã giảm giá <span className="font-semibold">{voucher}</span> áp
                dụng: <span>-{(discountRate * 100).toFixed(0)}%</span>
              </p>
              <p className="text-gray-600">
                Giảm:{" "}
                <span className="font-medium">
                  -{discountAmount.toLocaleString("vi-VN")}đ
                </span>
              </p>
            </>
          )}

          <p className="text-xl font-bold text-gray-800 mt-3">
            Tổng thanh toán:{" "}
            <span className="text-yellow-600">
              {totalAfterDiscount.toLocaleString("vi-VN")}đ
            </span>
          </p>
        </div>
      </section>

      {/* 🔹 THÔNG TIN NGƯỜI NHẬN */}
      <section className="mb-10 bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Thông tin giao hàng
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
        </div>
        <textarea
          name="address"
          placeholder="Địa chỉ nhận hàng"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
          rows={3}
          required
        ></textarea>
        <textarea
          name="note"
          placeholder="Ghi chú cho đơn hàng (nếu có)"
          value={formData.note}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
          rows={2}
        ></textarea>
      </section>

      {/* 🔹 PHƯƠNG THỨC THANH TOÁN */}
      <section className="mb-10 bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Phương thức thanh toán
        </h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleChange}
              className="accent-yellow-500"
            />
            <span>Thanh toán khi nhận hàng (COD)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={formData.paymentMethod === "bank"}
              onChange={handleChange}
              className="accent-yellow-500"
            />
            <span>Chuyển khoản ngân hàng</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="momo"
              checked={formData.paymentMethod === "momo"}
              onChange={handleChange}
              className="accent-yellow-500"
            />
            <span>Thanh toán qua ví MoMo</span>
          </label>
        </div>
      </section>

      <div className="text-right">
        <button
          onClick={handleConfirmOrder}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default Checkout;
