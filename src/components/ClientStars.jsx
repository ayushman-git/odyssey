"use client";

import React, { Suspense } from "react";
import Stars from "./Stars";
import { Canvas } from "@react-three/fiber";

export default function ClientStars() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
}
