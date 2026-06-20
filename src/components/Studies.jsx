import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Studies.css";

gsap.registerPlugin(ScrollTrigger);

const studies = [
  { id: "001", type: "video", url: "https://youtu.be/TVpoEA4OOw8", thumb: "https://img.youtube.com/vi/TVpoEA4OOw8/maxresdefault.jpg" },
  { id: "002", type: "video", url: "https://youtu.be/A8StaO79QqE", thumb: "https://img.youtube.com/vi/A8StaO79QqE/maxresdefault.jpg" },
  { id: "003", type: "video", url: "https://youtu.be/_ZI_9QVpinQ", thumb: "https://img.youtube.com/vi/_ZI_9QVpinQ/maxresdefault.jpg" },
  { id: "004", type: "video", url: "https://youtu.be/5bw4zVso7V0", thumb: "https://img.youtube.com/vi/5bw4zVso7V0/maxresdefault.jpg" },
  { id: "005", type: "image", thumb: "/studies/vogue1.jpg" },
  { id: "006", type: "image", thumb: "/studies/vogue2.jpg" },
  { id: "007", type: "image", thumb: "/studies/poster.jpg" },
  { id: "008", type: "image", thumb: "/studies/ryo3d.jpg" },
  { id: "009", type: "image", thumb: "/studies/decadance.jpg" },
];

const rotates = [-2.5, 1.8, -1.2, 2.3, -1.8, 2.1, -0.8, 1.5, -2.0];

function StudyCard({ study, rotate }) {
  const thumbRef = useRef(null);
  const playRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    if (playRef.current) {
      playRef.current.style.left = (e.clientX - rect.left) + "px";
      playRef.current.style.top = (e.clientY - rect.top) + "px";
    }
  };

  return (
    <a
      className="study-item"
      href={study.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transform: "rotate(" + rotate + "deg)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
    >
      <div className="study-thumb" ref={thumbRef}>
        <img src={study.thumb} alt={study.id} className="study-thumb-img" />
        <div className="study-thumb-overlay" />
        <div ref={playRef} className={hovered ? "study-play-follow visible" : "study-play-follow"}>PLAY</div>
        <div className="study-id">{study.id}</div>
      </div>
    </a>
  );
}

export default function Studies() {
  const ref = useRef(null);

  useEffect(() => {
    const cards = ref.current.querySelectorAll(".study-item");
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" } }
    );
  }, []);

  return (
    <section id="studies" ref={ref}>
      <div className="section-tag">Studies</div>
      <span className="section-bg-text">Studies</span>
      <div className="studies-grid">
        {studies.map((s, i) => (
          <StudyCard key={s.id} study={s} rotate={rotates[i]} />
        ))}
      </div>
    </section>
  );
}