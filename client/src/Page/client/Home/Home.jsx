import Banner from "./Component/Banner/Banner";
import ProductList from "./Component/Product/ProductList";
import BlogList from "./Component/Blog/BlogList";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      slug: "ao-tank-nam-pro-2025",
      name: "Áo Tank Top Pro 2025",
      price: "349.000đ",
      oldPrice: "499.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Nam",
      isNew: true,
      sale: 30,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 2,
      slug: "ao-thun-nu-ultra-light",
      name: "Áo Thun Nữ Ultra Light",
      price: "299.000đ",
      oldPrice: "429.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Nữ",
      isNew: true,
      sale: 30,
      rating: 5.0,
      reviews: 156,
    },
    {
      id: 3,
      slug: "quan-legging-nu-high-waist",
      name: "Quần Legging Nữ High Waist Pro",
      price: "449.000đ",
      oldPrice: "699.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Nữ",
      sale: 36,
      rating: 4.8,
      reviews: 312,
    },
    {
      id: 4,
      slug: "quan-short-nam-training",
      name: "Quần Short Nam Training 2.0",
      price: "379.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Nam",
      isNew: true,
      rating: 4.7,
      reviews: 78,
    },
    {
      id: 5,
      slug: "giay-chay-bo-ultraboost-pro",
      name: "Giày Chạy Bộ UltraBoost Pro",
      price: "1.290.000đ",
      oldPrice: "1.890.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Giày",
      sale: 32,
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 6,
      slug: "binh-nuoc-giu-nhiet-avelines-750ml",
      name: "Bình Nước Giữ Nhiệt AVELINE 750ml",
      price: "299.000đ",
      oldPrice: "399.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Phụ kiện",
      sale: 25,
      rating: 4.8,
      reviews: 167,
    },
    {
      id: 7,
      slug: "day-nhay-the-duc-co-dem-so",
      name: "Dây Nhảy Thể Dục Có Đếm Số",
      price: "149.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Phụ kiện",
      isNew: true,
      rating: 4.6,
      reviews: 94,
    },
    {
      id: 8,
      slug: "balo-the-thao-chong-nuoc-35l",
      name: "Balo Thể Thao Chống Nước 35L",
      price: "599.000đ",
      oldPrice: "799.000đ",
      image:
        "https://product.hstatic.net/1000150581/product/mix_match__5__b433064c3bba487785375c5b3d996087.jpg",
      category: "Phụ kiện",
      sale: 25,
      rating: 4.9,
      reviews: 134,
    },
  ];

  return (
    <>
      <Banner />
      <ProductList products={featuredProducts} />
      <BlogList />
    </>
  );
};

export default Home;
