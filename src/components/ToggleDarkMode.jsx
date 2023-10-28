import React, { useState } from "react";
import { useDarkMode } from "../features/Darkmode";

const ToggleButton = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isToggled, setIsToggled] = useState(darkMode);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle = {
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: isToggled ? "#333" : "#E8E8E8",
    color: isToggled ? "#fff" : "#333",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  };

  const sunStyle = {
    display: isToggled ? "none" : "block",
  };

  const moonStyle = {
    display: isToggled ? "block" : "none",
  };

  const handleClick = () => {
    toggleDarkMode();
    setIsToggled(!isToggled);
  };

  return (
    <div style={containerStyle}>
      <div onClick={handleClick} style={buttonStyle}>
        <span role="img" aria-label="Sun" style={sunStyle}>
          🌞
        </span>
        <span role="img" aria-label="Moon" style={moonStyle}>
          🌙
        </span>
      </div>
    </div>
  );
};

export default ToggleButton;
