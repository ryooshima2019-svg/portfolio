import { useState, useEffect, useRef } from "react";
import "./Nav.css";

const LINKS = ["films", "texts", "design", "studies", "about", "contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef([]);
  const scrollYRef = useRef(0);

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

  const toggleMenu = () => {
    if (!menuOpen) {
      scrollYRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";

      // NEW: background sink state
      document.body.classList.add("menu-open");

      setMenuOpen(true);
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollYRef.current);

      // NEW: remove background sink state
      document.body.classList.remove("menu-open");

      setMenuOpen(false);
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    // close menu immediately using unified toggle logic
    if (menuOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className={scrolled ? "nav nav--scrolled" : "nav"}>
      <button
        className="nav-hamburger"
        onClick={toggleMenu}
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