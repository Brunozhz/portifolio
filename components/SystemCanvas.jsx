"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Line, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const LAYERS = [
  { color: "#72d7b7", width: 2.8, depth: 0.18 },
  { color: "#9bc7ff", width: 2.35, depth: 0.16 },
  { color: "#d8c79a", width: 1.9, depth: 0.14 },
  { color: "#e7f0ec", width: 1.45, depth: 0.12 }
];

function smoothstep(value) {
  const clamped = THREE.MathUtils.clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function Layer({ index, progressRef }) {
  const ref = useRef(null);
  const config = LAYERS[index];

  useFrame((_, delta) => {
    const open = smoothstep((progressRef.current - index * 0.12) / 0.7);
    const direction = index % 2 === 0 ? 1 : -1;
    const target = {
      x: direction * open * (0.2 + index * 0.1),
      y: open * index * 0.52,
      z: index * 0.22 + open * index * 0.2,
      rotation: direction * open * (0.035 + index * 0.012)
    };

    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, target.x, 5, delta);
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, target.y, 5, delta);
      ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, target.z, 5, delta);
      ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, target.rotation, 5, delta);
    }
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[config.width, config.depth, 0.12]} radius={0.08} smoothness={3}>
        <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={0.15} roughness={0.28} metalness={0.5} transparent opacity={0.86} />
      </RoundedBox>
      <mesh position={[-config.width * 0.3, 0, 0.085]}>
        <boxGeometry args={[config.width * 0.16, 0.035, 0.025]} />
        <meshBasicMaterial color="#071014" transparent opacity={0.76} />
      </mesh>
      <mesh position={[config.width * 0.2, 0, 0.085]}>
        <boxGeometry args={[config.width * 0.24, 0.035, 0.025]} />
        <meshBasicMaterial color="#071014" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function SystemAssembly({ scrollProgress, reducedMotion }) {
  const group = useRef(null);
  const progressRef = useRef(0);

  useFrame((state, delta) => {
    progressRef.current = reducedMotion ? 0 : scrollProgress.get();
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (progressRef.current - 0.5) * 0.32, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.08 + progressRef.current * 0.08, 4, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(state.clock.elapsedTime * 0.45) * 0.035, 3, delta);
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.12, -0.18]}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#0f2529" emissive="#72d7b7" emissiveIntensity={0.2} roughness={0.24} metalness={0.7} wireframe />
      </mesh>
      {LAYERS.map((_, index) => <Layer key={index} index={index} progressRef={progressRef} />)}
      <Line points={[[-1.42, 0, 0], [-2.15, 0, 0], [-2.48, 0.55, 0.05]]} color="#72d7b7" transparent opacity={0.4} lineWidth={0.7} />
      <Line points={[[1.42, 0, 0], [2.15, 0, 0], [2.48, -0.55, 0.05]]} color="#9bc7ff" transparent opacity={0.32} lineWidth={0.7} />
      <mesh position={[-2.48, 0.55, 0.05]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#72d7b7" />
      </mesh>
      <mesh position={[2.48, -0.55, 0.05]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#9bc7ff" />
      </mesh>
    </group>
  );
}

export default function SystemCanvas({ scrollProgress, reducedMotion }) {
  return (
    <div className="system-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 35 }} dpr={[1, 1.4]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.1} color="#c9f5e4" />
        <pointLight position={[-3, -2, 2]} intensity={5} distance={8} color="#72d7b7" />
        <Float speed={reducedMotion ? 0 : 0.45} rotationIntensity={reducedMotion ? 0 : 0.04} floatIntensity={reducedMotion ? 0 : 0.15}>
          <SystemAssembly scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        </Float>
        <ContactShadows position={[0, -1.15, 0]} opacity={0.28} scale={5} blur={2.5} far={3} color="#0a171b" />
        <Environment preset="city" environmentIntensity={0.28} />
      </Canvas>
    </div>
  );
}
