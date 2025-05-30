"use client";

import React, { forwardRef } from "react";

const NavButton = forwardRef(({ children, onClick, className = "", onMouseEnter, onMouseLeave }, ref) => {
  return (
    <button 
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`text-gray-400 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
});

NavButton.displayName = 'NavButton';

export default NavButton;
