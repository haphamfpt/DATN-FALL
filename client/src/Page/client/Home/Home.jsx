import { useState, useEffect } from "react";
import Banner from './Component/Banner/Banner';
import ProductList from "./Component/Product/ProductList";
import BlogList from "./Component/Blog/BlogList";
import { Container, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/products/admin?limit=12");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Không tải được sản phẩm");

        const products = data.products || [];

        const formatted = products.map((p) => ({
          _id: p._id,
          id: p._id,
          slug: p.slug,
          name: p.name,
          price: p.min_price ? `${p.min_price.toLocaleString("vi-VN")}đ` : "Liên hệ",
          oldPrice: p.variants?.[0]?.import_price
            ? `${(p.variants[0].import_price * 1.3).toFixed(0).toLocaleString("vi-VN")}đ`
            : null,
          image: p.images[0]?.url || "/images/no-image.jpg",
          category: p.category?.product_category_name || "Uncategorized",
          isNew: Date.now() - new Date(p.createdAt) < 7 * 24 * 60 * 60 * 1000,
          rating: 4.8 + Math.random() * 0.2, 
          reviews: Math.floor(Math.random() * 300) + 20,
          variants: p.variants || [], 
        }));

        setFeaturedProducts(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3 fs-5">Đang tải sản phẩm...</p>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">Lỗi: {error}</Alert>;
  }

  return (
    <>
      <Banner />
      <ProductList products={featuredProducts} title="SẢN PHẨM MỚI NHẤT" />
      <BlogList />
    </>
  );
};

export default Home;