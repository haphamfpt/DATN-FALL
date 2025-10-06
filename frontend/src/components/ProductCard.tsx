import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
}

/**
 * ProductCard - Hiển thị sản phẩm thể thao
 * ✅ Bắt người dùng xem chi tiết trước khi thêm vào giỏ
 */
const ProductCard: FC<ProductCardProps> = ({ id, title, price, image }) => {
  const navigate = useNavigate();

  // Khi bấm thêm -> chuyển sang trang chi tiết
  const handleViewDetail = () => {
    navigate(`/shop/${id}`);
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

        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={handleViewDetail}
            className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Xem chi tiết
          </button>
          <button
            onClick={() => navigate(`/shop/${id}`)}
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
