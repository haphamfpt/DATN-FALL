import React from "react";

export default function ColorFilter({ selected, onToggle, availableColors }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-3">Màu sắc</h6>

      <div className="row g-3">
        {availableColors.map((color) => {
          const isSelected = selected.includes(color._id);
          return (
            <div key={color._id} className="col-4 col-sm-3 col-md-6 col-lg-4">
              <label
                className={`d-flex align-items-center gap-2 p-2 rounded-3 shadow-sm border cursor-pointer transition-all
                  ${isSelected ? "border-danger bg-danger-subtle" : "border-light"}
                `}
                onClick={() => onToggle(color._id)}
              >
                <div
                  className={`rounded-3`}
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: color.attribute_color_code || "#ccc",
                    flexShrink: "0 0 32px",
                  }}
                />
                <span className={isSelected ? "text-danger fw-medium" : ""}>
                  {color.attribute_color_name}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}