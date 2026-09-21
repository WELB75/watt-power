"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SolarPanel() {
  const cells = useMemo(() => {
    const items: Array<[number, number]> = [];
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 6; col += 1) {
        items.push([-1.42 + col * 0.57, 0.87 - row * 0.58]);
      }
    }
    return items;
  }, []);

  return (
    <group rotation={[-0.18, 0.25, -0.08]}>
      <mesh>
        <boxGeometry args={[3.55, 2.45, 0.12]} />
        <meshStandardMaterial color="#0d1416" metalness={0.9} roughness={0.22} />
      </mesh>
      {cells.map(([x, y], index) => (
        <mesh key={index} position={[x, y, 0.075]}>
          <boxGeometry args={[0.48, 0.47, 0.02]} />
          <meshStandardMaterial
            color="#111c1e"
            metalness={0.65}
            roughness={0.3}
            emissive="#182c24"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.13]}>
        <boxGeometry args={[3.85, 2.75, 0.08]} />
        <meshStandardMaterial color="#171b1c" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function HeroWorld() {
  const root = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);

  const energyCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.8, 1.9, -1.5),
        new THREE.Vector3(1.8, 1.15, -0.5),
        new THREE.Vector3(0.7, 0.5, 0.15),
        new THREE.Vector3(-0.35, 0.1, 0.2),
      ]),
    [],
  );

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group || reducedMotion.current) return;

    const targetX = state.pointer.y * -0.09;
    const targetY = state.pointer.x * 0.16;

    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3.5, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3.5, delta);
    group.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={2.4} color="#f2f1ec" />
      <pointLight position={[2.8, 1.9, -1.2]} intensity={16} distance={7} color="#d9ff5a" />

      <group position={[-0.45, -0.15, 0]}>
        <SolarPanel />
      </group>

      <mesh position={[2.8, 1.9, -1.5]}>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial
          color="#eaff9b"
          emissive="#d9ff5a"
          emissiveIntensity={4}
          roughness={0.18}
        />
      </mesh>

      <mesh>
        <tubeGeometry args={[energyCurve, 80, 0.022, 10, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.78} />
      </mesh>
      <mesh>
        <tubeGeometry args={[energyCurve, 80, 0.07, 10, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.08} />
      </mesh>

      <mesh position={[-0.45, -1.6, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.7, 64]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.025} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function HeroEnergyScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.8], fov: 36 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#080a0b", 8, 16]} />
      <HeroWorld />
    </Canvas>
  );
}
