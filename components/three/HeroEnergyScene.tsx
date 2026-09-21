"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RealModel } from "@/components/three/RealModel";
import { REAL_ASSETS } from "@/components/three/realAssets";

const panelPositions: Array<[number, number, number]> = [
  [-1.55, 1.22, -0.72],
  [-0.45, 1.22, -0.72],
  [0.65, 1.22, -0.72],
  [1.75, 1.22, -0.72],
  [-1.55, 1.22, 0.08],
  [-0.45, 1.22, 0.08],
  [0.65, 1.22, 0.08],
  [1.75, 1.22, 0.08],
];

function EnergyPulse({
  curve,
  reducedMotion,
}: {
  curve: THREE.CatmullRomCurve3;
  reducedMotion: MutableRefObject<boolean>;
}) {
  const pulse = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!pulse.current || reducedMotion.current) return;
    pulse.current.position.copy(curve.getPointAt((clock.elapsedTime * 0.1) % 1));
  });

  return (
    <group ref={pulse}>
      <mesh>
        <sphereGeometry args={[0.075, 18, 18]} />
        <meshBasicMaterial color="#ecffab" />
      </mesh>
      <pointLight intensity={4.8} distance={2.3} color="#d9ff5a" />
    </group>
  );
}

function RealSolarVilla() {
  return (
    <group position={[0, -0.65, 0]} rotation={[0, -0.28, 0]}>
      <RealModel url={REAL_ASSETS.modernHouse} fit={7.2} />

      <group rotation={[0.03, 0, -0.02]}>
        {panelPositions.map((position, index) => (
          <RealModel
            key={index}
            url={REAL_ASSETS.solarPanel}
            fit={1.15}
            position={position}
            rotation={[0.08, 0, 0]}
          />
        ))}
      </group>

      <mesh receiveShadow position={[0.25, -1.0, 2.0]}>
        <boxGeometry args={[4.4, 0.08, 1.5]} />
        <meshPhysicalMaterial color="#173536" metalness={0.06} roughness={0.12} />
      </mesh>
      <mesh position={[0.25, -0.95, 2.01]}>
        <planeGeometry args={[4.05, 1.18]} />
        <meshBasicMaterial color="#9bc8bd" transparent opacity={0.18} />
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
        new THREE.Vector3(4.4, 4.0, -2.4),
        new THREE.Vector3(3.0, 3.0, -1.5),
        new THREE.Vector3(1.5, 2.1, -0.8),
        new THREE.Vector3(0.2, 1.45, -0.25),
        new THREE.Vector3(-0.7, 1.15, 0.15),
      ]),
    [],
  );

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group) return;

    const px = reducedMotion.current ? 0 : state.pointer.x;
    const py = reducedMotion.current ? 0 : state.pointer.y;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, px * 0.04, 3.2, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, py * -0.018, 3.2, delta);

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, 7.1 + px * 0.32, 2.7, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 3.2 + py * 0.18, 2.7, delta);
    state.camera.lookAt(0.15, 0.45, 0);
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.58} />
      <hemisphereLight args={["#f7ead2", "#18231d", 1.1]} />
      <directionalLight
        castShadow
        position={[6.5, 8, 5]}
        intensity={4.8}
        color="#ffe7c2"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[4.4, 4.0, -2.4]} intensity={34} distance={13} color="#e2ff73" />

      <Suspense fallback={null}>
        <RealSolarVilla />
      </Suspense>

      <mesh position={[4.4, 4.0, -2.4]}>
        <sphereGeometry args={[0.55, 42, 42]} />
        <meshBasicMaterial color="#edffa8" />
      </mesh>
      <mesh position={[4.4, 4.0, -2.45]}>
        <sphereGeometry args={[1.22, 42, 42]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.05} depthWrite={false} />
      </mesh>

      <mesh>
        <tubeGeometry args={[energyCurve, 96, 0.018, 9, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.72} />
      </mesh>
      <mesh>
        <tubeGeometry args={[energyCurve, 96, 0.065, 9, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.05} />
      </mesh>
      <EnergyPulse curve={energyCurve} reducedMotion={reducedMotion} />

      <mesh receiveShadow position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial color="#111511" roughness={1} />
      </mesh>
    </group>
  );
}

export function HeroEnergyScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [7.1, 3.2, 8.7], fov: 37 }}
      dpr={[1, 1.45]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#060806", 12, 22]} />
      <HeroWorld />
    </Canvas>
  );
}
