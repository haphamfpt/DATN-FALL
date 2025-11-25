import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./banner.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("/api/banners");
        setBanners(res.data || []);
      } catch (err) {
        console.error("Lỗi tải banner:", err);
        setBanners([
          {
            image:
              "https://via.placeholder.com/1920x700/222222/ffffff?text=AVELINE+SPORTS",
            link: "/",
          },
          {
            image:
              "https://via.placeholder.com/1920x700/111111/ffffff?text=NEW+COLLECTION+2025",
            link: "/",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const goNext = useCallback(() => {
    if (banners.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }
  }, [banners.length]);

  const goPrev = useCallback(() => {
    if (banners.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1 || loading) return;
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [banners.length, loading, goNext]);

  if (loading) {
    return (
      <div className="banner-fullscreen loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="banner-fullscreen">
        <div className="banner-placeholder">
          <p>Chưa có banner - Thêm tại Admin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="banner-fullscreen">
      <div className="banner-slider">
        <div
          className="banner-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {banners.map((banner, index) => (
            <div className="banner-item" key={index}>
              {banner.link ? (
                <a href={banner.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={banner.image}
                    alt={`Banner ${index + 1}`}
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            className="banner-btn prev"
            onClick={goPrev}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="white"
              />
            </svg>
          </button>
          <button
            className="banner-btn next"
            onClick={goNext}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                fill="white"
              />
            </svg>
          </button>

          <div className="banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
