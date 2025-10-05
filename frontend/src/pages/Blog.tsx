import { FC } from "react";

/**
 * Blog Page - Sportwear Theme
 * - Hiển thị danh sách bài viết về thể thao & phong cách sống năng động
 */
const Blog: FC = () => {
  const blogs = [
    {
      id: 1,
      title: "5 bài tập khởi động giúp bạn tránh chấn thương khi tập gym",
      date: "12/09/2025",
      image: "/assets/sport-blog-1.jpg",
      desc: "Bắt đầu buổi tập đúng cách giúp cơ thể linh hoạt, hạn chế chấn thương và nâng cao hiệu suất luyện tập.",
    },
    {
      id: 2,
      title: "Cách chọn giày chạy bộ phù hợp với bàn chân của bạn",
      date: "08/09/2025",
      image: "/assets/sport-blog-2.jpg",
      desc: "Giày chạy bộ không chỉ là phụ kiện — mà là yếu tố quyết định trải nghiệm và sức khỏe đôi chân.",
    },
    {
      id: 3,
      title: "Top outfit thể thao 2025: năng động & thời trang",
      date: "01/09/2025",
      image: "/assets/sport-blog-3.jpg",
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
            className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-yellow-600 text-sm mb-1 font-medium">
                {blog.date}
              </p>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
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
