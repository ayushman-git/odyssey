"use client";

import React from "react";
import NavButton from "./NavButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Navigation = ({ logo }) => {
  const router = useRouter();
  
  // Animation variants
  const navVariants = {
    hidden: { 
      opacity: 0,
      y: -20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="flex items-center justify-between relative z-30"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.div variants={itemVariants}>
        {logo}
      </motion.div>
      <ul className="flex space-x-4">
        <motion.li variants={itemVariants}>
          <NavButton onClick={() => console.log('Projects clicked')}>
            Projects
          </NavButton>
        </motion.li>
        <motion.li variants={itemVariants}>
          <NavButton onClick={() => {
            console.log('Blog clicked');
            router.push('/blog');
          }}>
            Blog
          </NavButton>
        </motion.li>
        <motion.li variants={itemVariants}>
          <NavButton onClick={() => console.log('Contact clicked')}>
            Contact
          </NavButton>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navigation;
