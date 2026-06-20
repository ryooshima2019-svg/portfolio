import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Intro.css";

export default function Intro({ onComplete }) {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const nameRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ref.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.3,
          onComplete,
        });
      },
    });

    tl
      .fromTo(nameRef.current,
        { opacity: 0, letterSpacing: "0.5em" },
        { opacity: 1, letterSpacing: "0.15em", duration: 1.4, ease: "power3.out", delay: 0.5 }
      )
      .fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.4"
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .to([nameRef.current, lineRef.current, subRef.current], {
        opacity: 0,
        y: -15,
        duration: 0.7,
        ease: "power2.in",
        delay: 0.8,
        stagger: 0.05,
      });
  }, []);

  return (
    <div ref={ref} className="intro">
      <div className="intro-inner">
        <p ref={nameRef} className="intro-name">Ryo Oshima</p>
        <div ref={lineRef} className="intro-line" />
        <p ref={subRef} className="intro-sub">文章・映像・3D</p>
      </div>
    </div>
  );
}
