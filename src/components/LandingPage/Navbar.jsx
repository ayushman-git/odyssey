"use client";

import React from "react";
import Logo from "../Logo";

import { motion } from "framer-motion";
import ThemeSwitch from "../ThemeSwitch";

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, translateY: -40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      className="grid place-items-center border-b-gray-300 dark:border-b-gray-700 border-b py-4 px-8 items-center w-full"
    >
      <div className="max-w-screen-md w-full flex items-center justify-between">
        <Logo />
        <ThemeSwitch />
      </div>
    </motion.nav>
  );
}

export default Navbar;
