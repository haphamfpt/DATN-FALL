import Banner from "./Banner";
import Slider from "react-slick";
import { useContext, useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";
import ProductDiscount from "./ProductDiscount";
import ProductList from "./ProductList";
import ViewAll from "./ViewAll";
import BlogHome from "./BlogHome";
import { ProductContext } from "../../context/ProductContext";
import { IBlog } from "../../interfaces/Iblog";
import instance from "../../instance/instance";

const HomePage = () => {
  const sliderRef = useRef<Slider>(null);
  const { products } = useContext(ProductContext);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/blogs");
      setBlogs(data.data);
    })();
  }, []);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    arrows: false,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full">
      <section className="w-full">
        <Banner />
      </section>
      <section className="container-main py-8 dark:text-white">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex gap-4 items-center justify-center lg:border-r">
            <div>
              <img
                src="https://hex-wp.com/gamemart/wp-content/uploads/2024/03/return_image.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Money Return</h3>
              <p className="text-sm">Back guarantee under 7 days</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex gap-4 items-center justify-center lg:border-r">
            <div>
              <img
                src="https://hex-wp.com/gamemart/wp-content/uploads/2024/03/shipped_image.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Free Shipping</h3>
              <p className="text-sm">Free shipping on all order</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex gap-4 items-center justify-center lg:border-r">
            <div>
              <img
                src="https://hex-wp.com/gamemart/wp-content/uploads/2024/03/support_image.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Online Support 24/7</h3>
              <p className="text-sm">Support online 24 hours</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex gap-4 items-center justify-center">
            <div>
              <img
                src="https://hex-wp.com/gamemart/wp-content/uploads/2024/03/discount_image.png"
                alt=""
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Member Discount</h3>
              <p className="text-sm">Onevery order over $120.00</p>
            </div>
          </div>
        </div>
      </section>
      {/* Product Discount */}
      <div className="w-full py-4 shadow-list bg-list">
        <section className="container-main ">
          <div className="w-full border-b-[3px] py-3">
            <h3 className="text-2xl font-bold w-fit tab-border-bottom relative dark:text-white">
              Featured Games
            </h3>
          </div>
          <div className="w-full relative pt-10 group">
            <Slider
              {...settings}
              ref={sliderRef}
              className={`w-full flex items-stretch`}
            >
              {products &&
                products.length > 0 &&
                products.map((pro) => {
                  if (pro.price_discount !== 0) {
                    return (
                      <div className="rounded-xl" key={pro._id}>
                        <ProductDiscount product={pro} />
                      </div>
                    );
                  }
                })}
            </Slider>
            <div
              className="group-hover:opacity-100 opacity-0 duration-700"
              style={{ textAlign: "center" }}
            >
              <div
                className="absolute top-[50%] left-2 bg-primary/40 rounded-lg p-2 cursor-pointer"
                onClick={previous}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="size-6"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </div>
              <div
                className="absolute top-[50%] right-2 bg-primary/40 rounded-lg p-2 cursor-pointer"
                onClick={next}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="size-6"
                >
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="container-main lg:flex-row flex-col flex w-full gap-10 py-10">
          <div className="bg-[url('https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_glider_1_item_1.jpg')]  relative rounded-2xl w-full min-h-[250px] bg-no-repeat bg-cover">
            <div className="absolute top-[50%] translate-y-[-50%] left-14">
              <div>
                <h3 className="text-2xl font-bold text-util pb-4">
                  Xbox Controller
                </h3>
                <p className="text-util/80 text-sm">
                  Cillum Dolore Eu Fugita Nulla
                </p>
                <p className="text-util/80 pb-4 text-sm">
                  Excepteur Sint Occaecat
                </p>
              </div>
              <Button content="Shop Now" color="text-red-600" />
            </div>
          </div>
          <div className="bg-[url('https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_glider_1_item_2.jpg')] relative rounded-2xl w-full min-h-[250px] bg-no-repeat bg-cover">
            <div className="absolute top-[50%] translate-y-[-50%] left-14">
              <div>
                <h3 className="text-2xl font-bold text-util pb-4">
                  Xbox Controller
                </h3>
                <p className="text-util/80 text-sm">
                  Cillum Dolore Eu Fugita Nulla
                </p>
                <p className="text-util/80 pb-4 text-sm">
                  Excepteur Sint Occaecat
                </p>
              </div>
              <Button content="Shop Now" color="text-green-600" />
            </div>
          </div>
        </section>
      </div>
      <section className="container-main py-5">
        <div className="w-full border-b-[3px] py-3">
          <h3 className="text-2xl font-bold w-fit tab-border-bottom relative dark:text-white">
            List Products
          </h3>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-2 md:grid-cols-4 lg:gap-5 gap-3 mt-10">
          {products &&
            products.length > 0 &&
            products.slice(0, 9).map((pro) => {
              if (pro.price_discount == 0) {
                return <ProductList key={pro._id} product={pro} />;
              }
            })}
        </div>
        <div className="text-center pt-5">
          <ViewAll color="text-primary" content="View All" />
        </div>
      </section>
      <section className="container-main pb-10">
        <div className="w-full border-b-[3px] py-3">
          <h3 className="text-2xl font-bold w-fit tab-border-bottom relative dark:text-white">
            Recent Blog
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-10 py-5">
          {blogs &&
            blogs
              .slice(0, 4)
              .map((blog, index) => <BlogHome key={index} blog={blog} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
