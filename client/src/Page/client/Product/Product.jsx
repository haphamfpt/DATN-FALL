import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarFilter from "./Component/SidebarFilter";
import ProductCard from "./Component/ProductCard";
import Pagination from "./Component/Pagination";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceMax, setPriceMax] = useState(2000000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 12);

        if (searchTerm.trim()) params.append("search", searchTerm.trim());
        if (priceMax < 2000000) params.append("price_lte", priceMax);

        selectedColors.forEach((id) => params.append("color", id));
        selectedSizes.forEach((id) => params.append("size", id));

        const res = await axios.get(`/api/products?${params.toString()}`);

        setProducts(res.data.products);
        setTotalPages(res.data.pagination.pages);

        const colorsSet = new Set();
        const sizesSet = new Set();
        res.data.products.forEach((p) => {
          p.variants.forEach((v) => {
            if (v.color) colorsSet.add(JSON.stringify(v.color));
            if (v.size) sizesSet.add(JSON.stringify(v.size));
          });
        });

        setAvailableColors(Array.from(colorsSet).map(JSON.parse));
        setAvailableSizes(Array.from(sizesSet).map(JSON.parse));
      } catch (err) {
        console.error("Lỗi fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchTerm, priceMax, selectedColors, selectedSizes]);

  const clearFilters = () => {
    setSearchTerm("");
    setPriceMax(2000000);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPage(1);
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
          <div
            className="col-lg-3 position-sticky"
            style={{ top: "100px", height: "fit-content" }}
          >
            <SidebarFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              availableColors={availableColors}
              availableSizes={availableSizes}
              onClear={clearFilters}
            />
          </div>

          <div className="col-lg-9">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status"></div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="mb-0 text-muted">
                    Hiển thị {products.length} sản phẩm
                  </p>
                </div>

                <div className="row g-4">
                  {products.map((product) => (
                    <div key={product._id} className="col-6 col-md-4 col-lg-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-5">
                    <p className="fs-4 text-muted">
                      Không tìm thấy sản phẩm nào
                    </p>
                  </div>
                )}

                {totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
