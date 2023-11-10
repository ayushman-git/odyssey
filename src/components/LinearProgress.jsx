"use client";

import useScrollPosition from "@/hooks/useScrollPosition";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function LinearProgress() {
  const [mounted, setMouted] = useState(false);
  const percentage = useScrollPosition();

  useEffect(() => {
    const linearId = document.getElementById("linear-progress");
    setMouted(linearId);
  }, []);

  return mounted
    ? createPortal(
        <div>
          <div
            className="h-1 bg-teal-500"
            style={{
              width: `${percentage || 0}%`,
            }}
          ></div>
        </div>,
        mounted
      )
    : null;
}
