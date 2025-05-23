"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggler = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <>
      {mounted ? (
        <button
          className="theme-toggle"
          data-theme={resolvedTheme}
          id="theme-toggle"
          title="Toggles light & dark"
          aria-label={resolvedTheme}
          aria-live="polite"
          onClick={handleThemeToggler}
        >
          <svg
            className="sun-and-moon"
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <mask className="moon" id="moon-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle cx="24" cy="10" r="6" fill="black" />
            </mask>
            <circle
              className="sun"
              cx="12"
              cy="12"
              r="6"
              mask="url(#moon-mask)"
              fill="currentColor"
            />
            <g className="sun-beams" stroke="currentColor">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
        </button>
      ) : null}
    </>
  );
}

export default ThemeSwitch;
