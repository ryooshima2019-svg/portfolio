import "./MemoryPhrase.css";

export default function MemoryPhrase({ text, top = "20%", left = "70%", rotate = 0 }) {
  return (
    <span
      className="memory-phrase"
      style={{ top, left, "--r": `${rotate}deg` }}
    >
      {text}
    </span>
  );
}
