import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      requestAnimationFrame(animate);
    };
    animate();

    const expand = () => {
      cursorRef.current?.classList.add("cursor--hover");
      ringRef.current?.classList.add("cursor-ring--hover");
    };

    const shrink = () => {
      cursorRef.current?.classList.remove("cursor--hover");
      ringRef.current?.classList.remove("cursor-ring--hover");
    };

    const onOver = (e) => {
      const target = e.target.closest(
        "a, button, .film-item, .design-item, .study-lightbox-img, .study-lightbox-close"
      );

      if (target) {
        expand();
      } else {
        shrink();
      }
    };

    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
