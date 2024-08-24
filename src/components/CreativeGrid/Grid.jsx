"use client";

import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { generateFloat, generateInt } from "@/utils";

function Grid({ img, vid, gridArea }) {
  // create a utility method 
  return (
    <motion.div
      className="w-full relative h-full rounded-3xl overflow-hidden "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, translateX: generateInt(-40, 40) }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: generateFloat(0.5, 1.5) }}
      style={{
        gridArea: gridArea,
      }}
    >
      {img && (
        <Image
          className=""
          src={img}
          layout="fill"
          objectFit="cover"
          alt="Cover Image"
        />
      )}
    </motion.div>
  );
}

export default Grid;
