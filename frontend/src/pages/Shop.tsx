import { FC, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Shop: FC = () => {
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const allProducts = [
    {
      id: 1,
      title: "Áo thun thể thao Nike Dri-FIT",
      price: 650000,
      image: "/assets/images/product/Dri-Fit.avif",
      category: "Áo",
      hasAttributes: true,
    },
    {
      id: 2,
      title: "Quần jogger Adidas nam",
      price: 850000,
      image: "/assets/images/product/Z.N.E._Pants_Black.avif",
      category: "Quần",
      hasAttributes: true,
    },
    {
      id: 3,
      title: "Giày chạy bộ Asics Gel",
      price: 1900000,
      image: "/assets/images/product/Samba_OG_Shoes_White.avif",
      category: "Giày",
      hasAttributes: true,
    },
    {
      id: 4,
      title: "Áo khoác thể thao Puma",
      price: 1200000,
      image: "/assets/images/product/Áo-khoác-dệt-Prime-Retro-T7-Puma.avif",
      category: "Áo",
      hasAttributes: true,
    },
    {
      id: 5,
      title: "Túi gym chống nước Reebok",
      price: 450000,
      image:
        "/assets/images/product/tui-deo-cheo-reebok-classics-foundation-waist.webp",
      category: "Phụ kiện",
      hasAttributes: false,
    },
    {
      id: 6,
      title: "Găng tay tập gym Under Armour",
      price: 350000,
      image: "/assets/images/product/gym.webp",
      category: "Phụ kiện",
      hasAttributes: false,
    },
  ];

  const [category, setCategory] = useState<string>("Tất cả");
  const [maxPrice, setMaxPrice] = useState<number>(2000000);

  const filteredProducts = allProducts.filter((p) => {
    const byCategory = category === "Tất cả" || p.category === category;
    const byPrice = p.price <= maxPrice;
    return byCategory && byPrice;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
  };

  const handleBuyNow = (product: any) => {
    clearCart();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate("/checkout");
  };

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
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
              >
                <Link to={`/shop/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-contain bg-gray-100"
                  />
                </Link>

                <div className="p-4 text-center">
                  <Link
                    to={`/shop/${product.id}`}
                    className="block font-semibold text-gray-800 hover:text-yellow-600"
                  >
                    {product.title}
                  </Link>
                  <p className="text-yellow-600 mt-1 font-medium">
                    {product.price.toLocaleString("vi-VN")}đ
                  </p>

                  <div className="flex justify-center gap-2 mt-3">
                    {product.hasAttributes ? (
                      <>
                        <Link
                          to={`/shop/${product.id}`}
                          className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600 transition"
                        >
                          Xem chi tiết
                        </Link>
                        <Link
                          to={`/shop/${product.id}`}
                          className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-900 transition"
                        >
                          Mua ngay
                        </Link>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>
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
