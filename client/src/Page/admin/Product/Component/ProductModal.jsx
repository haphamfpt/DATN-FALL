import { useState } from "react";
import Step1BasicInfo from "./Step/Step1BasicInfo";
import Step2VariantsSelector from "./Step/Step2VariantsSelector";
import Step3VariantsTable from "./Step/Step3VariantsTable";

const ProductModal = ({
  product,
  categories,
  colors,
  sizes,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);

  const [step1Data, setStep1Data] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category?._id || "",
    description: product?.description || "",
    short_description: product?.short_description || "",
    tags: Array.isArray(product?.tags) ? product.tags.join(", ") : "",
    images: product?.images || [],
    newImageFiles: [],
  });

  const [step2Data, setStep2Data] = useState({
    selectedColors: product?.variants?.map((v) => v.color._id) || [],
    selectedSizes: product?.variants?.map((v) => v.size._id) || [],
    variants: product?.variants || [],
  });

  const handleClose = () => {
    setStep(1);
    setStep1Data({
      name: "",
      brand: "",
      category: "",
      description: "",
      short_description: "",
      tags: "",
      images: [],
      newImageFiles: [],
    });
    setStep2Data({
      selectedColors: [],
      selectedSizes: [],
      variants: [],
    });
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-2">
            <h5 className="modal-title fw-bold text-dark">
              {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h5>
            <button className="btn-close" onClick={handleClose}></button>
          </div>

          <div
            className="modal-body pt-2"
            style={{ maxHeight: "78vh", overflowY: "auto" }}
          >
            {step === 1 && (
              <Step1BasicInfo
                product={step1Data}
                categories={categories}
                onNext={(data) => {
                  setStep1Data(data);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && (
              <Step2VariantsSelector
                key={
                  step2Data.selectedColors.join(",") +
                  "|" +
                  step2Data.selectedSizes.join(",")
                }
                colors={colors}
                sizes={sizes}
                selectedColors={step2Data.selectedColors}
                selectedSizes={step2Data.selectedSizes}
                currentVariants={step2Data.variants}
                onNext={(variants) => {
                  setStep2Data({
                    ...step2Data,
                    variants,
                    selectedColors: [
                      ...new Set(variants.map((v) => v.colorId)),
                    ],
                    selectedSizes: [...new Set(variants.map((v) => v.sizeId))],
                  });
                  setStep(3);
                }}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <Step3VariantsTable
                key={step2Data.variants.map((v) => v.tempId).join("-")} 
                product={{
                  ...product,
                  ...step1Data,
                  variants: step2Data.variants,
                }}
                onBack={() => setStep(2)}
                onSuccess={onSuccess}
              />
            )}
          </div>

          <div className="modal-footer border-0 pt-3">
            {step > 1 && (
              <button
                className="btn btn-outline-secondary me-auto"
                onClick={() => setStep(step - 1)}
              >
                Quay lại
              </button>
            )}
            <button className="btn btn-secondary me-3" onClick={handleClose}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
