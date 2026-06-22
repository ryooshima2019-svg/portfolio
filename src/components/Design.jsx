import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Design.css";
import MemoryPhrase from "./MemoryPhrase";

gsap.registerPlugin(ScrollTrigger);

const POSTERS = [
  { id: "001", title: "萌芽展", year: "2024", desc: "展示会ポスター", src: "/images/moega.jpg" },
  { id: "002", title: "#Bluem", year: "2025", desc: "展示会ポスター", src: "/images/bluem.jpg" },
];

function useBgGlitch(ref, bgRef, intervalMs) {
  useEffect(() => {
    if (!bgRef.current) return;

    const glitch = () => {
      gsap.timeline()
        .to(bgRef.current, { skewX: 8, x: 15, opacity: 0.3, duration: 0.06 })
        .to(bgRef.current, { skewX: -5, x: -10, opacity: 0.6, duration: 0.06 })
        .to(bgRef.current, { skewX: 3, x: 5, duration: 0.05 })
        .to(bgRef.current, { skewX: 0, x: 0, opacity: 1, duration: 0.08 });
    };

    let glitchInterval;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        glitch();
        glitchInterval = setInterval(glitch, intervalMs);
      },
      onLeaveBack: () => clearInterval(glitchInterval),
    });

    return () => {
      trigger.kill();
      clearInterval(glitchInterval);
    };
  }, [ref, bgRef, intervalMs]);
}

export default function Design() {
  const ref = useRef(null);
  const bgRef = useRef(null);
  useBgGlitch(ref, bgRef, 6000);

  useEffect(() => {
    const items = ref.current.querySelectorAll(".design-item");
    gsap.fromTo(items,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" } }
    );
  }, []);

  return (
    <section id="design" ref={ref}>
      <MemoryPhrase texts={["it took shape.", "almost finished.", "still unnamed."]} top="40%" left="65%" rotate={-2} interval={5500} />
      <div className="section-tag">Design</div>
      <span ref={bgRef} className="section-bg-text">Design</span>
      <div className="design-grid">
        {POSTERS.map((p) => (
          <div key={p.id} className="design-item">
            <div className="design-thumb">
              <img src={p.src} alt={p.title} className="design-img" />
              <div className="design-overlay" />
              <div className="design-id">{p.id}</div>
            </div>
            <div className="design-info">
              <div className="design-title">{p.title}</div>
              <div className="design-meta">{p.year} · {p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}