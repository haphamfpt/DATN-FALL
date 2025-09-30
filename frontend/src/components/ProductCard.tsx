import { FC, useContext } from "react";
import { CartContext } from "../context/CartContext";

interface Props {
  id: number;
  title: string;
  price: string;
  image: string;
}

const ProductCard: FC<Props> = ({ id, title, price, image }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img
        src={image}
        alt={title}
        className="rounded w-full h-48 object-contain bg-gray-100"
      />
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="text-gray-600">{price}</p>
      <button
        onClick={() =>
          addToCart({ id, title, price: parseInt(price), image, quantity: 1 })
        }
        className="mt-3 bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
