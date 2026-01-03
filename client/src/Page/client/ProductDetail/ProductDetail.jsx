import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../../../context/CartContext";
import { Star, StarFill } from "react-bootstrap-icons"; // Icon sao

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/detail/${slug}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Không tải được sản phẩm");

        setProduct(data);

        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch (err) {
        toast.error(err.message);
      }
    };

    const fetchReviews = async () => {
      try {
        setReviewLoading(true);
        const res = await fetch(`/api/reviews/product/${slug}`); // hoặc /api/reviews/:productId nếu dùng ID
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Không tải được đánh giá");

        setReviews(data.reviews || []);
      } catch (err) {
        console.error(err);
        // Không bắt lỗi toast để tránh làm phiền người dùng nếu không có đánh giá
      } finally {
        setReviewLoading(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [slug]);

  const getSelectedVariant = () => {
    if (!product?.variants || !selectedColor || !selectedSize) return null;

    return product.variants.find(
      (v) =>
        v.color?.attribute_color_code?.toUpperCase() ===
          selectedColor.code?.toUpperCase() &&
        v.size?.attribute_size_name === selectedSize.name
    );
  };

  const handleAddToCart = async () => {
    const variant = getSelectedVariant();

    if (!variant) {
      toast.error("Vui lòng chọn màu sắc và kích thước!");
      return;
    }

    if (variant.stock < quantity) {
      toast.error(`Chỉ còn ${variant.stock} sản phẩm trong kho!`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    setAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          variantId: variant._id,
          quantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Thêm vào giỏ thất bại");

      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
      setQuantity(1);
      refreshCartCount();
    } catch (err) {
      if (err.message.toLowerCase().includes("token")) {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(err.message);
      }
    } finally {
      setAdding(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="d-inline-flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {rating >= star ? (
              <StarFill className="text-warning" size={18} />
            ) : (
              <Star className="text-muted" size={18} />
            )}
          </span>
        ))}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  const selectedVariant = getSelectedVariant();
  const outOfStock = selectedVariant?.stock === 0;
  const avgRating = product.rating || 0;
  const totalReviews = product.numReviews || reviews.length;

  return (
    <>
      <Toaster position="top-center" />

      <div className="container my-5">
        <div className="row g-5">
          {/* Hình ảnh sản phẩm */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-12">
                <img
                  src={product.images[mainImage]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: "550px", objectFit: "cover", width: "100%" }}
                />
              </div>

              <div className="col-12">
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`Ảnh ${i + 1}`}
                      className={`rounded cursor-pointer border ${
                        mainImage === i ? "border-primary border-3" : "border"
                      }`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onClick={() => setMainImage(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

            <div className="d-flex align-items-center mb-3">
              {renderStars(avgRating)}
              <span className="text-muted ms-2 fw-medium">
                ({totalReviews} đánh giá)
              </span>
            </div>

            <div className="mb-4">
              <span className="h2 text-danger fw-bold">
                {selectedVariant
                  ? `${selectedVariant.sale_price.toLocaleString("vi-VN")}₫`
                  : product.minPrice === product.maxPrice
                  ? `${product.minPrice.toLocaleString("vi-VN")}₫`
                  : `${product.minPrice.toLocaleString("vi-VN")}₫ - ${product.maxPrice.toLocaleString("vi-VN")}₫`}
              </span>
            </div>

            {outOfStock ? (
              <div className="alert alert-danger mb-3">Hết hàng</div>
            ) : selectedVariant && selectedVariant.stock < 10 ? (
              <div className="text-danger fw-bold mb-3">
                Chỉ còn {selectedVariant.stock} sản phẩm!
              </div>
            ) : null}

            <p className="text-muted lead">{product.short_description}</p>

            {/* Chọn màu */}
            <div className="mb-4">
              <h5 className="fw-bold">
                Màu sắc: <span className="text-primary">{selectedColor?.name || ""}</span>
              </h5>
              <div className="d-flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className={`border rounded-circle p-1 cursor-pointer ${
                      selectedColor?.id === color.id ? "border-primary border-3" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className="rounded-circle"
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: color.code,
                        border: color.name.toLowerCase().includes("trắng")
                          ? "2px solid #ddd"
                          : "none",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Chọn kích thước */}
            <div className="mb-4">
              <h5 className="fw-bold">
                Kích thước: <span className="text-primary">{selectedSize?.name || ""}</span>
              </h5>
              <div className="d-flex gap-3 flex-wrap">
                {product.sizes.map((size) => {
                  const disabled = !product.variants.some(
                    (v) =>
                      v.color?.attribute_color_code?.toUpperCase() ===
                        selectedColor?.code?.toUpperCase() &&
                      v.size?.attribute_size_name === size.name &&
                      v.stock > 0
                  );

                  return (
                    <button
                      key={size.id}
                      disabled={disabled}
                      className={`btn btn-lg ${
                        selectedSize?.id === size.id
                          ? "btn-dark text-white"
                          : disabled
                          ? "btn-secondary text-muted"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => !disabled && setSelectedSize(size)}
                      style={{ width: "60px" }}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Số lượng */}
            <div className="mb-4">
              <h5 className="fw-bold">Số lượng</h5>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={adding}
                >
                  -
                </button>
                <span className="mx-4 fw-bold fs-4">{quantity}</span>
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={adding || (selectedVariant?.stock ?? 0) <= quantity}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn btn-danger btn-lg px-5 py-3 fw-bold w-100"
              onClick={handleAddToCart}
              disabled={adding || !selectedVariant || outOfStock}
            >
              {adding ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Đang thêm...
                </>
              ) : outOfStock ? (
                "Hết hàng"
              ) : (
                "Thêm vào giỏ hàng"
              )}
            </button>
          </div>
        </div>

        {/* ==================== PHẦN ĐÁNH GIÁ ==================== */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h4 className="fw-bold mb-4">
                Đánh giá sản phẩm ({totalReviews})
              </h4>

              {reviewLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải đánh giá...</span>
                  </div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <p className="lead">Chưa có đánh giá nào cho sản phẩm này.</p>
                  <p>Hãy là người đầu tiên đánh giá!</p>
                </div>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-bottom pb-4 mb-4"
                    >
                      <div className="d-flex align-items-start gap-3">
                        <img
                          src={review.user?.avatar || "https://via.placeholder.com/50"}
                          alt={review.user?.name}
                          className="rounded-circle"
                          width={50}
                          height={50}
                          style={{ objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="fw-bold mb-0">{review.user?.name || "Khách hàng"}</h6>
                            <small className="text-muted">
                              {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                            </small>
                          </div>
                          <div className="mb-2">
                            {renderStars(review.rating)}
                          </div>
                          {review.comment ? (
                            <p className="mb-0 text-muted">{review.comment}</p>
                          ) : (
                            <p className="text-muted fst-italic">Không có nhận xét</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;