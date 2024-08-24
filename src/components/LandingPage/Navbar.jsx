"use client";

import React from "react";
import Logo from "../Logo";

import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, translateY: -40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      className="grid place-items-center border-b-2 py-4 px-8 items-center w-full"
    >
      <div className="max-w-screen-md w-full">
        <Logo />
      </div>
    </motion.nav>
  );
}

export default Navbar;
