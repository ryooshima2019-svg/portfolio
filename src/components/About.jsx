import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

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
  useAboutAnimation(ref);

  return (
    <section id="about" ref={ref}>
      <MemoryPhrase text="still watching." top="10%" left="70%" rotate={-3} />
      <div className="section-tag">About</div>
      <span className="section-bg-text">About</span>
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
