import { FC, useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ShopDetail: FC = () => {
  const { id } = useParams();
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔹 Danh sách sản phẩm (demo)
  const allProducts = [
    {
      id: 1,
      title: "Áo thun thể thao Nike Dri-FIT",
      price: 650000,
      image: "/assets/images/product/Dri-Fit.avif",
      colors: ["Đen", "Xanh navy", "Trắng"],
      sizes: ["S", "M", "L", "XL"],
      description: `### 👕 Giới thiệu sản phẩm  
Áo thun thể thao **Nike Dri-FIT** được sản xuất với công nghệ thấm hút mồ hôi tiên tiến, giúp bạn luôn khô thoáng và tự tin trong mọi buổi tập luyện.  
Với thiết kế năng động, chất liệu nhẹ và thoáng khí, sản phẩm phù hợp cho cả **nam và nữ**, từ người tập gym, yoga đến chạy bộ ngoài trời.  

### 🏆 Ưu điểm nổi bật  
- Chất liệu **Dri-FIT** độc quyền của Nike giúp thoát mồ hôi nhanh.  
- Vải co giãn 4 chiều, ôm vừa vặn cơ thể, không gây bí.  
- Logo Nike in nổi bền màu, chống bong tróc.  
- Đường may tinh tế, giảm ma sát khi vận động.  

### ⚙️ Thông số kỹ thuật  
| Thuộc tính | Thông tin |
|-------------|-----------|
| Chất liệu | 100% Polyester Dri-FIT |
| Màu sắc | Đen / Trắng / Xanh navy |
| Size | S, M, L, XL |
| Xuất xứ | Việt Nam |
| Giặt | Giặt nhẹ, không sấy nóng, không ngâm thuốc tẩy |

### 💡 Hướng dẫn bảo quản  
- Giặt bằng tay hoặc máy giặt chế độ nhẹ.  
- Không phơi trực tiếp dưới ánh nắng mạnh.  
- Ủi ở nhiệt độ thấp nếu cần thiết.  

> Sản phẩm phù hợp cho người chơi thể thao, dân văn phòng yêu thích sự thoải mái hoặc làm quà tặng cho bạn bè yêu thể thao.`,
    },

    {
      id: 2,
      title: "Quần jogger Adidas nam",
      price: 850000,
      image: "/assets/images/product/Z.N.E._Pants_Black.avif",
      colors: ["Xám", "Đen"],
      sizes: ["M", "L", "XL"],
      description: `### 👖 Giới thiệu sản phẩm  
**Quần jogger Adidas nam** mang phong cách thể thao hiện đại, dễ phối đồ và tiện dụng trong mọi hoàn cảnh — từ đi làm, đi học cho đến luyện tập.  
Thiết kế ôm vừa vặn giúp tôn dáng, mang lại cảm giác năng động và thoải mái.

### 🏆 Ưu điểm nổi bật  
- Dáng jogger bo gấu thời trang, linh hoạt khi vận động.  
- Vải cotton pha spandex mềm mịn, không nhăn, không xù.  
- Cạp chun co giãn, dây rút điều chỉnh linh hoạt.  
- In logo Adidas tinh tế ở ống quần, tạo điểm nhấn thương hiệu.  

### ⚙️ Thông số kỹ thuật  
| Thuộc tính | Thông tin |
|-------------|-----------|
| Chất liệu | Cotton 70% + Spandex 30% |
| Màu sắc | Đen / Xám tro |
| Size | M, L, XL |
| Xuất xứ | Việt Nam |
| Form | Regular Fit (ôm nhẹ, thoải mái) |

### 💡 Hướng dẫn bảo quản  
- Giặt riêng với sản phẩm sáng màu.  
- Không dùng chất tẩy mạnh.  
- Ủi mặt trong ở nhiệt độ thấp.  

> Đây là lựa chọn hàng đầu cho những ai yêu thích phong cách **streetwear năng động**, hoặc cần một chiếc quần vừa đẹp vừa dễ vận động.`,
    },

    {
      id: 3,
      title: "Giày chạy bộ Asics Gel",
      price: 1900000,
      image: "/assets/images/product/Samba_OG_Shoes_White.avif",
      colors: ["Trắng", "Xanh dương"],
      sizes: ["39", "40", "41", "42"],
      description: `### 👟 Giới thiệu sản phẩm  
**Giày chạy bộ Asics Gel** là dòng sản phẩm nổi tiếng toàn cầu của thương hiệu Asics Nhật Bản, nổi bật với công nghệ **GEL Cushioning System** – đệm khí giúp giảm chấn thương và bảo vệ khớp gối khi chạy.

### 🏆 Ưu điểm nổi bật  
- Hệ thống đệm GEL đặc trưng hấp thu lực tối đa khi tiếp đất.  
- Đế ngoài AHAR+ cao su siêu bền, chống trơn trượt hiệu quả.  
- Thân giày mesh 3D thoáng khí, nhẹ và ôm chân.  
- Thiết kế thời trang, có thể dùng cho cả chạy bộ lẫn đi làm hàng ngày.  

### ⚙️ Thông số kỹ thuật  
| Thuộc tính | Thông tin |
|-------------|-----------|
| Chất liệu | Mesh tổng hợp + Cao su AHAR+ |
| Trọng lượng | ~250g mỗi chiếc |
| Màu sắc | Trắng / Xanh dương |
| Size | 39 – 42 |
| Xuất xứ | Nhật Bản (gia công tại Việt Nam) |

### 💡 Hướng dẫn sử dụng & bảo quản  
- Nên mang giày với tất cotton để tăng độ thoáng khí.  
- Tránh giặt máy, chỉ vệ sinh bằng khăn ẩm và bàn chải mềm.  
- Để nơi khô thoáng sau khi sử dụng.  

> Dành cho người yêu thể thao, dân công sở thích đi bộ nhẹ hoặc người cần đôi giày đa năng — vừa **thoải mái**, vừa **thời trang**.`,
    },
  ];

  const product = allProducts.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // 🔹 Quản lý tab hiển thị (mô tả / bình luận)
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");

  // 🔹 Bình luận & đánh giá
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${id}`);
    if (stored) setReviews(JSON.parse(stored));
  }, [id]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  // ✅ Thêm bình luận
  const handleAddReview = () => {
    if (!newReview.name || !newReview.comment) {
      alert("Vui lòng nhập tên và nội dung bình luận!");
      return;
    }
    const newItem: Review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toLocaleString(),
    };
    const updated = [newItem, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  if (!product)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Không tìm thấy sản phẩm.{" "}
        <Link to="/shop" className="text-yellow-600 underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );

  // ✅ Thêm vào giỏ
  const handleAddToCart = () => {
    if (
      (product.sizes.length > 0 && !selectedSize) ||
      (product.colors.length > 0 && !selectedColor)
    ) {
      alert("Vui lòng chọn đầy đủ size và màu (nếu có)!");
      return;
    }
    addToCart({
      id: product.id,
      title:
        product.title +
        (selectedSize || selectedColor
          ? ` (${selectedSize || ""}${selectedSize && selectedColor ? " - " : ""}${
              selectedColor || ""
            })`
          : ""),
      price: product.price,
      image: product.image,
      quantity,
    });
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  // ✅ Mua ngay
  const handleBuyNow = () => {
    clearCart();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
    });
    navigate("/checkout");
  };

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-10">
      {/* 🔹 Breadcrumb */}
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

      {/* 🔹 Thông tin sản phẩm */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain bg-gray-100 rounded-lg mb-4"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {product.title}
          </h1>

          {/* ⭐ Đánh giá trung bình */}
          <div className="flex items-center mb-3 text-yellow-500">
            {[1, 2, 3, 4, 5].map((n) => (
              <i
                key={n}
                className={`fa ${n <= Number(averageRating) ? "fa-star" : "fa-star-o"}`}
              ></i>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {averageRating}/5 ({reviews.length} đánh giá)
            </span>
          </div>

          <p className="text-2xl text-yellow-600 font-semibold mb-4">
            {product.price.toLocaleString("vi-VN")}đ
          </p>

          {/* Chọn size / màu */}
          {product.sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Chọn Size:</h3>
              <div className="flex gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === s
                        ? "bg-yellow-500 text-white"
                        : "hover:border-yellow-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.colors.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Chọn Màu:</h3>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === c
                        ? "bg-black text-white"
                        : "hover:border-yellow-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Số lượng */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center border rounded">
              <button
                className="px-3 py-1"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                readOnly
                value={quantity}
                className="w-12 text-center border-x"
              />
              <button
                className="px-3 py-1"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              Thêm vào giỏ
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

      {/* 🔹 Tabs: Mô tả & Đánh giá */}
      <div className="container mx-auto mt-16 px-6">
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab("desc")}
            className={`py-2 px-6 font-semibold ${
              activeTab === "desc"
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : ""
            }`}
          >
            Mô tả sản phẩm
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-2 px-6 font-semibold ${
              activeTab === "reviews"
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : ""
            }`}
          >
            Đánh giá & Bình luận
          </button>
        </div>

        {activeTab === "desc" && (
          <div className="bg-white p-6 rounded-lg shadow whitespace-pre-line text-gray-700">
            {product.description}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white p-6 rounded-lg shadow">
            {/* Form bình luận */}
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Viết đánh giá của bạn
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Tên của bạn"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                className="border p-2 rounded"
              />
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: Number(e.target.value) })
                }
                className="border p-2 rounded"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ★
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Nhận xét của bạn..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="border p-2 rounded w-full mb-3"
              rows={3}
            ></textarea>
            <button
              onClick={handleAddReview}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
            >
              Gửi đánh giá
            </button>

            {/* Danh sách bình luận */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Đánh giá từ người mua ({reviews.length})
              </h3>
              {reviews.length === 0 ? (
                <p className="text-gray-500">Chưa có đánh giá nào.</p>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="border-b py-3 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{r.name}</p>
                      <div className="text-yellow-500 text-sm">
                        {"★".repeat(r.rating)} {"☆".repeat(5 - r.rating)}
                      </div>
                      <p className="text-gray-700 mt-1">{r.comment}</p>
                    </div>
                    <span className="text-sm text-gray-400">{r.createdAt}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🔹 Sản phẩm liên quan */}
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
