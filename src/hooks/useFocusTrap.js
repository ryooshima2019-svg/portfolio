// src/hooks/useFocusTrap.js
import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input",
  "select",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const el    = ref.current;
    const nodes = Array.from(el.querySelectorAll(FOCUSABLE));
    const first = nodes[0];
    const last  = nodes[nodes.length - 1];

    first?.focus();

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      if (nodes.length === 0) { e.preventDefault(); return; }
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [active]);
}