"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Newsletter({ variant = "default" }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', 'duplicate'

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

  // Status messages
  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return { text: 'Successfully subscribed!', color: 'text-green-500' };
      case 'duplicate':
        return { text: 'Already subscribed!', color: 'text-yellow-500' };
      case 'error':
        return { text: 'Something went wrong. Please try again.', color: 'text-red-500' };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  // Auto-clear status messages after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          userAgent: navigator.userAgent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail(''); // Clear the input on success
      } else {
        if (response.status === 409 || data.type === 'duplicate') {
          setStatus('duplicate');
        } else {
          console.error('Newsletter subscription error:', data.error);
          setStatus('error');
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
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
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
          <motion.input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className={`flex-1 px-3 py-2 text-sm rounded-md border transition-all duration-200 
              ${theme.inputClass} ${theme.focusRing} focus:ring-2 focus:outline-none
              ${variant === "editorial" ? "font-light" : ""} 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileFocus={{ scale: isLoading ? 1 : 1.02 }}
            transition={{ duration: 0.2 }}
          />
          
          <motion.button
            type="submit"
            disabled={isLoading || !email}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 
              ${theme.buttonClass} ${variant === "editorial" ? "font-light" : ""}
              ${isLoading || !email ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={isLoading || !email ? {} : { scale: 1.05 }}
            whileTap={isLoading || !email ? {} : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </motion.button>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs ${statusMessage.color} ${variant === "editorial" ? "font-light" : ""}`}
          >
            {statusMessage.text}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default Newsletter;
