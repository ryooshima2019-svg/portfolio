import { useState, useEffect, useRef } from "react";
import "./Nav.css";

const LINKS = ["films", "texts", "design", "studies", "about", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current = LINKS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "";
      sectionsRef.current.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    // slight delay for smoother transition feel
    setTimeout(() => {
      setMenuOpen(false);
    }, 150);
  };

  return (
    <nav className={scrolled ? "nav nav--scrolled" : "nav"}>
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
      <a href="#hero" className="nav-name" onClick={(e) => handleClick(e, "hero")}>
        <span>Ryo Oshima</span>
      </a>
      <ul className="nav-links nav-links--desktop">
        {LINKS.map((id) => (
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
      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        <ul>
          {LINKS.map((id) => (
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
      </div>
    </nav>
  );
}