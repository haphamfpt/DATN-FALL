import { useState } from "react";
import { toast } from "react-hot-toast";

const Step2VariantsSelector = ({
  colors,
  sizes,
  selectedColors: propSelectedColors = [],
  selectedSizes: propSelectedSizes = [],
  currentVariants = [],
  onNext,
}) => {
  const [selectedColors, setSelectedColors] = useState(propSelectedColors);
  const [selectedSizes, setSelectedSizes] = useState(propSelectedSizes);

  const generateVariants = () => {
    if (selectedColors.length === 0 || selectedSizes.length === 0) {
      return toast.error("Vui lòng chọn ít nhất 1 màu và 1 kích thước!");
    }

    const variants = [];
    selectedColors.forEach((colorId) => {
      const color = colors.find((c) => c._id === colorId);
      selectedSizes.forEach((sizeId) => {
        const size = sizes.find((s) => s._id === sizeId);
        const existing = currentVariants.find(
          (v) => v.colorId === colorId && v.sizeId === sizeId
        );

        variants.push({
          tempId: `${colorId}-${sizeId}`,
          colorId,
          colorName: color?.attribute_color_name || "",
          colorCode: color?.attribute_color_code || "#000",
          sizeId,
          sizeName: size?.attribute_size_name || "",
          sale_price: existing?.sale_price || "",
          import_price: existing?.import_price || "",
          stock: existing?.stock || "",
          enabled: true,
        });
      });
    });

    onNext(variants);
  };

  return (
    <div className="p-3">
      <h6 className="fw-bold text-success mb-4">
        Bước 2: Chọn màu sắc và kích thước
      </h6>
      <div className="row g-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Chọn màu sắc</label>
          <div
            className="border rounded-3 bg-white p-3"
            style={{ maxHeight: "320px", overflowY: "auto" }}
          >
            {colors.map((color) => (
              <div
                key={color._id}
                className="form-check form-check-inline me-4 mb-3"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`color-${color._id}`}
                  checked={selectedColors.includes(color._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedColors([...selectedColors, color._id]);
                    } else {
                      setSelectedColors(
                        selectedColors.filter((id) => id !== color._id)
                      );
                    }
                  }}
                />
                <label
                  className="form-check-label d-flex align-items-center gap-2"
                  htmlFor={`color-${color._id}`}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: color.attribute_color_code,
                      borderRadius: 6,
                      border: "2px solid #fff",
                      boxShadow: "0 0 6px rgba(0,0,0,0.25)",
                    }}
                  />
                  <span>{color.attribute_color_name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">Chọn kích thước</label>
          <div className="border rounded-3 bg-white p-3">
            <div className="row g-2">
              {sizes.map((size) => (
                <div key={size._id} className="col-4 col-md-3">
                  <div className="form-check">
                    <input
                      className="btn-check"
                      type="checkbox"
                      id={`size-${size._id}`}
                      checked={selectedSizes.includes(size._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSizes([...selectedSizes, size._id]);
                        } else {
                          setSelectedSizes(
                            selectedSizes.filter((id) => id !== size._id)
                          );
                        }
                      }}
                    />
                    <label
                      className={`btn btn-outline-dark w-100 py-2 ${
                        selectedSizes.includes(size._id) ? "active" : ""
                      }`}
                      htmlFor={`size-${size._id}`}
                    >
                      {size.attribute_size_name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <small className="text-muted">
          Đã chọn: <strong>{selectedColors.length} màu</strong> ×{" "}
          <strong>{selectedSizes.length} size</strong> ={" "}
          <strong className="text-success fs-5">
            {selectedColors.length * selectedSizes.length} biến thể
          </strong>
        </small>
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-success px-5" onClick={generateVariants}>
          Tạo bảng giá & tồn kho
        </button>
      </div>
    </div>
  );
};

export default Step2VariantsSelector;
