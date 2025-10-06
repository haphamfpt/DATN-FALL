import { FC } from "react";

/**
 * CategoryCard
 * - Hiển thị 1 ô danh mục sản phẩm
 */
interface Props {
  title: string;
  image: string;
}

const CategoryCard: FC<Props> = ({ title, image }) => {
  return (
    <div className="relative group cursor-pointer">
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
