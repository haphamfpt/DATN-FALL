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
 */
const Home: FC = () => {
  const banners = [
    "/assets/images/banner/banner1.jpg",
    "/assets/images/banner/banner2.webp",
    "/assets/images/banner/banner.png",
  ];

  return (
    <div>
      {/* 🔹 Banner slideshow */}
      <section className="w-full h-[550px] relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full"
        >
          {[
            {
              img: "/assets/images/banner/banner1.jpg", // 🟡 Ảnh 1: người chạy bộ
              title: "Bứt phá từng sải chân",
              subtitle: "Khám phá bộ sưu tập Running 2025",
              button: "Khám phá ngay",
            },
            {
              img: "/assets/images/banner/banner2.webp", // 🟢 Ảnh 2: màu xanh – vận động mạnh
              title: "Thách thức giới hạn của bạn",
              subtitle: "Phong cách thể thao đỉnh cao từ Nike, Adidas, Puma",
              button: "Mua sắm ngay",
            },
          ].map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Ảnh nền */}
                <img
                  src={banner.img}
                  alt={`banner-${index}`}
                  className="w-full h-full object-cover brightness-90"
                />

                {/* Overlay + Text */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start md:items-center px-10 md:px-0 text-white text-left md:text-center">
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                    {banner.button}
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
          <CategoryCard
            title="Áo thể thao"
            image="/assets/images/product/Dri-Fit.avif"
          />
          <CategoryCard
            title="Quần thể thao"
            image="/assets/images/product/Z.N.E._Pants_Black.avif"
          />
          <CategoryCard
            title="Giày chạy bộ"
            image="/assets/images/product/Samba_OG_Shoes_White.avif"
          />
          <CategoryCard
            title="Phụ kiện gym"
            image="/assets/images/product/gym.webp"
          />
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
            image="/assets/images/product/Dri-Fit.avif"
          />
          <ProductCard
            id={2}
            title="Quần jogger Adidas nam"
            price="850.000đ"
            image="/assets/images/product/Z.N.E._Pants_Black.avif"
          />
          <ProductCard
            id={3}
            title="Giày chạy bộ Asics Gel"
            price="1.900.000đ"
            image="/assets/images/product/Samba_OG_Shoes_White.avif"
          />
          <ProductCard
            id={4}
            title="Áo khoác thể thao Puma"
            price="1.200.000đ"
            image="/assets/images/product/Áo-khoác-dệt-Prime-Retro-T7-Puma.avif"
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
              image="/assets/images/product/Samba_OG_Shoes_White.avif"
            />
            <BlogCard
              title="Top outfit gym năng động 2025"
              date="07/09/2025"
              image="/assets/images/product/gym.webp"
            />
            <BlogCard
              title="Xu hướng thời trang thể thao mới"
              date="01/09/2025"
              image="/assets/images/product/Dri-Fit.avif"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
