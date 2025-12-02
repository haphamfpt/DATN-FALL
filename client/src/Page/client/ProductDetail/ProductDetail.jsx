import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const images = [
    "https://img.lazcdn.com/g/p/400c1847b16e7d61973db0ee371642c8.jpg_720x720q80.jpg",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    "https://product.hstatic.net/200000732063/product/8d85c3a9020d05e51bf158f4563622b4_e7a58defa68b4dc4a606ce787ee30d1a_master.jpg",
  ];

  const colors = ["Đen", "Trắng", "Xanh Navy", "Đỏ"];
  const colorCodes = {
    Đen: "#2c2c2c",
    Trắng: "#ffffff",
    "Xanh Navy": "#1c294d",
    Đỏ: "#c0392b",
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="container my-5">
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-12">
              <img
                src={images[mainImage]}
                alt="Sản phẩm chính"
                className="img-fluid rounded shadow-sm"
                style={{ height: "550px", objectFit: "cover", width: "100%" }}
              />
            </div>

            <div className="col-12">
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
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
          <h1 className="display-5 fw-bold mb-3">Áo Thun Premium Cotton</h1>

          <div className="d-flex align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <span className="text-warning fs-4">★★★★★</span>
              <span className="text-muted">(128 đánh giá)</span>
              <span className="text-success fw-bold">Còn hàng</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="h2 text-danger fw-bold">399.000₫</span>
            <del className="text-muted ms-3 fs-5">599.000₫</del>
            <span className="badge bg-danger ms-2">-33%</span>
          </div>

          <p className="text-muted lead">
            Áo thun cotton 100% cao cấp, mềm mại, thoáng mát, form dáng chuẩn.
            Phù hợp mặc hàng ngày, đi chơi hoặc làm đồng phục nhóm.
          </p>

          <div className="mb-4">
            <h5 className="fw-bold">
              Màu sắc: <span className="text-primary">{selectedColor}</span>
            </h5>
            <div className="d-flex gap-3 flex-wrap">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`border rounded-circle p-1 cursor-pointer ${
                    selectedColor === color ? "border-primary border-3" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <div
                    className="rounded-circle"
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: colorCodes[color],
                      border: color === "Trắng" ? "2px solid #ddd" : "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              Kích thước: <span className="text-primary">{selectedSize}</span>
            </h5>
            <div className="d-flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`btn btn-lg ${
                    selectedSize === size
                      ? "btn-dark text-white"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  style={{ width: "60px" }}
                >
                  {size}
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

          <div className="d-grid d-md-flex gap-3">
            <button className="btn btn-danger btn-lg px-5 py-3 fw-bold">
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>

          <div className="mt-5 p-4 border rounded bg-light">
            <div className="row text-center text-md-start">
              <div className="col-12 col-md-4 mb-3">
                <strong>✔ Miễn phí vận chuyển</strong>
                <br />
                <small>Đơn từ 500k</small>
              </div>
              <div className="col-12 col-md-4 mb-3">
                <strong>✔ Đổi trả dễ dàng</strong>
                <br />
                <small>Trong 30 ngày</small>
              </div>
              <div className="col-12 col-md-4 mb-3">
                <strong>✔ Bảo hành chính hãng</strong>
                <br />
                <small>1 đổi 1 nếu lỗi</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
