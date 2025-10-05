import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";

/**
 * Home Page - Sportwear Theme
 * - Banner slideshow
 * - Categories
 * - Featured Products
 * - Blog Section
 */
const Home: FC = () => {
  const banners = [
    "/assets/sport-banner1.jpg",
    "/assets/sport-banner2.jpg",
    "/assets/sport-banner3.jpg",
  ];

  return (
    <div>
      {/* 🔹 Banner slideshow */}
      <section className="w-full h-[500px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full"
        >
          {banners.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={img}
                  alt={`banner-${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
                  <h1 className="text-4xl font-bold mb-3 drop-shadow-lg">
                    Thời trang thể thao{" "}
                    <span className="text-yellow-400">2025</span>
                  </h1>
                  <p className="text-gray-200 mb-6">
                    Năng động – Bứt phá – Tự tin cùng phong cách thể thao mới
                  </p>
                  <button className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 transition">
                    Mua ngay
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔹 Categories */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Danh mục thể thao</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard title="Áo thể thao" image="/assets/sport-cat-1.jpg" />
          <CategoryCard title="Quần thể thao" image="/assets/sport-cat-2.jpg" />
          <CategoryCard title="Giày chạy bộ" image="/assets/sport-cat-3.jpg" />
          <CategoryCard title="Phụ kiện gym" image="/assets/sport-cat-4.jpg" />
        </div>
      </section>

      {/* 🔹 Featured Products */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard
            id={1}
            title="Áo thun thể thao Nike Dri-FIT"
            price="650.000đ"
            image="/assets/sport-product-1.jpg"
          />
          <ProductCard
            id={2}
            title="Quần jogger Adidas"
            price="850.000đ"
            image="/assets/sport-product-2.jpg"
          />
          <ProductCard
            id={3}
            title="Giày chạy bộ Asics Gel"
            price="1.900.000đ"
            image="/assets/sport-product-3.jpg"
          />
          <ProductCard
            id={4}
            title="Áo khoác thể thao Puma"
            price="1.200.000đ"
            image="/assets/sport-product-4.jpg"
          />
        </div>
      </section>

      {/* 🔹 Blog Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Tin tức & mẹo tập luyện</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BlogCard
              title="Bí quyết chọn giày chạy bộ phù hợp"
              date="12/09/2025"
              image="/assets/sport-blog-1.jpg"
            />
            <BlogCard
              title="Top outfit gym năng động 2025"
              date="07/09/2025"
              image="/assets/sport-blog-2.jpg"
            />
            <BlogCard
              title="Xu hướng thời trang thể thao mới"
              date="01/09/2025"
              image="/assets/sport-blog-3.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
