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
              {/* Name + Icon */}
              <div className="flex items-center gap-2 mb-1">
                {data.icon && (
                  <img
                    src={`https://cdn.simpleicons.org/${data.icon}`}
                    alt=""
                    className="w-4 h-4 object-contain flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <p className="text-white font-semibold text-sm leading-tight">
                  {data.name}
                </p>
              </div>

              {/* Description */}
              {data.description && (
                <p className="text-gray-400 text-xs leading-snug">
                  {data.description}
                </p>
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
