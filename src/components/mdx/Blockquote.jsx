import React from "react";

export default function Blockquote({ children }) {
    console.log({children})
  return (
    <blockquote className="border-l-2 border-green-600 bg-slate-200 italic">
      {children}
    </blockquote>
  );
}
