import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Step1BasicInfo = ({ product, categories, onNext }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    short_description: "",
    tags: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData({
        name: product?.name || "",
        brand: product?.brand || "",
        category: product?.category?._id || product?.category || "",
        description: product?.description || "",
        short_description: product?.short_description || "",
        tags: Array.isArray(product?.tags)
          ? product.tags.join(", ")
          : product?.tags || "",
      });

      if (product?.images && product.images.length > 0) {
        setImagePreviews(
          product.images.map((img) => ({
            url: img.url,
            alt: img.alt || "",
            isNew: false,
          }))
        );
      } else {
        setImagePreviews([]);
      }

      if (product?.newImageFiles) {
        setImageFiles(product.newImageFiles);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [product]);

  const handleImageSelect = (files) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 10 - imagePreviews.length);

    if (newFiles.length === 0) {
      toast.error("Không có ảnh hợp lệ hoặc đã đủ 10 ảnh!");
      return;
    }

    const newPreviews = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          url: reader.result,
          alt: file.name.split(".").slice(0, -1).join("."),
          isNew: true,
        });

        if (newPreviews.length === newFiles.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
          setImageFiles((prev) => [...prev, ...newFiles]);
          toast.success(`Đã thêm ${newFiles.length} ảnh mới`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const removed = imagePreviews[index];
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (removed.isNew) {
      const newFilesIndex =
        index - (imagePreviews.length - imageFiles.length - 1);
      setImageFiles((prev) => prev.filter((_, i) => i !== newFilesIndex));
    }

    toast.info("Đã xóa ảnh");
  };

  const validate = () => {
    if (!formData.name.trim()) return "Vui lòng nhập tên sản phẩm";
    if (!formData.category) return "Vui lòng chọn danh mục";
    if (!formData.description.trim()) return "Vui lòng nhập mô tả chi tiết";
    if (imagePreviews.length === 0) return "Vui lòng tải lên ít nhất 1 ảnh";
    return null;
  };

  const handleNext = () => {
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    const dataToPass = {
      ...formData,
      images: imagePreviews.map((p) => ({ url: p.url, alt: p.alt })),
      newImageFiles: imageFiles,
    };

    onNext(dataToPass);
  };

  return (
    <div className="p-4">
      <h6 className="fw-bold text-success mb-4">Bước 1: Thông tin cơ bản</h6>

      <div className="row g-4">
        <div className="col-lg-8">
          <label className="form-label fw-semibold">
            Tên sản phẩm <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="VD: Áo thun nam cổ tròn cotton"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="col-lg-4">
          <label className="form-label fw-semibold">Thương hiệu</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Nike, Adidas..."
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold">
            Danh mục <span className="text-danger">*</span>
          </label>
          <select
            className="form-select form-select-lg"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.product_category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <div className="bg-light rounded-4 p-4 border">
            <h6 className="fw-bold text-info mb-3">
              Hình ảnh sản phẩm <span className="text-danger">*</span>
            </h6>

            <div
              className="border-3 border-dashed border-primary rounded-4 p-5 text-center mb-4 bg-white"
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("imageUpload").click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImageSelect(e.dataTransfer.files);
              }}
            >
              <div className="text-primary mb-3">
                <svg
                  width="56"
                  height="56"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>
              </div>
              <p className="mb-1 fw-semibold">
                Kéo thả ảnh vào đây hoặc{" "}
                <span className="text-primary">click để chọn</span>
              </p>
              <small className="text-muted">
                Tối đa 10 ảnh
              </small>
            </div>

            <input
              type="file"
              id="imageUpload"
              multiple
              accept="image/*"
              className="d-none"
              onChange={(e) => handleImageSelect(e.target.files)}
            />

            {imagePreviews.length > 0 && (
              <div className="row g-3">
                {imagePreviews.map((img, index) => (
                  <div
                    key={index}
                    className="col-6 col-md-4 col-lg-3 position-relative"
                  >
                    <div className="ratio ratio-1x1 rounded overflow-hidden border shadow-sm">
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="object-fit-cover w-100 h-100"
                      />
                    </div>
                    {index === 0 && (
                      <span className="badge bg-primary position-absolute bottom-0 start-0 m-2">
                        Ảnh chính
                      </span>
                    )}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 translate-middle"
                      style={{ width: 34, height: 34 }}
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold">
            Mô tả chi tiết <span className="text-danger">*</span>
          </label>
          <textarea
            rows="6"
            className="form-control"
            placeholder="Chất liệu, kiểu dáng, xuất xứ, cách bảo quản..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold">
            Mô tả ngắn (tùy chọn)
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.short_description}
            onChange={(e) =>
              setFormData({ ...formData, short_description: e.target.value })
            }
            placeholder="Hiển thị trên thẻ sản phẩm"
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold">
            Tags (cách nhau bằng dấu phẩy)
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="sale, new, hot, cotton"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-5 gap-3">
        <button className="btn btn-primary btn-lg px-5" onClick={handleNext}>
          Tạo biến thể
        </button>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
