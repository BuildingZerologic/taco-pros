import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ye line screen ko top (0,0) par le jayegi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Smooth scrolling ke liye
    });
  }, [pathname]); // Jab bhi path badlega, ye run hoga

  return null;
};

export default ScrollToTop;