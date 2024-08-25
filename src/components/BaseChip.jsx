"use client";

import { motion } from "framer-motion";

export default function BaseChip({ label }) {
  return <motion.span>{label}</motion.span>;
}
