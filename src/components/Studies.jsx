import { useMemo, useRef, useState } from "react";
import "./Studies.css";

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

const SIZES = ["lg", "md", "md", "sm"];

function StudyItem({ item, rotate, offsetY, size }) {
  const thumbRef = useRef(null);
  const labelRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const isVideo = item.type === "video";

  const onMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    if (labelRef.current) {
      labelRef.current.style.left = `${e.clientX - rect.left}px`;
      labelRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  return (
    <a
      href={isVideo ? item.url : "#"}
      target={isVideo ? "_blank" : undefined}
      rel={isVideo ? "noopener noreferrer" : undefined}
      className={`study-item study-item--${size}`}
      style={{ "--r": `${rotate}deg`, "--ty": `${offsetY}rem` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
    >
      <div className="study-thumb" ref={thumbRef}>
        <img src={item.image} alt={item.title} className="study-thumb-img" />
        <div className="study-thumb-overlay" />
        <div
          ref={labelRef}
          className={hovered ? "study-play-follow visible" : "study-play-follow"}
        >
          {isVideo ? "PLAY" : "VIEW"}
        </div>
        <div className="study-id">{item.id}</div>
      </div>
    </a>
  );
}

export default function Studies() {
  const layout = useMemo(
    () =>
      STUDIES.map(() => ({
        rotate: (Math.random() - 0.5) * 12,
        offsetY: (Math.random() - 0.5) * 6,
        size: SIZES[Math.floor(Math.random() * SIZES.length)],
      })),
    []
  );

  return (
    <section id="studies">
      <MemoryPhrase text="I forgot." top="70%" left="20%" rotate={5} />
      <div className="studies-grid">
        {STUDIES.map((item, i) => (
          <StudyItem
            key={item.id}
            item={item}
            rotate={layout[i].rotate}
            offsetY={layout[i].offsetY}
            size={layout[i].size}
          />
        ))}
      </div>
    </section>
  );
}