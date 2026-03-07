"use client";

import { motion } from "framer-motion";

const NEOFETCH_COLORS = [
  "bg-black",
  "bg-red-600",
  "bg-green-600",
  "bg-yellow-500",
  "bg-blue-600",
  "bg-purple-600",
  "bg-cyan-500",
  "bg-white",
];

const SpecRow = ({ label, value, accentColor }) => (
  <div className="flex gap-2 text-xs font-mono leading-relaxed">
    <span className={`${accentColor} min-w-[72px] shrink-0`}>{label}</span>
    <span className="text-white/40 shrink-0">:</span>
    <span className="text-gray-200">{value}</span>
  </div>
);

const HardwareCard = ({ machine, variants }) => {
  const {
    label,
    hostname,
    machine: machineName,
    os,
    cpu,
    gpu,
    ram,
    storage,
    display,
    shell,
    uptime,
    glowColor,
    glowColorInner,
    accentColor,
    borderColor,
  } = machine;

  return (
    <motion.div
      variants={variants}
      className={`rounded-xl border ${borderColor} p-5 font-mono`}
      style={{
        background: "rgba(255,255,255,0.03)",
        boxShadow: `0 0 40px ${glowColor}, inset 0 0 40px ${glowColorInner}`,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-purple-400">{hostname}</span>
          <span className="text-white/30">@</span>
          <span className={accentColor}>{machineName}</span>
        </div>
        <span className="text-[10px] tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded">
          {label}
        </span>
      </div>

      <div className="flex gap-4">
        {/* Color blocks — neofetch aesthetic */}
        <div className="flex flex-col gap-1 pt-1 shrink-0">
          <div className="flex gap-1">
            {NEOFETCH_COLORS.slice(0, 4).map((c) => (
              <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          <div className="flex gap-1">
            {NEOFETCH_COLORS.slice(4).map((c) => (
              <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
          </div>
          {/* Vertical separator */}
          <div className="mt-2 w-full border-t border-white/10" />
        </div>

        {/* Spec rows */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <SpecRow label="OS" value={os} accentColor={accentColor} />
          <SpecRow label="CPU" value={cpu} accentColor={accentColor} />
          <SpecRow label="GPU" value={gpu} accentColor={accentColor} />
          <SpecRow label="Memory" value={ram} accentColor={accentColor} />
          <SpecRow label="Storage" value={storage} accentColor={accentColor} />
          <SpecRow label="Display" value={display} accentColor={accentColor} />
          <SpecRow label="Shell" value={shell} accentColor={accentColor} />
          <SpecRow label="Uptime" value={uptime} accentColor={accentColor} />
        </div>
      </div>
    </motion.div>
  );
};

export default HardwareCard;
