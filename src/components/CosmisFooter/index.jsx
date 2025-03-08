"use client";

import React, { useState, useEffect, useRef } from "react";
import topographyBg from "@/assets/svgs/topography.svg";
import SocialLinks from "../SocialLinks";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CosmicFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  // Add mouse position tracking states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [footerDimensions, setFooterDimensions] = useState({ width: 0, height: 0 });

  // Update footer dimensions on mount and resize
  useEffect(() => {
    if (!footerRef.current) return;
    
    const updateDimensions = () => {
      const { width, height } = footerRef.current.getBoundingClientRect();
      setFooterDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!footerRef.current || !isHovered) return;
    
    const { left, top } = footerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Convert position to percentages for easier translation calculation
    setMousePosition({
      x: (x / footerDimensions.width) - 0.5,  // -0.5 to 0.5
      y: (y / footerDimensions.height) - 0.5  // -0.5 to 0.5
    });
  };
  
  // Enhanced background pattern animation with GSAP, now including mouse position
  useEffect(() => {
    if (!footerRef.current) return;
    
    const patternEl = footerRef.current.querySelector('.pattern-bg');
    
    // Apply opacity and scale based on hover state
    gsap.to(patternEl, { 
      opacity: isHovered ? 0.4 : 0,
      scale: isHovered ? 1.1 : 1,
      duration: 0.4,
      ease: "power2.inOut"
    });
    
    // Apply position based on mouse position
    if (isHovered) {
      gsap.to(patternEl, {
        x: mousePosition.x * 25, // Move by up to 25px in each direction
        y: mousePosition.y * 25,
        duration: 0.8,
        ease: "power1.out"
      });
    }
  }, [isHovered, mousePosition.x, mousePosition.y]);
  
  // Animate content when in view
  useEffect(() => {
    if (footerInView) {
      controls.start('visible');
    }
  }, [controls, footerInView]);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  // Add footer scale animation
  const footerVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    hover: { scale: 1.01, transition: { duration: 0.4, ease: "easeOut" } }
  };

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
        {/* Background div with repeating pattern - updated for mouse tracking */}
        <div
          className="pattern-bg absolute inset-0 w-full h-full opacity-0"
          style={{
            backgroundImage: `url(${topographyBg.src})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
            mixBlendMode: "soft-light",
            transformOrigin: "center center",
            willChange: "transform, opacity"
          }}
        />
        
        <div className="relative z-10 text-white">
          {/* Main Content Section - Streamlined */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-10"
          >
            {/* Social Links Column */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                variants={itemVariants}
                className="text-xl font-bold mb-4 tracking-tight"
              >
                Connect
              </motion.h3>
              <motion.div variants={itemVariants}>
                <SocialLinks className="mt-2" />
              </motion.div>
              <motion.address 
                variants={containerVariants}
                className="not-italic text-sm text-white/90 mt-4"
              >
                <motion.p variants={itemVariants} className="leading-relaxed">
                  Email: <a href="mailto:hello@yourname.com" className="text-white hover:underline transition-colors">hello@yourname.com</a>
                </motion.p>
                <motion.p variants={itemVariants} className="leading-relaxed mt-1">
                  Based in <span className="text-white font-medium">San Francisco, CA</span>
                </motion.p>
              </motion.address>
            </motion.div>
            
            {/* Portfolio Links Column */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                variants={itemVariants}
                className="text-xl font-bold mb-4 tracking-tight"
              >
                Portfolio
              </motion.h3>
              <motion.ul 
                variants={containerVariants}
                className="space-y-2 text-sm text-white/90"
              >
                {["Home", "Projects", "Skills & Expertise", "Resume", "Blog"].map((item, i) => (
                  <motion.li 
                    key={item} 
                    variants={itemVariants}
                    custom={i}
                    className="relative flex items-center group"
                  >
                    <span 
                      className="absolute left-0 w-0 h-[2px] bg-white rounded-full opacity-0 
                      group-hover:w-3 group-hover:opacity-100 transition-all duration-300 ease-out"
                    />
                    <Link 
                      href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+&\s+|\s+/g, "-")}`} 
                      className="hover:text-white inline-block py-1 pl-0 
                      group-hover:pl-5 transition-all duration-300 ease-in-out transform"
                      style={{ transformOrigin: "left center" }}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            {/* Contact Form Mini */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                variants={itemVariants}
                className="text-xl font-bold mb-4 tracking-tight"
              >
                Get In Touch
              </motion.h3>
              <motion.form 
                variants={itemVariants}
                onSubmit={handleSubscribe} 
                className="space-y-2"
              >
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Start a Conversation
                </motion.button>
              </motion.form>
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
                  transition: { delay: 0.7 }
                }
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
                  transition: { delay: 0.8 }
                }
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
