import { useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import About from "./components/About";
import Films from "./components/Films";
import Texts from "./components/Texts";
import Studies from "./components/Studies";
import Design from "./components/Design";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FilmNoise from "./components/FilmNoise";
import Cursor from "./components/Cursor";
import Progress from "./components/Progress";
import Spotlight from "./components/Spotlight";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Cursor />
      <Spotlight />
      <div className="dust-overlay" />
      <Spotlight />
      <Progress />
      <FilmNoise />
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <Nav />
      <main>
        <Hero />
        <Films />
        <Texts />
        <Design />
        <Studies />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
