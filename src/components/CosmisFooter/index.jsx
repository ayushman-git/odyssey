"use client";

import React, { useState, useEffect, useRef } from "react";
import topographyBg from "@/assets/svgs/topography.svg";
import SocialLinks from "../SocialLinks";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CosmicFooter({ variant = "default" }) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [bgLoaded, setBgLoaded] = useState(false);

  // Add mouse position tracking states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [footerDimensions, setFooterDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Theme configuration based on variant
  const themeConfig = {
    default: {
      containerClass: "rounded-2xl bg-blue-700",
      textColor: "text-white",
      dividerColor: "border-white/20",
      linkHoverColor: "hover:text-white",
      bgOpacity: "opacity-0",
      accentColor: "bg-white",
      textSecondary: "text-white/90",
      textMuted: "text-white/80"
    },
    editorial: {
      containerClass: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-black",
      textColor: "text-black dark:text-white",
      dividerColor: "border-gray-200 dark:border-gray-700",
      linkHoverColor: "hover:text-gray-700 dark:hover:text-gray-300",
      bgOpacity: "opacity-0", // No pattern for editorial
      accentColor: "bg-black dark:bg-white",
      textSecondary: "text-gray-600 dark:text-gray-400",
      textMuted: "text-gray-500 dark:text-gray-500"
    }
  };

  const theme = themeConfig[variant] || themeConfig.default;

  // Update footer dimensions on mount and resize
  useEffect(() => {
    if (!footerRef.current) return;

    const updateDimensions = () => {
      const { width, height } = footerRef.current.getBoundingClientRect();
      setFooterDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!footerRef.current || !isHovered) return;

    const { left, top } = footerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({
      x: x / footerDimensions.width - 0.5,
      y: y / footerDimensions.height - 0.5,
    });
  };

  // Lazy load the background pattern (only for default variant)
  useEffect(() => {
    if (footerInView && variant === "default") {
      const image = new Image();
      image.src = topographyBg.src;
      image.onload = () => {
        setBgLoaded(true);
      };
    }
  }, [footerInView, variant]);

  // Enhanced background pattern animation with GSAP (only for default variant)
  useEffect(() => {
    if (!footerRef.current || variant !== "default") return;

    const patternEl = footerRef.current.querySelector(".pattern-bg");
    if (!patternEl) return;

    gsap.to(patternEl, {
      opacity: isHovered ? 0.4 : 0,
      scale: isHovered ? 1.1 : 1,
      duration: 0.4,
      ease: "power2.inOut",
    });

    if (isHovered) {
      gsap.to(patternEl, {
        x: mousePosition.x * 25,
        y: mousePosition.y * 25,
        duration: 0.8,
        ease: "power1.out",
      });
    }
  }, [isHovered, mousePosition.x, mousePosition.y, variant]);

  // Animate content when in view
  useEffect(() => {
    if (footerInView) {
      controls.start("visible");
    }
  }, [controls, footerInView]);

  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const footerVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    hover: { scale: 1.0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Map navigation items to their corresponding routes or section IDs
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#my-stack" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className="h-auto relative z-20 max-w-7xl mx-auto">
      <motion.footer
        ref={footerRef}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={footerVariants}
        className={`${theme.containerClass} relative overflow-hidden p-5 sm:p-8 lg:p-12 mt-12 mb-6 ${
          variant === "editorial" ? "transition-all duration-300" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Background div with repeating pattern - only for default variant */}
        {variant === "default" && (
          <div
            className={`pattern-bg absolute inset-0 w-full h-full ${theme.bgOpacity}`}
            style={{
              backgroundImage: bgLoaded ? `url(${topographyBg.src})` : "none",
              backgroundRepeat: "repeat",
              backgroundSize: "400px 400px",
              mixBlendMode: "soft-light",
              transformOrigin: "center center",
              willChange: "transform, opacity",
            }}
          />
        )}

        <div className={`relative z-10 ${theme.textColor}`}>
          {/* Main Content Section - Streamlined */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mb-10"
          >
            {/* Location Info */}
            <motion.div variants={itemVariants}>
              <motion.h3
                variants={itemVariants}
                className={`text-xl ${variant === "editorial" ? "font-light" : "font-bold"} mb-4 tracking-tight`}
              >
                Location
              </motion.h3>
              <motion.address
                variants={containerVariants}
                className={`not-italic text-sm ${theme.textSecondary}`}
              >
                <motion.p
                  variants={itemVariants}
                  className="leading-relaxed"
                >
                  Based in{" "}
                  <span className={`${theme.textColor} ${variant === "editorial" ? "font-normal" : "font-medium"}`}>
                    New Delhi, India
                  </span>
                </motion.p>
              </motion.address>
            </motion.div>

            {/* Navigation Links Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                variants={itemVariants}
                className={`text-xl ${variant === "editorial" ? "font-light" : "font-bold"} mb-4 tracking-tight`}
              >
                Navigate
              </motion.h3>
              <motion.ul
                variants={containerVariants}
                className={`space-y-2 text-sm ${theme.textSecondary}`}
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={i}
                    className="relative flex items-center group"
                  >
                    <span
                      className={`absolute left-0 w-0 h-[2px] ${theme.accentColor} rounded-full opacity-0 
                      group-hover:w-2 group-hover:opacity-100 transition-all duration-300 ease-out`}
                    />
                    <Link
                      href={item.href}
                      className={`${theme.linkHoverColor} inline-block py-1 pl-0 
                      group-hover:pl-3 transition-all duration-300 ease-in-out transform
                      text-left cursor-pointer ${variant === "editorial" ? "font-light" : ""}`}
                      style={{ transformOrigin: "left center" }}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Connect Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                variants={itemVariants}
                className={`text-xl ${variant === "editorial" ? "font-light" : "font-bold"} mb-4 tracking-tight`}
              >
                Connect
              </motion.h3>
              
              {/* Social Links */}
              <motion.div variants={itemVariants} className="mb-4">
                <SocialLinks variant={variant} />
              </motion.div>
              
              <motion.p variants={itemVariants} className={`text-sm ${theme.textSecondary} ${variant === "editorial" ? "font-light" : ""}`}>
                Feel free to reach out through social media
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={controls}
            className={`pt-6 border-t ${theme.dividerColor} flex flex-col sm:flex-row justify-between items-center`}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { delay: 0.7 },
                },
              }}
              className={`text-sm ${theme.textMuted} ${variant === "editorial" ? "font-light font-mono" : "font-medium"}`}
            >
              © {currentYear} {variant === "editorial" ? "Odyssey | " : ""}Ayushman Gupta. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: { delay: 0.8 },
                },
              }}
              className="mt-4 sm:mt-0"
            >
              <p className={`text-sm ${theme.textMuted} ${variant === "editorial" ? "font-light" : ""}`}>
                Designed & Built with {variant === "editorial" ? "⚡" : "❤️"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default CosmicFooter;
