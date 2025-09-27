import {
    IconBed,
    IconBuildingStore,
    IconCaravan,
    IconFiretruck,
    IconFountain,
    IconGardenCart,
    IconIroningSteam,
    IconMountain,
} from "@tabler/icons-react";
import Slider from "react-slick";
import styles from "./SliderFooterIcon.module.scss";
const SliderFooter = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 6000,
        autoplaySpeed: 6000,
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };
    return (
        <div className="container">
            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <IconBed stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconGardenCart stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconCaravan stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconIroningSteam stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconBuildingStore
                            stroke={2}
                            className={styles.icons}
                        />
                    </div>
                    <div>
                        <IconFiretruck stroke={2} className={styles.icons} />
                    </div>{" "}
                    <div>
                        <IconFountain stroke={2} className={styles.icons} />
                    </div>{" "}
                    <div>
                        <IconMountain stroke={2} className={styles.icons} />
                    </div>{" "}
                </Slider>
            </div>
        </div>
    );
};

export default SliderFooter;
