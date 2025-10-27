import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Order {
  id: number;
  total: number;
  discountRate?: number;
  voucher?: string | null;
  paymentMethod: string;
  status: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
}

const OrdersHistory: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsed = JSON.parse(storedOrders);
        setOrders(parsed.reverse()); // mới nhất lên đầu
      } catch (err) {
        console.error("❌ Lỗi đọc đơn hàng:", err);
      }
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        Bạn chưa có đơn hàng nào.
        <div className="mt-4">
          <Link
            to="/shop"
            className="text-yellow-600 underline hover:text-yellow-700"
          >
            Mua sắm ngay →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center md:text-left">
        🧾 Lịch sử đơn hàng
      </h1>

      {/* 🔹 Danh sách đơn hàng */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="p-3 text-left">Mã đơn</th>
              <th className="p-3 text-left">Ngày đặt</th>
              <th className="p-3 text-center">Tổng tiền</th>
              <th className="p-3 text-center">Phương thức</th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium text-gray-800">#{order.id}</td>
                <td className="p-3 text-gray-600">{order.createdAt}</td>
                <td className="p-3 text-center text-yellow-600 font-semibold">
                  {order.total.toLocaleString("vi-VN")}đ
                </td>
                <td className="p-3 text-center capitalize">
                  {order.paymentMethod === "cod"
                    ? "COD"
                    : order.paymentMethod === "bank"
                      ? "Chuyển khoản"
                      : "MoMo"}
                </td>
                <td
                  className={`p-3 text-center font-medium ${
                    order.status.includes("Chờ")
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:underline"
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🧾 Chi tiết đơn hàng #{selectedOrder.id}
            </h2>
            <p className="text-gray-600 mb-2">
              Ngày đặt: <b>{selectedOrder.createdAt}</b>
            </p>
            <p className="text-gray-600 mb-2">
              Người nhận: <b>{selectedOrder.customer.name}</b> -{" "}
              {selectedOrder.customer.phone}
            </p>
            <p className="text-gray-600 mb-4">
              Địa chỉ: <b>{selectedOrder.customer.address}</b>
            </p>

            <table className="w-full border-collapse mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Sản phẩm</th>
                  <th className="p-2 text-center">Giá</th>
                  <th className="p-2 text-center">SL</th>
                  <th className="p-2 text-center">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.products.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2 flex items-center gap-3">
                      <img
                        src={
                          p.image ||
                          "https://via.placeholder.com/60x60?text=No+Image"
                        }
                        alt={p.title}
                        className="w-12 h-12 object-cover rounded bg-gray-50"
                      />
                      <span>{p.title}</span>
                    </td>
                    <td className="p-2 text-center text-gray-700">
                      {p.price.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="p-2 text-center">{p.quantity}</td>
                    <td className="p-2 text-center font-medium text-yellow-600">
                      {(p.price * p.quantity).toLocaleString("vi-VN")}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right">
              <p className="text-gray-600">
                Tổng tiền:{" "}
                <span className="font-semibold text-yellow-600">
                  {selectedOrder.total.toLocaleString("vi-VN")}đ
                </span>
              </p>
              <p className="text-gray-600">
                Trạng thái:{" "}
                <span
                  className={`font-semibold ${
                    selectedOrder.status.includes("Chờ")
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
