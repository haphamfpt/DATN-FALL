import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

interface Category {
  category_id: number;
  category_name: string;
}

interface Product {
  product_id: number;
  category_id: number;
  product_name: string;
  product_image_url: string;
  description: string;
  price: number;
  rating?: number;
}

const Shop: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 📦 Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/categories");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🛍️ Lấy sản phẩm
  const fetchProducts = async (
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number
  ) => {
    try {
      const url = "http://127.0.0.1:8000/api/v1/products";
      const params: any = {};

      if (categoryId) params.category_id = categoryId;
      if (minPrice !== undefined) params.min_price = minPrice;
      if (maxPrice !== undefined) params.max_price = maxPrice;

      const res = await axios.get(url, { params });
      const data = res.data.data || [];
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("❌ Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🎯 Lọc danh mục
  const handleFilterCategory = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    fetchProducts(categoryId || undefined);
  };

  // 🎯 Lọc giá
  const handleFilterPrice = (range: string) => {
    setPriceFilter(range);
    const ranges: Record<string, [number, number]> = {
      "0-500": [0, 500000],
      "500-1000": [500000, 1000000],
      "1000-2000": [1000000, 2000000],
      "2000+": [2000000, 10000000],
    };
    const [min, max] = ranges[range] || [0, 10000000];
    fetchProducts(activeCategory || undefined, min, max);
  };

  // ⚙️ Kiểm tra loại sản phẩm
  const isSimpleProduct = (product: Product) =>
    [4].includes(product.category_id);

  // 💰 Format tiền chuẩn Việt Nam
  const formatPrice = (price: number | string) => {
    const num = Number(price);
    if (isNaN(num)) return "0đ";
    return num.toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + "đ";
  };

  // 🛒 Thêm giỏ
  const handleAddToCart = (product: Product) => {
    if (!isSimpleProduct(product)) {
      toast("🧾 Vui lòng chọn size & màu ở trang chi tiết", { icon: "ℹ️" });
      navigate(`/shop/${product.product_id}`);
      return;
    }
    addToCart({
      id: product.product_id,
      title: product.product_name,
      price: product.price,
      image: product.product_image_url,
      quantity: 1,
    });
    toast.success("✅ Đã thêm vào giỏ hàng!");
  };

  // ⚡ Mua ngay
  const handleBuyNow = (product: Product) => {
    if (!isSimpleProduct(product)) {
      toast("🧾 Vui lòng chọn size & màu ở trang chi tiết", { icon: "ℹ️" });
      navigate(`/shop/${product.product_id}`);
      return;
    }
    addToCart({
      id: product.product_id,
      title: product.product_name,
      price: product.price,
      image: product.product_image_url,
      quantity: 1,
    });
    navigate("/checkout");
  };

  // 🖼️ Fallback ảnh theo danh mục
  const getFallbackImage = (categoryId: number) => {
    switch (categoryId) {
      case 1: // Áo thể thao
        return "/assets/images/product/Dri-Fit.avif";
      case 2: // Quần thể thao
        return "/assets/images/product/Z.N.E._Pants_Black.avif";
      case 3: // Giày thể thao
        return "/assets/images/product/Samba_OG_Shoes_White.avif"; // ✅ Cập nhật theo yêu cầu mới
      case 4: // Áo khoác thể thao
        return "/assets/images/product/Áo-khoác-dệt-Prime-Retro-T7-Puma.avif";
      case 5: // Túi, balo
        return "/assets/images/product/tui-deo-cheo-reebok-classics-foundation-waist.webp";
      case 6: // Phụ kiện gym (găng tay, bình nước, dây)
        return "/assets/images/product/gym.webp"; // ✅ riêng cho găng tay
      default:
        return "/assets/images/product/Dri-Fit.avif"; // fallback chung
    }
  };

  if (loading) return <p className="text-center py-10">Đang tải dữ liệu...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* 🔹 Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Danh mục sản phẩm
          </h2>
          <ul className="space-y-2 mb-6">
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeCategory === null
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFilterCategory(null)}
            >
              Tất cả
            </li>
            {categories.map((cat) => (
              <li
                key={cat.category_id}
                className={`cursor-pointer p-2 rounded-lg ${
                  activeCategory === cat.category_id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleFilterCategory(cat.category_id)}
              >
                {cat.category_name}
              </li>
            ))}
          </ul>

          {/* 🔹 Bộ lọc giá */}
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Lọc theo giá (VNĐ)
          </h2>
          <ul className="space-y-2">
            <li
              onClick={() => handleFilterPrice("0-500")}
              className={`cursor-pointer p-2 rounded-lg ${
                priceFilter === "0-500"
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Dưới 500.000đ
            </li>
            <li
              onClick={() => handleFilterPrice("500-1000")}
              className={`cursor-pointer p-2 rounded-lg ${
                priceFilter === "500-1000"
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              500.000đ - 1.000.000đ
            </li>
            <li
              onClick={() => handleFilterPrice("1000-2000")}
              className={`cursor-pointer p-2 rounded-lg ${
                priceFilter === "1000-2000"
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              1.000.000đ - 2.000.000đ
            </li>
            <li
              onClick={() => handleFilterPrice("2000+")}
              className={`cursor-pointer p-2 rounded-lg ${
                priceFilter === "2000+"
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Trên 2.000.000đ
            </li>
          </ul>
        </aside>

        {/* 🔹 Danh sách sản phẩm */}
        <main className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {activeCategory === null
              ? "Tất cả sản phẩm"
              : categories.find((c) => c.category_id === activeCategory)
                  ?.category_name}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Không có sản phẩm nào phù hợp.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <Link
                    to={`/shop/${product.product_id}`}
                    className="relative block"
                  >
                    <img
                      src={product.product_image_url}
                      alt={product.product_name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.dataset.fallback) {
                          target.src = getFallbackImage(product.category_id);
                          target.dataset.fallback = "true";
                        }
                      }}
                    />
                  </Link>

                  <div className="p-4 flex flex-col flex-1">
                    <Link
                      to={`/shop/${product.product_id}`}
                      className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition mb-2"
                    >
                      {product.product_name}
                    </Link>

                    <p className="text-red-600 font-bold text-lg mb-2">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex items-center text-yellow-500 text-sm mb-3">
                      {"★".repeat(Math.floor(product.rating || 4))}
                      {"☆".repeat(5 - Math.floor(product.rating || 4))}
                      <span className="ml-1 text-gray-500 text-xs sm:text-sm">
                        ({product.rating ? product.rating.toFixed(1) : "4.0"})
                      </span>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          isSimpleProduct(product)
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
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
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
