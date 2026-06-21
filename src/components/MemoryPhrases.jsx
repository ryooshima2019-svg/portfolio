import "./MemoryPhrases.css";

const PHRASES = [
  { text: "until it disappeared.", top: "140vh", left: "8%", rotate: -4 },
  { text: "she just smiled.", top: "260vh", left: "70%", rotate: 3 },
  { text: "it was clear today.", top: "410vh", left: "12%", rotate: -2 },
  { text: "I forgot.", top: "560vh", left: "65%", rotate: 5 },
  { text: "still watching.", top: "720vh", left: "10%", rotate: -3 },
];

export default function MemoryPhrases() {
  return (
    <div className="memory-phrases">
      {PHRASES.map((p, i) => (
        <span
          key={i}
          className="memory-phrase"
          style={{ top: p.top, left: p.left, "--r": `${p.rotate}deg` }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}
