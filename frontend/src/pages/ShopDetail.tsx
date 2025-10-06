import { FC, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ShopDetail: FC = () => {
  const { id } = useParams();
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Fake danh sách sản phẩm (sau này thay bằng API)
  const allProducts = [
    {
      id: 1,
      title: "Áo thun thể thao Nike Dri-FIT",
      price: 650000,
      image: "/assets/images/product/Dri-Fit.avif",
      colors: ["Đen", "Xanh navy", "Trắng"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      title: "Quần jogger Adidas nam",
      price: 850000,
      image: "/assets/images/product/Z.N.E._Pants_Black.avif",
      colors: ["Xám", "Đen"],
      sizes: ["M", "L", "XL"],
    },
    {
      id: 3,
      title: "Giày chạy bộ Asics Gel",
      price: 1900000,
      image: "/assets/images/product/Samba_OG_Shoes_White.avif",
      colors: ["Trắng", "Xanh dương"],
      sizes: ["39", "40", "41", "42"],
    },
    {
      id: 4,
      title: "Áo khoác thể thao Puma",
      price: 1200000,
      image: "/assets/images/product/Áo-khoác-dệt-Prime-Retro-T7-Puma.avif",
      colors: ["Đen", "Xanh lá"],
      sizes: ["S", "M", "L"],
    },
  ];

  const product = allProducts.find((p) => p.id === Number(id));

  // State lựa chọn
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

  // Thêm vào giỏ
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

  // Mua ngay
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

  // Sản phẩm liên quan
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-10">
      {/* Breadcrumb */}
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

      {/* Main Product */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6">
        {/* Hình ảnh */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg bg-gray-100 mb-4"
          />
          <div className="flex gap-3">
            {[1, 2, 3].map((n) => (
              <img
                key={n}
                src={product.image}
                alt={`thumb${n}`}
                className="w-20 h-20 object-contain bg-gray-100 rounded border border-transparent hover:border-yellow-500 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {product.title}
          </h1>
          <div className="flex items-center mb-3 text-yellow-500">
            {[...Array(4)].map((_, i) => (
              <i key={i} className="fa fa-star"></i>
            ))}
            <i className="fa fa-star-o"></i>
            <span className="ml-2 text-sm text-gray-500">– 5 Reviews</span>
          </div>

          <p className="text-2xl text-yellow-600 font-semibold mb-4">
            {product.price.toLocaleString("vi-VN")}đ
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Sản phẩm thể thao cao cấp giúp bạn thoải mái khi vận động. Chất liệu
            co giãn tốt, thấm hút mồ hôi hiệu quả.
          </p>

          {/* Size */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Chọn Size:</h3>
            <div className="flex gap-3">
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

          {/* Màu sắc */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Chọn Màu:</h3>
            <div className="flex gap-3">
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

          {/* Số lượng & Nút */}
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

      {/* Tabs */}
      <div className="container mx-auto px-6 mt-16">
        <div className="border-b flex gap-8 text-lg font-semibold text-gray-700">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-2 ${
              activeTab === "desc"
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : ""
            }`}
          >
            Mô tả
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 ${
              activeTab === "reviews"
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : ""
            }`}
          >
            Đánh giá
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-2 ${
              activeTab === "info"
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : ""
            }`}
          >
            Thông tin thêm
          </button>
        </div>

        <div className="mt-6 text-gray-700 leading-relaxed">
          {activeTab === "desc" && (
            <p>
              Chất liệu vải cao cấp, co giãn linh hoạt và thấm hút mồ hôi nhanh
              giúp bạn luôn thoải mái khi vận động.
            </p>
          )}
          {activeTab === "reviews" && (
            <div>
              <p className="font-semibold">Nguyễn Văn A</p>
              <p>Áo đẹp, chất liệu tốt, form chuẩn!</p>
            </div>
          )}
          {activeTab === "info" && (
            <ul className="list-disc list-inside space-y-1">
              <li>Chất liệu: Polyester pha Spandex</li>
              <li>Xuất xứ: Việt Nam</li>
              <li>Bảo hành: 6 tháng</li>
            </ul>
          )}
        </div>
      </div>

      {/* Related Products */}
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

        {/* Nút quay lại Shop */}
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
