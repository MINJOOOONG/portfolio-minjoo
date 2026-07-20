"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWireframeMaterial, useLineMaterial, useReducedMotion, floatY } from "./shared";

export default function ConsoleScene() {
  const groupRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const wireMat = useWireframeMaterial();
  const lineMat = useLineMaterial();
  const reduced = useReducedMotion();

  // UI element lines inside monitor — useRef to avoid impure Math.random in useMemo
  const uiLinesRef = useRef<Float32Array | null>(null);
  if (!uiLinesRef.current) {
    const pts: number[] = [];
    for (let i = 0; i < 4; i++) {
      const y = 0.25 - i * 0.15;
      const w = 0.3 + Math.random() * 0.4;
      pts.push(-0.45, y, 0.26, -0.45 + w, y, 0.26);
    }
    uiLinesRef.current = new Float32Array(pts);
  }
  const uiLines = uiLinesRef.current;

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.1;
    groupRef.current.position.y = floatY(t, 0);

    // Scanline sweep
    if (scanRef.current) {
      scanRef.current.position.y = ((t * 0.4) % 1) * 0.8 - 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Monitor box */}
      <mesh material={wireMat}>
        <boxGeometry args={[1.4, 0.9, 0.5]} />
      </mesh>
      {/* Screen face */}
      <mesh position={[0, 0, 0.26]} material={wireMat}>
        <planeGeometry args={[1.2, 0.7]} />
      </mesh>
      {/* UI lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[uiLines, 3]}
            count={uiLines.length / 3}
          />
        </bufferGeometry>
        <primitive object={lineMat} attach="material" />
      </lineSegments>
      {/* Scanline */}
      <mesh ref={scanRef} position={[0, 0, 0.27]}>
        <planeGeometry args={[1.1, 0.02]} />
        <meshBasicMaterial color="#c0c0c0" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
