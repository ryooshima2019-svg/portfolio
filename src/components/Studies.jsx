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

function StudyItem({ item, index, style }) {
  return (
    <div className="study-item" style={{ ...style, "--i": index }}>
      <img src={item.image} alt={item.title} />
    </div>
  );
}

export default function Studies() {
  const layout = useMemo(() => {
    return STUDIES.map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 600,
      rotate: (Math.random() - 0.5) * 10,
      size: 180 + Math.random() * 140,
    }));
  }, []);

  return (
    <section id="studies">
      <MemoryPhrase text="I forgot." top="70%" left="20%" rotate={5} />

      <div className="studies-grid">
        {STUDIES.map((item, i) => {
          const l = layout[i];

          return (
            <StudyItem
              key={item.id}
              item={item}
              index={i}
              style={{
                "--x": `${l.x}px`,
                "--y": `${l.y}px`,
                "--r": `${l.rotate}deg`,
                "--w": `${l.size}px`,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}