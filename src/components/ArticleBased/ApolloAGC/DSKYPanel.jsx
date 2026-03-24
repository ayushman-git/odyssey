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
    progAlarm: false,
    verbMeaning: "MAJOR MODE CHANGE",
    nounMeaning: "MAJOR MODE NUMBER",
    description:
      "V37 N63 commands the computer to enter Program 63, the Powered Descent Initiation routine. The descent engine fires at full throttle. The crew confirms with PRO, and the burn begins.",
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
    progAlarm: false,
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "V16 N68 is the workhorse display of the descent. The AGC shows altitude in R1, descent rate in R2, and horizontal velocity in R3. It holds this display continuously so the crew can monitor the approach.",
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
    progAlarm: true,
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "The PROG light illuminates. The computer is still navigating, still showing V16 N68, but alarm 1202 has fired. BAILOUT has already restarted the EXEC. Armstrong says: \"Give us a reading on the 1202.\"",
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
    progAlarm: false,
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "Program 64 takes over. The lunar module pitches forward so Armstrong can see the landing zone. He spots a boulder field and takes manual control of horizontal thrust to fly past it.",
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
    progAlarm: false,
    verbMeaning: "MONITOR",
    nounMeaning: "ALT / ALTRATE / VEL",
    description:
      "Program 66 gives Armstrong full manual authority over attitude and horizontal velocity while the AGC manages throttle. The astronaut and the computer are now flying together.",
  },
];

const ALL_LIGHTS = [
  "COMP ACTY", "UPLINK ACTY", "NO ATT",
  "STBY", "KEY REL", "OPR ERR",
  "TEMP", "GIMBAL LOCK", "PROG",
  "RESTART", "TRACKER", "ALT",
];

function DigitDisplay({ label, value, alarm }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[8px] font-mono tracking-widest uppercase text-gray-500">
        {label}
      </span>
      <div className={`px-2 py-1.5 rounded min-w-[44px] text-center border ${
        alarm ? "border-gray-500 bg-gray-700" : "border-gray-700 bg-gray-800"
      }`}>
        <span
          className="text-[18px] font-mono font-semibold leading-none tracking-[0.15em] text-gray-100"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {padded}
        </span>
      </div>
    </div>
  );
}

function RegisterRow({ label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[9px] font-mono text-gray-600 w-4 flex-shrink-0">{label}</span>
      <div className="flex-1 px-2.5 py-1.5 bg-gray-800 border border-gray-700 rounded">
        <span
          className="text-[13px] font-mono text-gray-200 tracking-[0.18em]"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default function DSKYPanel() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const phase = PHASES[phaseIdx];

  return (
    <div className="my-10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
          Apollo 11 · July 20, 1969 · Interactive
        </p>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          DSKY — Display and Keyboard Unit
        </p>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start">
        {/* Hardware panel */}
        <div className="rounded-lg p-4 w-full sm:w-52 flex-shrink-0 bg-gray-900 border border-gray-700">
          {/* Indicator lights */}
          <div className="grid grid-cols-3 gap-x-2 gap-y-2 mb-4 pb-3.5 border-b border-gray-700/60">
            {ALL_LIGHTS.map((light) => {
              const active = light === "PROG" && phase.progAlarm;
              return (
                <div key={light} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500 ${
                    active ? "bg-gray-300" : "bg-gray-700 border border-gray-600"
                  }`} />
                  <span className={`text-[7px] font-mono tracking-widest uppercase leading-tight transition-colors duration-500 ${
                    active ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {light}
                  </span>
                </div>
              );
            })}
          </div>

          {/* VERB / NOUN / PROG */}
          <div className="flex justify-between mb-4 pb-3.5 border-b border-gray-700/60">
            <DigitDisplay label="VERB" value={phase.verb} alarm={false} />
            <DigitDisplay label="NOUN" value={phase.noun} alarm={false} />
            <DigitDisplay label="PROG" value={phase.prog} alarm={phase.progAlarm} />
          </div>

          {/* Registers */}
          <div className="space-y-2">
            <RegisterRow label="R1" value={phase.r1} />
            <RegisterRow label="R2" value={phase.r2} />
            <RegisterRow label="R3" value={phase.r3} />
          </div>

          <p className="text-[7px] font-mono text-gray-700 text-center mt-4 tracking-widest uppercase">
            VERB · NOUN · ENTR · CLR · RSET
          </p>
        </div>

        {/* Info panel */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{phase.time}</span>
            <span className="text-gray-300 dark:text-gray-600 text-[10px]">·</span>
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{phase.altitude} AGL</span>
            {phase.progAlarm && (
              <>
                <span className="text-gray-300 dark:text-gray-600 text-[10px]">·</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 rounded-[2px]">
                  Alarm 1202
                </span>
              </>
            )}
          </div>

          <div>
            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-100 mb-2">{phase.label}</p>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{phase.description}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
              Decoding the display
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 w-8 flex-shrink-0">V{phase.verb}</span>
                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">{phase.verbMeaning}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 w-8 flex-shrink-0">N{phase.noun}</span>
                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">{phase.nounMeaning}</span>
              </div>
            </div>
          </div>

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
                      : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
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
