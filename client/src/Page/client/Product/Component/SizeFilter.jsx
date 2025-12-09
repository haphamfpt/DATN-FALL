import React from "react";

export default function SizeFilter({ selected, onToggle, availableSizes }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-3">Kích thước</h6>

      <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))" }}>
        {availableSizes.map((size) => {
          const isSelected = selected.includes(size._id);
          return (
            <label
              key={size._id}
              onClick={() => onToggle(size._id)}
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
              {size.attribute_size_name}
            </label>
          );
        })}
      </div>
    </div>
  );
}