import { useEffect, useRef } from "react";
import "./FilmNoise.css";

export default function FilmNoise() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    window.addEventListener("resize", resize);

    const draw = () => {

      const w = canvas.width;
      const h = canvas.height;

      const imageData = ctx.createImageData(w, h);

      const data = imageData.data;

      for(let i=0;i<data.length;i+=4){

        const v = Math.random()*255 | 0;

        data[i]   = v;
        data[i+1] = v*0.7 | 0;
        data[i+2] = v*0.5 | 0;

        data[i+3] = Math.random()*40 | 0;
      }

      ctx.putImageData(imageData,0,0);

      frameId=requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize",resize);
    };

  },[]);

  return (
    <canvas
      ref={canvasRef}
      className="film-noise"
    />
  );
}