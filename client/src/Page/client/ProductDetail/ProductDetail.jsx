import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
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

        // Tự động chọn màu + size đầu tiên
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchProduct();
  }, [slug]);

  // Tìm variant đang được chọn
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

    setAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Không gửi token → backend sẽ xử lý guest hoặc bạn tạm thời bỏ middleware protect
        },
        body: JSON.stringify({
          variantId: variant._id,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Thêm vào giỏ thất bại");

      toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
      setQuantity(1); // reset lại số lượng sau khi thêm thành công
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (!product)
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );

  const selectedVariant = getSelectedVariant();
  const outOfStock = selectedVariant?.stock === 0;

  return (
    <>
      <Toaster position="top-center" />

      <div className="container my-5">
        <div className="row g-5">
          {/* === HÌNH ẢNH === */}
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

          {/* === THÔNG TIN === */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

            <div className="d-flex align-items-center mb-3">
              <span className="text-warning fs-5">★★★★★</span>
              <span className="text-muted ms-2">
                ({product.numReviews} đánh giá)
              </span>
            </div>

            {/* Giá */}
            <div className="mb-4">
              <span className="h2 text-danger fw-bold">
                {selectedVariant
                  ? selectedVariant.sale_price.toLocaleString("vi-VN") + "₫"
                  : product.minPrice === product.maxPrice
                  ? product.minPrice.toLocaleString("vi-VN") + "₫"
                  : `${product.minPrice.toLocaleString(
                      "vi-VN"
                    )}₫ - ${product.maxPrice.toLocaleString("vi-VN")}₫`}
              </span>
            </div>

            {/* Cảnh báo tồn kho */}
            {outOfStock ? (
              <div className="alert alert-danger mb-3">Hết hàng</div>
            ) : selectedVariant && selectedVariant.stock < 10 ? (
              <div className="text-danger fw-bold mb-3">
                Chỉ còn {selectedVariant.stock} sản phẩm!
              </div>
            ) : null}

            <p className="text-muted lead">{product.short_description}</p>

            {/* === CHỌN MÀU === */}
            <div className="mb-4">
              <h5 className="fw-bold">
                Màu sắc:{" "}
                <span className="text-primary">{selectedColor?.name}</span>
              </h5>
              <div className="d-flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className={`border rounded-circle p-1 cursor-pointer ${
                      selectedColor?.id === color.id
                        ? "border-primary border-3"
                        : ""
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

            {/* === CHỌN SIZE === */}
            <div className="mb-4">
              <h5 className="fw-bold">
                Kích thước:{" "}
                <span className="text-primary">{selectedSize?.name}</span>
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

            {/* === SỐ LƯỢNG === */}
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

            {/* === NÚT THÊM GIỎ HÀNG === */}
            <button
              className="btn btn-danger btn-lg px-5 py-3 fw-bold w-100"
              onClick={handleAddToCart}
              disabled={adding || !selectedVariant || outOfStock}
            >
              {adding ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
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
      </div>
    </>
  );
};

export default ProductDetail;
