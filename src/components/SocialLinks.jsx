"use client";

import React, { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const BehanceIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.519 1.87 1.544 1.87.845 0 1.369-.522 1.49-1.029l2.722.188zM19 13.4c-.114-.457-.343-.857-.686-1.2-.343-.343-.857-.514-1.543-.514-.571 0-1.057.171-1.457.514-.4.343-.629.743-.686 1.2H19zM4.108 5H11.1c3.006 0 4.585 1.208 4.585 3.252 0 1.755-.96 2.745-2.166 3.125 1.526.392 2.498 1.51 2.498 3.315C16 17.039 14.256 19 10.896 19H0V5h4.108zm.891 5.356h3.057c.457 0 .886-.057 1.286-.171.4-.114.743-.286 1.029-.514.286-.229.514-.514.686-.857.171-.343.257-.743.257-1.2 0-.886-.286-1.543-.857-1.971-.571-.429-1.343-.643-2.314-.643H5v5.356zm0 5.63h3.571c.514 0 1-.057 1.457-.171.457-.114.857-.286 1.2-.514.343-.229.614-.543.814-.943.2-.4.3-.886.3-1.457 0-1.029-.314-1.8-.943-2.314-.629-.514-1.5-.771-2.614-.771H5v6.17z" />
  </svg>
);

const MediumIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SocialLinks = ({ variant = "default" }) => {
  const [showToast, setShowToast] = useState(false);
  const emailAddress = "ayushman.gupta308@gmail.com";

  const themeConfig = {
    default: {
      textColor: "text-white",
      hoverColor: "hover:text-white/80",
    },
    editorial: {
      textColor: "text-gray-600 dark:text-gray-400",
      hoverColor: "hover:text-black dark:hover:text-white",
    }
  };

  const theme = themeConfig[variant] || themeConfig.default;

  const handleEmailClick = (e) => {
    if (e.currentTarget.getAttribute('aria-label') === 'Email') {
      e.preventDefault();
      navigator.clipboard.writeText(emailAddress)
        .then(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          setTimeout(() => {
            window.location.href = `mailto:${emailAddress}`;
          }, 500);
        })
        .catch(() => {
          window.location.href = `mailto:${emailAddress}`;
        });
    }
  };

  const links = [
    {
      icon: Github,
      href: "https://github.com/ayushman-git",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ayushman-git",
      label: "LinkedIn",
    },
    {
      icon: BehanceIcon,
      href: "https://www.behance.net/duoro",
      label: "Behance",
    },
    {
      icon: MediumIcon,
      href: "https://medium.com/@duoro",
      label: "Medium",
    },
    {
      icon: Mail,
      href: "mailto:ayushman.gupta308@gmail.com",
      label: "Email",
    },
  ];

  return (
    <>
      <div className="flex items-center space-x-6">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.textColor} ${theme.hoverColor} transition-colors duration-300`}
              aria-label={link.label}
              onClick={handleEmailClick}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow-lg">
          Email copied to clipboard!
        </div>
      )}
    </>
  );
};

export default SocialLinks;
