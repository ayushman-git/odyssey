"use client";

import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaCopy,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";

export default function SocialShare({
  url,
  title,
  description,
  hashtags = [],
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description || "");
  const shareHashtags =
    hashtags.length > 0 ? encodeURIComponent(hashtags.join(",")) : "";

  const socialPlatforms = [
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}${shareHashtags ? `&hashtags=${shareHashtags}` : ""}`,
      hoverColor: "#1DA1F2",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareTitle}&summary=${shareDescription}`,
      hoverColor: "#0077B5",
    },
    {
      name: "Reddit",
      icon: FaReddit,
      url: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}`,
      hoverColor: "#FF4500",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`,
      hoverColor: "#25D366",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      url: `https://telegram.me/share/url?url=${shareUrl}&text=${shareTitle}`,
      hoverColor: "#0088CC",
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: `mailto:?subject=${shareTitle}&body=${shareDescription}%0A%0A${shareUrl}`,
      hoverColor: "#6B7280",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.div
      className="flex items-center gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Social platforms - compact icons only */}
      {socialPlatforms.slice(0, 5).map((platform) => (
        <motion.a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${platform.name}`}
          className="group p-2 rounded-full border border-border bg-card text-muted-foreground dark:border-gray-800 dark:bg-black dark:text-white transition-all duration-150 hover:text-white hover:border-transparent"
          style={{
            '--hover-bg': platform.hoverColor,
          }}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            y: -1,
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
        >
          <platform.icon size={16} />
        </motion.a>
      ))}

      {/* Copy link button */}
      <motion.button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className={`p-2 rounded-full border transition-all duration-150 ${
          copied
            ? "bg-green-500 text-white border-green-500"
            : "border-border bg-card text-muted-foreground dark:border-gray-800 dark:bg-black dark:text-white hover:bg-primary hover:text-primary-foreground hover:border-primary"
        }`}
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -1, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
        disabled={copied}
      >
        <FaCopy size={16} />
      </motion.button>
    </motion.div>
  );
}
