import { FC, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  price: string;
  image: string;
}

const ProductCard: FC<Props> = ({ id, title, price, image }) => {
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    clearCart(); // 🔹 làm trống giỏ
    addToCart({
      id,
      title,
      price: parseInt(price.replace(/\D/g, "")), // ép số từ "500.000đ"
      image,
      quantity: 1,
    });
    navigate("/checkout"); // 🔹 chuyển thẳng sang thanh toán
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img
        src={image}
        alt={title}
        className="rounded w-full h-48 object-contain bg-gray-100"
      />
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="text-gray-600">{price}</p>

      {/* Nút thêm giỏ */}
      <button
        onClick={() =>
          addToCart({
            id,
            title,
            price: parseInt(price.replace(/\D/g, "")),
            image,
            quantity: 1,
          })
        }
        className="mt-3 bg-black text-white px-4 py-1 rounded hover:bg-gray-800 mr-2"
      >
        Thêm giỏ
      </button>

      {/* Nút mua ngay */}
      <button
        onClick={handleBuyNow}
        className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
      >
        Mua ngay
      </button>
    </div>
  );
};

export default ProductCard;
