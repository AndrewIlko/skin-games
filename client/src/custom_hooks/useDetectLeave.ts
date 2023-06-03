import { useEffect } from "react";

const useDetectLeave = (element: any, func: any) => {
  useEffect(() => {
    const clickHandler = (e: any) => {
      if (element.current && !element.current.contains(e.target)) {
        func();
      }
    };
    window.addEventListener("mousedown", clickHandler);
    return () => window.removeEventListener("mousedown", clickHandler);
  }, [element.current]);
};

export default useDetectLeave;
