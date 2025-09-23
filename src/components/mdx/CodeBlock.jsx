"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="my-6 rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      style={{ width: "100%", maxWidth: "100%" }}
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 px-4 py-3 flex justify-between items-center border-b border-border">
        <span className="text-sm font-medium text-gray-200 truncate max-w-[50%]">
          {language || "code"}
        </span>
        <div className="flex items-center gap-3">


        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-200 flex items-center gap-2 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm"
          aria-label="Copy code to clipboard"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 text-green-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code content */}
      <div
        ref={containerRef}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full overflow-x-auto"
        style={{ maxWidth: "100%", width: "100%" }}
      >
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            padding: "1.5rem",
            margin: 0,
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
            width: "100%",
            display: "block",
            overflowX: "auto",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
          }}
          wrapLongLines={false}
          showLineNumbers={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </motion.section>
  );
}
