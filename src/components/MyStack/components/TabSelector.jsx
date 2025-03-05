"use client";

import { motion } from 'framer-motion';

const TabSelector = ({ activeTab, setActiveTab }) => {
  return (
    <div className="relative flex justify-center mb-10 pt-10">
      <div className="inline-flex bg-gray-900/80 backdrop-blur-md rounded-full p-1 border border-gray-800/40">
        <button
          className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
            activeTab === 'tools' 
              ? 'bg-blue-500/20 text-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('tools')}
        >
          Tools & Technologies
        </button>
        <button
          className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
            activeTab === 'skills' 
              ? 'bg-purple-500/20 text-purple-400' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          Skills & Strengths
        </button>
      </div>
    </div>
  );
};

export default TabSelector;
