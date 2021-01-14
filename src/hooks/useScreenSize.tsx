import { useState, useEffect } from "react";

export const useScreenSize = (minWidth: number, maxWidth: number) => {
  const getScreenSize = () => {
    return window.innerWidth > minWidth && window.innerWidth <= maxWidth;
  };

  const [isBetweenWidths, setIsBetweenWidths] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => setIsBetweenWidths(getScreenSize());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isBetweenWidths;
};

export default useScreenSize;
