import { useState, useEffect } from "react";
import "./Nav.css";

const links = ["films", "texts", "design", "studies", "about", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = links.map(id => document.getElementById(id)).filter(Boolean);
      let current = "";
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={scrolled ? "nav nav--scrolled" : "nav"}>
      <a href="#hero" className="nav-name" onClick={(e) => handleClick(e, "hero")}>
        <span>Ryo Oshima</span>
      </a>
      <ul className="nav-links">
        {links.map((id) => (
          <li key={id}>
            <a
              href={"#" + id}
              onClick={(e) => handleClick(e, id)}
              className={active === id ? "nav-link--active" : ""}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}