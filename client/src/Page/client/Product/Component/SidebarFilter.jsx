import React from "react";
import { Filter } from "lucide-react";
import SearchBox from "./SearchBox";
import PriceRangeFilter from "./PriceRangeFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

export default function SidebarFilter({
  searchTerm,
  setSearchTerm,
  priceMax,
  setPriceMax,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  availableColors,
  availableSizes,
  onClear
}) {
  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="bg-white rounded-3 shadow-sm p-4 " style={{ top: "100px" }}>
      <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <Filter size={20} />
        Bộ lọc sản phẩm
      </h5>

      <SearchBox value={searchTerm} onChange={setSearchTerm} />
      <PriceRangeFilter value={priceMax} onChange={setPriceMax} />
      <ColorFilter selected={selectedColors} onToggle={toggleColor} availableColors={availableColors} />
      <SizeFilter selected={selectedSizes} onToggle={toggleSize} availableSizes={availableSizes} />

      <button className="btn btn-outline-danger w-100" onClick={onClear}>
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
}