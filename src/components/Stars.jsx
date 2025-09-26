"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, AdditiveBlending } from "three";
import { useCallback, useMemo } from "react";

export default function Stars({ count = 800 }) {
  const mesh = useRef();

  // Generate star positions, sizes, and colors
  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Varied star sizes with some larger bright stars
      sizes[i] = Math.random() * 0.25 + 0.05;

      // Star color distribution: mostly neutral white, some warm/cool
      const starType = Math.random();
      let r, g, b;

      if (starType < 0.75) {
        // Neutral white stars (75%)
        r = 1.0;
        g = 0.95 + Math.random() * 0.05;
        b = 0.9 + Math.random() * 0.1;
      } else if (starType < 0.92) {
        // Warm K-type stars (17%) - 4500-5200K
        r = 1.0;
        g = 0.8 + Math.random() * 0.1;
        b = 0.6 + Math.random() * 0.2;
      } else {
        // Cool A0-B type stars (8%) - 8000-9000K
        r = 0.8 + Math.random() * 0.15;
        g = 0.9 + Math.random() * 0.1;
        b = 1.0;
      }

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    return { positions, sizes, colors };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      // Dynamic rotation with sine wave for organic movement
      const time = state.clock.elapsedTime;
      const baseSpeed = 0.00015;

      // Create pulsing speed variation using sine waves
      const speedMultiplierY = 1 + 0.8 * Math.sin(time * 0.3);
      const speedMultiplierX = 1 + 0.6 * Math.sin(time * 0.2 + Math.PI / 4);

      mesh.current.rotation.y += baseSpeed * speedMultiplierY;
      mesh.current.rotation.x += baseSpeed * 0.7 * speedMultiplierX;
    }
  });

  // Create a realistic star texture with bright core and glow
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    const centerX = 32;
    const centerY = 32;

    // Create multiple gradient layers for realistic star appearance
    // Inner bright core
    const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 8);
    coreGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    coreGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.9)");
    coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    // Outer glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 32);
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    glowGradient.addColorStop(0.1, "rgba(255, 255, 255, 0.4)");
    glowGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.1)");
    glowGradient.addColorStop(0.6, "rgba(255, 255, 255, 0.02)");
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    // Draw outer glow first
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, 64, 64);

    // Draw bright core on top
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = coreGradient;
    ctx.fillRect(0, 0, 64, 64);

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
          array={particlesData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particlesData.sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation={true}
        vertexColors={true}
        transparent
        opacity={0.9}
        fog={false}
        map={starTexture}
        blending={AdditiveBlending}
      />
    </points>
  );
}
