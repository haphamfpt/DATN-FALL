import React from "react";

const sizes = ["S", "M", "L", "XL", "XXL", "29", "30", "31", "32", "33", "34", "35"];

export default function SizeFilter({ selected, onToggle }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-3">Kích thước</h6>

      <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))" }}>
        {sizes.map((size) => {
          const isSelected = selected.includes(size);

          return (
            <label
              key={size}
              onClick={() => onToggle(size)}
              className={`
                d-flex align-items-center justify-content-center
                py-3 rounded-3 border cursor-pointer user-select-none
                transition-all fw-medium text-center shadow-sm
                ${isSelected
                  ? "bg-danger text-white border-danger"
                  : "bg-white border hover:border-danger hover:text-danger hover:shadow-md"
                }
              `}
              style={{
                height: "52px",
                fontSize: "0.95rem",
                minWidth: "72px", 
              }}
            >
              {size}
            </label>
          );
        })}
      </div>
    </div>
  );
}