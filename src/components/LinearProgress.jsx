"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function LinearProgress({ percentage }) {
  const [mounted, setMouted] = useState(false);
  const [readPercentage, setReadPercentage] = useState(0);
  useEffect(() => {
    addEventListener("scroll", getReadPercentage);
    const linearId = document.getElementById("linear-progress");
    setMouted(linearId);
  }, []);
  const getReadPercentage = () => {
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;
    const currentScrollPosition = window.scrollY;

    const availableHeight = scrollHeight - clientHeight;
    const percentage = (currentScrollPosition / availableHeight) * 100;
    setReadPercentage(percentage);
  };
  return mounted
    ? createPortal(
        <div>
          <div
            className="h-1 bg-teal-500"
            style={{
              width: `${readPercentage || 0}%`,
            }}
          ></div>
        </div>,
        mounted
      )
    : null;
}
