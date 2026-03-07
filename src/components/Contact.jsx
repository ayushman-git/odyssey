"use client";

import React, { useRef } from "react";
import Me from "@/assets/images/cover.webp";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Pre-compute word delays for the whole bio block as one sequential reveal
const BIO_PARAGRAPHS = [
  "I'm a software engineer passionate about crafting intuitive, user-centric digital experiences. My journey in tech has taken me through diverse domains—developing educational applications, contributing to agri-tech platforms, and driving front-end innovation in the insurance sector. With a strong foundation in React, React Native, Next.js, Python, and TypeScript, I focus on building products that don't just function well but feel effortless to use.",
  "Beyond code, I have a deep fascination with the cosmos—there's something humbling about the vastness of space and the mysteries we've yet to uncover. When I'm not buried in tech or stargazing (figuratively, for now), you'll probably find me reading, writing for my blog Odyssey, or exploring ways to push my limits.",
  "Currently, I'm on a journey to refine my skills, dive deeper into web technologies, and maybe, just maybe, land somewhere that challenges me in all the right ways.",
];

let _wordIdx = 0;
const BIO_WORD_DATA = BIO_PARAGRAPHS.map((text) => ({
  text,
  words: text.split(" ").map((word) => ({ word, delay: _wordIdx++ * 0.05 })),
}));

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.1", "start -0.2"],
  });

  const imageScale = useTransform(scrollYProgress, [0.3, 1.0], [1.0, 1.4]);
  const imageRotate = useTransform(scrollYProgress, [0.3, 1.0], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 1.0], [0, 0.15]);

  const locationY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const locationX = useTransform(scrollYProgress, [0, 1], [20, -35]);
  const roleY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const roleX = useTransform(scrollYProgress, [0, 1], [0, 35]);

  const headingScale = useTransform(headingProgress, [0, 1], [1, 1.15]);
  const headingY = useTransform(headingProgress, [0, 1], [0, 50]);

  const shapes = [
    { className: "absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl", delay: 0 },
    { className: "absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-2xl", delay: 3 },
    { className: "absolute top-1/2 left-3/4 w-24 h-24 bg-gradient-to-br from-green-400/25 to-blue-400/25 rounded-full blur-lg", delay: 6 },
    { className: "absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-red-400/30 blur-md", delay: 9 },
    { className: "absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl", delay: 12 },
  ];

  return (
    <div className="relative z-20 my-20 md:my-36 lg:my-52 px-4 sm:px-6 md:px-0 overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className={shape.className}
            animate={{ rotate: 360, scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: shape.delay }}
          />
        ))}
      </div>

      <motion.h1
        ref={headingRef}
        style={{ scale: headingScale, y: headingY }}
        className="text-gray-200 text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-center font-semibold relative z-30"
      >
        Ayushman Gupta
      </motion.h1>

      <section
        ref={sectionRef}
        className="relative flex justify-center z-10 mt-8 md:mt-0"
      >
        <section className="relative max-w-[800px] w-full">
          {/*
            Fix: separate static positioning (top-1/2, translate) from
            animated scroll transforms. The outer div handles CSS positioning;
            the motion.p applies only the animated x/y + rotation via style prop
            so Framer Motion's inline transform doesn't overwrite Tailwind translates.
          */}
          <div className="absolute z-10 left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6">
            <motion.p
              style={{ y: locationY, x: locationX, rotate: -90 }}
              className="text-black whitespace-nowrap text-xs sm:text-sm font-medium"
            >
              Hyderabad, India
            </motion.p>
          </div>

          <div className="overflow-hidden rounded-2xl relative">
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 z-10 rounded-2xl pointer-events-none"
            />
            <motion.div style={{ scale: imageScale, rotate: imageRotate }}>
              <Image
                src={Me}
                width={800}
                height={600}
                priority
                className="rounded-2xl w-full transform-gpu"
                alt="Ayushman Gupta"
              />
            </motion.div>
          </div>

          <div className="absolute z-10 right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6">
            <motion.p
              style={{ y: roleY, x: roleX, rotate: 90 }}
              className="text-black whitespace-nowrap text-xs sm:text-sm font-medium"
            >
              Full Stack Engineer
            </motion.p>
          </div>
        </section>
      </section>

      <div className="flex justify-center mt-8">
        {/*
          Single whileInView trigger on the article container.
          All words across all paragraphs use pre-computed sequential delays,
          so the reveal flows continuously through the whole bio block.
        */}
        <motion.article
          className="text-gray-200 max-w-[800px] text-base sm:text-lg md:text-xl px-4 sm:px-6 md:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {BIO_WORD_DATA.map(({ words }, pIdx) => (
            <p key={pIdx} className={pIdx < BIO_WORD_DATA.length - 1 ? "mb-4" : ""}>
              {words.map(({ word, delay }, wIdx) => (
                <motion.span
                  key={wIdx}
                  custom={delay}
                  variants={wordVariant}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          ))}
        </motion.article>
      </div>
    </div>
  );
}

export default Contact;
