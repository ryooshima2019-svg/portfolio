// Texts.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Texts.css";
import { textsFullData, featuredFull } from "./textsData";
import MemoryPhrase from "./MemoryPhrase";
import { useBgGlitch } from "../hooks/useGlitch";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { TEXTS } from "../data/works";

const FEATURED = {
  title: "砂漠を走る青年よ",
  year:  "2026",
  genre: "短編小説",
  full:  featuredFull,
};

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
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: piece, start: "top 85%" } }
      )
    );
    return () => tweens.forEach((t) => t.scrollTrigger?.kill());
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const openModal  = (text) => setModal({ ...text, full: textsFullData[text.id] || "" });
  const closeModal = () => setModal(null);

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

      {/* Featured - 大きく扱う */}
      <div className="text-featured" onClick={toggleFeatured}>
        <p className="text-featured-excerpt">
          ジンを手元に執筆する。それが私の趣味だった。<br />
          高尚ぶるのが上手な私。
        </p>
        <div className="text-featured-foot">
          <span className="text-featured-title">{FEATURED.title}</span>
          <span className="text-featured-meta">{FEATURED.year} · {FEATURED.genre}</span>
        </div>
        {featuredOpen && FEATURED.full && (
          <div className="text-featured-body" onClick={(e) => e.stopPropagation()}>
            {splitParagraphs(FEATURED.full)}
            <button className="text-close" onClick={toggleFeatured}>閉じる</button>
          </div>
        )}
      </div>

      {/* テキストリスト - 抜粋が先、タイトルは後 */}
      <div className="text-list">
        {TEXTS.map((t) => (
          <div
            key={t.id}
            className="text-piece"
            onClick={() => openModal(t)}
          >
            <p className="text-excerpt">{t.excerpt}</p>
            <div className="text-foot">
              <span className="text-title">{t.title}</span>
              <span className="text-meta">{t.year} · {t.genre}</span>
            </div>
          </div>
        ))}
      </div>

      {modal?.full && <TextModal modal={modal} onClose={closeModal} />}
    </section>
  );
}