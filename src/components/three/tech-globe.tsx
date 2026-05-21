"use client";

import { useRef, useState, useCallback, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "./project-scenes/shared";
import type { IconType } from "react-icons";
import {
  SiSpringboot,
  SiRedis,
  SiApachekafka,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiDocker,
  SiJira,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

/* ── Skill metadata ── */
interface SkillMeta {
  icon?: IconType;
  color: string;
  desc: string;
}

const SKILL_META: Record<string, SkillMeta> = {
  Java:               { icon: FaJava,           color: "#007396", desc: "Spring 기반 백엔드 서비스 구현" },
  "Spring Boot":      { icon: SiSpringboot,     color: "#6DB33F", desc: "REST API, 트랜잭션, 이벤트 처리 구현" },
  Redis:              { icon: SiRedis,          color: "#DC382D", desc: "대기열, 랭킹, 캐싱 구조 구현 경험" },
  Kafka:              { icon: SiApachekafka,    color: "#231F20", desc: "이벤트 기반 주문/랭킹 파이프라인 구현" },
  PostgreSQL:         { icon: SiPostgresql,     color: "#4169E1", desc: "관계형 데이터 모델 설계 및 쿼리 최적화" },
  React:              { icon: SiReact,          color: "#61DAFB", desc: "컴포넌트 기반 UI 설계 및 상태 관리" },
  "Next.js":          { icon: SiNextdotjs,      color: "#000000", desc: "SSR/RSC 분리 기반 포트폴리오·블로그 구현" },
  TypeScript:         { icon: SiTypescript,     color: "#3178C6", desc: "타입 안전한 프론트엔드·백엔드 개발" },
  Docker:             { icon: SiDocker,         color: "#2496ED", desc: "컨테이너 기반 개발 환경 구성" },
  Jira:               { icon: SiJira,           color: "#0052CC", desc: "이슈 트래킹, QA 워크플로우 관리" },
};

/* ── Featured skills — these orbit the globe ── */
const FEATURED_SKILLS = [
  "Java", "Spring Boot", "Redis", "Kafka", "PostgreSQL",
  "React", "Next.js", "TypeScript", "Docker", "Jira",
];

/* ── Types ── */
interface HoveredSkill {
  name: string;
  desc: string;
  color: string;
  icon?: IconType;
}

/* ── Wireframe Globe — large, subtle ── */
function WireframeGlobe() {
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: "#c0c0c0",
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    }),
    []
  );
  const geometry = useMemo(() => new THREE.SphereGeometry(9, 48, 48), []);
  return <mesh geometry={geometry} material={material} />;
}

/* ── Latitude / longitude lines ── */
function GlobeLines() {
  const lines = useMemo(() => {
    const result: THREE.Vector3[][] = [];
    const r = 9.1;

    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      const phi = (90 - lat) * (Math.PI / 180);
      for (let i = 0; i <= 72; i++) {
        const theta = (i / 72) * Math.PI * 2;
        points.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ));
      }
      result.push(points);
    }

    for (let lon = 0; lon < 180; lon += 45) {
      const points: THREE.Vector3[] = [];
      const theta = lon * (Math.PI / 180);
      for (let i = 0; i <= 72; i++) {
        const phi = (i / 72) * Math.PI;
        points.push(new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ));
      }
      result.push(points);
    }

    return result;
  }, []);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#d0d0d0", transparent: true, opacity: 0.07 }),
    []
  );

  return (
    <>
      {lines.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return <lineLoop key={i} geometry={geo} material={material} />;
      })}
    </>
  );
}

/* ── Single skill icon node ── */
const SkillNode = memo(function SkillNode({
  name,
  position,
  onHover,
  onLeave,
}: {
  name: string;
  position: [number, number, number];
  onHover: (skill: HoveredSkill) => void;
  onLeave: () => void;
}) {
  const meta = SKILL_META[name];
  const Icon = meta?.icon;
  const color = meta?.color || "#888";

  return (
    <group position={position}>
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="skill-node"
          onMouseEnter={() => onHover({ name, desc: meta?.desc || "", color, icon: Icon })}
          onMouseLeave={onLeave}
        >
          <div className="skill-node__icon" style={{ color }}>
            {Icon ? <Icon size={20} /> : <span className="skill-node__initial">{name[0]}</span>}
          </div>
          <span className="skill-node__label">{name}</span>
        </div>
      </Html>
    </group>
  );
});

/* ── Orbit ring ── */
function OrbitRing({
  skills,
  radius,
  tilt,
  speed,
  offsetAngle,
  onHover,
  onLeave,
  reducedMotion,
}: {
  skills: string[];
  radius: number;
  tilt: number;
  speed: number;
  offsetAngle: number;
  onHover: (skill: HoveredSkill) => void;
  onLeave: () => void;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tiltRad = (tilt * Math.PI) / 180;

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += speed * delta;
    }
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const angle = offsetAngle + (i / skills.length) * Math.PI * 2;
      return [
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle),
      ] as [number, number, number];
    });
  }, [skills, radius, offsetAngle]);

  return (
    <group ref={groupRef} rotation={[tiltRad, 0, 0]}>
      {skills.map((name, i) => (
        <SkillNode key={name} name={name} position={positions[i]} onHover={onHover} onLeave={onLeave} />
      ))}
    </group>
  );
}

/* ── Main 3D scene ── */
function GlobeScene({
  onHover,
  onLeave,
}: {
  onHover: (skill: HoveredSkill) => void;
  onLeave: () => void;
}) {
  const reducedMotion = useReducedMotion();

  const ring1 = FEATURED_SKILLS.slice(0, 5);
  const ring2 = FEATURED_SKILLS.slice(5, 10);

  return (
    <>
      <ambientLight intensity={0.5} />

      <WireframeGlobe />
      <GlobeLines />

      {/* Outer ring — wide orbit, slight tilt */}
      <OrbitRing
        skills={ring1}
        radius={12.5}
        tilt={-12}
        speed={0.04}
        offsetAngle={0}
        onHover={onHover}
        onLeave={onLeave}
        reducedMotion={reducedMotion}
      />

      {/* Inner ring — different radius, opposite tilt */}
      <OrbitRing
        skills={ring2}
        radius={11.5}
        tilt={28}
        speed={-0.03}
        offsetAngle={Math.PI / 5}
        onHover={onHover}
        onLeave={onLeave}
        reducedMotion={reducedMotion}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.15}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={(2.5 * Math.PI) / 3.5}
      />
    </>
  );
}

/* ── Hover tooltip — only visible when hovering ── */
function SkillTooltip({ skill }: { skill: HoveredSkill | null }) {
  if (!skill) return null;
  const Icon = skill.icon;

  return (
    <div className="tech-globe-tooltip">
      <div className="tech-globe-tooltip__header">
        {Icon && (
          <span className="tech-globe-tooltip__icon" style={{ color: skill.color }}>
            <Icon size={14} />
          </span>
        )}
        <span className="tech-globe-tooltip__name">{skill.name}</span>
      </div>
      <p className="tech-globe-tooltip__desc">{skill.desc}</p>
    </div>
  );
}

/* ── Exported TechGlobe — globe only, no text lists ── */
export function TechGlobe() {
  const [hovered, setHovered] = useState<HoveredSkill | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleHover = useCallback((skill: HoveredSkill) => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setHovered(skill);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimeout.current = setTimeout(() => setHovered(null), 200);
  }, []);

  return (
    <div className="tech-globe-container">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <GlobeScene onHover={handleHover} onLeave={handleLeave} />
      </Canvas>
      <SkillTooltip skill={hovered} />
    </div>
  );
}

/* ── Mobile fallback — kept simple ── */
export function MobileSkillsList({ data }: { data: Record<string, string[]> }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mobile-skills">
      {Object.entries(data).map(([category, skills]) => (
        <div key={category} className="mobile-skills__category">
          <h3 className="mobile-skills__category-title">{category}</h3>
          <div className="mobile-skills__grid">
            {skills.map((name) => {
              const meta = SKILL_META[name];
              const Icon = meta?.icon;
              const isActive = active === name;

              return (
                <div key={name}>
                  <button
                    className={`skill-node skill-node--mobile ${isActive ? "skill-node--active" : ""}`}
                    onClick={() => setActive(isActive ? null : name)}
                  >
                    <div
                      className="skill-node__icon"
                      style={isActive ? { color: meta?.color } : undefined}
                    >
                      {Icon ? <Icon size={18} /> : <span className="skill-node__initial">{name[0]}</span>}
                    </div>
                    <span className="skill-node__label skill-node__label--mobile">{name}</span>
                  </button>
                  {isActive && meta?.desc && (
                    <p className="mobile-skills__desc">{meta.desc}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
