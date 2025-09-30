import { FC, useContext } from "react";
import { CartContext } from "../context/CartContext";

/**
 * Cart Page
 * - Hiển thị danh sách sản phẩm trong giỏ
 * - Cho phép xóa & hiển thị tổng tiền
 */
const Cart: FC = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng của bạn trống.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Tổng cộng: {total.toLocaleString("vi-VN")}đ
            </p>
            <button
              onClick={clearCart}
              className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
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
