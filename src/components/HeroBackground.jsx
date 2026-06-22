useEffect(() => {
  if (selectedImage) {
    document.body.classList.add("lightbox-open");
  } else {
    document.body.classList.remove("lightbox-open");
  }

  return () => {
    document.body.classList.remove("lightbox-open");
  };
}, [selectedImage]);
import { useEffect, useState } from "react";
import "./HeroBackground.css";

const IMAGES = [
  "https://img.youtube.com/vi/7UFpii8zzQc/maxresdefault.jpg",
  "https://img.youtube.com/vi/vjQCkwb3fzA/maxresdefault.jpg",
  "https://img.youtube.com/vi/Q_gYvWubKyM/maxresdefault.jpg",
  "/images/moega.jpg",
  "/images/bluem.jpg",
  "/studies/decadance.jpg",
  "/studies/poster.jpg",
  "/studies/ryo3d.jpg",
  "https://img.youtube.com/vi/eiKJApaONgI/maxresdefault.jpg",
  "https://img.youtube.com/vi/5bw4zVso7V0/maxresdefault.jpg",
  "https://img.youtube.com/vi/_ZI_9QVpinQ/maxresdefault.jpg"
];

export default function HeroBackground({ interval = 5000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="hero-bg">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={i === index ? "hero-bg-img active" : "hero-bg-img"}
        />
      ))}
      <div className="hero-bg-overlay" />
    </div>
  );
}