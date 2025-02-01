import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  // const { darkMode, setDarkMode } = useTheme();

  const [darkMode, setDarkMode] = useState();


  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;
