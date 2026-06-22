import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mx}px`;
        cursorRef.current.style.top  = `${my}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top  = `${ry}px`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onOver = (e) => {
      const isHoverable = e.target.closest(
        "a, button, .film-item, .design-item, .study-lightbox-img, .study-lightbox-close"
      );
      cursorRef.current?.classList.toggle("cursor--hover",      !!isHoverable);
      ringRef.current?.classList.toggle("cursor-ring--hover",   !!isHoverable);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
    </>
  );
}