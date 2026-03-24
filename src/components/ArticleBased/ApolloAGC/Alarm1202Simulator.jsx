"use client";

import { useState } from "react";

// Job accent shades — all within the gray/neutral family
const JOB_SHADES = {
  nav:    { border: "border-l-gray-800 dark:border-l-gray-300",   text: "text-gray-800 dark:text-gray-200" },
  guide:  { border: "border-l-gray-700 dark:border-l-gray-400",   text: "text-gray-700 dark:text-gray-300" },
  thrust: { border: "border-l-gray-600 dark:border-l-gray-400",   text: "text-gray-600 dark:text-gray-400" },
  dsky:   { border: "border-l-gray-500 dark:border-l-gray-500",   text: "text-gray-600 dark:text-gray-400" },
  crew:   { border: "border-l-gray-400 dark:border-l-gray-600",   text: "text-gray-500 dark:text-gray-400" },
  r1:     { border: "border-l-gray-400 dark:border-l-gray-600",   text: "text-gray-500 dark:text-gray-500" },
  r2:     { border: "border-l-gray-400 dark:border-l-gray-600",   text: "text-gray-500 dark:text-gray-500" },
  r3:     { border: "border-l-gray-400 dark:border-l-gray-600",   text: "text-gray-500 dark:text-gray-500" },
};

const STAGES = [
  {
    id: "normal",
    step: 1,
    title: "Normal Descent",
    subtitle: "60,000 ft above the Moon — T minus 8 minutes to landing",
    description:
      "The EXEC is managing 5 concurrent jobs. Everything is nominal. The computer cycles through its job table roughly 40 times per second, executing each program in priority order.",
    jobs: [
      { id: "nav",    name: "NAVIGATION",   priority: 1, note: "Position + velocity — 25Hz update" },
      { id: "guide",  name: "GUIDANCE",     priority: 2, note: "P63 Braking — descent trajectory" },
      { id: "thrust", name: "THRUST VEC",   priority: 3, note: "Engine gimbal + throttle" },
      { id: "dsky",   name: "DSKY DISPLAY", priority: 4, note: "Crew readout — altitude, velocity" },
      { id: "crew",   name: "CREW MONITOR", priority: 5, note: "System health checks" },
    ],
    droppedJobs: [],
    cpuLoad: 72,
    alarmCode: null,
    slotsUsed: 5,
  },
  {
    id: "radar",
    step: 2,
    title: "Rendezvous Radar Left On",
    subtitle: "A switch that should have been OFF is ON",
    description:
      "The rendezvous radar, used for docking not landing, was inadvertently left active. It fires interrupt requests continuously, stealing ~13% of the CPU every second. The EXEC begins spawning radar handler jobs to process these interrupts.",
    jobs: [
      { id: "nav",    name: "NAVIGATION",   priority: 1, note: "Position + velocity — 25Hz update" },
      { id: "guide",  name: "GUIDANCE",     priority: 2, note: "P63 Braking — descent trajectory" },
      { id: "thrust", name: "THRUST VEC",   priority: 3, note: "Engine gimbal + throttle" },
      { id: "dsky",   name: "DSKY DISPLAY", priority: 4, note: "Crew readout — altitude, velocity" },
      { id: "crew",   name: "CREW MONITOR", priority: 5, note: "System health checks" },
      { id: "r1",     name: "RADAR IRQ",    priority: 7, note: "Rendezvous radar interrupt — not needed!", spurious: true },
      { id: "r2",     name: "RADAR IRQ",    priority: 7, note: "Rendezvous radar interrupt — not needed!", spurious: true },
    ],
    droppedJobs: [],
    cpuLoad: 88,
    alarmCode: null,
    slotsUsed: 7,
  },
  {
    id: "overflow",
    step: 3,
    title: "Executive Overflow",
    subtitle: "All 8 job slots full — a new job cannot be scheduled",
    description:
      "The EXEC's job table has exactly 8 slots. All are occupied. A new job arrives and finds no room. The Executive has no safe way to proceed. It raises alarm code 1202.",
    jobs: [
      { id: "nav",    name: "NAVIGATION",   priority: 1, note: "Position + velocity — 25Hz update" },
      { id: "guide",  name: "GUIDANCE",     priority: 2, note: "P63 Braking — descent trajectory" },
      { id: "thrust", name: "THRUST VEC",   priority: 3, note: "Engine gimbal + throttle" },
      { id: "dsky",   name: "DSKY DISPLAY", priority: 4, note: "Crew readout — altitude, velocity" },
      { id: "crew",   name: "CREW MONITOR", priority: 5, note: "System health checks" },
      { id: "r1",     name: "RADAR IRQ",    priority: 7, note: "Rendezvous radar interrupt — not needed!", spurious: true },
      { id: "r2",     name: "RADAR IRQ",    priority: 7, note: "Rendezvous radar interrupt — not needed!", spurious: true },
      { id: "r3",     name: "RADAR IRQ",    priority: 7, note: "Cannot be scheduled — no slot available", spurious: true, overflow: true },
    ],
    droppedJobs: [],
    cpuLoad: 100,
    alarmCode: "1202",
    slotsUsed: 8,
  },
  {
    id: "bailout",
    step: 4,
    title: "BAILOUT Executes",
    subtitle: "Controlled restart — critical programs preserved",
    description:
      "The BAILOUT routine performs a selective restart. It clears all low-priority jobs, including every radar interrupt handler, and reinitializes the EXEC from scratch, but crucially restores navigation and guidance state from protected memory. The computer does not forget where it is.",
    jobs: [
      { id: "nav",    name: "NAVIGATION",   priority: 1, note: "KEPT — navigation state preserved from protected memory" },
      { id: "guide",  name: "GUIDANCE",     priority: 2, note: "KEPT — trajectory program restarted" },
      { id: "thrust", name: "THRUST VEC",   priority: 3, note: "KEPT — engine still controlled" },
      { id: "dsky",   name: "DSKY DISPLAY", priority: 4, note: "KEPT — alarm code shown to crew" },
    ],
    droppedJobs: [
      { name: "CREW MONITOR", reason: "Low priority — dropped to free slot" },
      { name: "RADAR IRQ ×3", reason: "Dropped — radar handler cleared entirely" },
    ],
    cpuLoad: 65,
    alarmCode: "1202",
    slotsUsed: 4,
  },
  {
    id: "recovery",
    step: 5,
    title: "GO for Landing",
    subtitle: "Recovery in under 2 seconds — mission continues",
    description:
      "The computer resumes normal guidance within 1.5 seconds of the restart. Flight controller Jack Garman tells Steve Bales: \"GO. We're GO.\" The radar keeps firing interrupts, but BAILOUT keeps executing fast enough that guidance is never lost.",
    jobs: [
      { id: "nav",    name: "NAVIGATION",   priority: 1, note: "Position + velocity — resumed" },
      { id: "guide",  name: "GUIDANCE",     priority: 2, note: "P64 Approach — switched automatically" },
      { id: "thrust", name: "THRUST VEC",   priority: 3, note: "Engine gimbal + throttle" },
      { id: "dsky",   name: "DSKY DISPLAY", priority: 4, note: "Crew readout restored" },
      { id: "crew",   name: "CREW MONITOR", priority: 5, note: "Health checks restored" },
    ],
    droppedJobs: [],
    cpuLoad: 72,
    alarmCode: null,
    slotsUsed: 5,
  },
];

function CpuBar({ load }) {
  const barClass =
    load >= 100 ? "bg-gray-800 dark:bg-gray-200"
    : load >= 85  ? "bg-gray-600 dark:bg-gray-400"
    :               "bg-gray-400 dark:bg-gray-600";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500">
          CPU Load
        </span>
        <span className={`text-[11px] font-mono font-medium ${
          load >= 100 ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
        }`}>
          {load}%
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClass}`}
          style={{ width: `${load}%` }}
        />
      </div>
    </div>
  );
}

function JobSlot({ job, index }) {
  if (!job) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-2 rounded border border-dashed border-gray-200 dark:border-gray-700">
        <span className="text-[10px] font-mono text-gray-300 dark:text-gray-600 w-3 text-center">{index + 1}</span>
        <span className="text-[11px] font-mono text-gray-300 dark:text-gray-600 italic">empty</span>
      </div>
    );
  }

  const shade = JOB_SHADES[job.id] || JOB_SHADES.crew;

  return (
    <div
      className={`flex items-start gap-2.5 px-3 py-2 rounded border transition-all duration-300 ${
        job.overflow
          ? "animate-pulse border-gray-500 bg-gray-100 dark:border-gray-500 dark:bg-gray-800/60"
          : `border-gray-200 dark:border-gray-700/80 border-l-2 ${shade.border}`
      }`}
    >
      <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 w-3 text-center flex-shrink-0 mt-0.5">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[11px] font-mono font-medium ${
            job.overflow ? "text-gray-700 dark:text-gray-300" : shade.text
          }`}>
            {job.name}
          </span>
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">P{job.priority}</span>
          {job.spurious && !job.overflow && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              spurious
            </span>
          )}
          {job.overflow && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              NO SLOT
            </span>
          )}
        </div>
        <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 leading-relaxed truncate">
          {job.note}
        </p>
      </div>
    </div>
  );
}

export default function Alarm1202Simulator() {
  const [step, setStep] = useState(0);
  const stage = STAGES[step];

  const slots = Array.from({ length: 8 }, (_, i) => stage.jobs[i] || null);

  return (
    <div className="my-10 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 font-mono">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
              Apollo 11 · July 20, 1969 · Simulation
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              The 1202 Program Alarm
            </p>
          </div>
          {stage.alarmCode && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-400 animate-pulse" />
              <span className="text-xs text-gray-600 dark:text-gray-400 tracking-widest uppercase">
                ALARM {stage.alarmCode}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            className={`flex-1 py-2.5 text-[10px] tracking-widest uppercase transition-colors ${
              i === step
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100"
                : "bg-gray-50 dark:bg-gray-800/40 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-5">
        {/* Stage info */}
        <div>
          <p className="text-xs text-gray-800 dark:text-gray-200 font-medium mb-0.5">{stage.title}</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3">{stage.subtitle}</p>
          <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{stage.description}</p>
        </div>

        <CpuBar load={stage.cpuLoad} />

        {/* EXEC Job Table */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500">
              EXEC Job Table
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              <span className={stage.slotsUsed === 8 ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-700 dark:text-gray-300"}>
                {stage.slotsUsed}
              </span>
              {" / 8 slots used"}
            </p>
          </div>
          <div className="space-y-1.5">
            {slots.map((job, i) => (
              <JobSlot key={i} job={job} index={i} />
            ))}
          </div>
        </div>

        {/* Dropped jobs */}
        {stage.droppedJobs.length > 0 && (
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
              Dropped by BAILOUT
            </p>
            <div className="space-y-1.5">
              {stage.droppedJobs.map((d, i) => (
                <div key={i} className="flex items-start gap-2.5 px-3 py-2 rounded border border-dashed border-gray-200 dark:border-gray-700 opacity-50">
                  <span className="text-gray-400 text-xs mt-0.5">✕</span>
                  <div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-through">{d.name}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{d.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-widest uppercase">
            Step {step + 1} / {STAGES.length}
          </span>
          <button
            onClick={() => setStep((s) => Math.min(STAGES.length - 1, s + 1))}
            disabled={step === STAGES.length - 1}
            className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
