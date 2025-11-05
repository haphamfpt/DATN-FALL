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

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
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

        // ✅ Lấy sản phẩm liên quan
        if (data?.category_id) {
          const relatedRes = await axiosClient.get(
            `/products?category_id=${data.category_id}`
          );
          setRelated(
            relatedRes.data.data
              ?.filter((p: any) => p.product_id !== data.product_id)
              .slice(0, 3) || []
          );
        }
      } catch (err) {
        console.error("❌ Lỗi khi tải sản phẩm:", err);
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
      createdAt: new Date().toLocaleString("vi-VN"),
    };
    const updated = [newItem, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  // ✅ Loading
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

  // ✅ Xác định danh mục & size/màu tương ứng
  let sizes: string[] = [];
  let colors: string[] = [];

  if (product.category_id === 3) {
    // Giày thể thao: size 35–45
    sizes = Array.from({ length: 11 }, (_, i) => (35 + i).toString());
    colors = ["Trắng", "Đen", "Xám", "Xanh navy"];
  } else if (product.category_id === 1 || product.category_id === 2) {
    // Áo & Quần: size chữ
    sizes = ["S", "M", "L", "XL", "XXL"];
    colors = ["Đen", "Trắng", "Xanh", "Đỏ"];
  } else {
    // Phụ kiện, găng tay, v.v.
    sizes = [];
    colors = ["Đen", "Xanh", "Đỏ"];
  }

  // ✅ Chọn ảnh tương ứng theo tên sản phẩm
  const getProductImage = () => {
    const name = product.product_name?.toLowerCase() || "";

    if (
      name.includes("pants") ||
      name.includes("z.n.e") ||
      name.includes("quần")
    )
      return "/assets/images/product/Z.N.E._Pants_Black.avif";

    if (name.includes("dri-fit")) return "/assets/images/product/Dri-Fit.avif";

    if (name.includes("gym")) return "/assets/images/product/gym.webp";

    if (name.includes("samba") || name.includes("giày"))
      return "/assets/images/product/Samba_OG_Shoes_White.avif";

    return "/assets/images/product/default.webp";
  };

  // ✅ Thêm vào giỏ
  const handleAddToCart = () => {
    const price = product.price || 0;
    addToCart({
      id: product.product_id,
      title:
        product.product_name +
        (selectedSize || selectedColor
          ? ` (${selectedSize || ""}${
              selectedSize && selectedColor ? " - " : ""
            }${selectedColor || ""})`
          : ""),
      price,
      image: getProductImage(),
      quantity,
    });
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  // ✅ Mua ngay
  const handleBuyNow = () => {
    clearCart();
    const price = product.price || 0;
    addToCart({
      id: product.product_id,
      title: product.product_name,
      price,
      image: getProductImage(),
      quantity,
    });
    navigate("/checkout");
  };

  return (
    <div className="py-10">
      {/* 🔹 Breadcrumb */}
      <div className="text-sm text-gray-500 container mx-auto mb-6 px-6">
        <Link to="/" className="hover:text-yellow-600">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-yellow-600">
          Cửa hàng
        </Link>{" "}
        / <span className="text-gray-800">{product.product_name}</span>
      </div>

      {/* 🔹 Thông tin sản phẩm */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6">
        <div>
          <img
            src={getProductImage()}
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
            {Number(product.price).toLocaleString("vi-VN")}₫
          </p>

          {/* Size và Màu */}
          {(sizes.length > 0 || colors.length > 0) && (
            <>
              {sizes.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Chọn Size:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {sizes.map((s) => (
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

              {colors.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Chọn Màu:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {colors.map((c) => (
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
            </>
          )}

          {/* Số lượng và nút */}
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
    </div>
  );
};

export default ShopDetail;
