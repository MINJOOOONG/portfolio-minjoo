"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWireframeMaterial, useLineMaterial, useReducedMotion, floatY } from "./shared";

const STATES = [
  { pos: [-0.8, 0.5, 0] as [number, number, number] },
  { pos: [0.8, 0.5, 0] as [number, number, number] },
  { pos: [0.8, -0.5, 0] as [number, number, number] },
  { pos: [-0.8, -0.5, 0] as [number, number, number] },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
];

export default function StateMachineScene() {
  const groupRef = useRef<THREE.Group>(null);
  const activeRef = useRef<THREE.Mesh>(null);
  const wireMat = useWireframeMaterial();
  const lineMat = useLineMaterial();
  const reduced = useReducedMotion();

  const curvePositions = useMemo(() => {
    const pts: number[] = [];
    for (const [a, b] of EDGES) {
      pts.push(...STATES[a].pos, ...STATES[b].pos);
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = floatY(t, 0);

    // Cycle active state highlight
    if (activeRef.current) {
      const idx = Math.floor(t * 0.5) % STATES.length;
      const s = STATES[idx];
      activeRef.current.position.set(s.pos[0], s.pos[1], s.pos[2]);
      activeRef.current.material = activeRef.current.material as THREE.MeshBasicMaterial;
      (activeRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* State nodes */}
      {STATES.map((s, i) => (
        <mesh key={i} position={s.pos} material={wireMat}>
          <sphereGeometry args={[0.18, 12, 12]} />
        </mesh>
      ))}
      {/* Active state glow */}
      <mesh ref={activeRef} position={STATES[0].pos}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshBasicMaterial color="#c0c0c0" transparent opacity={0.15} />
      </mesh>
      {/* Transition lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[curvePositions, 3]}
            count={curvePositions.length / 3}
          />
        </bufferGeometry>
        <primitive object={lineMat} attach="material" />
      </lineSegments>
    </group>
  );
}
