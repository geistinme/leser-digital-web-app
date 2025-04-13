import { useEffect, useState } from "react";

export const breakpoints = {
  mobile: 768,
  tablet: 1080,
  desktop: 1280,
  largeDesktop: 1440,
};

export const useIsDevice = () => {
  const [isDevice, setIsDevice] = useState<{
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
    isLargeDesktop?: boolean;
    isExtraLargeDesktop?: boolean;
  }>({});
  const handleResize = () => {
    const width = window.innerWidth;
    setIsDevice({
      isMobile: width <= breakpoints.mobile,
      isTablet: width <= breakpoints.tablet,
      isDesktop: width <= breakpoints.desktop,
      isLargeDesktop: width <= breakpoints.largeDesktop,
      isExtraLargeDesktop: width > breakpoints.largeDesktop,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { ...isDevice };
};
