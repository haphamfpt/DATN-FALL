import { FC, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

/**
 * ShopDetail Page - Sportwear Theme
 * - Trang chi tiết sản phẩm thể thao
 * - Hiển thị ảnh, tên, giá, mô tả
 * - Có nút thêm giỏ hàng & mua ngay
 */
const ShopDetail: FC = () => {
  const { id } = useParams();
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔹 Fake dữ liệu sản phẩm (sau này thay bằng API)
  const product = {
    id: Number(id),
    title: "Áo thun thể thao Nike Dri-FIT",
    price: 650000,
    image: "/assets/sport-product-1.jpg",
    description:
      "Áo thun thể thao Nike Dri-FIT giúp thấm hút mồ hôi nhanh, mang lại cảm giác khô thoáng và thoải mái khi luyện tập. Chất liệu co giãn 4 chiều, nhẹ và thoáng khí.",
  };

  // 🔹 Xử lý thêm vào giỏ
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  // 🔹 Xử lý mua ngay
  const handleBuyNow = () => {
    clearCart();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 🔹 Ảnh sản phẩm */}
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg shadow-lg w-full h-[450px] object-contain bg-gray-100"
        />

        {/* Thumbnail nhỏ */}
        <div className="flex space-x-4 mt-4">
          <img
            src="/assets/sport-product-1.jpg"
            alt="thumb1"
            className="w-20 h-20 object-contain bg-gray-100 rounded border cursor-pointer hover:opacity-80"
          />
          <img
            src="/assets/sport-product-2.jpg"
            alt="thumb2"
            className="w-20 h-20 object-contain bg-gray-100 rounded border cursor-pointer hover:opacity-80"
          />
          <img
            src="/assets/sport-product-3.jpg"
            alt="thumb3"
            className="w-20 h-20 object-contain bg-gray-100 rounded border cursor-pointer hover:opacity-80"
          />
        </div>
      </div>

      {/* 🔹 Thông tin sản phẩm */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {product.title}
        </h1>
        <p className="text-2xl text-yellow-600 font-semibold mb-4">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Nút mua */}
        <div className="space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Mua ngay
          </button>
        </div>

        {/* Thông tin thêm */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Thông tin chi tiết
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Chất liệu: 92% Polyester, 8% Spandex</li>
            <li>Công nghệ: Nike Dri-FIT hút ẩm nhanh</li>
            <li>Màu sắc: Đen, Xanh navy, Trắng</li>
            <li>Kích cỡ: S, M, L, XL</li>
          </ul>
        </div>

        {/* Review */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Đánh giá</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded bg-gray-50">
              <p className="font-semibold">Nguyễn Hữu Long</p>
              <p className="text-gray-600 text-sm">
                Áo mặc rất thoáng, thấm mồ hôi cực tốt. Mình dùng khi đá bóng
                thấy dễ chịu!
              </p>
            </div>
            <div className="border p-4 rounded bg-gray-50">
              <p className="font-semibold">Trần Minh Tuấn</p>
              <p className="text-gray-600 text-sm">
                Form chuẩn, chất co giãn tốt, giặt không bị bai màu. Quá ưng!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
