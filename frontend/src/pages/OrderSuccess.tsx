import { FC } from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccess: FC = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="text-center py-20 text-gray-600">
        Không tìm thấy đơn hàng.
        <div className="mt-4">
          <Link
            to="/shop"
            className="text-yellow-600 underline hover:text-yellow-700"
          >
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Đặt hàng thành công!
      </h1>

      {order.paymentMethod === "bank" ? (
        <div className="max-w-lg mx-auto bg-yellow-50 border border-yellow-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-yellow-700 mb-3">
            Hướng dẫn chuyển khoản
          </h2>
          <p className="text-gray-700 mb-4">
            Đơn hàng của bạn đang ở trạng thái{" "}
            <b className="text-yellow-600">“Chờ chuyển khoản”</b>. Vui lòng
            chuyển khoản theo thông tin bên dưới để hoàn tất đơn hàng:
          </p>

          <div className="text-left text-gray-800">
            <p>
              🏦 <b>Ngân hàng:</b> Vietcombank (VCB)
            </p>
            <p>
              👤 <b>Chủ tài khoản:</b> NGUYEN VAN A
            </p>
            <p>
              💳 <b>Số tài khoản:</b> 0123456789
            </p>
            <p>
              📝 <b>Nội dung chuyển khoản:</b> <code>ORDER-{order.id}</code>
            </p>
            <p className="mt-2">
              💰 <b>Số tiền:</b>{" "}
              <span className="text-yellow-600 font-semibold">
                {order.total.toLocaleString("vi-VN")}đ
              </span>
            </p>
          </div>

          <p className="text-gray-600 text-sm mt-4">
            Sau khi chuyển khoản, shop sẽ xác nhận và tiến hành giao hàng cho
            bạn 💛
          </p>
        </div>
      ) : (
        <p className="mb-6 text-gray-700">
          Cảm ơn bạn đã mua hàng tại{" "}
          <span className="font-semibold">Aveline Shop</span> 💛
        </p>
      )}

      <p className="text-gray-600 mb-2">
        Mã đơn hàng:{" "}
        <span className="font-semibold text-black">#{order.id}</span>
      </p>
      <p className="text-gray-600 mb-8">
        Tổng tiền:{" "}
        <span className="text-yellow-600 font-semibold">
          {order.total.toLocaleString("vi-VN")}đ
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
