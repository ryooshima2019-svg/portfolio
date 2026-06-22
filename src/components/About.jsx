import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import MemoryPhrase from "./MemoryPhrase";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
  { category: "3D", items: ["Blender", "Unreal Engine"] },
  { category: "Film", items: ["Premiere Pro", "After Effects", "DaVinci Resolve"] },
];

function useAboutAnimation(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animations = [
      { target: el.querySelector("h2"), from: { y: 40, opacity: 0 }, start: "top 75%" },
      { target: el.querySelectorAll("p"), from: { y: 30, opacity: 0 }, start: "top 70%", stagger: 0.15 },
      { target: el.querySelectorAll(".tool-group"), from: { y: 20, opacity: 0 }, start: "top 65%", stagger: 0.12 },
    ];

    const triggers = animations.map(({ target, from, start, stagger }) =>
      gsap.fromTo(target, from,
        {
          y: 0,
          opacity: 1,
          duration: stagger ? 1 : 1.2,
          stagger,
          ease: stagger ? "power2.out" : "power3.out",
          scrollTrigger: { trigger: el, start },
        }
      )
    );

    return () => triggers.forEach((tween) => tween.scrollTrigger?.kill());
  }, [ref]);
}

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

function ToolGroup({ category, items }) {
  return (
    <div className="tool-group">
      <div className="tool-category">{category}</div>
      <div className="tool-items">
        {items.map((item) => (
          <div key={item} className="tool-item">{item}</div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const bgRef = useRef(null);
  useAboutAnimation(ref);
  useBgGlitch(ref, bgRef, 7000);

  return (
    <section id="about" ref={ref}>
      <MemoryPhrase texts={["still watching.", "I kept looking.", "until it faded."]} top="55%" left="30%" rotate={-3} interval={5200} />
      <div className="section-tag">About</div>
      <span ref={bgRef} className="section-bg-text">About</span>
      <div className="about-inner">
        <div className="about-text">
          <h2>飛び立つ鳥をずっと眺めていた。<em>見えなくなるまで。</em></h2>
          <p>文章、映像、3D。</p>
          <p>異なる素材を使いながら、同じ場所を何度も見つめている。</p>
        </div>
        <div className="about-tools">
          {TOOLS.map((group) => (
            <ToolGroup key={group.category} {...group} />
          ))}
        </div>
      </div>
    </section>
  );
}