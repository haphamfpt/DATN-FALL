import { FC, useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Star } from "lucide-react";
import axiosClient from "../api/axiosClient";

const Shop: FC = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { category: routeCategory } = useParams();

  // ✅ State
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [category, setCategory] = useState<string>("Tất cả");
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Lấy sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get("/products");
        setAllProducts(res.data.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Lấy danh mục thật từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("/categories");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Lấy danh mục từ URL (ví dụ: /shop/category/Quần)
  useEffect(() => {
    setCategory(routeCategory || "Tất cả");
  }, [routeCategory]);

  // ✅ Lọc sản phẩm
  const filteredProducts = allProducts.filter((p) => {
    const productCategory = p.category?.name || "Khác";
    const productPrice =
      p.variant_sale_price || p.variant_listed_price || p.price || 0;
    const byCategory = category === "Tất cả" || productCategory === category;
    const byPrice = productPrice <= maxPrice;
    return byCategory && byPrice;
  });

  // ✅ Thêm vào giỏ
  const handleAddToCart = (product: any) => {
    const price =
      product.variant_sale_price ||
      product.variant_listed_price ||
      product.price ||
      0;
    addToCart({
      id: product.id,
      title: product.product_name,
      price,
      image: product.product_image_url || "/assets/images/product/default.webp",
      quantity: 1,
    });
    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
  };

  // ✅ Mua ngay
  const handleBuyNow = (product: any) => {
    const price =
      product.variant_sale_price ||
      product.variant_listed_price ||
      product.price ||
      0;
    sessionStorage.setItem(
      "buyNowProduct",
      JSON.stringify({
        id: product.id,
        title: product.product_name,
        price,
        image:
          product.product_image_url || "/assets/images/product/default.webp",
        quantity: 1,
      })
    );
    navigate("/checkout?mode=buy-now");
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center text-gray-500">
        Đang tải sản phẩm...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      {/* ✅ Danh mục thể thao */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Danh mục thể thao
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/shop/category/${cat.name}`)}
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
              >
                <img
                  src={cat.image_url || "/assets/images/product/default.webp"}
                  alt={cat.name}
                  className="w-full h-40 object-cover bg-gray-100"
                />
                <div className="p-3 text-center font-semibold text-gray-800 hover:text-yellow-600">
                  {cat.name}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Chưa có danh mục nào.</p>
          )}
        </div>
      </section>

      {/* ✅ Sản phẩm + Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Danh mục</h3>
            <ul className="space-y-2 text-gray-700">
              <li
                className={`cursor-pointer hover:text-yellow-600 ${
                  category === "Tất cả" ? "font-semibold text-yellow-600" : ""
                }`}
                onClick={() => navigate("/shop")}
              >
                Tất cả
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`cursor-pointer hover:text-yellow-600 ${
                    category === cat.name ? "font-semibold text-yellow-600" : ""
                  }`}
                  onClick={() => navigate(`/shop/category/${cat.name}`)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Khoảng giá</h3>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />
            <p className="mt-2 text-sm text-gray-600">
              Tối đa:{" "}
              <span className="font-semibold text-yellow-600">
                {maxPrice.toLocaleString("vi-VN")}đ
              </span>
            </p>
          </div>
        </aside>

        {/* Grid sản phẩm */}
        <section className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {category === "Tất cả"
              ? "Bộ sưu tập thể thao 2025"
              : `Danh mục ${category}`}
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const price =
                  product.variant_sale_price ||
                  product.variant_listed_price ||
                  product.price ||
                  0;
                const rating = product.rating || 4.5;
                const fullStars = Math.floor(rating);
                const hasHalfStar = rating % 1 !== 0;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
                  >
                    <Link to={`/shop/${product.id}`}>
                      <img
                        src={
                          product.product_image_url ||
                          product.image ||
                          "/assets/images/product/default.webp"
                        }
                        alt={product.product_name}
                        className="w-full h-56 object-contain bg-gray-100"
                      />
                    </Link>

                    <div className="p-4 text-center">
                      <Link
                        to={`/shop/${product.id}`}
                        className="block font-semibold text-gray-800 hover:text-yellow-600"
                      >
                        {product.product_name}
                      </Link>

                      {/* ⭐ Đánh giá */}
                      <div className="flex flex-col items-center gap-1 my-2">
                        <div className="flex justify-center items-center gap-1">
                          {[...Array(5)].map((_, index) => {
                            const isFull = index < fullStars;
                            const isHalf = index === fullStars && hasHalfStar;
                            return (
                              <div key={index} className="relative w-5 h-5">
                                <Star
                                  className="text-gray-300 absolute inset-0"
                                  size={18}
                                />
                                {isFull && (
                                  <Star
                                    className="text-yellow-500 fill-yellow-500 absolute inset-0"
                                    size={18}
                                  />
                                )}
                                {isHalf && (
                                  <div className="absolute inset-0 overflow-hidden w-[50%]">
                                    <Star
                                      className="text-yellow-500 fill-yellow-500 absolute left-0"
                                      size={18}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <span className="text-xs text-gray-600">
                          {rating}/5 ({Math.floor(Math.random() * 120) + 30}{" "}
                          đánh giá)
                        </span>
                      </div>

                      <p className="text-yellow-600 mt-1 font-medium">
                        {price.toLocaleString("vi-VN")}đ
                      </p>

                      <div className="flex justify-center gap-2 mt-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600 transition"
                        >
                          Thêm vào giỏ
                        </button>
                        <button
                          onClick={() => handleBuyNow(product)}
                          className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-900 transition"
                        >
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Không có sản phẩm nào phù hợp.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shop;
