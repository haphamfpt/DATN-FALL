import { FC } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  rating?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  rating = 5,
}) => {
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

        <p className="text-yellow-600 font-semibold text-lg">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
