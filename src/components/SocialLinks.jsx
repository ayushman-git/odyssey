import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaBehance, FaMedium, FaEnvelope } from "react-icons/fa";
import { gsap } from "gsap";
import { Snackbar, Alert } from "@mui/material";

const SocialLinks = () => {
  const linksRef = useRef([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const emailAddress = "ayushman.gupta308@gmail.com";

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
      ease: "power2.out",
    });
  };

  const handleEmailClick = (e) => {
    // For the email link only, intercept the click
    if (e.currentTarget.getAttribute('aria-label') === 'Email') {
      e.preventDefault();
      
      // Copy email to clipboard
      navigator.clipboard.writeText(emailAddress)
        .then(() => {
          setOpenSnackbar(true);
          
          // After showing the toast, still navigate to the mailto link
          setTimeout(() => {
            window.location.href = `mailto:${emailAddress}`;
          }, 500);
        })
        .catch(err => {
          console.error('Failed to copy email: ', err);
          // If copying fails, just open the mailto link
          window.location.href = `mailto:${emailAddress}`;
        });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const links = [
    {
      icon: <FaGithub size={20} />,
      href: "https://github.com/ayushman-git",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin size={20} />,
      href: "https://www.linkedin.com/in/ayushman-git",
      label: "LinkedIn",
    },
    {
      icon: <FaBehance size={20} />,
      href: "https://www.behance.net/duoro",
      label: "Behance",
    },
    {
      icon: <FaMedium size={20} />,
      href: "https://medium.com/@duoro",
      label: "Medium",
    },
    {
      icon: <FaEnvelope size={20} />,
      href: "mailto:ayushman.gupta308@gmail.com",
      label: "Email",
    },
  ];

  return (
    <>
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
            onClick={handleEmailClick}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Email copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SocialLinks;
