"use client";

import React, { useState } from "react";
import topographyBg from "@/assets/svgs/topography.svg";
import SocialLinks from "../SocialLinks";
import Link from "next/link";

function CosmicFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="h-auto relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <footer
        className="rounded-2xl bg-blue-700 relative overflow-hidden p-6 sm:p-10 lg:p-16 mt-16 mb-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background div with repeating pattern */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isHovered ? "opacity-40" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${topographyBg.src})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
            mixBlendMode: "soft-light"
          }}
        />
        
        <div className="relative z-10 text-white">
          {/* Main Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mb-16">
            {/* About Column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight">About Me</h3>
              <p className="text-base text-white/90 leading-relaxed mb-6">
                I create digital experiences that are both beautiful and functional, 
                with a focus on clean design and intuitive user interfaces.
              </p>
              <SocialLinks className="mt-6" />
            </div>
            
            {/* Portfolio Links Column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Portfolio</h3>
              <ul className="space-y-3 text-base text-white/90">
                <li><Link href="/" className="hover:text-white transition-colors inline-block py-1">Home</Link></li>
                <li><Link href="/projects" className="hover:text-white transition-colors inline-block py-1">Projects</Link></li>
                <li><Link href="/skills" className="hover:text-white transition-colors inline-block py-1">Skills & Expertise</Link></li>
                <li><Link href="/resume" className="hover:text-white transition-colors inline-block py-1">Resume</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors inline-block py-1">Blog</Link></li>
              </ul>
            </div>
            
            {/* Contact Info Column */}
            <div>
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Let's Connect</h3>
              <address className="not-italic text-base text-white/90 space-y-3 mb-8">
                <p className="leading-relaxed">Based in <span className="text-white font-medium">San Francisco, CA</span></p>
                <p className="leading-relaxed">Available for <span className="text-white font-medium">freelance & full-time opportunities</span></p>
                <p className="leading-relaxed">Email: <a href="mailto:hello@yourname.com" className="text-white hover:underline transition-colors">hello@yourname.com</a></p>
              </address>
              
              {/* Contact Form Mini */}
              <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-5 py-3 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="w-full px-5 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Get In Touch
                </button>
              </form>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center py-12 border-t border-b border-white/20">
            <h1 className="font-bold text-white text-4xl mb-6 tracking-tight">
              Interested in working together?
            </h1>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
          
          {/* Copyright Section */}
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-white/80 font-medium">© {currentYear} Ayushman Gupta. All rights reserved.</p>
            <div className="mt-6 md:mt-0">
              <p className="text-base text-white/80">Designed & Built with ❤️</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CosmicFooter;
