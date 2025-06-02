"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, AdditiveBlending } from "three";
import { useCallback, useMemo } from "react";

export default function Stars({ count = 500 }) {
  const mesh = useRef();

  // Generate star positions and sizes
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Even smaller random sizes - reduced maximum size
      sizes[i] = Math.random() * 0.15 + 0.03;
    }

    return { positions, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      // Reduced rotation speed for slower floating effect
      mesh.current.rotation.y += 0.00008;
      mesh.current.rotation.x += 0.00005;
    }
  });

  // Create a circular texture for the stars
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    // Create a radial gradient (circular shape)
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(240, 240, 255, 0.5)");
    gradient.addColorStop(1, "rgba(240, 240, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particlesPosition.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation={true}
        color="#FFFFFF"
        transparent
        opacity={0.8}
        fog={true}
        map={starTexture}
        blending={AdditiveBlending}
      />
    </points>
  );
}
