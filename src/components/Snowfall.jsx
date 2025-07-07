import React, { useEffect } from "react";
import "./Snowfall.css";

const Snowfall = () => {
  useEffect(() => {
    const snowflakes = document.createElement("div");
    snowflakes.className = "custom-snowfall";
    document.body.appendChild(snowflakes);

    return () => {
      document.body.removeChild(snowflakes);
    };
  }, []);

  return null;
};

export default Snowfall;
