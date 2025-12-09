import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/detail/${slug}`);
      const data = await res.json();
      setProduct(data);

      if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
    };

    fetchProduct();
  }, [slug]);

  if (!product) return <div className="container mt-5">Đang tải...</div>;

  return (
    <div className="container my-5">
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-12">
              <img
                src={product.images[mainImage]?.url}
                alt="Sản phẩm chính"
                className="img-fluid rounded shadow-sm"
                style={{ height: "550px", objectFit: "cover", width: "100%" }}
              />
            </div>

            <div className="col-12">
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`rounded cursor-pointer border ${
                      mainImage === index ? "border-primary border-3" : "border"
                    }`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    onClick={() => setMainImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

          <div className="d-flex align-items-center mb-3">
            <span className="text-warning fs-4">★★★★★</span>
            <span className="text-muted ms-2">
              ({product.numReviews} đánh giá)
            </span>
          </div>

          <div className="mb-4">
            {product.minPrice === product.maxPrice ? (
              <span className="h2 text-danger fw-bold">
                {product.minPrice.toLocaleString()}₫
              </span>
            ) : (
              <span className="h2 text-danger fw-bold">
                {product.minPrice.toLocaleString()}₫ -{" "}
                {product.maxPrice.toLocaleString()}₫
              </span>
            )}
          </div>

          <p className="text-muted lead">{product.short_description}</p>

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
                      border:
                        color.name === "Trắng" ? "2px solid #ddd" : "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              Kích thước:{" "}
              <span className="text-primary">{selectedSize?.name}</span>
            </h5>

            <div className="d-flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size.id}
                  className={`btn btn-lg ${
                    selectedSize?.id === size.id
                      ? "btn-dark text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  style={{ width: "60px" }}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">Số lượng</h5>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-4 fw-bold fs-4">{quantity}</span>
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button className="btn btn-danger btn-lg px-5 py-3 fw-bold w-100">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
