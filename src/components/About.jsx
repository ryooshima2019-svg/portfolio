import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { category: "3D", items: ["Blender", "Unreal Engine"] },
  { category: "Film", items: ["Premiere Pro", "After Effects", "DaVinci Resolve"] },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(el.querySelector("h2"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" } }
    );
    gsap.fromTo(el.querySelectorAll("p"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%" } }
    );
    gsap.fromTo(el.querySelectorAll(".tool-group"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 65%" } }
    );
  }, []);

  return (
    <section id="about" ref={ref}>
      <div className="section-tag">About</div>
      <span className="section-bg-text">About</span>
      <div className="about-inner">
        <div className="about-text">
          <h2>飛び立つ鳥をずっと眺めていた。<em>見えなくなるまで。</em></h2>
          <p>文章、映像、3D。</p>
          <p>異なる素材を使いながら、同じ場所を何度も見つめている。</p>
        </div>
        <div className="about-tools">
          {tools.map((group) => (
            <div key={group.category} className="tool-group">
              <div className="tool-category">{group.category}</div>
              <div className="tool-items">
                {group.items.map((item) => (
                  <div key={item} className="tool-item">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
