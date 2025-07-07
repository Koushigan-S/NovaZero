import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TabsRouter from "./components/TabsRouter";
import Snowfall from "./components/Snowfall";

import useNightMode from "./utils/useNightMode";
import "./index.css";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [mode, setMode] = useState("gojo"); // or 'sukuna'
  const [showTyping, setShowTyping] = useState(false);

  useNightMode(); // Adds .night-mode class to <body> at night

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowTyping(true);
      const audio = new Audio("/type-glitch.mp3");
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }, 1500);

    const timer2 = setTimeout(() => {
      setShowIntro(false);
    }, 4800); // match with intro video length

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-blackBg text-whiteText transition-all duration-300 overflow-hidden">

      {/* ❄️ Snowfall effect (below everything) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Snowfall
          snowflakeCount={80}
          color="white"
          style={{ opacity: 0.65 }}
        />
      </div>

      {/* 🎬 Intro Video Overlay */}
      {showIntro && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
          <video
            src={mode === "sukuna" ? "/sukuna-intro.mp4" : "/gojo-intro.mp4"}
            className="w-full h-full object-cover"
            autoPlay
            muted={false}
            playsInline
          />
          {showTyping && (
            <div className="absolute bottom-10 text-center text-whiteText font-mono text-2xl tracking-widest typing-glitch">
              NOVAZE<span className="animate-cursor">|</span>
            </div>
          )}
        </div>
      )}

      {/* 🌌 Main App Content */}
      {!showIntro && (
        <div className="relative z-10">
          <Header mode={mode} />
          <TabsRouter />
        </div>
      )}
    </div>
  );
}

export default App;
