import { FC } from "react";
import { useNavigate } from "react-router-dom";

/**
 * CategoryCard
 * - Hiển thị 1 ô danh mục sản phẩm
 * - Khi click sẽ chuyển sang /shop/category/<Tên danh mục>
 */
interface Props {
  title: string;
  image: string;
}

const CategoryCard: FC<Props> = ({ title, image }) => {
  const navigate = useNavigate();

  // ✅ Xác định đường dẫn danh mục
  const getCategoryPath = () => {
    if (title.includes("Áo")) return "Áo";
    if (title.includes("Quần")) return "Quần";
    if (title.includes("Giày")) return "Giày";
    if (title.includes("Phụ kiện")) return "Phụ kiện";
    return "Tất cả";
  };

  return (
    <div
      onClick={() => navigate(`/shop/category/${getCategoryPath()}`)}
      className="relative group cursor-pointer overflow-hidden rounded-xl border border-transparent hover:border-yellow-400 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
