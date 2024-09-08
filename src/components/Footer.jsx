"use client";

import Lottie from "lottie-react";
import profiles from "@/assets/json/profiles.json";
import { motion } from "framer-motion";
import Saturn from "@/assets/json/ring.json";
import Cat from "@/assets/json/cat.json";

export default function Footer() {
  return (
    <motion.footer
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.01,
      }}
      initial={{
        translateY: 50,
        opacity: 0,
      }}
      whileInView={{
        translateY: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        margin: "-20%",
      }}
      className="max-w-screen-lg w-full p-24 pb-8 bg-black text-white grid place-items-center py-24 sm:rounded-b-[40px]  rounded-b-none rounded-[40px] sm:mb-12 mb-0 relative z-10"
    >
      <motion.h1
        transition={{
          duration: 0.5,
        }}
        initial={{
          translateY: 50,
          opacity: 0,
          color: "#cccccc",
        }}
        whileInView={{
          translateY: 0,
          opacity: 1,
        }}
        whileHover={{
          color: "#ffffff",
        }}
        viewport={{
          once: true,
          margin: "-20%",
        }}
        className="sm:text-5xl text-3xl font-bold text-center leading-normal cursor-pointer group"
      >
        Curiosity never killed the{" "}
        <span className="relative">
          cat
          <div className="absolute -top-10 -left-12 w-32 opacity-0 translate-x-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
            <Lottie className="w-full" animationData={Cat} />
          </div>
        </span>
        ; it created the universe.
      </motion.h1>
      <motion.div
        className="w-full grid place-items-center"
        transition={{
          duration: 0.5,
        }}
        whileInView={{
          scale: 1.2,
        }}
        viewport={{
          once: true,
          margin: "-50%",
        }}
      >
        <Lottie className="w-1/3" animationData={Saturn} />
      </motion.div>
      <div className="max-w-screen-md w-full flex gap-10 mt-12">
        <section className="w-full">
          <ul className="flex items-center justify-center gap-2 flex-wrap">
            {profiles.map(({ name, link }) => (
              <motion.li
                className="flex items-center gap-2 cursor-pointer"
                key={name}
                transition={{
                  duration: 0.1,
                }}
                initial={{
                  color: "#808080",
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#00FF00",
                }}
              >
                <a target="_blank" href={link} className="p-4">
                  {name}
                </a>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
      <div>
        <p className="text-gray-700 mt-12">
          &copy; {new Date().getFullYear()} Odyssey | Ayushman
        </p>
      </div>
    </motion.footer>
  );
}
