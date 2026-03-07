"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import topographyBg from "@/assets/svgs/topography.svg";
import useClickOutside from "@/hooks/useClickOutside";

const WhatImListeningTo = ({ variant = "default" }) => {
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleClickOutside = () => {
    if (isMobile && isExpanded) {
      setIsExpanded(false);
    }
  };

  useClickOutside(containerRef, handleClickOutside);

  const themeConfig = {
    default: {
      containerClass: "bg-blue-600",
      textColor: "text-white",
      textSecondary: "text-white/90",
      textMuted: "text-white/70",
      borderColor: "border-white/20",
      accentColor: "bg-white",
      spotifyGreen: "bg-green-500",
      imageOverlay: "bg-blue-600/20"
    },
    editorial: {
      containerClass: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-black",
      textColor: "text-black dark:text-white",
      textSecondary: "text-gray-700 dark:text-gray-300",
      textMuted: "text-gray-600 dark:text-gray-400",
      borderColor: "border-gray-200 dark:border-gray-700",
      accentColor: "bg-black dark:bg-white",
      spotifyGreen: "bg-green-500",
      imageOverlay: "bg-gray-100/30 dark:bg-gray-800/30"
    }
  };

  const theme = themeConfig[variant] || themeConfig.default;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const cacheKey = 'spotify-data';
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

        if (cachedData && cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);
          const thirtyMinutes = 30 * 60 * 1000;

          if (cacheAge < thirtyMinutes) {
            setSpotifyData(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const response = await fetch('/api/spotify');
        if (!response.ok) throw new Error('Failed to fetch Spotify data');

        const data = await response.json();
        setSpotifyData(data);

        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyData();
  }, []);

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      clearHoverTimeout();
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      clearHoverTimeout();
      hoverTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      clearHoverTimeout();
    };
  }, []);

  if (loading || error || !spotifyData) return null;

  const allItems = [
    ...(spotifyData.topArtists || []).slice(0, 3),
    ...(spotifyData.topTracks || []).slice(0, 3)
  ];

  const collapsedImageVariants = {
    collapsed: { scale: 1, opacity: 1 },
    expanded: { scale: 0, opacity: 0 },
  };

  const expandedImageVariants = {
    collapsed: { scale: 0, opacity: 0 },
    expanded: { scale: 1, opacity: 1 },
  };

  return (
    <div className="relative flex justify-center">
      <div
        ref={containerRef}
        className={`${theme.containerClass} relative w-[94%] overflow-hidden h-[48px] cursor-pointer transition-all duration-300 ${
          variant === "default" ? "rounded-none md:rounded-2xl" : ""
        } ${variant === "editorial" ? "border-b-0" : ""} -mb-px`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Spotify music widget - ${isExpanded ? 'expanded' : 'collapsed'}`}
      >
        {variant === "default" && (
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isExpanded ? 0.2 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `url(${topographyBg.src})`,
              backgroundRepeat: "repeat",
              backgroundSize: "300px 300px",
              mixBlendMode: "soft-light"
            }}
          />
        )}

        <div className="relative z-10 h-full flex items-center px-4 py-1">
          <div className="flex items-center gap-2 w-full">
            <Music className={`w-7 h-7 ${theme.spotifyGreen} rounded-sm p-0.5`} />

            <div className="flex gap-1.5 flex-shrink-0">
              {allItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  variants={collapsedImageVariants}
                  animate={isExpanded ? "expanded" : "collapsed"}
                  transition={{
                    duration: isExpanded ? 0.3 : 0.35,
                    ease: isExpanded ? "easeIn" : [0.34, 1.56, 0.64, 1],
                    delay: isExpanded ? index * 0.03 : index * 0.03,
                  }}
                  className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden border border-white/20"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full h-full ${theme.imageOverlay} flex items-center justify-center`}>
                      <Music className={`w-2 h-2 ${theme.textMuted}`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-end pr-3 relative overflow-hidden h-8">
              <span className={`absolute text-sm animate-bounce ${theme.textMuted}`} style={{ right: '50px', animationDuration: '2s', opacity: 0.4 }}>♪</span>
              <span className={`absolute text-xs animate-pulse ${theme.textMuted}`} style={{ right: '35px', animationDuration: '1.5s', animationDelay: '0.5s', opacity: 0.3 }}>♫</span>
              <span className={`absolute text-sm animate-bounce ${theme.textMuted}`} style={{ right: '20px', animationDuration: '2.2s', animationDelay: '1s', opacity: 0.35 }}>♬</span>
              <span className={`absolute text-xs animate-pulse ${theme.textMuted}`} style={{ right: '8px', animationDuration: '1.8s', animationDelay: '0.3s', opacity: 0.25 }}>♪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded overlay */}
      <motion.div
        className={`w-[94%] mx-auto absolute inset-x-0 top-0 ${
          isExpanded ? 'pointer-events-auto' : 'pointer-events-none'
        } z-50 ${theme.containerClass} rounded-lg shadow-2xl border ${theme.borderColor}`}
        animate={isExpanded ? { opacity: 1, y: -120 } : { opacity: 0, y: 0 }}
        transition={
          isExpanded
            ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.4, ease: [0.65, 0, 0.35, 1] }
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4 pt-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Music className={`w-4 h-4 ${theme.spotifyGreen} rounded-sm p-0.5`} />
            <span className={`text-sm font-medium ${theme.textColor}`}>
              Currently Vibing To
            </span>
          </div>

          <div className="grid grid-cols-6 gap-2.5 mb-3">
            {allItems.map((item, index) => (
              <motion.div
                key={`${item.id}-expanded-${index}`}
                variants={expandedImageVariants}
                animate={isExpanded ? "expanded" : "collapsed"}
                transition={{
                  duration: isExpanded ? 0.4 : 0.25,
                  ease: isExpanded ? [0.34, 1.56, 0.64, 1] : "easeIn",
                  delay: isExpanded ? index * 0.05 : index * 0.02,
                }}
                className="group relative"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-800 to-gray-900">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full ${theme.imageOverlay} flex items-center justify-center`}>
                      <Music className={`w-4 h-4 ${theme.textMuted}`} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <a
                      href={item.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
                <div className={`mt-1 text-xs font-medium ${theme.textColor} truncate leading-tight`}>
                  {item.name}
                </div>
                {item.artists && (
                  <div className={`text-xs ${theme.textMuted} truncate leading-tight`}>
                    {Array.isArray(item.artists) ? item.artists.slice(0, 1).join('') : item.genres?.slice(0, 1).join('')}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="https://open.spotify.com/user/fluxenon"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                variant === "default"
                  ? "bg-green-500 hover:bg-green-400 text-white shadow-lg hover:shadow-xl hover:scale-105"
                  : "bg-green-500 hover:bg-green-600 text-white border border-green-600 hover:border-green-500 shadow-md hover:shadow-lg"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Follow on Spotify</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhatImListeningTo;
