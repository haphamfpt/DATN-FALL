import { Rating } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import ImageZoom from "react-image-zooom";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../instance/instance";
import { IProduct } from "../../interfaces/IProduct";
import ProductList from "./ProductList";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
export default function DetailProduct() {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [imageZoom, setImageZoom] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const { slug } = useParams();
  const { dispatch } = useCart();
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products/detail/" + slug);
      setImageList(data.data.images);
      setImageZoom(data.data.images[0]);
      setProduct(data.data);
    })();
  }, [slug]);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCard = async () => {
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
              quantity: count,
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
    <>
      <div className=" bg-[#E7EBEF] py-2 dark:bg-[#1E2832]">
        <div className="container-main text-md text-secondary font-mono">
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="dark:text-util/70 *:!text-sm"
            >
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/products">
                Products
              </Link>
              <Link
                underline="hover"
                color="text.primary"
                href=""
                aria-current="page"
                className="dark:text-util/90 !text-sm"
              >
                {product.name}
              </Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="container-main py-5">
        <div className="shadow rounded-xl gap-10 flex p-6">
          <div className="flex gap-5 items-center ">
            <div className="*:border flex flex-col max-w-fit justify-between *:max-w-20 gap-5">
              {Array.isArray(imageList) &&
                imageList.length > 0 &&
                imageList.map((img: string, index) => (
                  <div key={index} onClick={() => setImageZoom(img as any)}>
                    <img className="max-w-[84px]" src={img} alt="" />
                  </div>
                ))}
            </div>
            <div className="border max-w-[400px] min-w-[400px] min-h-[407px] p-4">
              {imageZoom && (
                <ImageZoom
                  className="!w-full !h-full"
                  src={imageZoom}
                  zoom={200}
                />
              )}
            </div>
          </div>
          <div className="">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
            </div>
            <div>
              <Rating
                name="disabled"
                value={4}
                className="pointer-events-none !text-[16px]"
              />
            </div>
            <div className="py-4">
              <span className="text-base font-bold">${product?.price}.0</span>
            </div>
            <div className="max-w-md">
              <p className="text-xs text-black/50 pb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                optio quidem repudiandae doloribus laborum accusantium officia
                provident minima mollitia! Voluptatum perferendis natus quisquam
                voluptatem, perspiciatis neque? Dolor deleniti architecto
                similique.
              </p>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl w-fit">
                <button
                  className="bg-slate-400/50 px-3 text-xl rounded-xl"
                  onClick={() => setCount(count - 1)}
                >
                  -
                </button>
                <div className="">{count < 1 ? "1" : count}</div>
                <button
                  className="bg-slate-400/50 px-3 text-sm py-1 rounded-xl"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={handleAddToCard}
                  className="bg-red-600 rounded-3xl hover:bg-red-600/80 px-4 py-2 text-sm font-bold text-white flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  Add To Card
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="py-5">
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-2xl font-bold w-fit tab-border-bottom relative dark:text-white">
              Related products
            </h3>
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-4 lg:gap-10 gap-3 mt-10">
            {product?.categoryId?.productId?.slice(0, 5).map((pro, index) => (
              <ProductList key={index} product={pro} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
