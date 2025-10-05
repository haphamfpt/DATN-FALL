import { FC, useState } from "react";
import ProductCard from "../components/ProductCard";

/**
 * Shop Page
 * - Sidebar filter (category + price)
 * - Product grid
 */
const Shop: FC = () => {
  // Fake dữ liệu sản phẩm
  const allProducts = [
    {
      id: 1,
      title: "Áo sơ mi trắng",
      price: 500000,
      image: "/assets/images/product/product-9.jpg",
      category: "Áo",
    },
    {
      id: 2,
      title: "Quần jeans xanh",
      price: 700000,
      image: "/assets/images/product/product-8.jpg",
      category: "Quần",
    },
    {
      id: 3,
      title: "Áo khoác da",
      price: 1200000,
      image: "/assets/images/product/product-7.jpg",
      category: "Áo",
    },
    {
      id: 4,
      title: "Giày sneaker",
      price: 1500000,
      image: "/assets/images/product/product-6.jpg",
      category: "Giày",
    },
    {
      id: 5,
      title: "Áo hoodie đen",
      price: 600000,
      image: "/assets/images/product/product-5.jpg",
      category: "Áo",
    },
    {
      id: 6,
      title: "Quần short kaki",
      price: 400000,
      image: "/assets/images/product/product-4.jpg",
      category: "Quần",
    },
  ];

  const [category, setCategory] = useState<string>("Tất cả");
  const [maxPrice, setMaxPrice] = useState<number>(2000000);

  // Lọc sản phẩm
  const filteredProducts = allProducts.filter((p) => {
    const byCategory = category === "Tất cả" || p.category === category;
    const byPrice = p.price <= maxPrice;
    return byCategory && byPrice;
  });

  return (
    <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* 🔹 Sidebar Filter */}
      <aside className="md:col-span-1 space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">Danh mục</h3>
          <ul className="space-y-2 text-gray-700">
            {["Tất cả", "Áo", "Quần", "Giày"].map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer hover:text-black ${
                  category === cat ? "font-semibold text-black" : ""
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Khoảng giá</h3>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-sm text-gray-600">
            Tối đa:{" "}
            <span className="font-semibold text-black">
              {maxPrice.toLocaleString("vi-VN")}đ
            </span>
          </p>
        </div>
      </aside>

      {/* 🔹 Product Grid */}
      <section className="md:col-span-3">
        <h2 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price.toLocaleString("vi-VN") + "đ"}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có sản phẩm nào phù hợp.</p>
        )}
      </section>
    </div>
  );
};

export default Shop;
