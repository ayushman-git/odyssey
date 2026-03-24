"use client";

import { useState } from "react";

const TOTAL_ERASABLE = 2048;

const memorySegments = [
  {
    id: "exec",
    label: "EXEC Tables",
    words: 180,
    color: "#ef4444",
    usage: "OS Kernel",
    description:
      "The Executive's job table and core sets. Tracks up to 8 concurrent jobs — each entry stores the job's priority level, program counter, and register state. During the 1202 alarm, every one of these 8 slots was occupied, causing the overflow that triggered BAILOUT.",
  },
  {
    id: "nav",
    label: "Navigation State",
    words: 420,
    color: "#f97316",
    usage: "Navigation",
    description:
      "Current position, velocity, and attitude vectors in three axes. Updated 25 times per second by the Inertial Measurement Unit. This was the most flight-critical data — the BAILOUT routine was specifically designed to preserve navigation state above all else.",
  },
  {
    id: "imu",
    label: "IMU & Sensor Data",
    words: 220,
    color: "#eab308",
    usage: "Sensors",
    description:
      "Raw accelerometer and gyroscope readings from the Inertial Measurement Unit, plus RCS thruster data. Used by the navigation routines to integrate position changes since the last update cycle.",
  },
  {
    id: "dsky",
    label: "DSKY Interface",
    words: 128,
    color: "#22c55e",
    usage: "Display / Input",
    description:
      "Buffers for the Display & Keyboard unit (DSKY) — the crew's only interface to the computer. Stores the current display readout and queued keypresses. The 1202 alarm code was output to this buffer, flashing on the panel to alert Armstrong and Aldrin.",
  },
  {
    id: "guidance",
    label: "Guidance Programs",
    words: 580,
    color: "#3b82f6",
    usage: "Guidance",
    description:
      "Working memory for the active guidance program. During lunar descent, Program 63 (Braking) and Program 64 (Approach) used this space to store target landing coordinates, thrust calculations, and throttle commands sent to the engine.",
  },
  {
    id: "misc",
    label: "Scratch / Misc",
    words: 520,
    color: "#8b5cf6",
    usage: "General",
    description:
      "Temporary variables for arithmetic, interpretive routine stacks, error flag registers, and mode bits. Also includes the erasable rope shadow — a small writable mirror of fixed-memory constants that routines could modify at runtime.",
  },
];

export default function AGCMemoryMap() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (seg) => {
    setSelected((prev) => (prev?.id === seg.id ? null : seg));
  };

  return (
    <div className="my-10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
              Apollo Guidance Computer — Block II
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Memory Architecture
            </p>
          </div>
          <div className="flex gap-6 text-right font-mono">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">ROM</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">36,864 words</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">≈ 72 KB</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">RAM</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">2,048 words</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">≈ 4 KB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* ROM vs RAM proportion bar */}
        <div>
          <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
            Total memory (proportional)
          </p>
          <div className="flex h-7 rounded overflow-hidden text-[10px] font-mono">
            <div
              className="flex items-center justify-center text-white bg-blue-600"
              style={{ width: `${(36864 / 38912) * 100}%` }}
            >
              Core Rope ROM — 36,864 words
            </div>
            <div
              className="flex items-center justify-center text-white bg-red-500"
              style={{ width: `${(2048 / 38912) * 100}%` }}
            >
              RAM
            </div>
          </div>
          <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1.5">
            Software was literally{" "}
            <span className="italic">woven into wire</span> in the ROM — copper
            threads looped through magnetic cores by hand. Each bit took ~8
            hours of factory labor.
          </p>
        </div>

        {/* Erasable memory breakdown */}
        <div>
          <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
            Erasable memory breakdown — click a segment to explore
          </p>

          {/* Segmented bar */}
          <div
            className="flex h-10 rounded overflow-hidden mb-3 cursor-pointer"
            role="list"
          >
            {memorySegments.map((seg) => (
              <div
                key={seg.id}
                role="listitem"
                aria-label={seg.label}
                onClick={() => handleSelect(seg)}
                className="transition-all duration-150 hover:brightness-110 active:brightness-90"
                style={{
                  width: `${(seg.words / TOTAL_ERASABLE) * 100}%`,
                  backgroundColor: seg.color,
                  opacity: selected && selected.id !== seg.id ? 0.35 : 1,
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {memorySegments.map((seg) => (
              <button
                key={seg.id}
                onClick={() => handleSelect(seg)}
                className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                {seg.label}
                <span className="text-gray-400 dark:text-gray-600">
                  ({seg.words}w)
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected ? (
          <div
            className="rounded-lg p-4 border text-sm transition-all duration-200"
            style={{
              borderColor: selected.color + "50",
              backgroundColor: selected.color + "12",
            }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: selected.color }}
              />
              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {selected.label}
              </span>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                style={{
                  borderColor: selected.color + "50",
                  color: selected.color,
                }}
              >
                {selected.usage}
              </span>
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 ml-auto">
                {selected.words} words ·{" "}
                {Math.round((selected.words * 15) / 8)} bytes ·{" "}
                {((selected.words / TOTAL_ERASABLE) * 100).toFixed(1)}% of RAM
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-[13px] leading-relaxed">
              {selected.description}
            </p>
          </div>
        ) : (
          <div className="rounded-lg p-4 border border-dashed border-gray-200 dark:border-gray-700 text-center">
            <p className="text-[12px] font-mono text-gray-400 dark:text-gray-500">
              Click any segment above to see what lived in that memory region
              during lunar descent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
