// Studies.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Studies.css";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";
import { useFocusTrap } from "../hooks/useFocusTrap"
import { STUDIES } from "../data/works";

const SIZES       = ["lg", "md", "md", "sm"];
const IMAGE_ITEMS = STUDIES.filter((s) => s.type === "image");

function StudyItem({ item, rotate, offsetY, size, onOpenImage }) {
  const thumbRef = useRef(null);
  const labelRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const isVideo = item.type === "video";

  const onMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    if (labelRef.current) {
      labelRef.current.style.left = `${e.clientX - rect.left}px`;
      labelRef.current.style.top  = `${e.clientY - rect.top}px`;
    }
  };

  const handleClick = (e) => {
    if (!isVideo) { e.preventDefault(); onOpenImage(item); }
  };

  return (
    <a
      href={isVideo ? item.url : item.image}
      target="_blank"
      rel="noopener noreferrer"
      className={`study-item study-item--${size}`}
      style={{ "--r": `${rotate}deg`, "--ty": `${offsetY}rem` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      onClick={handleClick}
    >
      <div className="study-thumb" ref={thumbRef}>
        <img src={item.image} alt={item.title} className="study-thumb-img" />
        <div className="study-thumb-overlay" />
        <div ref={labelRef} className={`study-play-follow${hovered ? " visible" : ""}`}>
          {isVideo ? "PLAY" : "VIEW"}
        </div>
        <div className="study-id">{item.id}</div>
      </div>
    </a>
  );
}

function Lightbox({ item, onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref, !!item);

  return (
    <div className="study-lightbox" ref={ref} onClick={onClose}>
      <button className="study-lightbox-close" onClick={onClose}>×</button>
      <div className="study-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="study-lightbox-id">{item.id}</div>
        <img className="study-lightbox-img" src={item.image} alt={item.title} />
        <div className="study-lightbox-caption">just practicing.</div>
      </div>
    </div>
  );
}

export default function Studies() {
  const ref   = useRef(null);
  const bgRef = useRef(null);

  useBgGlitch(ref, bgRef, 5000);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", !!selectedImage);
    return () => document.body.classList.remove("lightbox-open");
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e) => {
      const idx = IMAGE_ITEMS.findIndex((s) => s.id === selectedImage.id);
      if (e.key === "Escape")     setSelectedImage(null);
      if (e.key === "ArrowRight") setSelectedImage(IMAGE_ITEMS[(idx + 1) % IMAGE_ITEMS.length]);
      if (e.key === "ArrowLeft")  setSelectedImage(IMAGE_ITEMS[(idx - 1 + IMAGE_ITEMS.length) % IMAGE_ITEMS.length]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage]);

  const layout = useMemo(
    () => STUDIES.map(() => ({
      rotate:  (Math.random() - 0.5) * 12,
      offsetY: (Math.random() - 0.5) * 6,
      size:    SIZES[Math.floor(Math.random() * SIZES.length)],
    })),
    []
  );

  return (
    <section id="studies" ref={ref}>
      <MemoryPhrase
        texts={["just practicing.", "not yet done.", "trying again."]}
        top="70%" left="20%" rotate={5} interval={5900}
      />
      <div className="section-tag">Studies</div>
      <span ref={bgRef} className="section-bg-text">Studies</span>

      <div className="studies-grid">
        {STUDIES.map((item, i) => (
          <StudyItem
            key={item.id}
            item={item}
            rotate={layout[i].rotate}
            offsetY={layout[i].offsetY}
            size={layout[i].size}
            onOpenImage={setSelectedImage}
          />
        ))}
      </div>

      {selectedImage && (
        <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
}