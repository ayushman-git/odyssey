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
        pre.style.width = "100%";
        pre.style.minWidth = "0";
        pre.style.boxSizing = "border-box";
      });

      const codeElements = containerRef.current.querySelectorAll("code");
      codeElements.forEach((code) => {
        code.style.whiteSpace = "pre";
        code.style.wordBreak = "normal";
        code.style.overflowWrap = "normal";
        code.style.minWidth = "0";
        code.style.display = "block";
        code.style.width = "100%";
        code.style.maxWidth = "100%";
        code.style.boxSizing = "border-box";
      });

      // Force container to respect parent width
      containerRef.current.style.maxWidth = "100%";
      containerRef.current.style.width = "100%";
      containerRef.current.style.boxSizing = "border-box";
    }
  }, [code]);

  return (
    <div 
      className="w-full max-w-full overflow-hidden"
      style={{ 
        maxWidth: "100%", 
        width: "100%", 
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="my-4 sm:my-6 rounded-xl sm:rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-full"
        style={{ 
          maxWidth: "100%", 
          width: "100%", 
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-border min-h-[40px] sm:min-h-[44px]">
          <span className="text-xs sm:text-sm font-medium text-gray-200 truncate flex-1 min-w-0 mr-1 sm:mr-2">
            {language || "code"}
          </span>
        
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-medium bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-200 flex items-center gap-1 sm:gap-2 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm flex-shrink-0 min-w-0"
            aria-label="Copy code to clipboard"
          >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 sm:gap-2 text-green-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Copied!</span>
                <span className="sm:hidden">✓</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 sm:gap-2 text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                <span className="hidden sm:inline">Copy</span>
                <span className="sm:hidden">📋</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

        {/* Code content */}
        <div
          ref={containerRef}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-4"
          style={{ 
            maxWidth: "100%", 
            width: "100%", 
            boxSizing: "border-box",
            overflow: "auto"
          }}
        >
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              padding: "0 !important",
              margin: 0,
              background: "transparent",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              width: "100%",
              display: "block",
              overflowX: "auto",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
              minWidth: "0",
              maxWidth: "100%",
            }}
            wrapLongLines={false}
            showLineNumbers={false}
            PreTag={({ children, ...props }) => (
              <pre {...props} className="overflow-x-auto w-full max-w-full" style={{ 
                margin: 0, 
                padding: 0,
                maxWidth: "100%",
                width: "100%",
                overflow: "auto",
                boxSizing: "border-box"
              }}>
                {children}
              </pre>
            )}
            CodeTag={({ children, ...props }) => (
              <code {...props} style={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                overflow: "auto",
                whiteSpace: "pre",
                wordBreak: "normal",
                boxSizing: "border-box"
              }}>
                {children}
              </code>
            )}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.section>
    </div>
  );
}
