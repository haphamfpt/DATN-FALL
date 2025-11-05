import { FC, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CategoryCard from "../components/CategoryCard";
import BlogCard from "../components/BlogCard";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home: FC = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 💰 format giá tiền chuẩn Việt Nam
  const formatPrice = (price: number) => {
    return (
      Number(price).toLocaleString("vi-VN", {
        maximumFractionDigits: 0,
      }) + "đ"
    );
  };

  // ⚙️ Thêm sản phẩm nhanh
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success("✅ Đã thêm vào giỏ hàng!");
  };

  // ⚙️ Mua ngay
  const handleBuyNow = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate("/checkout");
  };

  const featuredProducts = [
    {
      id: 1,
      title: "Áo thun thể thao Nike Dri-FIT",
      price: 650000,
      image: "/assets/images/product/Dri-Fit.avif",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Quần jogger Adidas nam Tiro 21",
      price: 850000,
      image: "/assets/images/product/Z.N.E._Pants_Black.avif",
      rating: 4.0,
    },
    {
      id: 3,
      title: "Giày Adidas Ultraboost 22",
      price: 1900000,
      image: "/assets/images/product/Samba_OG_Shoes_White.avif",
      rating: 5.0,
    },
    {
      id: 4,
      title: "Găng tay tập gym Under Armour",
      price: 350000,
      image: "/assets/images/product/gym.webp",
      rating: 4.2,
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* 🔹 Banner slideshow */}
      <section className="relative w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[600px]">
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
              img: "/assets/images/banner/banner1.jpg",
              title: "Bứt phá từng sải chân",
              subtitle: "Khám phá bộ sưu tập Running 2025",
              button: "Khám phá ngay",
            },
            {
              img: "/assets/images/banner/banner2.webp",
              title: "Thách thức giới hạn của bạn",
              subtitle: "Phong cách thể thao đỉnh cao từ Nike, Adidas, Puma",
              button: "Mua sắm ngay",
            },
          ].map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={banner.img}
                  alt={`banner-${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-3 sm:px-6 md:px-8">
                  <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg">
                    {banner.title}
                  </h1>
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mb-5 drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 sm:px-7 py-2 sm:py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap">
                    {banner.button}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🔹 Categories */}
      <section className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 md:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
          Danh mục thể thao của shop
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
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
      <section className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 md:px-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
          Sản phẩm nổi bật
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <Link to={`/shop/${product.id}`} className="relative block">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="p-4 flex flex-col flex-1">
                <Link
                  to={`/shop/${product.id}`}
                  className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition mb-2"
                >
                  {product.title}
                </Link>

                {/* 💰 Giá hiển thị chuẩn */}
                <p className="text-red-600 font-bold text-lg mb-2">
                  {formatPrice(product.price)}
                </p>

                {/* ⭐ Đánh giá sao */}
                <div className="flex items-center text-yellow-500 text-sm mb-3">
                  {"★".repeat(Math.floor(product.rating || 4))}
                  {"☆".repeat(5 - Math.floor(product.rating || 4))}
                  <span className="ml-1 text-gray-500 text-xs sm:text-sm">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>

                {/* 🔘 Nút hành động */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 bg-green-500 hover:bg-green-600 text-white"
                  >
                    🛒 Thêm giỏ
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                  >
                    ⚡ Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Blog Section */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
            Tin tức & mẹo tập luyện
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
