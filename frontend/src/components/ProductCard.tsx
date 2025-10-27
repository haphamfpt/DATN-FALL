import { FC } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"; // ⭐ Icon thư viện lucide-react

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  rating?: number; // ✅ Cho phép rating thập phân (VD: 4.5)
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  rating = 5,
}) => {
  // 🔹 Tính toán số sao đầy, nửa sao
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition-transform hover:-translate-y-1">
      <Link to={`/shop/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-contain bg-gray-50"
        />
      </Link>

      <div className="p-4 text-center">
        <Link
          to={`/shop/${id}`}
          className="block font-semibold text-gray-800 hover:text-yellow-600"
        >
          {title}
        </Link>

        {/* ⭐ Hiển thị sao và số đánh giá */}
        <div className="flex flex-col items-center gap-1 my-2">
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const isFull = index < fullStars;
              const isHalf = index === fullStars && hasHalfStar;

              return (
                <div key={index} className="relative w-5 h-5">
                  {/* ⭐ Nền sao xám */}
                  <Star className="text-gray-300 absolute inset-0" size={20} />
                  {/* ⭐ Sao vàng đầy */}
                  {isFull && (
                    <Star
                      className="text-yellow-500 fill-yellow-500 absolute inset-0"
                      size={20}
                    />
                  )}
                  {/* ⭐ Sao nửa vàng */}
                  {isHalf && (
                    <div className="absolute inset-0 overflow-hidden w-[50%]">
                      <Star
                        className="text-yellow-500 fill-yellow-500 absolute left-0"
                        size={20}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* 💬 Text đánh giá */}
          <span className="text-sm text-gray-600">
            {rating}/5 ({Math.floor(Math.random() * 150) + 50} đánh giá)
          </span>
        </div>

        <p className="text-yellow-600 font-semibold text-lg">{price}</p>

        <div className="flex justify-center gap-2 mt-3">
          <Link
            to={`/shop/${id}`}
            className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Xem chi tiết
          </Link>
          <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-900 transition">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
