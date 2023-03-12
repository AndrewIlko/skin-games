import { useEffect, useState } from "react";

const useWindowWidth = (): number => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeCatch = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeCatch);

    return () => window.removeEventListener("resize", resizeCatch);
  }, []);

  return width;
};

export default useWindowWidth;
