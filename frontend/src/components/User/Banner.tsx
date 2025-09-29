import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";

const Banner = () => {
  const sliderRef = useRef<Slider>(null);
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
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const BannerArray = [
    {
      id: 1,
      title: "Game Console Nintendo Switch",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ut saepe adipisci",
      bannerUrl:
        "https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_slider_1_item_2.jpg",
      image:
        "https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_slider_1_item_2_image.png",
    },
    {
      id: 2,
      title: "Playstation 5 Console Disc Version",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ut saepe adipisci",
      bannerUrl:
        "https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_slider_1_item_1.jpg",
      image:
        "https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_slider_1_item_1_image.png",
    },
  ];

  return (
    <div className="py-4 relative w-full container-main rounded-lg md:overflow-hidden">
      <Slider {...settings} ref={sliderRef} className={`w-full`}>
        {BannerArray.map((item, index) => (
          <div
            key={index}
            className={`relative w-full min-h-[450px] max-h-none lg:max-h-[450px] bg-[url('https://hex-wp.com/gamemart/wp-content/uploads/2024/03/homepage_3_slider_1_item_1.jpg')] object-cover`}
          >
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 justify-between w-full p-5 lg:p-10 items-center">
              <div className="space-y-5">
                <div className="bg-black/20 w-fit text-white rounded-full px-4 py-1.5">
                  <span>Discount Up to 30%</span>
                </div>
                <h3 className="text-2xl lg:text-3xl text-white font-bold">
                  {item.title}
                </h3>
                <p className="text-white text-md">{item.content}</p>
                <div className="mt-10">
                  <Button content="Shop Now" color="bg-white" />
                </div>
              </div>
              <div className="max-w-[400px] lg:max-w-[500px]">
                <img src={item.image} className="w-full" alt="" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="" style={{ textAlign: "center" }}>
        <div
          className="absolute top-[44%] left-8%] bg-white rounded-full p-1.5 cursor-pointer"
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
          className="absolute top-[44%] right-[5.5%] bg-white rounded-full p-1.5 cursor-pointer"
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
  );
};

export default Banner;
