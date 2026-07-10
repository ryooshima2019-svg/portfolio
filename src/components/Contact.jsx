// Contact.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Contact.css";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";
import { useReveal }   from "../hooks/useReveal";

const LINKS = [
  { label: "Email",       href: "mailto:ryooshima2019@gmail.com" },
  { label: "Instagram",   href: "https://www.instagram.com/ryo_ohi?igsh=MXdiemE4OTVpZ2d5ZA%3D%3D&utm_source=qr" },
  { label: "Twitter / X", href: "https://x.com/ryo_oos?s=11" },
];

const FLOATING = [
  "waiting, quietly.",
  "still here.",
  "nothing left to say.",
  "or maybe just one thing.",
];

export default function Contact() {
  const ref   = useRef(null);
  const bgRef = useRef(null);

  useBgGlitch(ref, bgRef, 8000);
  useReveal(ref);

  // 浮遊テキストをフェードイン
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".contact-float"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        stagger: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 60%" },
      }
    );
  }, []);

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
          声をかけてもらえれば、<br />
          たいていのことは話せます。
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
              {label}
            </a>
          ))}
        </div>

        {/* ページの終わりを示す線と日付 */}
        <div className="contact-end">
          <span className="contact-end-line" />
          <span className="contact-end-year">2026</span>
        </div>
      </div>

      {/* 余白に漂う文字 */}
      {FLOATING.map((text, i) => (
        <span
          key={text}
          className="contact-float"
          style={{
            top:  `${45 + i * 13}%`,
            left: `${45 + (i % 2) * 20}%`,
          }}
        >
          {text}
        </span>
      ))}
    </section>
  );
}