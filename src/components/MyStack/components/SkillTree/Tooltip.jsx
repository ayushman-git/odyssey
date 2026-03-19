"use client";

import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ data }) => {
  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key={data.name}
          className="absolute pointer-events-none z-50"
          style={{
            left: data.x,
            top: data.y,
            transform: 'translate(-50%, calc(-100% - 14px))',
          }}
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Card */}
          <div
            className="relative min-w-[160px] max-w-[220px] rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10, 10, 15, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: `0 0 0 1px ${data.color}22, 0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${data.color}18`,
            }}
          >
            {/* Colored top accent bar */}
            <div
              className="h-[3px] w-full"
              style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}66)` }}
            />

            <div className="px-3.5 py-3">
              {/* Name */}
              <p className="text-white font-semibold text-sm leading-tight mb-1">
                {data.name}
              </p>

              {/* Description */}
              {data.description && (
                <p className="text-gray-400 text-xs leading-snug mb-2.5">
                  {data.description}
                </p>
              )}

              {/* Proficiency bar */}
              {data.level != null && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Proficiency</span>
                    <span className="text-[10px] font-medium" style={{ color: data.color }}>
                      {data.level}%
                    </span>
                  </div>
                  <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${data.color}bb, ${data.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${data.level}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              bottom: -6,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `6px solid rgba(255,255,255,0.06)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
