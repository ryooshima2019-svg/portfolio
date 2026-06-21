import { useMemo } from "react";
import "./Studies.css";
import MemoryPhrase from "./MemoryPhrase";

const STUDIES = [
  { id: "01", title: "Study 01", type: "image", image: "/studies/decadance.jpg" },
  { id: "02", title: "Study 02", type: "image", image: "/studies/poster.jpg" },
  { id: "03", title: "Study 03", type: "image", image: "/studies/ryo3d.jpg" },
  { id: "04", title: "Study 04", type: "image", image: "/studies/vogue1.jpg" },
  { id: "05", title: "Study 05", type: "image", image: "/studies/vogue2.jpg" },
  { id: "06", title: "Study 06", type: "video", url: "https://youtu.be/eiKJApaONgI", image: "https://img.youtube.com/vi/eiKJApaONgI/maxresdefault.jpg" },
  { id: "07", title: "Study 07", type: "video", url: "https://youtu.be/5bw4zVso7V0", image: "https://img.youtube.com/vi/5bw4zVso7V0/maxresdefault.jpg" },
  { id: "08", title: "Study 08", type: "video", url: "https://youtu.be/_ZI_9QVpinQ", image: "https://img.youtube.com/vi/_ZI_9QVpinQ/maxresdefault.jpg" },
  { id: "09", title: "Study 09", type: "video", url: "https://youtu.be/QKV9uU7nMgU", image: "https://img.youtube.com/vi/QKV9uU7nMgU/maxresdefault.jpg" },
  { id: "10", title: "Study 10", type: "video", url: "https://youtu.be/A8StaO79QqE", image: "https://img.youtube.com/vi/A8StaO79QqE/maxresdefault.jpg" },
  { id: "11", title: "Study 11", type: "video", url: "https://youtube.com/shorts/8N8HY6ohzy4", image: "https://img.youtube.com/vi/8N8HY6ohzy4/maxresdefault.jpg" },
  { id: "12", title: "Study 12", type: "video", url: "https://youtube.com/shorts/8vtOJ4N0MDw", image: "https://img.youtube.com/vi/8vtOJ4N0MDw/maxresdefault.jpg" },
  { id: "13", title: "Study 13", type: "video", url: "https://youtube.com/shorts/2Yt303bIdPY", image: "https://img.youtube.com/vi/2Yt303bIdPY/maxresdefault.jpg" },
];

const positions = [
  { top: "5%", left: "5%" },
  { top: "10%", left: "55%" },
  { top: "25%", left: "20%" },
  { top: "40%", left: "60%" },
  { top: "55%", left: "10%" },
  { top: "70%", left: "50%" },
  { top: "85%", left: "20%" },
];

function StudyItem({ item, rotate, offsetY, size, style }) {
  return (
    <a
      className={`study-item study-item--${size}`}
      style={{
        ...style,
        "--r": `${rotate}deg`,
        "--ty": `${offsetY}rem`,
      }}
    >
      <img src={item.image} alt={item.title} />
    </a>
  );
}

export default function Studies() {
  const layout = useMemo(() => {
    return STUDIES.map((_, i) => ({
      rotate: (Math.random() - 0.5) * 6,
      offsetY: (Math.random() - 0.5) * 2,
      size: ["lg", "md", "md", "sm"][i % 4],
    }));
  }, []);

  return (
    <section id="studies">
      <MemoryPhrase text="I forgot." top="70%" left="20%" rotate={5} />

      <div className="studies-grid">
        {STUDIES.map((item, i) => {
          const pos = positions[i % positions.length];
          const l = layout[i];

          return (
            <StudyItem
              key={item.id}
              item={item}
              rotate={l.rotate}
              offsetY={l.offsetY}
              size={l.size}
              style={{
                top: pos.top,
                left: pos.left,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}