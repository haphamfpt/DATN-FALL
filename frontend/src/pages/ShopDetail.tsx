import { FC, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { allProducts } from "../data/products";

const ShopDetail: FC = () => {
  const { id } = useParams();
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const product = allProducts.find((p) => p.id === Number(id));

  // State
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews" | "info">(
    "desc"
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!product)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Không tìm thấy sản phẩm.{" "}
        <Link to="/shop" className="text-yellow-600 underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu sắc trước khi thêm vào giỏ!");
      return;
    }

    addToCart({
      id: product.id,
      title: `${product.title} (${selectedSize} - ${selectedColor})`,
      price: product.price,
      image: product.image,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu sắc trước khi mua!");
      return;
    }
    clearCart();
    addToCart({
      id: product.id,
      title: `${product.title} (${selectedSize} - ${selectedColor})`,
      price: product.price,
      image: product.image,
      quantity,
    });
    navigate("/checkout");
  };

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-10">
      <div className="text-sm text-gray-500 container mx-auto mb-6 px-6">
        <Link to="/" className="hover:text-yellow-600">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-yellow-600">
          Shop
        </Link>{" "}
        / <span className="text-gray-800">{product.title}</span>
      </div>

      {/* Product main */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg bg-gray-100 mb-4"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {product.title}
          </h1>
          <p className="text-2xl text-yellow-600 font-semibold mb-4">
            {product.price.toLocaleString("vi-VN")}đ
          </p>

          {/* Size */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Chọn Size:</h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "hover:border-yellow-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Chọn Màu:</h3>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === color
                      ? "bg-black text-white border-black"
                      : "hover:border-yellow-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center border rounded">
              <button
                className="px-3 py-1 text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-x py-1"
              />
              <button
                className="px-3 py-1 text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              Thêm vào giỏ hàng
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="container mx-auto px-6 mt-20">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">
          Sản phẩm liên quan
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {related.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
            >
              <Link to={`/shop/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-contain bg-gray-100"
                />
              </Link>
              <div className="p-4 text-center">
                <Link
                  to={`/shop/${item.id}`}
                  className="block font-semibold text-gray-800 hover:text-yellow-600"
                >
                  {item.title}
                </Link>
                <p className="text-yellow-600 mt-1 font-medium">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="text-yellow-600 font-semibold hover:underline"
          >
            ← Quay lại cửa hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
