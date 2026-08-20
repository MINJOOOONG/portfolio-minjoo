"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seededRandom } from "@/lib/seeded-random";

/* ── Build sketch-style globe grid with subtle hand-drawn jitter ── */
function buildSketchGrid(radius: number, latCount: number, lonCount: number, segments: number, jitter: number) {
  const points: number[] = [];
  const rand = seededRandom(42);

  // Latitude rings
  for (let i = 1; i < latCount; i++) {
    const phi = (i / latCount) * Math.PI;
    for (let j = 0; j < segments; j++) {
      const t0 = (j / segments) * Math.PI * 2;
      const t1 = ((j + 1) / segments) * Math.PI * 2;
      // Add subtle per-vertex jitter for hand-drawn feel
      const j0 = 1 + (rand() - 0.5) * jitter;
      const j1 = 1 + (rand() - 0.5) * jitter;
      const r0 = radius * j0;
      const r1 = radius * j1;
      points.push(
        r0 * Math.sin(phi) * Math.cos(t0), r0 * Math.cos(phi), r0 * Math.sin(phi) * Math.sin(t0),
        r1 * Math.sin(phi) * Math.cos(t1), r1 * Math.cos(phi), r1 * Math.sin(phi) * Math.sin(t1),
      );
    }
  }

  // Longitude meridians
  for (let i = 0; i < lonCount; i++) {
    const theta = (i / lonCount) * Math.PI * 2;
    for (let j = 0; j < segments; j++) {
      const p0 = (j / segments) * Math.PI;
      const p1 = ((j + 1) / segments) * Math.PI;
      const j0 = 1 + (rand() - 0.5) * jitter;
      const j1 = 1 + (rand() - 0.5) * jitter;
      const r0 = radius * j0;
      const r1 = radius * j1;
      points.push(
        r0 * Math.sin(p0) * Math.cos(theta), r0 * Math.cos(p0), r0 * Math.sin(p0) * Math.sin(theta),
        r1 * Math.sin(p1) * Math.cos(theta), r1 * Math.cos(p1), r1 * Math.sin(p1) * Math.sin(theta),
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  return geometry;
}

/* ── Continent outlines with sketch jitter ── */
function buildSketchContinents(radius: number, jitter: number) {
  const r = radius * 1.003;
  const DEG = Math.PI / 180;
  const rand = seededRandom(77);

  const toXYZ = (lat: number, lon: number): [number, number, number] => {
    const rr = r * (1 + (rand() - 0.5) * jitter);
    const phi = (90 - lat) * DEG;
    const theta = (lon + 180) * DEG;
    return [
      rr * Math.sin(phi) * Math.cos(theta),
      rr * Math.cos(phi),
      rr * Math.sin(phi) * Math.sin(theta),
    ];
  };

  const continents: [number, number][][] = [
    // North America
    [[60,-145],[63,-140],[65,-135],[67,-140],[70,-145],[72,-150],[71,-157],[68,-162],[65,-165],[62,-163],[58,-155],[55,-133],[58,-125],[60,-120],[63,-115],[65,-110],[68,-105],[70,-100],[72,-95],[72,-85],[70,-80],[68,-76],[65,-70],[60,-65],[55,-58],[50,-55],[47,-53],[44,-59],[42,-63],[40,-67],[38,-72],[35,-75],[32,-78],[30,-81],[28,-82],[25,-80],[24,-82],[22,-85],[20,-87],[18,-88],[16,-88],[14,-84],[16,-90],[18,-95],[20,-100],[22,-105],[25,-108],[28,-112],[30,-115],[32,-117],[35,-120],[38,-122],[40,-124],[42,-124],[45,-124],[48,-124],[50,-126],[53,-130],[55,-133],[58,-138],[60,-145]],
    // South America
    [[12,-72],[10,-75],[8,-77],[5,-77],[2,-80],[0,-80],[-2,-79],[-5,-78],[-8,-76],[-10,-75],[-13,-74],[-15,-75],[-18,-70],[-20,-65],[-22,-60],[-25,-57],[-28,-55],[-30,-52],[-32,-50],[-35,-53],[-38,-57],[-40,-62],[-43,-65],[-45,-67],[-48,-66],[-50,-68],[-52,-70],[-55,-68],[-54,-65],[-52,-63],[-50,-60],[-47,-58],[-43,-55],[-40,-52],[-35,-48],[-30,-45],[-25,-42],[-20,-38],[-15,-35],[-10,-34],[-5,-34],[0,-48],[3,-55],[5,-60],[8,-62],[10,-67],[12,-72]],
    // Europe
    [[36,-8],[38,-5],[40,-2],[42,0],[43,3],[45,1],[46,3],[48,5],[50,4],[51,6],[53,7],[54,10],[56,12],[57,10],[58,12],[60,18],[62,22],[64,25],[66,26],[68,28],[70,30],[70,27],[68,22],[65,18],[62,14],[60,10],[58,8],[56,5],[54,3],[52,0],[50,-2],[48,-5],[46,-3],[44,-5],[42,-8],[40,-9],[38,-9],[36,-8]],
    // Africa
    [[35,-5],[37,0],[37,10],[33,12],[32,15],[30,20],[28,25],[25,30],[22,33],[18,37],[14,42],[10,45],[5,43],[2,42],[0,40],[-2,38],[-5,37],[-8,35],[-12,34],[-15,33],[-18,32],[-22,30],[-25,28],[-28,27],[-30,28],[-32,28],[-34,26],[-34,22],[-33,18],[-30,15],[-25,12],[-20,12],[-15,10],[-10,10],[-5,9],[0,8],[5,5],[8,2],[10,0],[12,-4],[15,-8],[18,-12],[20,-15],[22,-16],[25,-16],[28,-14],[30,-10],[33,-8],[35,-5]],
    // Asia
    [[70,30],[70,40],[70,55],[70,70],[68,80],[65,88],[63,95],[60,100],[55,108],[52,112],[48,115],[45,120],[42,125],[38,128],[35,130],[32,128],[30,122],[28,118],[25,115],[22,110],[18,108],[15,105],[12,102],[8,100],[5,98],[2,100],[0,103],[-2,105],[-5,108],[-7,110],[-8,112],[-6,115],[-3,118],[0,120],[3,118],[5,115],[8,112],[10,110],[12,108],[15,108],[18,110],[20,112],[22,114],[25,118],[28,120],[30,122],[33,126],[35,130],[38,132],[40,130],[42,132],[45,135],[48,140],[50,143],[52,140],[55,138],[58,135],[60,140],[63,145],[65,148],[68,150],[70,155],[72,160],[72,170],[72,180],[72,-175],[70,-170],[68,-168],[65,-170],[63,-168],[60,-163],[58,-155],[55,-162],[52,-168],[50,-172],[48,-175],[45,-178],[42,180],[40,175],[38,170],[35,170],[32,172],[30,170],[28,168],[25,165],[22,162],[20,158],[18,155],[15,150],[12,145],[10,140],[8,135],[5,130],[2,128],[0,125],[-2,120],[-5,115],[-8,110],[-5,105],[-2,100],[0,95],[2,90],[5,85],[8,80],[10,75],[12,70],[15,65],[18,60],[20,55],[22,50],[25,48],[28,45],[30,42],[32,40],[35,38],[38,36],[40,35],[42,33],[45,35],[48,38],[50,40],[52,42],[55,45],[58,48],[60,50],[62,48],[64,45],[66,42],[68,38],[70,35],[70,30]],
    // Australia
    [[-12,132],[-13,136],[-14,140],[-16,142],[-18,144],[-20,146],[-22,148],[-25,150],[-27,152],[-30,152],[-32,151],[-34,150],[-36,148],[-38,146],[-37,144],[-36,140],[-35,137],[-34,135],[-33,132],[-32,128],[-30,125],[-28,122],[-25,118],[-22,116],[-20,116],[-18,118],[-16,120],[-14,124],[-13,128],[-12,132]],
    // Japan
    [[33,130],[34,132],[36,136],[38,138],[40,140],[42,142],[44,144],[45,143],[43,141],[41,140],[39,138],[37,136],[35,134],[33,130]],
    // UK
    [[50,-6],[51,-3],[52,-1],[53,0],[54,0],[55,-2],[56,-3],[57,-5],[58,-5],[59,-3],[58,-3],[56,-2],[54,-1],[53,1],[52,2],[51,1],[50,0],[50,-6]],
  ];

  const points: number[] = [];
  for (const continent of continents) {
    for (let i = 1; i < continent.length; i++) {
      const [x1, y1, z1] = toXYZ(continent[i - 1][0], continent[i - 1][1]);
      const [x2, y2, z2] = toXYZ(continent[i][0], continent[i][1]);
      points.push(x1, y1, z1, x2, y2, z2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  return geometry;
}

/* ── Sketch globe — architectural wireframe earth ── */
function SketchGlobe({ zooming }: { zooming: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const zoomProgress = useRef(0);
  const hoverSpeed = useRef(0);

  // Fine grid — many thin sketch lines with hand-drawn jitter
  const fineGrid = useMemo(() => buildSketchGrid(1.8, 10, 14, 48, 0.012), []);
  // Structural meridians — fewer, slightly bolder, less jitter
  const structGrid = useMemo(() => buildSketchGrid(1.8, 3, 4, 64, 0.005), []);
  // Continent outlines — sketch jitter on coastlines
  const continents = useMemo(() => buildSketchContinents(1.8, 0.015), []);

  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) return;

    mouse.current.x += (pointer.x - mouse.current.x) * 0.15;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.15;

    const t = clock.getElapsedTime();

    const speed = Math.abs(pointer.x - mouse.current.x) + Math.abs(pointer.y - mouse.current.y);
    const targetHoverSpeed = Math.min(speed * 15, 1.2);
    hoverSpeed.current += (targetHoverSpeed - hoverSpeed.current) * 0.12;

    groupRef.current.rotation.x = 0.4 + mouse.current.y * 0.7;
    groupRef.current.rotation.y = t * (0.08 + hoverSpeed.current) + mouse.current.x * 0.8;

    const targetZoom = zooming ? 1 : 0;
    zoomProgress.current += (targetZoom - zoomProgress.current) * 0.03;
    const s = 1 + zoomProgress.current * 8;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      {/* Fine grid — whisper-thin architectural lines */}
      <lineSegments geometry={fineGrid}>
        <lineBasicMaterial color="#c8c8c8" transparent opacity={0.1} />
      </lineSegments>
      {/* Structural meridians — slightly stronger */}
      <lineSegments geometry={structGrid}>
        <lineBasicMaterial color="#aaaaaa" transparent opacity={0.22} />
      </lineSegments>
      {/* Continent sketch outlines — hand-drawn feel */}
      <lineSegments geometry={continents}>
        <lineBasicMaterial color="#777777" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

/* ── Atmospheric dust — soft floating square fragments ── */
interface DustConfig {
  count: number;
  spreadX: number;
  spreadY: number;
  zMin: number;
  zMax: number;
  sMin: number;
  sMax: number;
  speed: number;
  opacity: number;
}

function DustLayer({ cfg, zooming }: { cfg: DustConfig; zooming: boolean }) {
  const { count, spreadX, spreadY, zMin, zMax, sMin, sMax, speed, opacity } = cfg;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const zoomProg = useRef(0);

  const particlesRef = useRef<{ pos: Float32Array; vel: Float32Array; sc: Float32Array; rot: Float32Array } | null>(null);
  if (particlesRef.current == null) {
    const rand = seededRandom(count * 31 + spreadX * 17);
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const r = new Float32Array(count * 2); // angle, angVel
    for (let i = 0; i < count; i++) {
      p[i * 3] = (rand() - 0.5) * spreadX;
      p[i * 3 + 1] = (rand() - 0.5) * spreadY;
      p[i * 3 + 2] = zMin + rand() * (zMax - zMin);
      v[i * 3] = (rand() - 0.5) * 0.002 * speed;
      v[i * 3 + 1] = (rand() - 0.5) * 0.0015 * speed;
      v[i * 3 + 2] = (rand() - 0.5) * 0.0005 * speed;
      s[i] = sMin + rand() * (sMax - sMin);
      r[i * 2] = rand() * Math.PI * 2;
      r[i * 2 + 1] = (rand() - 0.5) * 0.006 * speed;
    }
    particlesRef.current = { pos: p, vel: v, sc: s, rot: r };
  }
  const { pos, vel, sc, rot } = particlesRef.current;

  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const tmp = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;

    mouse.current.x += (pointer.x * 4 - mouse.current.x) * 0.03;
    mouse.current.y += (pointer.y * 2.5 - mouse.current.y) * 0.03;

    const tz = zooming ? 1 : 0;
    zoomProg.current += (tz - zoomProg.current) * 0.03;

    const wx = spreadX * 0.55;
    const wy = spreadY * 0.55;

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;

      pos[ix] += vel[ix];
      pos[iy] += vel[iy];
      pos[iz] += vel[iz];
      rot[i * 2] += rot[i * 2 + 1];

      // Gentle mouse drift (not repulsion — more atmospheric)
      const dx = pos[ix] - mouse.current.x;
      const dy = pos[iy] - mouse.current.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 3) {
        pos[ix] += dx * 0.002;
        pos[iy] += dy * 0.002;
      }

      if (zooming) {
        pos[ix] *= 1 - zoomProg.current * 0.015;
        pos[iy] *= 1 - zoomProg.current * 0.015;
        pos[iz] -= zoomProg.current * 0.06;
      }

      if (pos[ix] > wx) pos[ix] = -wx;
      if (pos[ix] < -wx) pos[ix] = wx;
      if (pos[iy] > wy) pos[iy] = -wy;
      if (pos[iy] < -wy) pos[iy] = wy;

      tmp.position.set(pos[ix], pos[iy], pos[iz]);
      tmp.rotation.set(rot[i * 2], 0, rot[i * 2] * 0.6);
      const s = sc[i];
      tmp.scale.set(s, s, s);
      tmp.updateMatrix();
      meshRef.current.setMatrixAt(i, tmp.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geo, undefined, count]}>
      <meshBasicMaterial color="#b0b0b0" transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </instancedMesh>
  );
}

/* ── Layered atmospheric dust ── */
const DUST: DustConfig[] = [
  // Foreground — large, ghostly, very slow
  { count: 30, spreadX: 12, spreadY: 8, zMin: 2.5, zMax: 4.5, sMin: 0.05, sMax: 0.12, speed: 0.3, opacity: 0.04 },
  // Near — soft drifting
  { count: 80, spreadX: 14, spreadY: 9, zMin: 0.5, zMax: 3, sMin: 0.025, sMax: 0.06, speed: 0.5, opacity: 0.08 },
  // Mid — core atmosphere
  { count: 250, spreadX: 18, spreadY: 12, zMin: -2, zMax: 2, sMin: 0.01, sMax: 0.035, speed: 0.8, opacity: 0.14 },
  // Far — small fragments
  { count: 200, spreadX: 22, spreadY: 14, zMin: -5, zMax: -1, sMin: 0.006, sMax: 0.02, speed: 0.4, opacity: 0.1 },
  // Ultra-far — near-static dust motes
  { count: 180, spreadX: 28, spreadY: 18, zMin: -10, zMax: -4, sMin: 0.003, sMax: 0.01, speed: 0.15, opacity: 0.06 },
];

function Atmosphere({ zooming }: { zooming: boolean }) {
  return (
    <>
      {DUST.map((cfg, i) => (
        <DustLayer key={i} cfg={cfg} zooming={zooming} />
      ))}
    </>
  );
}

/* ── Camera ── */
function CameraController({ zooming }: { zooming: boolean }) {
  const zoomProgress = useRef(0);

  useFrame(({ camera }) => {
    const target = zooming ? 1 : 0;
    zoomProgress.current += (target - zoomProgress.current) * 0.025;
    camera.position.z = 5 - zoomProgress.current * 6;
  });

  return null;
}

/* ── Canvas ── */
export function ThreeBackground({ zooming }: { zooming: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SketchGlobe zooming={zooming} />
        <Atmosphere zooming={zooming} />
        <CameraController zooming={zooming} />
      </Canvas>
    </div>
  );
}
