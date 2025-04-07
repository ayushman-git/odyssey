"use client";

import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy code: ", err));
  };

  // Use a custom wrapper component to control overflow
  useEffect(() => {
    if (containerRef.current) {
      const preElements = containerRef.current.querySelectorAll("pre");
      preElements.forEach((pre) => {
        pre.style.overflow = "auto";
        pre.style.maxWidth = "100%";
      });

      const codeElements = containerRef.current.querySelectorAll("code");
      codeElements.forEach((code) => {
        code.style.whiteSpace = "pre";
        code.style.wordBreak = "normal";
        code.style.overflowWrap = "normal";
      });
    }
  }, [code]);

  return (
    <section
      className="my-4 rounded-md shadow-lg"
      style={{ width: "100%", maxWidth: "100%" }}
    >
      <div className="bg-gray-800 px-3 sm:px-4 py-2 text-xs text-gray-200 flex justify-between items-center">
        <span className="truncate max-w-[50%]">{language || "code"}</span>
        <button
          onClick={copyToClipboard}
          className="px-1.5 sm:px-2 py-1 rounded text-xs bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1 flex-shrink-0"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div
        ref={containerRef}
        className="relative bg-[#1a202c] rounded-b-md w-full overflow-x-auto"
        style={{ maxWidth: "100%", width: "100%" }}
      >
        <SyntaxHighlighter
          language={language}
          style={nightOwl}
          customStyle={{
            padding: "1rem",
            margin: 0,
            background: "transparent",
            fontSize: "0.75rem",
            lineHeight: "1.5",
            width: "calc(100vw - 120px)",
            display: "inline-block",
            overflowX: "auto",
          }}
          wrapLongLines={false}
          showLineNumbers={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
