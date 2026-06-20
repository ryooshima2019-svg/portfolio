import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";

export default function Hero() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const lines = titleRef.current?.querySelectorAll(".line");
    gsap.set(lines, { y: 60, opacity: 0 });
    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });
    gsap.fromTo(descRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 1.0, ease: "power2.out" }
    );

    const onScroll = () => {
      const y = window.scrollY;
      if (innerRef.current) {
        gsap.set(innerRef.current, { y: y * 0.3 });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const glitch = () => {
      const tl = gsap.timeline();
      tl.to(titleRef.current, { skewX: 4, duration: 0.05, ease: "power2.inOut" })
        .to(titleRef.current, { skewX: 0, duration: 0.05 })
        .to(titleRef.current, { x: -6, opacity: 0.8, duration: 0.05 })
        .to(titleRef.current, { x: 6, duration: 0.05 })
        .to(titleRef.current, { x: 0, opacity: 1, duration: 0.05 });
    };

    const interval = setInterval(glitch, 5000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-memory">I remember.</div>
      <div ref={innerRef} className="hero-inner">
        <h1 ref={titleRef} className="hero-title">
          <span className="line">理解できないものを</span>
          <span className="line">見つめ続けるために</span>
          <span className="line"><em>作っている。</em></span>
        </h1>
        <p ref={descRef} className="hero-desc">Ryo Oshima — 文章・映像・3D</p>
      </div>
      <div className="hero-scroll">
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
