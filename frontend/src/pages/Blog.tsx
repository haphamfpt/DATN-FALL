import { FC } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Blog Page - Sportwear Theme
 * - Hiển thị danh sách bài viết
 */
const Blog: FC = () => {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "5 bài tập khởi động giúp bạn tránh chấn thương khi tập gym",
      date: "12/09/2025",
      image:
        "/assets/images/blog/details/cac-bai-tap-khoi-dong-truoc-khi-tap-gym-1836_482.avif",
      desc: "Bắt đầu buổi tập đúng cách giúp cơ thể linh hoạt, hạn chế chấn thương và nâng cao hiệu suất luyện tập.",
    },
    {
      id: 2,
      title: "Cách chọn giày chạy bộ phù hợp với bàn chân của bạn",
      date: "08/09/2025",
      image: "/assets/images/blog/details/giay.jpg",
      desc: "Giày chạy bộ không chỉ là phụ kiện — mà là yếu tố quyết định trải nghiệm và sức khỏe đôi chân.",
    },
    {
      id: 3,
      title: "Top outfit thể thao 2025: năng động & thời trang",
      date: "01/09/2025",
      image:
        "/assets/images/blog/details/top-phong-cach-thoi-trang-hot-2024-6-xkih.webp",
      desc: "Khám phá những xu hướng phối đồ thể thao vừa thoải mái vừa nổi bật trong năm 2025.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Tin tức & Mẹo tập luyện
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.id}`, { state: blog })}
            className="bg-white rounded-xl border border-transparent hover:border-yellow-400 shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 group"
          >
            {/* Ảnh bài viết */}
            <div className="w-full h-56 flex items-center justify-center overflow-hidden bg-white">
              <img
                src={blog.image}
                alt={blog.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Nội dung */}
            <div className="p-4">
              <p className="text-yellow-600 text-sm mb-1 font-medium">
                {blog.date}
              </p>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm">{blog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
