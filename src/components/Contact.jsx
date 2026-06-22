import { useRef, useEffect } from "react";
import "./Contact.css";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";
import { useReveal }   from "../hooks/useReveal";

const LINKS = [
  { label: "Email",      href: "mailto:ryooshima2019@gmail.com" },
  { label: "Instagram",  href: "https://www.instagram.com/ryo_ohi?igsh=MXdiemE4OTVpZ2d5ZA%3D%3D&utm_source=qr" },
  { label: "Twitter / X", href: "https://x.com/ryo_oos?s=11" },
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

export default function Contact() {
  const ref   = useRef(null);
  const bgRef = useRef(null);

  useBgGlitch(ref, bgRef, 8000);
  useReveal(ref);

  return (
    <section id="contact" ref={ref}>
      <MemoryPhrase
        texts={["nothing left to say.", "still here.", "waiting, quietly."]}
        top="65%" left="12%" rotate={2} interval={5000}
      />
      <div className="section-tag reveal">Contact</div>
      <span ref={bgRef} className="section-bg-text">Contact</span>

      <div className="contact-inner reveal">
        <p className="contact-lead">
          仕事の依頼、作品についての感想、<br />
          何でもお気軽にどうぞ。
        </p>
        <div className="contact-links">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}