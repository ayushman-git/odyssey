"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function Newsletter({ variant = "default" }) {
  const [email, setEmail] = useState("");

  // Theme configuration based on variant
  const themeConfig = {
    default: {
      inputClass: "bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40",
      buttonClass: "bg-white text-blue-700 hover:bg-white/90",
      textColor: "text-white/90",
      focusRing: "focus:ring-white/20"
    },
    editorial: {
      inputClass: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-gray-400 dark:focus:border-gray-500",
      buttonClass: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100",
      textColor: "text-gray-600 dark:text-gray-400",
      focusRing: "focus:ring-gray-200 dark:focus:ring-gray-600"
    }
  };

  const theme = themeConfig[variant] || themeConfig.default;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add newsletter subscription functionality
    console.log("Newsletter subscription:", email);
  };

  return (
    <div className="w-full max-w-sm">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p 
          className={`text-sm ${theme.textColor} mb-3 ${variant === "editorial" ? "font-light" : ""}`}
        >
          Stay updated with latest posts
        </motion.p>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <motion.input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 px-3 py-2 text-sm rounded-md border transition-all duration-200 
              ${theme.inputClass} ${theme.focusRing} focus:ring-2 focus:outline-none
              ${variant === "editorial" ? "font-light" : ""}`}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          
          <motion.button
            type="submit"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 
              ${theme.buttonClass} ${variant === "editorial" ? "font-light" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Newsletter;
