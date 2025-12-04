import React from "react";
import { Search } from "lucide-react";

export default function SearchBox({ value, onChange }) {
  return (
    <div className="input-group mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Tìm kiếm sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="btn btn-danger">
        <Search size={20} />
      </button>
    </div>
  );
}