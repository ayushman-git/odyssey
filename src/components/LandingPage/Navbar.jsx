"use client";

import React, { useEffect } from "react";
import Logo from "../Logo";
import { motion } from "framer-motion";
import ThemeSwitch from "../ThemeSwitch";
import { useTheme } from "next-themes";

function Navbar() {
  const { resolvedTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Navigation items - removed as requested
  const navItems = [];

  // Wait until the theme is resolved
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, don't apply theme-specific styles yet
  if (!mounted) {
    return null; // Or return a loading spinner, placeholder, etc.
  }

  return (
    <motion.nav
      initial={{ opacity: 0, translateY: -40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background:
          resolvedTheme === "dark"
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.4)",
      }}
      className="backdrop-blur-md sticky top-0 z-40 grid place-items-center border-b border-b-gray-300 dark:border-b-gray-700 py-4 px-8 items-center w-full"
    >
      <div className="max-w-screen-xl w-full flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center">
          <ThemeSwitch />
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
