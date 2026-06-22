// Nav.jsx
import { useState, useEffect, useRef } from "react";
import "./Nav.css";

const LINKS      = ["films", "texts", "design", "studies", "about", "contact"];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function NavLink({ id, active, onClick }) {
  return (
    <li key={id}>
      <a
        href={`#${id}`}
        onClick={(e) => onClick(e, id)}
        className={active === id ? "nav-link--active" : ""}
      >
        {capitalize(id)}
      </a>
    </li>
  );
}

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const sectionsRef = useRef([]);
  const scrollYRef  = useRef(0);

  useEffect(() => {
    sectionsRef.current = LINKS.map((id) => document.getElementById(id)).filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = "";
      sectionsRef.current.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) current = section.id;
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
  scrollYRef.current = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top      = `-${window.scrollY}px`;
  document.body.style.width    = "100%";
  document.body.classList.add("menu-open");
  setMenuOpen(true);
};

const closeMenu = () => {
  document.body.style.position = "";
  document.body.style.top      = "";
  document.body.style.width    = "";
  window.scrollTo(0, scrollYRef.current);
  document.body.classList.remove("menu-open");
  setMenuOpen(false);
};

const toggleMenu = () => {
  console.log("toggleMenu clicked, current state:", menuOpen);

  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

  const handleClick = (e, id) => {
  e.preventDefault();
  if (menuOpen) closeMenu();
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  });
};

  return (
    <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <button
        type="button"
        className="nav-hamburger"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu();
        }}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <a href="#hero" className="nav-name" onClick={(e) => handleClick(e, "hero")}>
        Ryo Oshima
      </a>

      <ul className="nav-links">
        {LINKS.map((id) => <NavLink key={id} id={id} active={active} onClick={handleClick} />)}
      </ul>

      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        <ul>
          {LINKS.map((id) => <NavLink key={id} id={id} active={active} onClick={handleClick} />)}
        </ul>
      </div>
    </nav>
  );
}