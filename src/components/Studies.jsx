import { useMemo } from "react";
import "./Studies.css";
import MemoryPhrase from "./MemoryPhrase";

const STUDIES = [
  { id: "01", title: "Study 01", image: "/studies/decadance.jpg" },
  { id: "02", title: "Study 02", image: "/studies/poster.jpg" },
  { id: "03", title: "Study 03", image: "/studies/ryo3d.jpg" },
  { id: "04", title: "Study 04", image: "/studies/vogue1.jpg" },
  { id: "05", title: "Study 05", image: "/studies/vogue2.jpg" },
  { id: "06", title: "Study 06", image: "https://img.youtube.com/vi/eiKJApaONgI/maxresdefault.jpg" },
  { id: "07", title: "Study 07", image: "https://img.youtube.com/vi/5bw4zVso7V0/maxresdefault.jpg" },
  { id: "08", title: "Study 08", image: "https://img.youtube.com/vi/_ZI_9QVpinQ/maxresdefault.jpg" },
  { id: "09", title: "Study 09", image: "https://img.youtube.com/vi/QKV9uU7nMgU/maxresdefault.jpg" },
  { id: "10", title: "Study 10", image: "https://img.youtube.com/vi/A8StaO79QqE/maxresdefault.jpg" },
  { id: "11", title: "Study 11", image: "https://img.youtube.com/vi/8N8HY6ohzy4/maxresdefault.jpg" },
  { id: "12", title: "Study 12", image: "https://img.youtube.com/vi/8vtOJ4N0MDw/maxresdefault.jpg" },
  { id: "13", title: "Study 13", image: "https://img.youtube.com/vi/2Yt303bIdPY/maxresdefault.jpg" },
];

export default function Studies() {
  const layout = useMemo(() => {
    return STUDIES.map((_, i) => {
      const depth = Math.random(); // ←奥行き

      return {
        x: 120 + (i % 4) * 300 + (Math.random() - 0.5) * 80,
        y: 120 + Math.floor(i / 4) * 360 + (Math.random() - 0.5) * 120,
        rotate: (Math.random() - 0.5) * 10,
        size: 160 + Math.random() * 160,

        scale: 0.85 + depth * 0.4, // ←奥行き
        opacity: 0.55 + depth * 0.45, // ←空気感
      };
    });
  }, []);

  return (
    <section id="studies">
      <MemoryPhrase text="I forgot." top="65%" left="18%" rotate={-3} />

      <div className="studies-grid">
        {STUDIES.map((item, i) => {
          const l = layout[i];

          const isMain = i === 3; // ←主役を1つ作る

          return (
            <div
              key={item.id}
              className={`study-item ${isMain ? "is-main" : ""}`}
              style={{
                "--x": `${l.x}px`,
                "--y": `${l.y}px`,
                "--r": `${l.rotate}deg`,
                "--w": `${l.size}px`,
                "--s": l.scale,
                "--o": l.opacity,
                "--i": i,
              }}
            >
              <img src={item.image} alt={item.title} />
            </div>
          );
        })}
      </div>
    </section>
  );
}