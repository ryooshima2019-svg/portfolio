// Texts.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Texts.css";
import { textsFullData, featuredFull } from "./textsData";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { TEXTS, FEATURED_TEXT } from "../data/works"; 

const splitParagraphs = (text) =>
  text.split("\n\n").map((para, i) => <p key={i}>{para}</p>);

function TextModal({ modal, onClose }) {
  const modalRef = useRef(null);
  useFocusTrap(modalRef, !!modal);

  return (
    <div className="text-modal-overlay" onClick={onClose}>
      <div className="text-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="text-modal-header">
          <div>
            <div className="text-modal-title">{modal.title}</div>
            <div className="text-modal-meta">{modal.year} · {modal.genre}</div>
          </div>
          <button className="text-modal-close" onClick={onClose}>閉じる</button>
        </div>
        <div className="text-modal-body">
          {splitParagraphs(modal.full)}
        </div>
      </div>
    </div>
  );
}

export default function Texts() {
  const ref   = useRef(null);
  const bgRef = useRef(null);

  const [modal,        setModal]        = useState(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);

  useBgGlitch(ref, bgRef, 5500);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tweens = Array.from(el.querySelectorAll(".text-piece")).map((piece) =>
      gsap.fromTo(piece,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: piece, start: "top 80%" } }
      )
    );
    return () => tweens.forEach((t) => t.scrollTrigger?.kill());
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const openModal      = (text) => setModal({ ...text, full: textsFullData[text.id] || "" });
  const closeModal     = () => setModal(null);
  const toggleFeatured = () => {
    if (featuredOpen) {
      setFeaturedOpen(false);
      document.getElementById("texts")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setFeaturedOpen(true);
    }
  };

  return (
    <section id="texts" ref={ref}>
      <MemoryPhrase
        texts={["I wrote it down.", "the words stayed.", "unfinished, still."]}
        top="60%" left="8%" rotate={-4} interval={5700}
      />
      <div className="section-tag">Texts</div>
      <span ref={bgRef} className="section-bg-text">Texts</span>

      <div className="text-featured">
        <div className="text-featured-label">Featured</div>
        <div className="text-featured-title">{FEATURED.title}</div>
        <div className="text-featured-meta">{FEATURED.year} · {FEATURED.genre}</div>
        {featuredOpen && FEATURED.full && (
          <div className="text-featured-body">{splitParagraphs(FEATURED.full)}</div>
        )}
        <button className="text-expand" onClick={toggleFeatured}>
          {featuredOpen ? "閉じる" : "全文を読む"}
        </button>
      </div>

      <div className="text-list">
        {TEXTS.map((t) => (
          <div key={t.id} className="text-piece">
            <div className="text-number">{t.id}</div>
            <div className="text-body">
              <div className="text-title">{t.title}</div>
              <div className="text-excerpt"><p>{t.excerpt}</p></div>
              <button className="text-expand" onClick={() => openModal(t)}>続きを読む</button>
              <div className="text-year">{t.year} · {t.genre}</div>
            </div>
          </div>
        ))}
      </div>

      {modal?.full && <TextModal modal={modal} onClose={closeModal} />}
    </section>
  );
}