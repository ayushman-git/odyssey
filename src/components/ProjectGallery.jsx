"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { projects } from "@/data/projects";

const ProjectGallery = () => {
  // Using a simple conditional to ensure the component only 
  // renders its complete structure client-side
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-white">
        Featured Projects
      </h2>
      <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
        A collection of my recent work and side projects showcasing my skills and interests in software development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="flex flex-col group h-full relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {isClient ? (
              // Card is no longer wrapped in an anchor tag
              <div className="flex flex-col h-full cursor-pointer">
                {/* Image container with its own clickable area */}
                <div 
                  className="aspect-video relative overflow-hidden rounded-2xl mb-4"
                  onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Content below the image */}
                <div className="px-1 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 
                    className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors cursor-pointer"
                    onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                  >
                    {project.title}
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-gray-300 mb-3 text-sm">
                    {project.tagline}
                  </p>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Code link button positioned absolutely */}
                <div className="absolute top-3 right-3 z-10">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full text-white shadow-lg hover:shadow-gray-500/30 transform transition-all duration-200 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    aria-label={`View code for ${project.title}`}
                  >
                    <FaCode size={14} />
                  </a>
                </div>
              </div>
            ) : (
              // Render a simple placeholder during SSR to avoid hydration errors
              <div className="aspect-video relative overflow-hidden rounded-2xl mb-4 bg-gray-800">
                {/* Static placeholder that matches the structure but doesn't cause hydration issues */}
                <div className="w-full h-full bg-gray-800"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
