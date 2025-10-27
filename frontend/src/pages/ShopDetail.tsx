import { FC, useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axiosClient from "../api/axiosClient";

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

  // ✅ Dữ liệu sản phẩm từ API
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ State chọn size, màu, số lượng
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // ✅ Tab mô tả / bình luận
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");

  // ✅ Đánh giá (review) lưu localStorage
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // ✅ Gọi API chi tiết sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`/products/${id}`);
        const data = res.data.data;
        setProduct(data);

        // ✅ Gọi thêm sản phẩm liên quan cùng danh mục
        const relatedRes = await axiosClient.get(
          `/products?category_id=${data.category_id}`
        );
        setRelated(
          relatedRes.data.data.filter((p: any) => p.id !== data.id).slice(0, 3)
        );
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Lấy review từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${id}`);
    if (stored) setReviews(JSON.parse(stored));
  }, [id]);

  // ✅ Tính điểm trung bình
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

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Đang tải thông tin sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Không tìm thấy sản phẩm.{" "}
        <Link to="/shop" className="text-yellow-600 underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // ✅ Lấy danh sách màu / size từ biến thể
  const colors =
    product.variants?.map((v: any) => v.color?.name).filter((v: any) => v) ||
    [];
  const sizes =
    product.variants?.map((v: any) => v.size?.name).filter((v: any) => v) || [];

  // ✅ Thêm vào giỏ
  const handleAddToCart = () => {
    if (
      (sizes.length > 0 && !selectedSize) ||
      (colors.length > 0 && !selectedColor)
    ) {
      alert("Vui lòng chọn đầy đủ size và màu (nếu có)!");
      return;
    }

    const price =
      product.variant_sale_price ||
      product.variant_listed_price ||
      product.price ||
      0;

    addToCart({
      id: product.id,
      title:
        product.product_name +
        (selectedSize || selectedColor
          ? ` (${selectedSize || ""}${
              selectedSize && selectedColor ? " - " : ""
            }${selectedColor || ""})`
          : ""),
      price,
      image: product.product_image_url || "/assets/images/product/default.webp",
      quantity,
    });
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  // ✅ Mua ngay
  const handleBuyNow = () => {
    clearCart();

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
      quantity,
    });
    navigate("/checkout");
  };

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
        / <span className="text-gray-800">{product.product_name}</span>
      </div>

      {/* 🔹 Thông tin sản phẩm */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6">
        <div>
          <img
            src={
              product.product_image_url || "/assets/images/product/default.webp"
            }
            alt={product.product_name}
            className="w-full h-[400px] object-contain bg-gray-100 rounded-lg mb-4"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {product.product_name}
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
            {(
              product.variant_sale_price ||
              product.variant_listed_price ||
              product.price
            ).toLocaleString("vi-VN")}
            đ
          </p>

          {/* Chọn size */}
          {sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Chọn Size:</h3>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((s: string, idx: number) => (
                  <button
                    key={idx}
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

          {/* Chọn màu */}
          {colors.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Chọn Màu:</h3>
              <div className="flex gap-3 flex-wrap">
                {colors.map((c: string, idx: number) => (
                  <button
                    key={idx}
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

          {/* Số lượng + nút hành động */}
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

      {/* 🔹 Tabs: Mô tả / Bình luận */}
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
          <div className="bg-white p-6 rounded-lg shadow text-gray-700 whitespace-pre-line">
            {product.product_description ||
              "Hiện chưa có mô tả cho sản phẩm này."}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white p-6 rounded-lg shadow">
            {/* Form đánh giá */}
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
                  src={
                    item.product_image_url ||
                    "/assets/images/product/default.webp"
                  }
                  alt={item.product_name}
                  className="w-full h-56 object-contain bg-gray-100"
                />
              </Link>
              <div className="p-4 text-center">
                <Link
                  to={`/shop/${item.id}`}
                  className="block font-semibold text-gray-800 hover:text-yellow-600"
                >
                  {item.product_name}
                </Link>
                <p className="text-yellow-600 mt-1 font-medium">
                  {(
                    item.variant_sale_price ||
                    item.variant_listed_price ||
                    item.price
                  ).toLocaleString("vi-VN")}
                  đ
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
