"use client";

import type { MutableRefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SolarArray({ position = [0, 0, 0] as [number, number, number] }) {
  const panels = useMemo(() => {
    const result: Array<[number, number]> = [];
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        result.push([-2.08 + col * 1.04, 0.54 - row * 1.08]);
      }
    }
    return result;
  }, []);

  return (
    <group position={position} rotation={[-0.08, -0.08, -0.055]}>
      {panels.map(([x, y], index) => (
        <group key={index} position={[x, y, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.94, 0.98, 0.055]} />
            <meshPhysicalMaterial
              color="#0a171b"
              metalness={0.88}
              roughness={0.18}
              clearcoat={0.75}
              clearcoatRoughness={0.16}
            />
          </mesh>
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[0.84, 0.88]} />
            <meshStandardMaterial color="#10272c" metalness={0.75} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.037]}>
            <planeGeometry args={[0.79, 0.83]} />
            <meshBasicMaterial color="#9ebfb4" transparent opacity={0.045} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Palm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const leaves = useMemo(() => Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2), []);

  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.07, 0.13, 2.9, 10]} />
        <meshStandardMaterial color="#5a4632" roughness={0.85} />
      </mesh>
      <group position={[0, 2.9, 0]}>
        {leaves.map((angle, index) => (
          <mesh key={index} rotation={[0.15 + (index % 2) * 0.12, angle, 0.25]} position={[Math.cos(angle) * 0.42, 0, Math.sin(angle) * 0.42]}>
            <boxGeometry args={[0.12, 0.035, 1.35]} />
            <meshStandardMaterial color="#263c2e" roughness={0.75} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Villa() {
  return (
    <group position={[0, -0.7, 0]}>
      <mesh castShadow receiveShadow position={[-0.8, 0.75, 0]}>
        <boxGeometry args={[5.5, 2.1, 3.25]} />
        <meshStandardMaterial color="#d9d4c8" roughness={0.78} />
      </mesh>

      <mesh castShadow receiveShadow position={[2.15, 0.18, -0.22]}>
        <boxGeometry args={[2.5, 1.15, 2.35]} />
        <meshStandardMaterial color="#b76c45" roughness={0.92} />
      </mesh>

      <mesh castShadow position={[-0.9, 1.95, 0]}>
        <boxGeometry args={[5.82, 0.18, 3.55]} />
        <meshStandardMaterial color="#ece7db" roughness={0.7} />
      </mesh>

      <mesh castShadow position={[-0.8, 2.18, -0.18]}>
        <boxGeometry args={[4.9, 0.16, 2.7]} />
        <meshStandardMaterial color="#312f2c" metalness={0.3} roughness={0.45} />
      </mesh>

      <SolarArray position={[-0.8, 2.34, -0.05]} />

      <mesh position={[-1.9, 0.72, 1.64]}>
        <boxGeometry args={[1.5, 1.26, 0.04]} />
        <meshPhysicalMaterial color="#131b1d" metalness={0.45} roughness={0.16} transmission={0.08} />
      </mesh>
      <mesh position={[0.25, 0.72, 1.64]}>
        <boxGeometry args={[1.85, 1.26, 0.04]} />
        <meshPhysicalMaterial color="#131b1d" metalness={0.45} roughness={0.16} transmission={0.08} />
      </mesh>
      <mesh position={[2.15, 0.15, 0.98]}>
        <boxGeometry args={[1.35, 0.72, 0.04]} />
        <meshPhysicalMaterial color="#151c1c" metalness={0.42} roughness={0.2} transmission={0.08} />
      </mesh>

      <mesh receiveShadow position={[0.7, -0.45, 2.05]}>
        <boxGeometry args={[6.8, 0.16, 2.8]} />
        <meshStandardMaterial color="#8f7966" roughness={0.92} />
      </mesh>

      <mesh receiveShadow position={[0.1, -0.34, 2.6]}>
        <boxGeometry args={[3.5, 0.08, 1.25]} />
        <meshPhysicalMaterial color="#1a3434" roughness={0.12} metalness={0.05} transmission={0.05} />
      </mesh>

      <mesh position={[0.1, -0.285, 2.61]}>
        <planeGeometry args={[3.25, 1.0]} />
        <meshBasicMaterial color="#8fb8b2" transparent opacity={0.17} />
      </mesh>
    </group>
  );
}

function EnergyPulse({ curve, reducedMotion }: { curve: THREE.CatmullRomCurve3; reducedMotion: MutableRefObject<boolean> }) {
  const pulse = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pulse.current || reducedMotion.current) return;
    const t = (clock.elapsedTime * 0.09) % 1;
    pulse.current.position.copy(curve.getPointAt(t));
  });

  return (
    <group ref={pulse}>
      <mesh>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshBasicMaterial color="#ecffab" />
      </mesh>
      <pointLight intensity={4.5} distance={2.4} color="#d9ff5a" />
    </group>
  );
}

function HeroWorld() {
  const root = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);

  const energyCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(4.7, 4.2, -2.6),
        new THREE.Vector3(2.7, 3.3, -1.4),
        new THREE.Vector3(0.8, 2.3, -0.5),
        new THREE.Vector3(-0.8, 1.7, 0),
        new THREE.Vector3(-0.4, 0.55, 0.8),
      ]),
    [],
  );

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group) return;

    const pointerX = reducedMotion.current ? 0 : state.pointer.x;
    const pointerY = reducedMotion.current ? 0 : state.pointer.y;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, pointerX * 0.045, 3.2, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointerY * -0.025, 3.2, delta);
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      reducedMotion.current ? 0 : Math.sin(state.clock.elapsedTime * 0.4) * 0.035,
      2.4,
      delta,
    );

    const cameraX = 7.1 + pointerX * 0.28;
    const cameraY = 3.65 + pointerY * 0.16;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, cameraX, 2.6, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, cameraY, 2.6, delta);
    state.camera.lookAt(0.25, 0.85, 0);
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#f4e9d5", "#27322c", 1.05]} />
      <directionalLight
        castShadow
        position={[7, 8, 5]}
        intensity={4.2}
        color="#fff0cf"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={22}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[4.8, 4.2, -2.6]} intensity={42} distance={13} color="#e5ff79" />

      <Villa />
      <Palm position={[-4.4, -1.0, -0.9]} scale={0.88} />
      <Palm position={[4.1, -1.0, -1.8]} scale={0.66} />

      <mesh position={[4.8, 4.2, -2.6]}>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshBasicMaterial color="#eaff9b" />
      </mesh>
      <mesh position={[4.8, 4.2, -2.62]}>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.055} depthWrite={false} />
      </mesh>

      <mesh>
        <tubeGeometry args={[energyCurve, 100, 0.018, 10, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.75} />
      </mesh>
      <mesh>
        <tubeGeometry args={[energyCurve, 100, 0.07, 10, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.055} />
      </mesh>
      <EnergyPulse curve={energyCurve} reducedMotion={reducedMotion} />

      <mesh receiveShadow position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 18]} />
        <meshStandardMaterial color="#151816" roughness={1} />
      </mesh>

      <mesh position={[0, -1.07, -2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5.8, 64]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.018} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function HeroEnergyScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [7.1, 3.65, 8.7], fov: 37 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#080a0b", 12, 22]} />
      <HeroWorld />
    </Canvas>
  );
}
