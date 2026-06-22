// Films.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Films.css";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";

const FILMS = [
  { id: "001", title: "嬰児の嘆き", year: "2026", url: "https://youtu.be/7UFpii8zzQc", thumb: "https://img.youtube.com/vi/7UFpii8zzQc/maxresdefault.jpg" },
  { id: "002", title: "悪夢",       year: "2026", url: "https://youtu.be/vjQCkwb3fzA", thumb: "https://img.youtube.com/vi/vjQCkwb3fzA/maxresdefault.jpg" },
  { id: "003", title: "人思ふ故",   year: "2026", url: "https://youtu.be/Q_gYvWubKyM", thumb: "https://img.youtube.com/vi/Q_gYvWubKyM/maxresdefault.jpg" },
];

function FilmCard({ film }) {
  const thumbRef  = useRef(null);
  const playRef   = useRef(null);
  const rippleRef = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const pos       = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  useEffect(() => {
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (playRef.current) {
        playRef.current.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setPlaying(true);

    // ripple
    if (rippleRef.current) {
      rippleRef.current.classList.remove("active");
      void rippleRef.current.offsetWidth;
      rippleRef.current.classList.add("active");
    }

    // play label fade out
    if (playRef.current) {
      playRef.current.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      playRef.current.style.opacity    = "0";
      playRef.current.style.transform  =
        `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(1.2)`;
    }

    setTimeout(() => window.open(film.url, "_blank"), 350);
    setTimeout(() => {
      setPlaying(false);
      if (playRef.current) playRef.current.style.opacity = "1";
    }, 1200);
  };

  return (
    <a
      className="film-item"
      href={film.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      onClick={handleClick}
    >
      <div className="film-thumb" ref={thumbRef}>
        <img src={film.thumb} alt={film.title} className="film-thumb-img" />
        <div className="film-thumb-overlay" />
        <div ref={rippleRef} className="film-ripple" />
        <div ref={playRef} className={`film-play-follow ${hovered && !playing ? "visible" : ""}`}>
          PLAY
        </div>
        <div className="film-id">{film.id}</div>
      </div>
      <div className="film-info">
        <div className="film-title">{film.title}</div>
        <div className="film-meta">{film.year}</div>
      </div>
    </a>
  );
}

export default function Films() {
  const ref   = useRef(null);
  const bgRef = useRef(null);

  useBgGlitch(ref, bgRef, 5000);

  // カード入場アニメーション
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el.querySelectorAll(".film-item"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" } }
    );
    return () => tween.scrollTrigger?.kill();
  }, []);

  // bgTextパララックス（Films固有）
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      y: -40,
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 4 },
    });
    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <section id="films" ref={ref}>
      <MemoryPhrase
        texts={["I was watching.", "it played on.", "still rolling."]}
        top="50%" left="55%" rotate={3} interval={6200}
      />
      <div className="section-tag">Films</div>
      <span ref={bgRef} className="section-bg-text">Films</span>

      <div className="films-grid">
        {FILMS.map((film) => <FilmCard key={film.id} film={film} />)}
      </div>
    </section>
  );
}