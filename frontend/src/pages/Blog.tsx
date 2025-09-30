import { FC } from "react";

/**
 * Blog Page
 * - Hiển thị danh sách bài viết
 * - Mỗi bài viết có ảnh, tiêu đề, ngày đăng, mô tả ngắn
 */
const Blog: FC = () => {
  const blogs = [
    {
      id: 1,
      title: "Phong cách tối giản cho nam giới",
      date: "12/09/2025",
      image: "/assets/blog-1.jpg",
      desc: "Xu hướng thời trang tối giản đang lên ngôi, giúp phái mạnh thêm phần lịch lãm và tinh tế.",
    },
    {
      id: 2,
      title: "Tips mix đồ công sở",
      date: "05/09/2025",
      image: "/assets/blog-2.jpg",
      desc: "Một vài gợi ý phối đồ đi làm vừa thoải mái vừa chuyên nghiệp.",
    },
    {
      id: 3,
      title: "BST Thu Đông 2025",
      date: "01/09/2025",
      image: "/assets/blog-3.jpg",
      desc: "Khám phá bộ sưu tập thời trang nam thu đông với chất liệu cao cấp.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Tin tức & Bài viết</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden cursor-pointer"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-400 text-sm mb-1">{blog.date}</p>
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
