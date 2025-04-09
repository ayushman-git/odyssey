"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

function Totoro() {
  const { resolvedTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  // Define theme-dependent colors
  const bodyColor = resolvedTheme === "dark" ? "#9e9e9e" : "#616161";
  const bellyColor = resolvedTheme === "dark" ? "#fff7c0" : "#ffe082";
  const eyeWhiteColor = resolvedTheme === "dark" ? "#ffffff" : "#fafafa";
  const whiskerColor = resolvedTheme === "dark" ? "#757575" : "#424242";
  const eyePupilColor = resolvedTheme === "dark" ? "#424242" : "#212121";

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Click handler for mobile devices
  const handleClick = () => {
    if (isMobile) {
      setShowTooltip(!showTooltip);
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
      onMouseEnter={() => !isMobile && setShowTooltip(true)}
      onMouseLeave={() => !isMobile && setShowTooltip(false)}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        style={{
          display: "inline-block",
          verticalAlign: "text-bottom",
          marginBottom: "0px",
          marginLeft: "2px",
        }}
      >
        <path fill={bodyColor} d="M36,18c2,2,5,7,5,16c0,3.488-4,3-4,3L36,18z" />
        <path
          fill={bodyColor}
          d="M12,18c-2,2-5,7-5,16c0,3.488,4,3,4,3L12,18z"
        />
        <path
          fill={bodyColor}
          d="M31.467,9c-2.8-2-5.534-2-7.467-2s-4.667,0-7.467,2S10,22,10,30h14h14C38,22,34.267,11,31.467,9z"
        />
        <path
          fill={bodyColor}
          d="M33,46h-9v-6c0,0,11.495-12.493,15-10C39,41,33,46,33,46z"
        />
        <path
          fill={bodyColor}
          d="M15,46h9v-6c0,0-11.495-12.493-15-10C9,41,15,46,15,46z"
        />
        <path
          fill={bodyColor}
          d="M24,46c-8.271,0-15-6.626-15-16s6.729-17,15-17s15,7.626,15,17S32.271,46,24,46z"
        />
        <ellipse cx="24" cy="31" fill={bellyColor} rx="13" ry="14" />
        <circle cx="18.5" cy="11.5" r="1.5" fill={eyeWhiteColor} />
        <circle cx="29.5" cy="11.5" r="1.5" fill={eyeWhiteColor} />
        <polygon
          fill={whiskerColor}
          points="32.215,13.107 39.757,12.054 39.843,12.546 32.385,14.093"
        />
        <polygon
          fill={whiskerColor}
          points="32.975,14.501 40.887,14.35 40.913,14.85 33.025,15.499"
        />
        <polygon
          fill={whiskerColor}
          points="33.571,16.005 40.535,17.253 40.465,17.747 33.429,16.995"
        />
        <polygon
          fill={whiskerColor}
          points="15.615,14.093 8.157,12.546 8.243,12.054 15.785,13.107"
        />
        <polygon
          fill={whiskerColor}
          points="14.975,15.499 7.087,14.85 7.113,14.35 15.025,14.501"
        />
        <polygon
          fill={whiskerColor}
          points="14.571,16.995 7.535,17.747 7.465,17.253 14.429,16.005"
        />
        <path
          fill={eyePupilColor}
          d="M25.5,12.5c0,0.276-0.672,0.8-1.5,0.8s-1.5-0.524-1.5-0.8S23.172,12,24,12S25.5,12.224,25.5,12.5z"
        />
        <circle cx="18.5" cy="11.5" r=".75" fill={eyePupilColor} />
        <circle cx="29.5" cy="11.5" r=".75" fill={eyePupilColor} />
        <path
          fill={bodyColor}
          d="M21.27,7.812l-0.512-1.469C21.761,3.36,18.822-0.091,18,0.1c-0.83,0.193-1.717,5.388,0.312,6.819	l0.297,1.661L21.27,7.812z"
        />
        <path
          fill={bodyColor}
          d="M26.73,7.812l0.512-1.469C26.239,3.36,29.178-0.091,30,0.1c0.83,0.193,1.717,5.388-0.313,6.819	L29.391,8.58L26.73,7.812z"
        />
        <path
          fill={bodyColor}
          d="M26,21.869c0,0.516-0.895-0.654-2-0.654s-2,1.17-2,0.654S22.895,20,24,20S26,21.353,26,21.869z"
        />
        <path
          fill={bodyColor}
          d="M23.2,25.869c0,0.516-0.895-0.654-2-0.654c-1.105,0-2,1.17-2,0.654S20.095,24,21.2,24	C22.305,24,23.2,25.353,23.2,25.869z"
        />
        <path
          fill={bodyColor}
          d="M24.8,25.869c0,0.516,0.895-0.654,2-0.654c1.105,0,2,1.17,2,0.654S27.905,24,26.8,24	C25.695,24,24.8,25.353,24.8,25.869z"
        />
        <path
          fill={bodyColor}
          d="M30.03,27.088c-0.088,0.508,0.882-0.543,1.97-0.355c1.088,0.188,1.883,1.545,1.971,1.036	c0.088-0.508-0.86-2.045-1.948-2.233C30.935,25.348,30.118,26.58,30.03,27.088z"
        />
        <path
          fill={bodyColor}
          d="M17.97,27.088c0.088,0.508-0.882-0.543-1.97-0.355c-1.088,0.188-1.883,1.545-1.971,1.036	c-0.088-0.508,0.86-2.045,1.948-2.233C17.065,25.348,17.882,26.58,17.97,27.088z"
        />
        <path
          fill={bodyColor}
          d="M31.935,23.63c-0.139,0.535-0.788-0.927-1.857-1.205s-2.153,0.735-2.015,0.201	c0.139-0.535,0.981-1.812,2.051-1.534C31.183,21.369,32.073,23.096,31.935,23.63z"
        />
        <path
          fill={bodyColor}
          d="M16.065,23.63c0.139,0.535,0.788-0.927,1.857-1.205s2.153,0.735,2.015,0.201	c-0.139-0.535-0.981-1.812-2.051-1.534C16.817,21.369,15.927,23.096,16.065,23.63z"
        />
      </svg>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) translateY(-10px)",
            bottom: "100%",
            backgroundColor: "white",
            color: "#333",
            padding: "8px 12px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            fontSize: "14px",
            fontWeight: "bold",
            zIndex: 100,
            width: "60px",
            textAlign: "center",
            border: "2px solid #333",
            fontFamily: "Comic Sans MS, cursive, sans-serif",
          }}
        >
          Hi!
          <div
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              backgroundColor: "white",
              border: "0 solid transparent",
              borderRight: "2px solid #333",
              borderBottom: "2px solid #333",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              zIndex: -1,
            }}
          />
        </div>
      )}
    </span>
  );
}

export default Totoro;
