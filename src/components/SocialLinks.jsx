import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { gsap } from 'gsap';

const SocialLinks = () => {
  const linksRef = useRef([]);
  
  useEffect(() => {
    // Subtle pulsing animation for links
    linksRef.current.forEach((link, index) => {
      gsap.to(link, {
        y: -3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2, // Stagger the animations
      });
    });
    
    // Clean up animations on component unmount
    return () => {
      linksRef.current.forEach((link) => {
        gsap.killTweensOf(link);
      });
    };
  }, []);

  const handleLinkHover = (index, isEntering) => {
    gsap.to(linksRef.current[index], {
      scale: isEntering ? 1.2 : 1,
      color: isEntering ? "#ffffff" : "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const links = [
    { icon: <FaGithub size={20} />, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter size={20} />, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <FaEnvelope size={20} />, href: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <div className="flex items-center space-x-6">
      {links.map((link, index) => (
        <a 
          key={index}
          ref={(el) => (linksRef.current[index] = el)}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-300"
          aria-label={link.label}
          onMouseEnter={() => handleLinkHover(index, true)}
          onMouseLeave={() => handleLinkHover(index, false)}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
