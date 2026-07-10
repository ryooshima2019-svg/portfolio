// About.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./About.css";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";

const TOOLS = [
  { category: "3D", items: ["Blender", "Unreal Engine"] },
  { category: "Film", items: ["Premiere Pro", "After Effects", "DaVinci Resolve"] },
  { category: "Design", items: ["Photoshop", "Illustrator", "InDesign"] },
];

const ABOUT_ANIMATIONS = [
  {
    selector: "h2",
    from: { y: 40, opacity: 0 },
    start: "top 75%",
  },
  {
    selector: "p",
    from: { y: 30, opacity: 0 },
    start: "top 70%",
    stagger: 0.15,
  },
];

function useAboutAnimation(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tweens = ABOUT_ANIMATIONS.map(
      ({ selector, from, start, stagger }) =>
        gsap.fromTo(
          el.querySelectorAll(selector),
          from,
          {
            y: 0,
            opacity: 1,
            duration: stagger ? 1 : 1.2,
            ease: stagger ? "power2.out" : "power3.out",
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
            },
          }
        )
    );

    return () => tweens.forEach((t) => t.scrollTrigger?.kill());
  }, []);
}

export default function About() {
  const ref = useRef(null);
  const bgRef = useRef(null);

  useAboutAnimation(ref);
  useBgGlitch(ref, bgRef, 7000);

  return (
    <section id="about" ref={ref}>
      <MemoryPhrase
        texts={["still watching.", "I kept looking.", "until it faded."]}
        top="55%"
        left="30%"
        rotate={-3}
        interval={5200}
      />

      <div className="section-tag">About</div>
      <span ref={bgRef} className="section-bg-text">
        About
      </span>

      <div className="about-inner">
        <div className="about-text">
          <h2>理解できないものを見つめ続けるために</h2>
          <h2>
            <em>そう言っていれば、多少の格好はつく。</em>
          </h2>

          <p>文章、映像、3D、デザイン。</p>
          <p>
            実際はどうだ。見たいように見ているだけ。少なくとも、私の見ている世界でしかない。
          </p>
          <p>そんな作品たちです。</p>
          <p>
            デカダンスとか、実存だとか。難しい言葉を羅列しては悦に入る。
          </p>
          <p>少し面倒な人間になった気がする。</p>
        </div>

        <aside className="tool-list">
          {TOOLS.map(({ category, items }) => (
            <div key={category} className="tool-group">
              <span className="tool-category">{category}</span>

              {items.map((item) => (
                <div key={item} className="tool-item">
                  {item}
                </div>
              ))}
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}