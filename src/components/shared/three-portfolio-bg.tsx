"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seededRandom } from "@/lib/seeded-random";
import { useActiveSection } from "@/hooks/use-active-section";

/* ── Section parameter targets ── */
interface SectionParams {
  shapes: number;
  particles: number;
  lines: number;
  rotSpeed: number;
}

const SECTION_PARAMS: Record<string, SectionParams> = {
  about:          { shapes: 0.20, particles: 0.40, lines: 0.10, rotSpeed: 0.03 },
  experience:     { shapes: 0.30, particles: 0.55, lines: 0.10, rotSpeed: 0.06 },
  projects:       { shapes: 0.15, particles: 0.35, lines: 0.20, rotSpeed: 0.04 },
  skills:         { shapes: 0.35, particles: 0.30, lines: 0.15, rotSpeed: 0.08 },
  education:      { shapes: 0.25, particles: 0.50, lines: 0.12, rotSpeed: 0.05 },
  contact:        { shapes: 0.25, particles: 0.50, lines: 0.12, rotSpeed: 0.05 },
};

const DEFAULT_PARAMS: SectionParams = { shapes: 0.25, particles: 0.50, lines: 0.12, rotSpeed: 0.05 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ── Shared section state (bridging DOM context → R3F) ── */
const sectionState = { current: "about" };

function SectionBridge() {
  const active = useActiveSection();
  useEffect(() => {
    sectionState.current = active;
  }, [active]);
  return null;
}

/* ── Scroll-reactive floating wireframe shapes ── */
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const shapeMatsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const params = useRef<SectionParams>({ ...DEFAULT_PARAMS });

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shapes = useMemo(() => {
    return [
      { pos: [-3.5, 2, -2] as [number, number, number], geo: "icosahedron", size: 1.2, speed: 0.06 },
      { pos: [4, -1, -3] as [number, number, number], geo: "octahedron", size: 0.9, speed: 0.08 },
      { pos: [-1, -3, -1.5] as [number, number, number], geo: "dodecahedron", size: 0.7, speed: 0.05 },
      { pos: [2.5, 3, -2.5] as [number, number, number], geo: "tetrahedron", size: 0.6, speed: 0.1 },
      { pos: [-4, 0.5, -4] as [number, number, number], geo: "icosahedron", size: 0.5, speed: 0.07 },
    ];
  }, []);

  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) return;

    const target = SECTION_PARAMS[sectionState.current] ?? DEFAULT_PARAMS;
    params.current.shapes = lerp(params.current.shapes, target.shapes, 0.02);
    params.current.rotSpeed = lerp(params.current.rotSpeed, target.rotSpeed, 0.02);

    mouse.current.x += (pointer.x - mouse.current.x) * 0.03;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.03;

    const t = clock.getElapsedTime();
    const scrollOffset = scrollY.current * 0.0003;
    const rotMul = params.current.rotSpeed / 0.05;

    groupRef.current.children.forEach((child, i) => {
      const shape = shapes[i];
      if (!shape) return;

      child.rotation.x = t * shape.speed * rotMul + mouse.current.y * 0.2;
      child.rotation.y = t * shape.speed * 1.3 * rotMul + mouse.current.x * 0.2;

      child.position.y = shape.pos[1] + Math.sin(t * 0.3 + i * 1.5) * 0.4;
      child.position.x = shape.pos[0] + Math.cos(t * 0.2 + i * 2) * 0.2;
      child.position.y -= scrollOffset * (i + 1) * 0.5;
    });

    // Update material opacity
    for (const mat of shapeMatsRef.current) {
      mat.opacity = params.current.shapes;
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos}>
          {s.geo === "icosahedron" && <icosahedronGeometry args={[s.size, 1]} />}
          {s.geo === "octahedron" && <octahedronGeometry args={[s.size, 0]} />}
          {s.geo === "dodecahedron" && <dodecahedronGeometry args={[s.size, 0]} />}
          {s.geo === "tetrahedron" && <tetrahedronGeometry args={[s.size, 0]} />}
          <meshBasicMaterial
            color="#d0d0d0"
            wireframe
            transparent
            opacity={0.25}
            ref={(mat) => {
              if (mat) shapeMatsRef.current[i] = mat;
            }}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Floating particles ── */
function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const count = 120;
  const mouse = useRef({ x: 0, y: 0 });
  const params = useRef<SectionParams>({ ...DEFAULT_PARAMS });

  const { positions, velocities } = useMemo(() => {
    const rand = seededRandom(120);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 16;
      pos[i * 3 + 1] = (rand() - 0.5) * 10;
      pos[i * 3 + 2] = (rand() - 0.5) * 8;
      vel[i * 3] = (rand() - 0.5) * 0.002;
      vel[i * 3 + 1] = (rand() - 0.5) * 0.002;
      vel[i * 3 + 2] = (rand() - 0.5) * 0.001;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ pointer }) => {
    if (!pointsRef.current) return;

    const target = SECTION_PARAMS[sectionState.current] ?? DEFAULT_PARAMS;
    params.current.particles = lerp(params.current.particles, target.particles, 0.02);

    mouse.current.x += (pointer.x * 5 - mouse.current.x) * 0.03;
    mouse.current.y += (pointer.y * 3 - mouse.current.y) * 0.03;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      posArray[ix] += velocities[ix];
      posArray[iy] += velocities[iy];
      posArray[iz] += velocities[iz];

      const dx = posArray[ix] - mouse.current.x;
      const dy = posArray[iy] - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        const force = (2 - dist) * 0.005;
        posArray[ix] += dx * force;
        posArray[iy] += dy * force;
      }

      if (posArray[ix] > 9) posArray[ix] = -9;
      if (posArray[ix] < -9) posArray[ix] = 9;
      if (posArray[iy] > 6) posArray[iy] = -6;
      if (posArray[iy] < -6) posArray[iy] = 6;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = params.current.particles;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#bbb"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Connecting lines between nearby particles ── */
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const count = 60;
  const scrollY = useRef(0);
  const params = useRef<SectionParams>({ ...DEFAULT_PARAMS });

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const basePositions = useMemo(() => {
    const rand = seededRandom(60);
    const pos: number[] = [];
    const points: [number, number, number][] = [];

    for (let i = 0; i < count; i++) {
      points.push([
        (rand() - 0.5) * 14,
        (rand() - 0.5) * 10,
        (rand() - 0.5) * 6 - 2,
      ]);
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const dz = points[i][2] - points[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3) {
          pos.push(...points[i], ...points[j]);
        }
      }
    }

    return new Float32Array(pos);
  }, []);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;

    const target = SECTION_PARAMS[sectionState.current] ?? DEFAULT_PARAMS;
    params.current.lines = lerp(params.current.lines, target.lines, 0.02);

    const t = clock.getElapsedTime();
    linesRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
    linesRef.current.rotation.x = Math.cos(t * 0.03) * 0.05;
    linesRef.current.position.y = -scrollY.current * 0.0005;

    if (matRef.current) {
      matRef.current.opacity = params.current.lines;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[basePositions, 3]}
          count={basePositions.length / 3}
        />
      </bufferGeometry>
      <lineBasicMaterial ref={matRef} color="#ddd" transparent opacity={0.12} />
    </lineSegments>
  );
}

/* ── Main portfolio background canvas ── */
export function ThreePortfolioBg() {
  return (
    <>
      <SectionBridge />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", pointerEvents: "auto" }}
        >
          <FloatingShapes />
          <BackgroundParticles />
          <ConnectionLines />
        </Canvas>
      </div>
    </>
  );
}
