import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../../utils/axiosInstance";
import ProductList from "./Component/ProductList"
import ProductModal from "./Component/ProductModal";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  useEffect(() => { fetchData(); }, []);

  const openModal = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="container py-4">
        <ProductList
          products={products}
          loading={loading}
          onAdd={() => openModal()}
          onEdit={openModal}
          onDelete={fetchData}
        />
        {showModal && (
          <ProductModal
            product={editingProduct}
            categories={categories}
            colors={colors}
            sizes={sizes}
            onClose={closeModal}
            onSuccess={() => { fetchData(); closeModal(); }}
          />
        )}
      </div>
    </>
  );
};

export default ProductManagement;