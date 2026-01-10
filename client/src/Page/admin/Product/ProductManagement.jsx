import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../../../utils/axiosInstance";
import ProductList from "./Component/ProductList";
import ProductModal from "./Component/ProductModal";
import EditBasicInfoModal from "./Component/EditBasicInfoModal";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditBasicModal, setShowEditBasicModal] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setShowAddModal(true);
    setEditingProduct(null); 
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowEditBasicModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const closeEditModal = () => {
    setShowEditBasicModal(false);
    setEditingProduct(null);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="container py-4">
        <ProductList
          products={products}
          loading={loading}
          onAdd={openAddModal}          
          onEdit={openEditModal}         
          onDelete={fetchData}
        />

        {showAddModal && (
          <ProductModal
            product={null}
            categories={categories}
            colors={colors}
            sizes={sizes}
            onClose={closeAddModal}
            onSuccess={() => {
              fetchData();
              closeAddModal();
            }}
          />
        )}

        {showEditBasicModal && editingProduct && (
          <EditBasicInfoModal
            product={editingProduct}
            categories={categories}
            onClose={closeEditModal}
            onSuccess={() => {
              fetchData();
              closeEditModal();
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProductManagement;