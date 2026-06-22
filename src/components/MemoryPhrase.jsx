// MemoryPhrase.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./MemoryPhrase.css";

const randomPos   = () => ({ top: `${10 + Math.random() * 70}%`, left: `${10 + Math.random() * 70}%` });
const randomDepth = () => ({ scale: 0.9 + Math.random() * 0.4, opacity: 0.4 + Math.random() * 0.6, blur: Math.random() * 2.5 });

export default function MemoryPhrase({ texts, interval = 6000 }) {
  const ref      = useRef(null);
  const rafRef   = useRef(null);
  const timeRef  = useRef(0);
  const depthRef = useRef(null);
  const activeRef = useRef(false); // 表示中かどうか

  const [index, setIndex] = useState(0);
  const [pos,   setPos]   = useState(randomPos);
  const [depth, setDepth] = useState(() => {
    const d = randomDepth();
    depthRef.current = d;
    return d;
  });

  useEffect(() => { depthRef.current = depth; }, [depth]);

  // テキスト切り替え
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
          const newDepth = randomDepth();
          setPos(randomPos());
          setDepth(newDepth);
          depthRef.current = newDepth;
          gsap.to(el, { opacity: 1, duration: 1.2, ease: "power2.out" });
        },
      });
    }, interval);

    return () => clearInterval(id);
  }, [texts.length, interval]);

  // IntersectionObserverでRAFを制御
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { activeRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(el);

    const animate = () => {
      if (activeRef.current) {
        const d          = depthRef.current;
        const normalized = (d.scale - 0.9) / 0.4;
        const speed      = 0.4 + normalized * 0.8;

        timeRef.current += 0.01 * speed;

        const driftX = Math.sin(timeRef.current) * 1.2;
        const driftY = Math.cos(timeRef.current * 0.8) * 1.2;

        el.style.transform = `translate(${driftX}px, ${driftY}px) scale(${d.scale})`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <span
      ref={ref}
      className="memory-phrase"
      style={{ top: pos.top, left: pos.left, opacity: depth.opacity, filter: `blur(${depth.blur}px)` }}
    >
      {texts[index]}
    </span>
  );
}