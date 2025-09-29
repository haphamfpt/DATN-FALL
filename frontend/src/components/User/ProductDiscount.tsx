import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/IProduct";
import { useCart } from "../../context/CartContext";
import instance from "../../instance/instance";
import { toast } from "react-toastify";
const ProductDiscount = ({ product }: { product: IProduct }) => {
  const { dispatch } = useCart();
  const nav = useNavigate();
  const hanldeAddToCart = async () => {
    try {
      if (localStorage.getItem("user")) {
        const data = await instance.post("/cart", {
          productId: product._id,
          quantity: 1,
          userId: JSON.parse(localStorage.getItem("user") as string)?._id,
        });
        if (data) {
          dispatch({
            type: "ADD_PRODUCT_TO_CART",
            payload: {
              productId: {
                _id: product._id,
                name: product.name,
                price: product.price,
                price_discount: product.price_discount,
                images: product.images,
              },
              quantity: 1,
            },
          });
          toast.success("Thêm giỏ hàng thành công");
        }
      } else {
        toast.warning("Vui lòng đăng nhập để mua hàng");
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg grid grid-cols-2 p-4 gap-3 relative m-2">
      <div className="max-w-[200px] min-h-[200px] relative">
        <img
          src={product.images[2]}
          alt="First"
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-0"
        />
        <img
          src={product.images[1]}
          alt="Second"
          className="w-full h-full object-cover transition-opacity duration-700 opacity-0 hover:opacity-100 absolute top-0 left-0"
        />
      </div>
      <div>
        <h3 className="text-base line-clamp-2">{product.name}</h3>
        <div className="py-3">
          <Rating
            name="disabled"
            value={4}
            className="pointer-events-none !text-[16px]"
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className="font-bold text-base">${product.price_discount}.0</p>
          <p className="line-through text-sm">${product.price}.0</p>
        </div>
        <div className="flex gap-2 pt-4">
          <button
            onClick={hanldeAddToCart}
            className="bg-primary rounded-2xl py-2 px-3 text-xs text-white opacity-70 font-medium hover:opacity-100"
          >
            Add to Card
          </button>
          <Link
            to={`/detail/${product.slug}`}
            className="bg-red-600 rounded-2xl  py-2 px-2 text-xs text-white opacity-70 font-medium hover:opacity-100"
          >
            Show Detail
          </Link>
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <p className="bg-red-600 rounded-full px-2 py-0.5 text-sm text-util">
          {(100 - (product.price_discount / product.price) * 100).toFixed()} %
        </p>
      </div>
    </div>
  );
};

export default ProductDiscount;
