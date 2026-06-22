import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Design.css";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";
import { DESIGNS } from "../data/works";

export default function Design() {
  const ref   = useRef(null);
  const bgRef = useRef(null);

  useBgGlitch(ref, bgRef, 6000);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el.querySelectorAll(".design-item"),
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      }
    );

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <section id="design" ref={ref}>
      <MemoryPhrase
        texts={["it took shape.", "almost finished.", "still unnamed."]}
        top="40%" left="65%" rotate={-2} interval={5500}
      />
      <div className="section-tag">Design</div>
      <span ref={bgRef} className="section-bg-text">Design</span>

      <div className="design-grid">
        {DESIGNS.map((p) => (
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