import { useEffect, useRef } from "react";

const useAutoScroll = (dependency) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Only scroll if there is actually something to scroll
    if (container.scrollHeight > container.clientHeight) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [dependency]);

  return containerRef;
};

export default useAutoScroll;
