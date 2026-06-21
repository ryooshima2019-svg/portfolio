import { useEffect, useRef } from "react";
import "./Contact.css";
import MemoryPhrase from "./MemoryPhrase";

const LINKS = [
  { label: "Email", href: "mailto：ryooshima2019@gmail.com" },
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
];

export default function Contact() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref}>
      <MemoryPhrase texts={["nothing left to say.", "still here.", "waiting, quietly."]} top="65%" left="12%" rotate={2} />
      <div className="section-tag reveal">Contact</div>
      <span className="section-bg-text">Contact</span>
      <div className="contact-inner reveal">
        <p className="contact-lead">
          仕事の依頼、作品についての感想、<br />
          何でもお気軽にどうぞ。
        </p>
        <div className="contact-links">
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="contact-link">
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
