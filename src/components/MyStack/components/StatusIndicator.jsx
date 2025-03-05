"use client";

import { motion } from 'framer-motion';

const StatusIndicator = () => {
  return (
    <motion.div 
      className="mt-8 text-xs font-mono text-gray-500 flex items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
      System operational
    </motion.div>
  );
};

export default StatusIndicator;
