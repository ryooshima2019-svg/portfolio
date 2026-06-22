// src/hooks/useGlitch.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useBgGlitch(ref, bgRef, intervalMs) {
  useEffect(() => {
    const bg  = bgRef.current;
    const el  = ref.current;
    if (!bg || !el) return;

    const glitch = () =>
      gsap.timeline()
        .to(bg, { skewX: 8,  x: 15,  opacity: 0.3, duration: 0.06 })
        .to(bg, { skewX: -5, x: -10, opacity: 0.6, duration: 0.06 })
        .to(bg, { skewX: 3,  x: 5,               duration: 0.05 })
        .to(bg, { skewX: 0,  x: 0,   opacity: 1,  duration: 0.08 });

    let timer;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter:     () => { glitch(); timer = setInterval(glitch, intervalMs); },
      onLeaveBack: () => clearInterval(timer),
    });

    return () => { trigger.kill(); clearInterval(timer); };
  }, [intervalMs]);
}