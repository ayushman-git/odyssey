"use client";

import { useEffect, useState } from "react";

const REACTIONS = [
  { key: "like",     emoji: "👍", label: "Like"     },
  { key: "fire",     emoji: "🔥", label: "Fire"     },
  { key: "clap",     emoji: "👏", label: "Clap"     },
  { key: "thinking", emoji: "🤔", label: "Thinking" },
];

function loadReacted(slug) {
  try {
    const raw = localStorage.getItem(`reactions:${slug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReacted(slug, reacted) {
  try {
    localStorage.setItem(`reactions:${slug}`, JSON.stringify(reacted));
  } catch {}
}

export default function ArticleReactions({ slug }) {
  const [mounted, setMounted]   = useState(false);
  const [counts, setCounts]     = useState(null);
  const [reacted, setReacted]   = useState([]);
  const [bouncing, setBouncing] = useState(null);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    setMounted(true);
    setReacted(loadReacted(slug));
    fetch(`/api/reactions/${slug}`)
      .then((r) => r.json())
      .then(({ reactions }) => {
        setCounts(reactions);
        setTimeout(() => setVisible(true), 50);
      })
      .catch(() => setVisible(true));
  }, [slug]);

  function handleReact(key) {
    if (reacted.includes(key)) return;

    setCounts((prev) => ({ ...prev, [key]: (prev?.[key] ?? 0) + 1 }));
    const next = [...reacted, key];
    setReacted(next);
    saveReacted(slug, next);
    setBouncing(key);
    setTimeout(() => setBouncing(null), 500);

    fetch(`/api/reactions/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reaction: key }),
    }).catch(() => {});
  }

  if (!mounted) return null;

  return (
    <div className="mb-12">
      <style>{`
        @keyframes reactionPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes reactionFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Label */}
      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 font-mono tracking-wider uppercase mb-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span>Did this resonate?</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Tiles */}
      <div className="flex items-stretch justify-center gap-1">
        {REACTIONS.map((r, i) => {
          const selected = reacted.includes(r.key);
          const count    = counts?.[r.key] ?? null;

          return (
            <button
              key={r.key}
              onClick={() => handleReact(r.key)}
              disabled={selected}
              aria-label={`React with ${r.label}`}
              className={[
                "group flex flex-col items-center gap-2 px-5 py-4 transition-transform duration-150",
                selected ? "cursor-default" : "cursor-pointer hover:-translate-y-0.5 active:scale-95",
              ].join(" ")}
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? `reactionFadeUp 0.2s ease-out ${i * 0.06}s both` : "none",
              }}
            >
              {/* Emoji */}
              <span
                className="text-2xl leading-none select-none transition-opacity duration-200"
                style={{
                  display: "inline-block",
                  opacity: selected ? 1 : 0.35,
                  animation: bouncing === r.key ? "reactionPop 0.2s ease-out" : "none",
                }}
              >
                {r.emoji}
              </span>

              {/* Count */}
              <span
                className={[
                  "text-xs font-mono tabular-nums leading-none transition-colors duration-200",
                  selected ? "text-black dark:text-white" : "text-gray-300 dark:text-gray-600",
                ].join(" ")}
              >
                {count !== null ? count.toLocaleString() : "–"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
