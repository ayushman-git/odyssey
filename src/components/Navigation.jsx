"use client";

import React, { useState, useEffect, useRef } from "react";
import NavButton from "./NavButton";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { scrollToSectionWithId } from "@/utils";
import { gsap } from "gsap";

const Navigation = ({ logo, contactRef }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const blogButtonRef = useRef(null);
  const mobileBlogButtonRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = (action) => {
    setIsOpen(false); // Close menu when item is clicked
    action();
  };

  // GSAP hover animations for blog button
  const handleBlogHover = (ref) => {
    gsap.to(ref.current, {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleBlogLeave = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Animation variants
  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.nav
      className="flex items-center justify-between relative z-30"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.div variants={itemVariants}>{logo}</motion.div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <ul className="flex space-x-4">
          <motion.li variants={itemVariants}>
            <NavButton onClick={() => scrollToSectionWithId("about")}>
              About
            </NavButton>
          </motion.li>

          <motion.li variants={itemVariants}>
            <NavButton onClick={() => scrollToSectionWithId("my-stack")}>
              Skills
            </NavButton>
          </motion.li>
          <motion.li variants={itemVariants}>
            <NavButton
              ref={blogButtonRef}
              onClick={() => {
                router.push("/blog");
              }}
              onMouseEnter={() => handleBlogHover(blogButtonRef)}
              onMouseLeave={() => handleBlogLeave(blogButtonRef)}
              className="!bg-white !text-gray-900 !hover:bg-white !hover:text-gray-900 font-semibold px-6 py-2 rounded-full shadow-sm"
            >
              Blog
            </NavButton>
          </motion.li>
        </ul>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <motion.div
          variants={itemVariants}
          className="z-40"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HamburgerIcon isOpen={isOpen} />
        </motion.div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-30"
          >
            <motion.ul className="flex flex-col items-center space-y-6">
              <motion.li variants={itemVariants}>
                <NavButton
                  onClick={() =>
                    handleNavClick(() => scrollToSectionWithId("about"))
                  }
                  className="text-xl"
                >
                  About
                </NavButton>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavButton
                  onClick={() =>
                    handleNavClick(() => scrollToSectionWithId("my-stack"))
                  }
                  className="text-xl"
                >
                  Skills
                </NavButton>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavButton
                  ref={mobileBlogButtonRef}
                  onClick={() => handleNavClick(() => router.push("/blog"))}
                  onMouseEnter={() => handleBlogHover(mobileBlogButtonRef)}
                  onMouseLeave={() => handleBlogLeave(mobileBlogButtonRef)}
                  className="text-xl !bg-white !text-gray-900 !hover:bg-white !hover:text-gray-900 font-semibold px-6 py-2 rounded-full shadow-sm"
                >
                  Blog
                </NavButton>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hamburger Icon Component
const HamburgerIcon = ({ isOpen }) => {
  return (
    <div className="w-5 h-5 flex flex-col justify-between cursor-pointer">
      <motion.div
        className="w-full h-0.5 bg-white"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-full h-0.5 bg-white"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-full h-0.5 bg-white"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default Navigation;
