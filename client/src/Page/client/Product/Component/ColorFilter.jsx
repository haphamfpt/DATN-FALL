import React from "react";

const colorOptions = [
  { name: "Đen", value: "Đen", hex: "#1a1a1a" },
  { name: "Trắng", value: "Trắng", hex: "#ffffff", border: true },
  { name: "Xám", value: "Xám", hex: "#8c8c8c" },
  { name: "Xanh Navy", value: "Xanh Navy", hex: "#1c2b4b" },
  { name: "Xanh Lá", value: "Xanh", hex: "#2e8b57" },
  { name: "Đỏ", value: "Đỏ", hex: "#dc3545" },
  { name: "Be", value: "Be", hex: "#f5deb3" },
  { name: "Hồng", value: "Hồng", hex: "#e91e63" },
  { name: "Nâu", value: "Nâu", hex: "#8b4513" },
];

export default function ColorFilter({ selected, onToggle }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-3">Màu sắc</h6>

      <div className="row g-3">
        {colorOptions.map(({ name, value, hex, border }) => {
          const isSelected = selected.includes(value);

          return (
            <div key={value} className="col-4 col-sm-3 col-md-6 col-lg-4">
              <label
                className={`d-flex align-items-center gap-2 p-2 rounded-3 shadow-sm border cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-danger bg-danger-subtle shadow-sm"
                      : "border-light hover:border-gray-300"
                  }`}
                onClick={() => onToggle(value)}
              >
                <div
                  className={`rounded-2 position-relative rounded-3 overflow-hidden ${
                    border ? "border border-dark" : ""
                  }`}
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: hex,
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <div className="position-absolute inset-0 d-flex align-items-center justify-content-center">
                    </div>
                  )}
                </div>

                <span
                  className={`small fw-medium ${
                    isSelected ? "text-danger" : ""
                  }`}
                >
                  {name}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
