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
    // Add your newsletter subscription logic here
    console.log("Subscribing email:", email);
    // Reset form after submission
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="h-auto relative z-20">
      <footer
        className="rounded-2xl bg-blue-700 relative overflow-hidden p-8 md:p-12"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* About Column */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <SocialLinks />
            </div>
            
            {/* Portfolio Links Column */}
            <div>
              <h3 className="text-xl font-bold mb-4">Portfolio</h3>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="/skills" className="hover:text-white transition-colors">Skills & Expertise</Link></li>
                <li><Link href="/resume" className="hover:text-white transition-colors">Resume</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            {/* Contact Info Column */}
            <div>
              <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
              <address className="not-italic text-white/80 space-y-2">
                <p>Based in <span className="text-white">San Francisco, CA</span></p>
                <p>Available for <span className="text-white">freelance & full-time opportunities</span></p>
                <p>Email: <a href="mailto:hello@yourname.com" className="hover:text-white transition-colors">hello@yourname.com</a></p>
              </address>
              
              {/* Contact Form Mini */}
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded text-blue-900 focus:outline-none focus:ring-2 focus:ring-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-white text-blue-700 rounded font-medium hover:bg-blue-50 transition-colors"
                >
                  Get In Touch
                </button>
              </form>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center pb-8 border-b border-white/20">
            <h1 className="font-semibold text-white text-3xl mb-4">
              Interested in working together?
            </h1>
            <Link 
              href="/contact" 
              className="inline-block px-6 py-3 bg-white text-blue-700 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
          
          {/* Copyright Section */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>© {currentYear} Ayushman Gupta. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p>Designed & Built with ❤️</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CosmicFooter;
