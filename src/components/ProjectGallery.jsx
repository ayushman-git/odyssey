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
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="flex flex-col group"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {isClient ? (
              // Only render this structure on the client side
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link aspect-square relative overflow-hidden rounded-2xl mb-4"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div 
                  className="absolute bottom-3 right-3 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full text-white shadow-lg hover:shadow-gray-500/30 transform transition-all duration-200 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaCode size={14} />
                  </a>
                </div>
              </a>
            ) : (
              // Render a simple placeholder during SSR to avoid hydration errors
              <div className="aspect-square relative overflow-hidden rounded-2xl mb-4 bg-gray-800">
                {/* Static placeholder that matches the structure but doesn't cause hydration issues */}
                <div className="w-full h-full bg-gray-800"></div>
              </div>
            )}
            
            {/* Content below the image */}
            <div className="px-1 relative">
              {/* Initial view - only title visible */}
              <div className="transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
              
              {/* Hover view - tagline and tech stack visible */}
              <div className="absolute top-0 left-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Tagline */}
                <p className="text-gray-300 mb-3 text-sm">
                  {project.tagline}
                </p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
