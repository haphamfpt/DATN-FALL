import { useState, useEffect } from "react";
import api from "../../../utils/axiosInstance";
import { toast, Toaster } from "react-hot-toast";
import {
  PencilSquare,
  Trash,
  PlusLg,
  Eye,
  EyeSlash,
} from "react-bootstrap-icons";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    short_description: "",
    images: [{ url: "", alt: "" }],
    listed_price: "",
    sale_price: "",
    import_price: "",
    stock_per_variant: 0,
    is_active: true,
    is_featured: false,
    tags: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, colorRes, sizeRes] = await Promise.all([
        api.get("/products/admin"),
        api.get("/categories"),
        api.get("/attributes/colors"),
        api.get("/attributes/sizes"),
      ]);
      setProducts(prodRes.data.products || []);
      setCategories(catRes.data || []);
      setColors(colorRes.data || []);
      setSizes(sizeRes.data || []);
    } catch {
      toast.error("Không thể tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        category: product.category?._id || "",
        brand: product.brand || "",
        description: product.description,
        short_description: product.short_description || "",
        images:
          product.images.length > 0 ? product.images : [{ url: "", alt: "" }],
        listed_price: product.price || "",
        sale_price: product.sale_price || "",
        import_price: product.import_price || "",
        stock_per_variant: 0,
        is_active: product.is_active,
        is_featured: product.is_featured,
        tags: product.tags?.join(", ") || "",
      });
      api.get(`/products/admin/${product._id}`).then((res) => {
        const variantColors = [
          ...new Set(res.data.variants.map((v) => v.color._id)),
        ];
        const variantSizes = [
          ...new Set(res.data.variants.map((v) => v.size._id)),
        ];
        setSelectedColors(variantColors);
        setSelectedSizes(variantSizes);
      });
    } else {
      setFormData({
        name: "",
        category: "",
        brand: "",
        description: "",
        short_description: "",
        images: [{ url: "", alt: "" }],
        listed_price: "",
        sale_price: "",
        import_price: "",
        stock_per_variant: 0,
        is_active: true,
        is_featured: false,
        tags: "",
      });
      setSelectedColors([]);
      setSelectedSizes([]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.description) {
      return toast.error("Vui lòng nhập tên, danh mục và mô tả!");
    }

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      colors: selectedColors,
      sizes: selectedSizes,
      listed_price: Number(formData.listed_price) || 0,
      sale_price:
        Number(formData.sale_price) || Number(formData.listed_price) || 0,
      import_price: Number(formData.import_price) || 0,
      stock_per_variant: Number(formData.stock_per_variant) || 0,
    };

    try {
      if (editingProduct) {
        const res = await api.put(
          `/products/admin/${editingProduct._id}`,
          payload
        );
        setProducts(
          products.map((p) =>
            p._id === editingProduct._id ? res.data.product : p
          )
        );
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        const res = await api.post("/products/admin", payload);
        setProducts([res.data.product, ...products]);
        toast.success(
          `Tạo sản phẩm thành công! Đã sinh ${
            selectedColors.length * selectedSizes.length
          } biến thể`
        );
      }
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này? Tất cả biến thể sẽ bị xóa!")) return;
    try {
      await api.delete(`/products/admin/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Đã xóa sản phẩm!");
    } catch {
      toast.error("Không thể xóa!");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-dark px-4" onClick={() => openModal()}>
            <PlusLg className="me-2" /> Thêm sản phẩm mới
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5 text-secondary">Đang tải...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                Chưa có sản phẩm nào
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="table-light text-secondary small text-uppercase">
                    <tr>
                      <th className="ps-4">STT</th>
                      <th>Sản phẩm</th>
                      <th>Danh mục</th>
                      <th className="text-center">Biến thể</th>
                      <th className="text-center">Giá bán</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id}>
                        <td className="ps-4 fw-bold">{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            {product.images[0] && (
                              <img
                                src={product.images[0].url}
                                alt=""
                                className="rounded"
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <div>
                              <div className="fw-bold">{product.name}</div>
                              <small className="text-muted">
                                {product.brand}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          {product.category?.product_category_name || "N/A"}
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge ${
                              product.has_variants
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {product.has_variants ? "Có" : "Không"}
                          </span>
                        </td>
                        <td className="text-center text-danger fw-bold">
                          {product.sale_price.toLocaleString()}đ
                        </td>
                        <td className="text-center">
                          {product.is_active ? (
                            <Eye className="text-success" />
                          ) : (
                            <EyeSlash className="text-secondary" />
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openModal(product)}
                          >
                            <PencilSquare />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content border-0 shadow-lg">
              {/* Header */}
              <div className="modal-header border-0 pb-2">
                <h5 className="modal-title fw-bold text-dark">
                  {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div
                className="modal-body pt-2"
                style={{ maxHeight: "78vh", overflowY: "auto" }}
              >
                <div className="row g-4">
                  {/* === THÔNG TIN CƠ BẢN === */}
                  <div className="col-12">
                    <div className="bg-light rounded-3 p-4 border">
                      <h6 className="fw-bold text-primary mb-3">
                        Thông tin cơ bản
                      </h6>
                      <div className="row g-3">
                        <div className="col-lg-8">
                          <label className="form-label fw-semibold small text-muted">
                            Tên sản phẩm <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="VD: Áo thun nam cổ tròn cotton"
                          />
                        </div>
                        <div className="col-lg-4">
                          <label className="form-label fw-semibold small text-muted">
                            Thương hiệu
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.brand}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                brand: e.target.value,
                              })
                            }
                            placeholder="Nike, Adidas..."
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold small text-muted">
                            Danh mục <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg"
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="">Chọn danh mục</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.product_category_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* === BIẾN THỂ (MÀU + SIZE) === */}
                  <div className="col-12">
                    <div className="bg-light rounded-3 p-4 border">
                      <h6 className="fw-bold text-success mb-3 d-flex align-items-center justify-content-between">
                        <span>Biến thể sản phẩm</span>
                        {selectedColors.length > 0 &&
                          selectedSizes.length > 0 && (
                            <span className="badge bg-success fs-6">
                              Tạo {selectedColors.length * selectedSizes.length}{" "}
                              biến thể
                            </span>
                          )}
                      </h6>

                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold small text-muted">
                            Chọn màu sắc
                          </label>
                          <div
                            className="border rounded-3 bg-white p-3"
                            style={{ maxHeight: "260px", overflowY: "auto" }}
                          >
                            {colors.length === 0 ? (
                              <p className="text-muted small mb-0">
                                Chưa có màu nào
                              </p>
                            ) : (
                              colors.map((color) => (
                                <div
                                  key={color._id}
                                  className="form-check form-check-inline me-4 mb-2"
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`color-${color._id}`}
                                    checked={selectedColors.includes(color._id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedColors([
                                          ...selectedColors,
                                          color._id,
                                        ]);
                                      } else {
                                        setSelectedColors(
                                          selectedColors.filter(
                                            (id) => id !== color._id
                                          )
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
                                        width: 22,
                                        height: 22,
                                        backgroundColor:
                                          color.attribute_color_code,
                                        borderRadius: 6,
                                        border: "2px solid #fff",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                                      }}
                                    ></div>
                                    <span className="fw-medium">
                                      {color.attribute_color_name}
                                    </span>
                                  </label>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-semibold small text-muted">
                            Chọn kích thước
                          </label>
                          <div
                            className="border rounded-3 bg-white p-3"
                            style={{ maxHeight: "260px", overflowY: "auto" }}
                          >
                            {sizes.length === 0 ? (
                              <p className="text-muted small mb-0">
                                Chưa có kích thước nào
                              </p>
                            ) : (
                              <div className="row g-2">
                                {sizes.map((size) => (
                                  <div
                                    key={size._id}
                                    className="col-4 col-md-3"
                                  >
                                    <div className="form-check">
                                      <input
                                        className="btn-check"
                                        type="checkbox"
                                        id={`size-${size._id}`}
                                        checked={selectedSizes.includes(
                                          size._id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked)
                                            setSelectedSizes([
                                              ...selectedSizes,
                                              size._id,
                                            ]);
                                          else
                                            setSelectedSizes(
                                              selectedSizes.filter(
                                                (id) => id !== size._id
                                              )
                                            );
                                        }}
                                      />
                                      <label
                                        className={`btn btn-outline-dark w-100 py-2 ${
                                          selectedSizes.includes(size._id)
                                            ? "active"
                                            : ""
                                        }`}
                                        htmlFor={`size-${size._id}`}
                                      >
                                        {size.attribute_size_name}
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* === GIÁ & TỒN KHO === */}
                  <div className="col-12">
                    <div className="bg-light rounded-3 p-4 border">
                      <h6 className="fw-bold text-warning mb-3">
                        Giá bán & Tồn kho
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label small text-muted">
                            Giá niêm yết
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={formData.listed_price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                listed_price: e.target.value,
                              })
                            }
                            placeholder="299000"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label small text-muted">
                            Giá bán <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={formData.sale_price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                sale_price: e.target.value,
                              })
                            }
                            placeholder="249000"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label small text-muted">
                            Giá nhập
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={formData.import_price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                import_price: e.target.value,
                              })
                            }
                            placeholder="150000"
                          />
                        </div>
                        {selectedColors.length > 0 &&
                          selectedSizes.length > 0 && (
                            <div className="col-md-6">
                              <label className="form-label small text-muted">
                                Tồn kho mỗi biến thể
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                value={formData.stock_per_variant}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    stock_per_variant: e.target.value,
                                  })
                                }
                                placeholder="50"
                              />
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* === MÔ TẢ === */}
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">
                      Mô tả chi tiết <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows="5"
                      className="form-control"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Mô tả chất liệu, kiểu dáng, xuất xứ..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer border-0 pt-3">
                <button className="btn btn-secondary px-4" onClick={closeModal}>
                  Hủy bỏ
                </button>
                <button className="btn btn-dark px-5" onClick={handleSubmit}>
                  {editingProduct ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductManagement;
