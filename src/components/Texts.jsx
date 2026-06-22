import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Texts.css";
import { textsFullData, featuredFull } from "./textsData";
import MemoryPhrase from "./MemoryPhrase";

gsap.registerPlugin(ScrollTrigger);

const FEATURED = {
  id: "000",
  title: "砂漠を走る青年よ",
  year: "2026",
  genre: "短編小説",
  full: featuredFull,
};

const TEXTS = [
  { id: "001", title: "履歴書には書けない事", year: "2026", genre: "短編小説", excerpt: "静かな面接会場にどこか疎外感を感じながら、周りと同じくお行儀よく座っている。そんな自分がどうにも可笑しくて、口の端が上がるのを必死に抑えている。" },
  { id: "002", title: "二月三十日", year: "2026", genre: "短編小説", excerpt: "露悪は柑橘の匂いがする。手が震えている。この症状の始まりさえ知らないのに私はいつの間にやらそいつと二人で仲良く共生している。" },
  { id: "003", title: "生きる", year: "2026", genre: "短編小説", excerpt: "朝起きてカーテンを開く。快晴。ついてる。そう感じた。そんな感覚は久しぶりだった気がする。" },
  { id: "004", title: "栞", year: "2026", genre: "短編小説", excerpt: "これは幼かった頃の話。別に仲良くなんてなかった。ただ時々見かけるだけ、彼女は私を見かけると微笑むだけ。" },
];

function useBgGlitch(ref, bgRef, intervalMs) {
  useEffect(() => {
    if (!bgRef.current) return;

    const glitch = () => {
      gsap.timeline()
        .to(bgRef.current, { skewX: 8, x: 15, opacity: 0.3, duration: 0.06 })
        .to(bgRef.current, { skewX: -5, x: -10, opacity: 0.6, duration: 0.06 })
        .to(bgRef.current, { skewX: 3, x: 5, duration: 0.05 })
        .to(bgRef.current, { skewX: 0, x: 0, opacity: 1, duration: 0.08 });
    };

    let glitchInterval;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        glitch();
        glitchInterval = setInterval(glitch, intervalMs);
      },
      onLeaveBack: () => clearInterval(glitchInterval),
    });

    return () => {
      trigger.kill();
      clearInterval(glitchInterval);
    };
  }, [ref, bgRef, intervalMs]);
}

export default function Texts() {
  const ref = useRef(null);
  const bgRef = useRef(null);
  const [modal, setModal] = useState(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const openModal = (text) => setModal({ ...text, full: textsFullData[text.id] || "" });
  const closeModal = () => setModal(null);

  useBgGlitch(ref, bgRef, 5500);

  useEffect(() => {
    const pieces = ref.current.querySelectorAll(".text-piece");
    const tweens = Array.from(pieces).map((piece) =>
      gsap.fromTo(piece,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: piece, start: "top 80%" } }
      )
    );
    return () => tweens.forEach((tween) => tween.scrollTrigger?.kill());
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <section id="texts" ref={ref}>
      <MemoryPhrase texts={["I wrote it down.", "the words stayed.", "unfinished, still."]} top="60%" left="8%" rotate={-4} interval={4700} />
      <div className="section-tag">Texts</div>
      <span ref={bgRef} className="section-bg-text">Texts</span>

      <div className="text-featured">
        <div className="text-featured-label">Featured</div>
        <div className="text-featured-title">{FEATURED.title}</div>
        <div className="text-featured-meta">{FEATURED.year} · {FEATURED.genre}</div>
        {featuredOpen && FEATURED.full && (
          <div className="text-featured-body">
            {FEATURED.full.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
        <button
          className="text-expand"
          onClick={() => {
            if (featuredOpen) {
              setFeaturedOpen(false);
              document.getElementById("texts").scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              setFeaturedOpen(true);
            }
          }}
        >
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
              <button className="text-expand" onClick={() => openModal(t)}>
                続きを読む
              </button>
              <div className="text-year">{t.year} · {t.genre}</div>
            </div>
          </div>
        ))}
      </div>

      {modal && modal.full && (
        <div className="text-modal-overlay" onClick={closeModal}>
          <div className="text-modal" onClick={(e) => e.stopPropagation()}>
            <div className="text-modal-header">
              <div>
                <div className="text-modal-title">{modal.title}</div>
                <div className="text-modal-meta">{modal.year} · {modal.genre}</div>
              </div>
              <button className="text-modal-close" onClick={closeModal}>閉じる</button>
            </div>
            <div className="text-modal-body">
              {modal.full.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}