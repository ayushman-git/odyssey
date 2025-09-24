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


  return (
    <div className="w-full max-w-full overflow-hidden" style={{ minWidth: 0 }}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="my-4 sm:my-6 rounded-xl sm:rounded-2xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full" style={{ minWidth: 0 }}
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-muted via-muted to-muted/80 px-2 sm:px-3 md:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-border min-h-[40px] sm:min-h-[44px]" style={{ minWidth: 0 }}>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground truncate flex-1 min-w-0 mr-1 sm:mr-2">
            {language || "code"}
          </span>
        
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
            className="group relative px-3 py-2 rounded-lg text-xs font-medium bg-background/80 hover:bg-background/90 border border-border/50 hover:border-border/70 backdrop-blur-md transition-all duration-150 flex items-center gap-2 flex-shrink-0 min-w-0 shadow-sm hover:shadow-md"
            aria-label="Copy code to clipboard"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              initial={false}
              animate={{ opacity: copied ? 0.2 : 0 }}
              transition={{ duration: 0.15 }}
            />
            
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -5 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 800, 
                    damping: 25,
                    duration: 0.1 
                  }}
                  className="flex items-center gap-2 text-emerald-500"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 1000, 
                      damping: 20,
                      delay: 0.05 
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                  <motion.span 
                    className="hidden sm:inline font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Copied!
                  </motion.span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 600, 
                    damping: 20 
                  }}
                  className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-100"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 600, damping: 20 }}
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </motion.svg>
                  <span className="hidden sm:inline font-medium">Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={copied ? { scale: 1.5, opacity: [0, 0.3, 0] } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.button>
        </div>

        {/* Code content */}
        <div
          ref={containerRef}
          className="relative bg-gradient-to-br from-card via-card to-card/90 w-full overflow-x-auto p-4"
          style={{ minWidth: 0 }}
        >
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              padding: 0,
              margin: 0,
              background: "transparent",
              fontSize: "0.75rem",
              lineHeight: "1.4",
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
              color: "hsl(var(--card-foreground))",
              minWidth: 0,
              wordBreak: "break-all"
            }}
            wrapLongLines={true}
            showLineNumbers={false}
            PreTag={({ children, ...props }) => (
              <pre {...props} style={{
                margin: 0,
                padding: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                minWidth: 0
              }}>
                {children}
              </pre>
            )}
            CodeTag={({ children, ...props }) => (
              <code {...props} style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                minWidth: 0
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