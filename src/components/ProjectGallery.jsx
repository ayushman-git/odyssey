"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Image from "next/image";

const TechTag = ({ tech }) => (
  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300 border border-gray-600/80 px-2.5 py-1 rounded-sm">
    {tech}
  </span>
);

const ProjectCard = ({ project, index, className }) => (
  <motion.article
    className={`group relative overflow-hidden rounded-2xl bg-[#141414] ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {/* Full-bleed image */}
    <a
      href={project.liveUrl || project.codeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 block"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 55vw"
        priority={index < 2}
      />
    </a>

    {/* Gradient: transparent top → solid bottom */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />

    {/* Content anchored to bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech) => (
          <TechTag key={tech} tech={tech} />
        ))}
      </div>

      {/* Title */}
      <a
        href={project.liveUrl || project.codeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="text-2xl md:text-[1.75rem] font-semibold text-white mb-2 leading-tight group-hover:text-gray-300 transition-colors">
          {project.title}
        </h3>
      </a>

      {/* Tagline */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
        {project.tagline}
      </p>

      {/* Links */}
      <div className="flex items-center gap-5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white text-sm font-medium hover:opacity-60 transition-opacity"
          >
            View Project
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        )}
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          Source Code
        </a>
      </div>
    </div>
  </motion.article>
);

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
        className="flex items-end justify-between mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
          Projects
        </h2>
      </motion.div>

      {/* Asymmetric bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Row 1: wide left (7), narrow right (5) */}
        <ProjectCard
          project={projects[0]}
          index={0}
          className="md:col-span-7 h-[440px] md:h-[520px]"
        />
        <ProjectCard
          project={projects[1]}
          index={1}
          className="md:col-span-5 h-[440px] md:h-[520px]"
        />
        {/* Row 2: narrow left (5), wide right (7) */}
        <ProjectCard
          project={projects[2]}
          index={2}
          className="md:col-span-5 h-[440px] md:h-[480px]"
        />
        <ProjectCard
          project={projects[3]}
          index={3}
          className="md:col-span-7 h-[440px] md:h-[480px]"
        />
      </div>
    </motion.section>
  );
};

export default ProjectGallery;
