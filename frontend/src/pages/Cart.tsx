import { FC, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart: FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Giỏ hàng của bạn</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng của bạn trống.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">Sản phẩm</th>
                  <th className="p-3 text-center">Giá</th>
                  <th className="p-3 text-center">Số lượng</th>
                  <th className="p-3 text-center">Thành tiền</th>
                  <th className="p-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={`${item.id}-${item.title}`} className="border-b">
                    <td className="p-3 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded bg-gray-100"
                      />
                      <span>{item.title}</span>
                    </td>
                    <td className="p-3 text-center text-yellow-600 font-medium">
                      {item.price.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="p-3 text-center">
                      <div className="inline-flex border rounded items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.title,
                              item.quantity - 1
                            )
                          }
                          className="px-3 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.title,
                              item.quantity + 1
                            )
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
          </div>

          <div className="mt-8 text-right">
            <p className="text-xl font-bold">
              Tổng cộng:{" "}
              <span className="text-yellow-600">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </p>
            <button
              onClick={clearCart}
              className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
