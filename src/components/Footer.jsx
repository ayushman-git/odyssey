"use client";

import profiles from "@/assets/json/profiles.json";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.01,
      }}
      className="max-w-screen-lg w-full p-24 pb-8 bg-black text-white grid place-items-center py-24 sm:rounded-b-[40px]  rounded-b-none rounded-[40px] sm:mb-12 mb-0 relative z-10"
    >
      <h1 className="text-5xl font-bold text-center leading-normal">
        Dream big, stay curious, keep learning
      </h1>
      <div className="max-w-screen-md w-full flex gap-10 mt-12">
        <section className="w-full">
          <ul className="flex items-center justify-center gap-2">
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
