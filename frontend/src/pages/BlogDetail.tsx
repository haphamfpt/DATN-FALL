import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Blog Detail Page
 * - Hiển thị nội dung bài viết cụ thể
 */
const BlogDetail: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state;

  if (!blog) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <p className="text-gray-600">Không tìm thấy bài viết.</p>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 px-4 py-2 bg-[#342e79] text-white rounded hover:bg-[#2a2566]"
        >
          Quay lại trang Blog
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <button
        onClick={() => navigate("/blog")}
        className="text-[#342e79] mb-6 hover:underline"
      >
        ← Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      <p className="text-yellow-600 font-medium mb-6">{blog.date}</p>

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full max-h-[450px] object-cover rounded-lg mb-8"
      />

      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogDetail;
