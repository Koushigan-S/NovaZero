import React, { useEffect, useState, useRef } from "react";

const name = "NOVAZERO";
const tagline = "RISE. TRACK. TRANSCEND.";

function IntroOverlay({ show, onDone }) {
  const [typed, setTyped] = useState("");
  const [showTagline, setShowTagline] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const audioRef = useRef(null); // ✅

  useEffect(() => {
    if (!show) return;

    let i = 0;
    audioRef.current = new Audio("/type-glitch.mp3");

    const typing = setInterval(() => {
      setTyped((prev) => prev + name[i]);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      i++;
      if (i === name.length) {
        clearInterval(typing);
        setTimeout(() => setShowTagline(true), 400);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onDone(), 1000);
        }, 2800);
      }
    }, 160);

    // 🧹 Cleanup glitch sound if user navigates away early
    return () => {
      clearInterval(typing);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div
      className={`absolute inset-0 z-[60] flex flex-col items-center justify-center text-whiteText text-center pointer-events-none bg-black/60 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-4xl md:text-6xl font-bold tracking-widest flex items-center">
        <span className="mr-1">{typed}</span>
        <span className="animate-blink">|</span>
      </h1>
      {showTagline && (
        <p className="text-sm md:text-xl mt-4 text-cursedGreen tracking-widest animate-fade-in">
          {tagline}
        </p>
      )}
    </div>
  );
}

export default IntroOverlay;
