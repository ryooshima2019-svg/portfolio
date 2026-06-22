// Hero.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroBackground from "./HeroBackground";
import "./Hero.css";

function useHeroEntrance(titleRef, descRef) {
  useEffect(() => {
    const lines = titleRef.current?.querySelectorAll(".line");
    gsap.set(lines, { y: 60, opacity: 0 });
    gsap.to(lines, {
      y: 0, opacity: 1, duration: 1.2, stagger: 0.15,
      ease: "power3.out", delay: 0.3,
    });
    gsap.fromTo(
      descRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, delay: 1.0, ease: "power2.out" }
    );
  }, []);
}

function useHeroScroll(innerRef, titleRef, descRef) {
  useEffect(() => {
    const onScroll = () => {
      const y    = window.scrollY;
      const ease = 1 - Math.exp(-y / 400);

      if (innerRef.current)
        gsap.set(innerRef.current, { y: ease * 60 });

      if (titleRef.current)
        gsap.set(titleRef.current, { letterSpacing: `${y * 0.003}px` });

      if (descRef.current)
        gsap.set(descRef.current, { y: y * 0.12, opacity: Math.max(1 - y / 500, 0) });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function useHeroGlitch(titleRef) {
  useEffect(() => {
    const glitch = () =>
      gsap.timeline()
        .to(titleRef.current, { skewX: 4,  duration: 0.05, ease: "power2.inOut" })
        .to(titleRef.current, { skewX: 0,  duration: 0.05 })
        .to(titleRef.current, { x: -6, opacity: 0.8, duration: 0.05 })
        .to(titleRef.current, { x: 6,  duration: 0.05 })
        .to(titleRef.current, { x: 0,  opacity: 1,   duration: 0.05 });

    const timer = setInterval(glitch, 5000);
    return () => clearInterval(timer);
  }, []);
}

export default function Hero() {
  const innerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef  = useRef(null);

  useHeroEntrance(titleRef, descRef);
  useHeroScroll(innerRef, titleRef, descRef);
  useHeroGlitch(titleRef);

  return (
    <section id="hero" className="hero">
      <HeroBackground />
      <div ref={innerRef} className="hero-inner">
        <h1 ref={titleRef} className="hero-title">
          <span className="line">理解できないものを</span>
          <span className="line"><em>見つめ続けるために</em></span>
        </h1>
        <p ref={descRef} className="hero-desc">Ryo Oshima — 文章・映像・3D・デザイン</p>
      </div>
      <div className="hero-scroll">
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}