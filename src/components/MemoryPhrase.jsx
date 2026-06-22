import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./MemoryPhrase.css";

function randomPos() {
  return {
    top: `${10 + Math.random() * 70}%`,
    left: `${10 + Math.random() * 70}%`,
  };
}

function randomDepth() {
  const scale = 0.9 + Math.random() * 0.4; // 0.9 - 1.3
  const opacity = 0.4 + Math.random() * 0.6;
  const blur = Math.random() * 2.5;

  return { scale, opacity, blur };
}

export default function MemoryPhrase({ texts, interval = 6000 }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(randomPos);
  const [depth, setDepth] = useState(randomDepth);
  const depthRef = useRef(depth);

  const basePos = useRef(pos);
  const timeRef = useRef(0);

  useEffect(() => {
    depthRef.current = depth;
  }, [depth]);

  // text switching + repositioning
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 1 });

    const id = setInterval(() => {
      gsap.to(el, {
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          setIndex((i) => (i + 1) % texts.length);
          const newPos = randomPos();
          setPos(newPos);
          basePos.current = newPos;

          const newDepth = randomDepth();
          setDepth(newDepth);
          depthRef.current = newDepth;

          gsap.to(el, {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });
    }, interval);

    return () => clearInterval(id);
  }, [texts.length, interval]);

  // subtle floating drift animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      const d = depthRef.current;

      // normalize scale (0.9 - 1.3) -> (0 - 1)
      const normalized = (d.scale - 0.9) / 0.4;

      // closer elements move slightly faster
      const speed = 0.4 + normalized * 0.8;

      timeRef.current += 0.01 * speed;

      const driftX = Math.sin(timeRef.current) * 1.2;
      const driftY = Math.cos(timeRef.current * 0.8) * 1.2;

      el.style.transform = `translate(${driftX}px, ${driftY}px) scale(${d.scale})`;

      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span
      ref={ref}
      className="memory-phrase"
      style={{
        top: pos.top,
        left: pos.left,
        opacity: depth.opacity,
        filter: `blur(${depth.blur}px)`
      }}
    >
      {texts[index]}
    </span>
  );
}