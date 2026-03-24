"use client";

import { useState } from "react";

const PHASES = [
  {
    id: "pdi",
    label: "Powered Descent",
    time: "T−12:00",
    altitude: "50,000 ft",
    verb: "37",
    noun: "63",
    prog: "63",
    r1: "+50000",
    r2: "-03100",
    r3: "-00340",
    lights: {},
    verbMeaning: "MAJOR MODE CHANGE",
    nounMeaning: "MAJOR MODE NUMBER",
    description:
      "The descent engine fires at full throttle. V37 N63 tells the computer to enter Program 63, the Powered Descent Initiation routine. The crew confirms with PRO — and the burn begins.",
  },
  {
    id: "braking",
    label: "Braking Phase",
    time: "T−8:26",
    altitude: "28,000 ft",
    verb: "16",
    noun: "68",
    prog: "63",
    r1: "+28000",
    r2: "-02200",
    r3: "-00185",
    lights: {},
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "V16 N68 is the workhorse of the descent. The AGC holds this display continuously so the crew can watch altitude drop in R1, altitude rate in R2, and horizontal velocity in R3. Everything is nominal.",
  },
  {
    id: "alarm",
    label: "1202 Alarm",
    time: "T−7:23",
    altitude: "33,500 ft",
    verb: "16",
    noun: "68",
    prog: "63",
    r1: "+33500",
    r2: "-02145",
    r3: "-00023",
    lights: { PROG: true },
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "The PROG light flashes. The computer is still showing V16 N68, still navigating — but it has raised alarm 1202 to signal it is overloaded. BAILOUT has already fired and restarted the EXEC. Armstrong says: \"Give us a reading on the 1202.\"",
  },
  {
    id: "approach",
    label: "P64 Approach",
    time: "T−4:08",
    altitude: "7,200 ft",
    verb: "16",
    noun: "68",
    prog: "64",
    r1: "+07200",
    r2: "-00815",
    r3: "+00000",
    lights: {},
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "Program 64 takes over. The lunar module pitches forward so Armstrong can see the landing zone through the window. He spots a boulder field where the computer wants to land, and takes manual control of horizontal thrust.",
  },
  {
    id: "manual",
    label: "Manual Control",
    time: "T−0:40",
    altitude: "250 ft",
    verb: "16",
    noun: "68",
    prog: "66",
    r1: "+00250",
    r2: "-00017",
    r3: "-00004",
    lights: {},
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "Armstrong flies manually over the boulder field. Program 66 gives him full control of attitude and horizontal velocity while the AGC keeps managing throttle. The computer and the astronaut are now flying together.",
  },
];

const ALL_LIGHTS = [
  "COMP ACTY",
  "UPLINK ACTY",
  "NO ATT",
  "STBY",
  "KEY REL",
  "OPR ERR",
  "TEMP",
  "GIMBAL LOCK",
  "PROG",
  "RESTART",
  "TRACKER",
  "ALT",
];

function SegDisplay({ value, digits = 2, glow = "green" }) {
  const padded = String(value).padStart(digits, "0").slice(-digits);
  const glowColor = glow === "yellow" ? "#facc15" : "#4ade80";
  return (
    <div
      className="flex gap-0.5"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {padded.split("").map((ch, i) => (
        <span
          key={i}
          className="text-[22px] font-bold leading-none"
          style={{
            color: glowColor,
            textShadow: `0 0 6px ${glowColor}88, 0 0 2px ${glowColor}`,
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  );
}

function RegisterDisplay({ label, value }) {
  const sign = value[0];
  const digits = value.slice(1);
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-black rounded border border-gray-800">
      <span className="text-[10px] font-mono text-gray-600 w-4 flex-shrink-0">
        {label}
      </span>
      <div
        className="flex items-center gap-1"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        <span
          className="text-[16px] font-bold leading-none w-4"
          style={{ color: "#4ade80", textShadow: "0 0 5px #4ade8088" }}
        >
          {sign}
        </span>
        {digits.split("").map((ch, i) => (
          <span
            key={i}
            className="text-[16px] font-bold leading-none"
            style={{ color: "#4ade80", textShadow: "0 0 5px #4ade8088" }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DSKYPanel() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phase = PHASES[phaseIdx];

  return (
    <div className="my-10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
          Apollo 11 · July 20, 1969 · Interactive
        </p>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          DSKY — Display and Keyboard Unit
        </p>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start">
        {/* DSKY Hardware Panel */}
        <div
          className="rounded-lg p-4 w-full sm:w-56 flex-shrink-0"
          style={{
            background:
              "linear-gradient(145deg, #1c1c1e 0%, #111113 60%, #0d0d0f 100%)",
            border: "2px solid #2a2a2e",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Indicator lights grid */}
          <div className="grid grid-cols-3 gap-x-2 gap-y-1.5 mb-4 pb-3 border-b border-gray-800">
            {ALL_LIGHTS.map((light) => {
              const active = Boolean(phase.lights[light]);
              return (
                <div key={light} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500"
                    style={
                      active
                        ? {
                            backgroundColor: "#facc15",
                            boxShadow:
                              "0 0 6px 2px #facc1588, 0 0 2px #facc15",
                          }
                        : {
                            backgroundColor: "#1f1f23",
                            border: "1px solid #333",
                          }
                    }
                  />
                  <span
                    className="text-[7px] font-mono tracking-widest uppercase leading-tight"
                    style={{ color: active ? "#facc15" : "#444" }}
                  >
                    {light}
                  </span>
                </div>
              );
            })}
          </div>

          {/* VERB / NOUN / PROG row */}
          <div className="flex justify-between mb-3 pb-3 border-b border-gray-800">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] font-mono tracking-widest text-gray-600">
                VERB
              </span>
              <SegDisplay value={phase.verb} digits={2} glow="green" />
            </div>
            <div className="w-px bg-gray-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] font-mono tracking-widest text-gray-600">
                NOUN
              </span>
              <SegDisplay value={phase.noun} digits={2} glow="green" />
            </div>
            <div className="w-px bg-gray-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] font-mono tracking-widest text-gray-600">
                PROG
              </span>
              <SegDisplay
                value={phase.prog}
                digits={2}
                glow={phase.lights.PROG ? "yellow" : "green"}
              />
            </div>
          </div>

          {/* Data registers */}
          <div className="space-y-1.5">
            <RegisterDisplay label="R1" value={phase.r1} />
            <RegisterDisplay label="R2" value={phase.r2} />
            <RegisterDisplay label="R3" value={phase.r3} />
          </div>

          {/* Keypad hint */}
          <p className="text-[7px] font-mono text-gray-700 text-center mt-3 tracking-widest uppercase">
            VERB · NOUN · ENTR · CLR · RSET
          </p>
        </div>

        {/* Info panel */}
        <div className="space-y-5">
          {/* Time / altitude */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-wide text-gray-400 dark:text-gray-500">
              {phase.time}
            </span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
              {phase.altitude} AGL
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100 mb-2">
              {phase.label}
            </p>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {phase.description}
            </p>
          </div>

          {/* VERB / NOUN decode */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
              Decoding the display
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-green-600 dark:text-green-500 w-8 flex-shrink-0">
                  V{phase.verb}
                </span>
                <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
                  {phase.verbMeaning}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-green-600 dark:text-green-500 w-8 flex-shrink-0">
                  N{phase.noun}
                </span>
                <span className="text-[11px] font-mono text-gray-600 dark:text-gray-400">
                  {phase.nounMeaning}
                </span>
              </div>
            </div>
          </div>

          {/* Phase selector */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
              Mission phase
            </p>
            <div className="flex flex-wrap gap-2">
              {PHASES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setPhaseIdx(i)}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all ${
                    i === phaseIdx
                      ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
