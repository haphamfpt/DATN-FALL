import { FC } from "react";

/**
 * BlogCard
 * - Hiển thị 1 bài viết ngắn
 */
interface Props {
  title: string;
  date: string;
  image: string;
}

const BlogCard: FC<Props> = ({ title, date, image }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden cursor-pointer">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <p className="text-gray-400 text-sm">{date}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
