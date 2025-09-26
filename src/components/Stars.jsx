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
    const originalSizes = new Float32Array(count);
    const originalColors = new Float32Array(count * 3);
    const twinkleData = new Float32Array(count * 3); // [shouldTwinkle, speed, phase]

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Varied star sizes with some larger bright stars
      const baseSize = Math.random() * 0.25 + 0.05;
      sizes[i] = baseSize;
      originalSizes[i] = baseSize;

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

      // Store original values
      originalColors[i * 3] = r;
      originalColors[i * 3 + 1] = g;
      originalColors[i * 3 + 2] = b;

      // Twinkling data - 30% of stars twinkle
      twinkleData[i * 3] = Math.random() < 0.3 ? 1 : 0; // shouldTwinkle
      twinkleData[i * 3 + 1] = Math.random() * 2 + 1; // speed (1-3)
      twinkleData[i * 3 + 2] = Math.random() * Math.PI * 2; // phase offset
    }

    return { positions, sizes, colors, originalSizes, originalColors, twinkleData };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;

      // Dynamic rotation with sine wave for organic movement
      const baseSpeed = 0.00015;

      // Create pulsing speed variation using sine waves
      const speedMultiplierY = 1 + 0.8 * Math.sin(time * 0.3);
      const speedMultiplierX = 1 + 0.6 * Math.sin(time * 0.2 + Math.PI / 4);

      mesh.current.rotation.y += baseSpeed * speedMultiplierY;
      mesh.current.rotation.x += baseSpeed * 0.7 * speedMultiplierX;

      // Update twinkling stars
      const sizes = particlesData.sizes;
      const colors = particlesData.colors;
      const originalSizes = particlesData.originalSizes;
      const originalColors = particlesData.originalColors;
      const twinkleData = particlesData.twinkleData;

      for (let i = 0; i < count; i++) {
        if (twinkleData[i * 3] === 1) { // shouldTwinkle
          const speed = twinkleData[i * 3 + 1];
          const phase = twinkleData[i * 3 + 2];

          // Create twinkling effect using sine wave
          const twinkle = 0.5 + 0.5 * Math.sin(time * speed + phase);
          const intensity = 0.3 + 0.7 * twinkle; // 30% to 100% intensity

          // Apply twinkle to size
          sizes[i] = originalSizes[i] * intensity;

          // Apply twinkle to color
          colors[i * 3] = originalColors[i * 3] * intensity;
          colors[i * 3 + 1] = originalColors[i * 3 + 1] * intensity;
          colors[i * 3 + 2] = originalColors[i * 3 + 2] * intensity;
        } else {
          // Non-twinkling stars stay at original values
          sizes[i] = originalSizes[i];
          colors[i * 3] = originalColors[i * 3];
          colors[i * 3 + 1] = originalColors[i * 3 + 1];
          colors[i * 3 + 2] = originalColors[i * 3 + 2];
        }
      }

      // Mark attributes for update
      mesh.current.geometry.attributes.size.needsUpdate = true;
      mesh.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  // Create a more realistic star texture with proper falloff
  const starTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    const centerX = 16;
    const centerY = 16;

    // Create a single gradient with sharper falloff for realistic appearance
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);

    // Sharp bright core that fades quickly
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(0.45, "rgba(255, 255, 255, 0.08)");
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.02)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    // Draw the gradient
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
        size={0.06}
        sizeAttenuation={true}
        vertexColors={true}
        transparent
        opacity={0.85}
        fog={false}
        map={starTexture}
        blending={AdditiveBlending}
        alphaTest={0.01}
      />
    </points>
  );
}
