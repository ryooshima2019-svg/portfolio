import { useEffect, useRef } from "react";
import "./Progress.css";

export default function Progress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      if (barRef.current) barRef.current.style.width = progress + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="progress-bar" ref={barRef} />;
}
