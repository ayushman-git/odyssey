"use client";

import { useState, useEffect } from 'react';

// Console effect for typing text
const TypedConsole = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(typing);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, [text]);
  
  return <span>{displayText}<span className="animate-pulse">_</span></span>;
};

export default TypedConsole;
