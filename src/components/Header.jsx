import React from "react";
import "./Header.css"; // 🔥 Make sure this CSS file exists and is imported

function Header({ mode = "gojo" }) {
  return (
    <header className="py-4 text-center relative z-20">
      <h1 className={`glitch-title ${mode === "sukuna" ? "glitch-red" : "glitch-blue"}`}>
        NOVAZERO <span className="flame">🔥</span>
      </h1>
      <p className="text-whiteText/60 text-sm">Discipline from Void. Power from Habit.</p>
    </header>
  );
}

export default Header;
