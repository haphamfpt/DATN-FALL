import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
}

/**
 * ProductCard
 * - Hiển thị sản phẩm thể thao
 * - Có nút "Thêm vào giỏ hàng" và "Mua ngay"
 */
const ProductCard: FC<ProductCardProps> = ({ id, title, price, image }) => {
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Lấy số từ chuỗi giá (vd: "650.000đ" -> 650000)
  const numericPrice = Number(price.replace(/[^\d]/g, ""));

  // ✅ Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price: numericPrice,
      image,
      quantity: 1,
    });
  };

  // ✅ Mua ngay
  const handleBuyNow = () => {
    clearCart();
    addToCart({
      id,
      title,
      price: numericPrice,
      image,
      quantity: 1,
    });
    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform hover:-translate-y-1">
      {/* Khi click vào ảnh hoặc tên -> sang trang chi tiết */}
      <Link to={`/shop/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-contain bg-gray-100"
        />
      </Link>

      <div className="p-4 text-center">
        <Link
          to={`/shop/${id}`}
          className="block font-semibold text-gray-800 hover:text-yellow-600"
        >
          {title}
        </Link>
        <p className="text-yellow-600 mt-1 font-medium">{price}</p>

        {/* 🔹 Nút hành động */}
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Thêm vào giỏ hàng
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
