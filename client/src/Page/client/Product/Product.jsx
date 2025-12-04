import React, { useState } from "react";
import SidebarFilter from "./Component/SidebarFilter";
import ProductCard from "./Component/ProductCard";

const products = [
  {
    id: 1,
    name: "Áo Thun ProFlex 2025",
    price: 450000,
    oldPrice: 590000,
    rating: 4.8,
    reviews: 128,
    colors: ["Đen", "Trắng", "Xám"],
    sizes: ["M", "L", "XL"],
    sale: true,
  },
  {
    id: 2,
    name: "Quần Jogger Thể Thao",
    price: 580000,
    oldPrice: 750000,
    rating: 4.9,
    reviews: 89,
    colors: ["Đen", "Xanh Navy"],
    sizes: ["S", "M", "L", "XL"],
    sale: true,
  },
  {
    id: 3,
    name: "Áo Khoác Gió Windbreaker",
    price: 890000,
    oldPrice: null,
    rating: 5.0,
    reviews: 201,
    colors: ["Xanh", "Đen", "Đỏ"],
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "Áo Polo Cao Cấp Cotton",
    price: 420000,
    oldPrice: 550000,
    rating: 4.7,
    reviews: 156,
    colors: ["Trắng", "Xanh Mint", "Hồng"],
    sizes: ["S", "M", "L"],
    sale: true,
  },
  {
    id: 5,
    name: "Short Kaki Nam Basic",
    price: 380000,
    oldPrice: null,
    rating: 4.6,
    reviews: 92,
    colors: ["Be", "Xám", "Đen"],
    sizes: ["29", "30", "31", "32", "33"],
  },
  {
    id: 6,
    name: "Hoodie Oversize Streetwear",
    price: 720000,
    oldPrice: 950000,
    rating: 4.9,
    reviews: 312,
    colors: ["Đen", "Xám", "Nâu"],
    sizes: ["M", "L", "XL"],
    sale: true,
  },
];

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceMax, setPriceMax] = useState(1500000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice = p.price <= priceMax;
    const matchColor =
      selectedColors.length === 0 ||
      p.colors.some((c) => selectedColors.includes(c));
    const matchSize =
      selectedSizes.length === 0 ||
      p.sizes.some((s) => selectedSizes.includes(s));
    return matchSearch && matchPrice && matchColor && matchSize;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setPriceMax(1500000);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"
      />

      <div className="container py-5" style={{ maxWidth: "1400px" }}>
        <div className="row g-4">
          <div className="col-lg-3">
            <SidebarFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              onClear={clearFilters}
            />
          </div>

          <div className="col-lg-9">
            <div className="row">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <p className="fs-4 text-muted">Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
