"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavButton from "./NavButton";
import { scrollToSectionWithId } from "@/utils/index.js";

const Navigation = ({ logo }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = (action) => {
    setIsOpen(false);
    action();
  };

  return (
    <nav
      className="flex items-center justify-between relative z-30"
      aria-label="Primary"
    >
      <div>{logo}</div>

      {!isMobile && (
        <ul className="flex space-x-4">
          <li>
            <NavButton onClick={() => scrollToSectionWithId("about")}>
              About
            </NavButton>
          </li>
          <li>
            <NavButton onClick={() => scrollToSectionWithId("my-stack")}>
              Skills
            </NavButton>
          </li>
          <li>
            <NavButton
              onClick={() => router.push("/blog")}
              className="!bg-transparent !text-white !border !border-white/30 !hover:bg-white/10 !hover:border-white/50 font-semibold px-6 py-2 rounded-full"
            >
              Blog
            </NavButton>
          </li>
        </ul>
      )}

      {isMobile && (
        <button
          type="button"
          className="z-40 p-1"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>
      )}

      {isMobile && (
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-30 bg-black/95 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <ul
            className={`flex flex-col items-center space-y-6 transform transition-all duration-300 ${
              isOpen ? "translate-y-0" : "-translate-y-6"
            }`}
          >
            <li>
              <NavButton
                onClick={() => handleNavClick(() => scrollToSectionWithId("about"))}
                className="text-xl"
              >
                About
              </NavButton>
            </li>
            <li>
              <NavButton
                onClick={() => handleNavClick(() => scrollToSectionWithId("my-stack"))}
                className="text-xl"
              >
                Skills
              </NavButton>
            </li>
            <li>
              <NavButton
                onClick={() => handleNavClick(() => router.push("/blog"))}
                className="text-xl !bg-transparent !text-white !border !border-white/30 !hover:bg-white/10 !hover:border-white/50 font-semibold px-6 py-2 rounded-full"
              >
                Blog
              </NavButton>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

const HamburgerIcon = ({ isOpen }) => {
  return (
    <span className="w-5 h-5 flex flex-col justify-between cursor-pointer">
      <span
        className={`w-full h-0.5 bg-white transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-[9px]" : ""
        }`}
      />
      <span
        className={`w-full h-0.5 bg-white transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`w-full h-0.5 bg-white transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-[9px]" : ""
        }`}
      />
    </span>
  );
};

export default Navigation;
