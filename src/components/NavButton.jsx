"use client";

import React from "react";

const NavButton = ({ children, onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`text-gray-400 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default NavButton;
