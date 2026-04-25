"use client";

import { useState } from "react";

const iconProps = {
  "aria-hidden": true,
  fill: "currentColor",
  viewBox: "0 0 24 24",
};

const GitHubIcon = ({ size = 20 }) => (
  <svg {...iconProps} width={size} height={size}>
    <path d="M12 .297a12 12 0 0 0-3.794 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.085 1.839 1.236 1.839 1.236 1.07 1.835 2.808 1.305 3.492.998.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.333-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.304-.535-1.528.117-3.186 0 0 1.008-.322 3.301 1.23A11.498 11.498 0 0 1 12 6.11c1.02.004 2.047.138 3.006.404 2.292-1.552 3.298-1.23 3.298-1.23.654 1.658.243 2.882.12 3.186.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.623-5.48 5.921.43.372.823 1.103.823 2.222v3.293c0 .319.216.694.825.576A12 12 0 0 0 12 .297Z" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }) => (
  <svg {...iconProps} width={size} height={size}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.127 0 2.062 2.062 0 0 1-2.064 2.065ZM7.12 20.452H3.555V9H7.12v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);

const BehanceIcon = ({ size = 20 }) => (
  <svg {...iconProps} width={size} height={size}>
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.519 1.87 1.544 1.87.845 0 1.369-.522 1.49-1.029l2.722.188zM19 13.4c-.114-.457-.343-.857-.686-1.2-.343-.343-.857-.514-1.543-.514-.571 0-1.057.171-1.457.514-.4.343-.629.743-.686 1.2H19zM4.108 5H11.1c3.006 0 4.585 1.208 4.585 3.252 0 1.755-.96 2.745-2.166 3.125 1.526.392 2.498 1.51 2.498 3.315C16 17.039 14.256 19 10.896 19H0V5h4.108zm.891 5.356h3.057c.457 0 .886-.057 1.286-.171.4-.114.743-.286 1.029-.514.286-.229.514-.514.686-.857.171-.343.257-.743.257-1.2 0-.886-.286-1.543-.857-1.971-.571-.429-1.343-.643-2.314-.643H5v5.356zm0 5.63h3.571c.514 0 1-.057 1.457-.171.457-.114.857-.286 1.2-.514.343-.229.614-.543.814-.943.2-.4.3-.886.3-1.457 0-1.029-.314-1.8-.943-2.314-.629-.514-1.5-.771-2.614-.771H5v6.17z" />
  </svg>
);

const MediumIcon = ({ size = 20 }) => (
  <svg {...iconProps} width={size} height={size}>
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const MailIcon = ({ size = 20 }) => (
  <svg {...iconProps} width={size} height={size}>
    <path d="M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75A2.25 2.25 0 0 1 1.5 18.75V5.25Zm2.124-.75 8.376 6.282L20.376 4.5H3.624Zm17.376 1.876-8.55 6.413a.75.75 0 0 1-.9 0L3 6.376v12.374c0 .414.336.75.75.75h16.5a.75.75 0 0 0 .75-.75V6.376Z" />
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
      icon: GitHubIcon,
      href: "https://github.com/ayushman-git",
      label: "GitHub",
    },
    {
      icon: LinkedInIcon,
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
      icon: MailIcon,
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
              className={`${theme.textColor} ${theme.hoverColor} inline-flex h-5 w-5 items-center justify-center transition-colors duration-300`}
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
