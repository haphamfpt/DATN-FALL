import { FC, useState } from "react";
import ProductCard from "../components/ProductCard";

/**
 * Shop Page - Sportwear Theme
 */
const Shop: FC = () => {
  // 🔹 Fake dữ liệu sản phẩm thể thao
  const allProducts = [
    {
      id: 1,
      title: "Áo thun thể thao Nike Dri-FIT",
      price: 650000,
      image: "/assets/images/product/Dri-Fit.avif",
      category: "Áo",
    },
    {
      id: 2,
      title: "Quần jogger Adidas nam",
      price: 850000,
      image: "/assets/images/product/Z.N.E._Pants_Black.avif",
      category: "Quần",
    },
    {
      id: 3,
      title: "Giày chạy bộ Asics Gel",
      price: 1900000,
      image: "/assets/images/product/Samba_OG_Shoes_White.avif",
      category: "Giày",
    },
    {
      id: 4,
      title: "Áo khoác thể thao Puma",
      price: 1200000,
      image: "/assets/images/product/Áo-khoác-dệt-Prime-Retro-T7-Puma.avif",
      category: "Áo",
    },
    {
      id: 5,
      title: "Túi gym chống nước Reebok",
      price: 450000,
      image:
        "/assets/images/product/tui-deo-cheo-reebok-classics-foundation-waist.webp",
      category: "Phụ kiện",
    },
    {
      id: 6,
      title: "Găng tay tập gym Under Armour",
      price: 350000,
      image: "/assets/images/product/gym.webp",
      category: "Phụ kiện",
    },
  ];

  const [category, setCategory] = useState<string>("Tất cả");
  const [maxPrice, setMaxPrice] = useState<number>(2000000);

  const filteredProducts = allProducts.filter((p) => {
    const byCategory = category === "Tất cả" || p.category === category;
    const byPrice = p.price <= maxPrice;
    return byCategory && byPrice;
  });

  return (
    <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Danh mục</h3>
          <ul className="space-y-2 text-gray-700">
            {["Tất cả", "Áo", "Quần", "Giày", "Phụ kiện"].map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer hover:text-yellow-600 ${
                  category === cat ? "font-semibold text-yellow-600" : ""
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
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

      {/* Product Grid */}
      <section className="md:col-span-3">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Bộ sưu tập thể thao 2025
        </h2>

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
