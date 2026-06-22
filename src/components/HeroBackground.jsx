// HeroBackground.jsx
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
  "https://img.youtube.com/vi/_ZI_9QVpinQ/maxresdefault.jpg",
];

const next = (i) => (i + 1) % IMAGES.length;

export default function HeroBackground({ interval = 5000 }) {
  const [index,   setIndex]   = useState(0);
  const [visible, setVisible] = useState(true); // true = current active

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false); // currentをフェードアウト
      setTimeout(() => {
        setIndex((i) => next(i));
        setVisible(true); // 次をフェードイン
      }, 1800); // transition時間と合わせる
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="hero-bg">
      {/* 次の画像（下に敷く） */}
      <img
        src={IMAGES[next(index)]}
        alt=""
        className="hero-bg-img active"
      />
      {/* 現在の画像（上でフェードアウト） */}
      <img
        src={IMAGES[index]}
        alt=""
        className={`hero-bg-img${visible ? " active" : ""}`}
      />
      <div className="hero-bg-overlay" />
    </div>
  );
}