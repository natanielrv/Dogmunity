import { useEffect, useState } from "react";
import { Fab } from "@mui/material";

import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
function ModeView() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("color-scheme", "dark");
    } else {
      document.documentElement.setAttribute("color-scheme", "light");
    }
  }, [isDarkMode]);
  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? <LightModeIcon /> : <ModeNightIcon />}
      </Fab>
    </div>
  );
}

export default ModeView;
