import { useEffect, useRef } from "react";
import "./Contact.css";

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
      <div className="section-tag reveal">Contact</div>
      <span className="section-bg-text">Contact</span>
      <div className="contact-inner reveal">
        <p className="contact-lead">
          仕事の依頼、作品についての感想、<br />
          何でもお気軽にどうぞ。
        </p>
        <div className="contact-links">
          <a href="mailto:your@email.com" className="contact-link">
            Email ↗
          </a>
          <a href="#" className="contact-link">Instagram ↗</a>
          <a href="#" className="contact-link">Twitter / X ↗</a>
        </div>
      </div>
    </section>
  );
}