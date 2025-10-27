import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  category_id: number;
  name: string;
}

interface Product {
  product_id: number;
  category_id: number;
  product_name: string;
  product_image_url: string;
  product_description: string;
  price: number;
}

const Shop: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 🟢 Lấy dữ liệu danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/categories");
        setCategories(res.data.data || res.data); // Tùy backend trả về data
      } catch (error) {
        console.error("❌ Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🟢 Lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/products");
        const data = res.data.data || res.data;
        setProducts(data);
        setFilteredProducts(data); // Mặc định hiển thị tất cả
      } catch (error) {
        console.error("❌ Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🟢 Xử lý lọc sản phẩm theo danh mục
  const handleFilter = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    if (categoryId === null) {
      setFilteredProducts(products); // Hiển thị tất cả
    } else {
      const filtered = products.filter(
        (product) => product.category_id === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) return <p className="text-center py-10">Đang tải dữ liệu...</p>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* 🧭 Sidebar danh mục */}
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Danh mục sản phẩm
          </h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeCategory === null
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFilter(null)}
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
                onClick={() => handleFilter(cat.category_id)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* 🛒 Danh sách sản phẩm */}
        <main className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {activeCategory === null
              ? "Tất cả sản phẩm"
              : categories.find((c) => c.category_id === activeCategory)?.name}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Không có sản phẩm nào trong danh mục này.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition-all"
                >
                  <img
                    src={product.product_image_url}
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {product.product_name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {product.product_description}
                    </p>
                    <p className="text-blue-600 font-bold mt-2">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </p>
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
