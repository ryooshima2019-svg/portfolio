import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current, {
      y: () => ref.current.offsetHeight * speed * -1,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current.closest("section"),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => tween.scrollTrigger?.kill();
  }, [speed]);

  return ref;
}