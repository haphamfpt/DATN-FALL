import { FC, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

/**
 * ShopDetail Page - Sportwear Theme
 */
const ShopDetail: FC = () => {
  const { id } = useParams();
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Dữ liệu sản phẩm (tạm thời)
  const allProducts = [
    {
      id: 1,
      title: "Áo thun thể thao Nike Dri-FIT",
      price: 650000,
      image: "/assets/images/product/Dri-Fit.avif",
      description:
        "Áo thun thể thao Nike Dri-FIT giúp thấm hút mồ hôi nhanh, mang lại cảm giác khô thoáng và thoải mái khi luyện tập.",
    },
    {
      id: 2,
      title: "Quần jogger Adidas nam",
      price: 850000,
      image: "/assets/images/product/Z.N.E._Pants_Black.avif",
      description:
        "Quần jogger Adidas co giãn tốt, dễ chịu, phù hợp cả khi tập luyện và mặc thường ngày.",
    },
    {
      id: 3,
      title: "Giày chạy bộ Asics Gel",
      price: 1900000,
      image: "/assets/images/product/Samba_OG_Shoes_White.avif",
      description:
        "Giày chạy bộ Asics Gel êm ái, nhẹ và bám đường tốt, thiết kế thể thao hiện đại.",
    },
    {
      id: 4,
      title: "Áo khoác thể thao Puma",
      price: 1200000,
      image: "/assets/images/product/Áo-khoác-dệt-Prime-Retro-T7-Puma.avif",
      description:
        "Áo khoác thể thao Puma chống gió nhẹ, thoáng khí, lý tưởng cho việc tập luyện ngoài trời.",
    },
    {
      id: 5,
      title: "Túi gym chống nước Reebok",
      price: 450000,
      image:
        "/assets/images/product/tui-deo-cheo-reebok-classics-foundation-waist.webp",
      description:
        "Túi Reebok chống nước, thiết kế nhỏ gọn và bền bỉ, giúp bạn mang theo phụ kiện tập luyện tiện lợi.",
    },
    {
      id: 6,
      title: "Găng tay tập gym Under Armour",
      price: 350000,
      image: "/assets/images/product/gym.webp",
      description:
        "Găng tay tập gym Under Armour chống trơn trượt, thoáng khí, bảo vệ tay hiệu quả khi nâng tạ.",
    },
  ];

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product)
    return (
      <div className="container mx-auto text-center py-20 text-gray-700 text-lg">
        Không tìm thấy sản phẩm.
      </div>
    );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleBuyNow = () => {
    clearCart();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Ảnh sản phẩm */}
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg shadow-lg w-full h-[450px] object-contain bg-gray-100"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {product.title}
        </h1>
        <p className="text-2xl text-yellow-600 font-semibold mb-4">
          {product.price.toLocaleString("vi-VN")}đ
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          {product.description}
        </p>

        <div className="space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
          >
            Thêm vào giỏ
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
