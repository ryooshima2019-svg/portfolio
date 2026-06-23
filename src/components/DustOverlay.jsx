// DustOverlay.jsx
import { useEffect, useRef } from "react";

export default function DustOverlay() {
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        ref.current.style.transform = `translateY(${window.scrollY * -0.15}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="dust-overlay" />;
}