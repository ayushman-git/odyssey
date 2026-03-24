"use client";

import { useState } from "react";

const PROCESSORS = [
  {
    name: "AGC Block II",
    year: 1969,
    mhz: 2.048,
    color: "#f97316",
    note: "Apollo 11 — landed on the Moon",
    category: "apollo",
  },
  {
    name: "Intel 8086",
    year: 1978,
    mhz: 10,
    color: "#eab308",
    note: "First x86 processor",
    category: "vintage",
  },
  {
    name: "Intel 486 DX",
    year: 1989,
    mhz: 25,
    color: "#a3e635",
    note: "Era of early Windows PCs",
    category: "vintage",
  },
  {
    name: "Pentium MMX",
    year: 1997,
    mhz: 200,
    color: "#4ade80",
    note: "Late 90s desktop PC",
    category: "vintage",
  },
  {
    name: "Raspberry Pi Zero 2W",
    year: 2021,
    mhz: 1000,
    color: "#22d3ee",
    note: "A $15 computer with 488× the AGC",
    category: "modern",
  },
  {
    name: "iPhone 14 A15",
    year: 2022,
    mhz: 3230,
    color: "#818cf8",
    note: "In your pocket right now",
    category: "modern",
  },
  {
    name: "Apple M4 Max",
    year: 2024,
    mhz: 4500,
    color: "#e879f9",
    note: "Roughly 2,197× faster than the AGC",
    category: "modern",
  },
];

const LOG_MIN = Math.log10(PROCESSORS[0].mhz);
const LOG_MAX = Math.log10(PROCESSORS[PROCESSORS.length - 1].mhz);

function formatMhz(mhz) {
  if (mhz >= 1000) return `${(mhz / 1000).toFixed(mhz % 1000 === 0 ? 0 : 2)} GHz`;
  return `${mhz} MHz`;
}

function logPct(mhz) {
  return ((Math.log10(mhz) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
}

export default function AGCClockComparison() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="my-10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
          Clock Speed — Logarithmic Scale
        </p>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          The AGC vs half a century of progress
        </p>
      </div>

      <div className="p-5 space-y-3.5">
        {PROCESSORS.map((proc) => {
          const pct = logPct(proc.mhz);
          const isHovered = hovered === proc.name;
          const dimmed = hovered && !isHovered;

          return (
            <div
              key={proc.name}
              onMouseEnter={() => setHovered(proc.name)}
              onMouseLeave={() => setHovered(null)}
              className="group cursor-default"
            >
              {/* Name + speed */}
              <div className="flex items-baseline justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[12px] font-mono transition-colors duration-200"
                    style={{
                      color: dimmed
                        ? undefined
                        : proc.color,
                      opacity: dimmed ? 0.35 : 1,
                    }}
                  >
                    {proc.name}
                  </span>
                  <span
                    className="text-[10px] font-mono text-gray-400 dark:text-gray-500 transition-opacity duration-200"
                    style={{ opacity: dimmed ? 0.3 : 1 }}
                  >
                    {proc.year}
                  </span>
                </div>
                <span
                  className="text-[11px] font-mono transition-opacity duration-200"
                  style={{
                    color: dimmed ? undefined : proc.color,
                    opacity: dimmed ? 0.3 : 1,
                  }}
                >
                  {formatMhz(proc.mhz)}
                </span>
              </div>

              {/* Bar */}
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: proc.color,
                    opacity: dimmed ? 0.2 : 1,
                  }}
                />
              </div>

              {/* Hover note */}
              <div
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: isHovered ? 32 : 0, opacity: isHovered ? 1 : 0 }}
              >
                <p
                  className="text-[10px] font-mono mt-1 transition-colors"
                  style={{ color: proc.color }}
                >
                  {proc.note}
                </p>
              </div>
            </div>
          );
        })}

        {/* Scale explanation */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1.5">
          <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
            Bars are proportional on a{" "}
            <span className="italic">logarithmic</span> scale. Each step
            represents a 10× increase.
          </p>
          <p className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
            On a linear scale, the AGC bar would be{" "}
            <span className="font-medium text-gray-600 dark:text-gray-300">
              0.045%
            </span>{" "}
            of the M4 Max bar. It would be invisible.
          </p>
        </div>
      </div>
    </div>
  );
}
