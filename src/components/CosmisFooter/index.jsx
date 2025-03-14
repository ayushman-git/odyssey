"use client";

import React, { useState, useEffect, useRef } from "react";
import topographyBg from "@/assets/svgs/topography.svg";
import SocialLinks from "../SocialLinks";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSectionWithId } from "@/utils";
import { useRouter } from "next/navigation";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CosmicFooter() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  // Add mouse position tracking states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [footerDimensions, setFooterDimensions] = useState({
    width: 0,
    height: 0,
  });

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

  // Enhanced background pattern animation with GSAP
  useEffect(() => {
    if (!footerRef.current) return;

    const patternEl = footerRef.current.querySelector(".pattern-bg");

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
  }, [isHovered, mousePosition.x, mousePosition.y]);

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

  // Handle navigation action based on item type
  const handleNavigation = (item) => {
    if (item.id === "home") {
      // For home, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.id === "blog") {
      // For blog, navigate to blog page
      router.push("/blog");
    } else {
      // For other items, scroll to their section IDs
      scrollToSectionWithId(item.id);
    }
  };

  // Map navigation items to their corresponding section IDs or actions
  const navItems = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "my-stack" },
    { name: "Blog", id: "blog" },
  ];

  return (
    <div className="h-auto relative z-20 max-w-7xl mx-auto">
      <motion.footer
        ref={footerRef}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={footerVariants}
        className="rounded-2xl bg-blue-700 relative overflow-hidden p-5 sm:p-8 lg:p-12 mt-12 mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Background div with repeating pattern */}
        <div
          className="pattern-bg absolute inset-0 w-full h-full opacity-0"
          style={{
            backgroundImage: `url(${topographyBg.src})`,
            backgroundRepeat: "repeat",
            backgroundSize: "400px 400px",
            mixBlendMode: "soft-light",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        />

        <div className="relative z-10 text-white">
          {/* Header Section - Simplified */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="text-center mb-10"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold tracking-tight"
            >
              Thanks for visiting!
            </motion.h2>
          </motion.div>

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
                className="text-xl font-bold mb-4 tracking-tight"
              >
                Location
              </motion.h3>
              <motion.address
                variants={containerVariants}
                className="not-italic text-sm text-white/90"
              >
                <motion.p
                  variants={itemVariants}
                  className="leading-relaxed"
                >
                  Based in{" "}
                  <span className="text-white font-medium">
                    New Delhi, India
                  </span>
                </motion.p>
              </motion.address>
            </motion.div>

            {/* Navigation Links Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                variants={itemVariants}
                className="text-xl font-bold mb-4 tracking-tight"
              >
                Navigate
              </motion.h3>
              <motion.ul
                variants={containerVariants}
                className="space-y-2 text-sm text-white/90"
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={i}
                    className="relative flex items-center group"
                  >
                    <span
                      className="absolute left-0 w-0 h-[2px] bg-white rounded-full opacity-0 
                      group-hover:w-2 group-hover:opacity-100 transition-all duration-300 ease-out"
                    />
                    <button
                      onClick={() => handleNavigation(item)}
                      className="hover:text-white inline-block py-1 pl-0 
                      group-hover:pl-3 transition-all duration-300 ease-in-out transform
                      text-left cursor-pointer"
                      style={{ transformOrigin: "left center" }}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Connect Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                variants={itemVariants}
                className="text-xl font-bold mb-4 tracking-tight"
              >
                Connect
              </motion.h3>
              
              {/* Social Links */}
              <motion.div variants={itemVariants} className="mb-4">
                <SocialLinks />
              </motion.div>
              
              <motion.p variants={itemVariants} className="text-sm text-white/90">
                Feel free to reach out through social media
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={controls}
            className="pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center"
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
              className="text-sm text-white/80 font-medium"
            >
              © {currentYear} Ayushman Gupta. All rights reserved.
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
              <p className="text-sm text-white/80">Designed & Built with ❤️</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default CosmicFooter;
