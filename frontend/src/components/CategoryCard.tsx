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

  // ✅ Lấy tên danh mục từ title
  const getCategoryPath = () => {
    if (title.includes("Áo")) return "Áo";
    if (title.includes("Quần")) return "Quần";
    if (title.includes("Giày")) return "Giày";
    if (title.includes("Phụ kiện")) return "Phụ kiện";
    return "Tất cả";
  };

  return (
    <div
      onClick={() => navigate(`/shop/category/${getCategoryPath()}`)} // ✅ chuyển trang khi click
      className="relative group cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="rounded-lg w-full h-48 object-cover group-hover:opacity-80 transition"
      />
      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition">
        {title}
      </h3>
    </div>
  );
};

export default CategoryCard;
