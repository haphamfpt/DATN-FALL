import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tự động cuộn về đầu trang khi đổi route
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
