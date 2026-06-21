import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./MemoryPhrase.css";

export default function MemoryPhrase({ texts, top = "20%", left = "70%", rotate = 0, interval = 6000 }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { filter: "blur(2px)", opacity: 1 });

    const id = setInterval(() => {
      gsap.to(el, {
        filter: "blur(10px)",
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          setIndex((i) => (i + 1) % texts.length);
          gsap.to(el, {
            filter: "blur(2px)",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });
    }, interval);

    return () => clearInterval(id);
  }, [texts.length, interval]);

  return (
    <span
      ref={ref}
      className="memory-phrase"
      style={{ top, left, "--r": `${rotate}deg` }}
    >
      {texts[index]}
    </span>
  );
}