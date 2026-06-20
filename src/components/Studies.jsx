import { useMemo } from "react";
import "./Studies.css";

const studies = [
  {
    id: "01",
    title: "Study 01",
    image: "/images/01.jpg",
  },
  {
    id: "02",
    title: "Study 02",
    image: "/images/02.jpg",
  },
  {
    id: "03",
    title: "Study 03",
    image: "/images/03.jpg",
  },
];

export default function Studies() {
  return (
    <section id="studies">
      <div className="studies-grid">
        {studies.map((item) => {
          // “資料の寄せ集め感”の核（軽いランダム歪み）
          const rotate = useMemo(() => {
            return (Math.random() - 0.5) * 2.5; // -1.25deg ~ 1.25deg
          }, []);

          return (
            <a
              key={item.id}
              href="#"
              className="study-item"
              style={{
                "--r": `${rotate}deg`,
              }}
            >
              <div className="study-thumb">
                <img
                  src={item.image}
                  alt={item.title}
                  className="study-thumb-img"
                />
                <div className="study-thumb-overlay" />

                <div className="study-play-follow">
                  VIEW
                </div>

                <div className="study-id">{item.id}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}