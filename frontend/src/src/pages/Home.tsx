import { FC } from "react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
// Make sure the file paths below match your actual file structure and naming

/**
 * Home Page
 * - Banner
 * - Categories
 * - Featured Products
 * - Blog Section
 */
const Home: FC = () => {
  return (
    <div>
      {/* 🔹 Banner */}
      <section className="bg-gray-100 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Thời trang nam <span className="text-red-600">2025</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Bộ sưu tập mới nhất dành cho phái mạnh
        </p>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Khám phá ngay
        </button>
      </section>

      {/* 🔹 Categories */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Danh mục</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard title="Áo sơ mi" image="/assets/cat-1.jpg" />
          <CategoryCard title="Áo khoác" image="/assets/cat-2.jpg" />
          <CategoryCard title="Quần jeans" image="/assets/cat-3.jpg" />
          <CategoryCard title="Phụ kiện" image="/assets/cat-4.jpg" />
        </div>
      </section>

      {/* 🔹 Featured Products */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard
            id={1}
            title="Áo sơ mi trắng"
            price="500.000đ"
            image="/assets/product-1.jpg"
          />
          <ProductCard
            id={2}
            title="Quần jeans xanh"
            price="700.000đ"
            image="/assets/product-2.jpg"
          />
          <ProductCard
            id={3}
            title="Áo khoác da"
            price="1.200.000đ"
            image="/assets/product-3.jpg"
          />
          <ProductCard
            id={4}
            title="Giày sneaker"
            price="1.500.000đ"
            image="/assets/product-4.jpg"
          />
        </div>
      </section>

      {/* 🔹 Blog Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Bài viết mới</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BlogCard
              title="Phong cách tối giản cho nam"
              date="12/09/2025"
              image="/assets/blog-1.jpg"
            />
            <BlogCard
              title="Tips mix đồ đi làm"
              date="05/09/2025"
              image="/assets/blog-2.jpg"
            />
            <BlogCard
              title="BST Thu Đông 2025"
              date="01/09/2025"
              image="/assets/blog-3.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
