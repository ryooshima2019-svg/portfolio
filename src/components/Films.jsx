import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Films.css";

gsap.registerPlugin(ScrollTrigger);

const FILMS = [
  { id: "001", title: "嬰児の嘆き", year: "2026", url: "https://youtu.be/7UFpii8zzQc", thumb: "https://img.youtube.com/vi/7UFpii8zzQc/maxresdefault.jpg" },
  { id: "002", title: "悪夢", year: "2026", url: "https://youtu.be/vjQCkwb3fzA", thumb: "https://img.youtube.com/vi/vjQCkwb3fzA/maxresdefault.jpg" },
  { id: "003", title: "人思ふ故", year: "2026", url: "https://youtu.be/Q_gYvWubKyM", thumb: "https://img.youtube.com/vi/Q_gYvWubKyM/maxresdefault.jpg" },
];

function FilmCard({ film }) {
  const thumbRef = useRef(null);
  const playRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    if (playRef.current) {
      playRef.current.style.left = `${e.clientX - rect.left}px`;
      playRef.current.style.top = `${e.clientY - rect.top}px`;
    }
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
    >
      <div className="film-thumb" ref={thumbRef}>
        <img src={film.thumb} alt={film.title} className="film-thumb-img" />
        <div className="film-thumb-overlay" />
        <div ref={playRef} className={hovered ? "film-play-follow visible" : "film-play-follow"}>
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
  const ref = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const cards = ref.current.querySelectorAll(".film-item");
    const cardTween = gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" } }
    );

    let glitchTrigger;
    let parallaxTween;

    if (bgRef.current) {
      glitchTrigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        onEnter: () => {
          gsap.timeline()
            .to(bgRef.current, { skewX: 8, x: 15, opacity: 0.3, duration: 0.06 })
            .to(bgRef.current, { skewX: -5, x: -10, opacity: 0.6, duration: 0.06 })
            .to(bgRef.current, { skewX: 3, x: 5, duration: 0.05 })
            .to(bgRef.current, { skewX: 0, x: 0, opacity: 1, duration: 0.08 });
        },
      });

      parallaxTween = gsap.to(bgRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });
    }

    return () => {
      cardTween.scrollTrigger?.kill();
      glitchTrigger?.kill();
      parallaxTween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section id="films" ref={ref}>
      <MemoryPhrase text="she just smiled." top="15%" left="75%" rotate={3} />
      <div className="section-tag">Films</div>
      <span ref={bgRef} className="section-bg-text">Films</span>
      <div className="films-grid">
        {FILMS.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}