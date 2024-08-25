"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

function CustomThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
