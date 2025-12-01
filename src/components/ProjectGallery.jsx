"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Image from "next/image";

const ProjectGallery = () => {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-4 md:px-8 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-end justify-between mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white tracking-tight">
          Projects
        </h2>
      </motion.div>

      {/* Projects */}
      <div className="space-y-20">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image - Smaller */}
              <a
                href={project.liveUrl || project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 576px"
                  priority={index < 2}
                />
              </a>

              {/* Content */}
              <div className="flex flex-col justify-center">
                {/* Number */}
                <span className="text-xs font-mono text-gray-400 dark:text-gray-600 mb-3">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <a href={project.liveUrl || project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-2xl font-medium text-black dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {project.title}
                  </h3>
                </a>

                {/* Tagline */}
                <p className="text-gray-600 dark:text-gray-300 text-base mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-3"
                    >
                      {tech}
                      {i < project.techStack.length - 1 && (
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      )}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-black dark:text-white text-sm font-medium hover:opacity-60 transition-opacity"
                    >
                      View Project
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </a>
                  )}
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectGallery;
