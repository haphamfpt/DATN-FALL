import { FC } from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess: FC = () => {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Đặt hàng thành công!
      </h1>
      <p className="mb-6 text-gray-700">
        Cảm ơn bạn đã mua hàng tại{" "}
        <span className="font-semibold">Aveline Shop</span> 💛
      </p>
      <p className="text-gray-600 mb-4">
        Mã đơn hàng:{" "}
        <span className="font-semibold text-black">#{order?.id}</span>
      </p>
      <p className="text-gray-600 mb-8">
        Tổng tiền:{" "}
        <span className="text-yellow-600 font-semibold">
          {order?.total.toLocaleString("vi-VN")}đ
        </span>
      </p>
      <Link
        to="/shop"
        className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
      >
        Tiếp tục mua hàng
      </Link>
    </div>
  );
};

export default OrderSuccess;
