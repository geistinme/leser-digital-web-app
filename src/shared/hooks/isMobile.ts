import { useEffect, useState } from "react";

const breakpoints = {
  mobile: 768,
  tablet: 1024,
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const handleResize = () => {
    const width = window.innerWidth;
    setIsMobile(width <= breakpoints.mobile);
    setIsTablet(width <= breakpoints.tablet);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isTablet };
};
