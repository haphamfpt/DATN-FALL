import { FC, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

/**
 * ShopDetail Page
 * - Trang chi tiết sản phẩm
 * - Hiển thị ảnh, tên, giá, mô tả
 * - Có nút thêm giỏ hàng & mua ngay
 */
const ShopDetail: FC = () => {
  const { id } = useParams(); // lấy id từ URL, giả sử /shop/:id
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Fake dữ liệu sản phẩm (sau này thay bằng API)
  const product = {
    id: Number(id),
    title: "Áo khoác da cao cấp",
    price: 1200000,
    image: "/assets/product-3.jpg",
    description:
      "Áo khoác da nam cao cấp, thiết kế hiện đại, phong cách trẻ trung. Chất liệu mềm mại, thoải mái khi mặc.",
  };

  // Xử lý thêm giỏ
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  // Xử lý mua ngay
  const handleBuyNow = () => {
    clearCart();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate("/checkout"); // chuyển sang thanh toán
  };

  return (
    <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 🔹 Ảnh sản phẩm */}
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg shadow-lg w-full object-contain bg-gray-100"
        />
        {/* Thumbnails */}
        <div className="flex space-x-4 mt-4">
          <img
            src={product.image}
            alt="thumb1"
            className="w-20 h-20 object-contain bg-gray-100 rounded border cursor-pointer hover:opacity-80"
          />
          <img
            src="/assets/product-2.jpg"
            alt="thumb2"
            className="w-20 h-20 object-contain bg-gray-100 rounded border cursor-pointer hover:opacity-80"
          />
          <img
            src="/assets/product-4.jpg"
            alt="thumb3"
            className="w-20 h-20 object-contain bg-gray-100 rounded border cursor-pointer hover:opacity-80"
          />
        </div>
      </div>

      {/* 🔹 Thông tin sản phẩm */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-2xl text-red-600 font-semibold mb-4">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Nút mua */}
        <div className="space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Mua ngay
          </button>
        </div>

        {/* Thông tin thêm */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Thông tin thêm</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Chất liệu: Da thật</li>
            <li>Kích cỡ: S, M, L, XL</li>
            <li>Màu sắc: Đen, Nâu</li>
          </ul>
        </div>

        {/* Review ngắn */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Đánh giá</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded">
              <p className="font-semibold">Nguyễn Văn A</p>
              <p className="text-gray-600 text-sm">
                Áo đẹp, chất liệu tốt, đáng tiền!
              </p>
            </div>
            <div className="border p-4 rounded">
              <p className="font-semibold">Trần Minh</p>
              <p className="text-gray-600 text-sm">
                Form chuẩn, mặc lên rất phong cách.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
