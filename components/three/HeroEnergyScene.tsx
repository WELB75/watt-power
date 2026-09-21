"use client";

import type { MutableRefObject } from "react";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ExplodedSolarPanel } from "@/components/three/ExplodedSolarPanel";
import { RealModel } from "@/components/three/RealModel";
import { REAL_ASSETS } from "@/components/three/realAssets";

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function range(value: number, start: number, end: number) {
  return clamp01((value - start) / (end - start));
}

const ROOF_TARGETS: Array<[number, number, number]> = [
  [-1.9, 2.0, -0.62],
  [-0.95, 2.0, -0.62],
  [0, 2.0, -0.62],
  [0.95, 2.0, -0.62],
  [1.9, 2.0, -0.62],
  [-1.9, 2.0, 0.12],
  [-0.95, 2.0, 0.12],
  [0, 2.0, 0.12],
  [0.95, 2.0, 0.12],
  [1.9, 2.0, 0.12],
];

function RoofPanelSurface() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.88, 0.055, 0.64]} />
        <meshPhysicalMaterial
          color="#adb3b7"
          metalness={0.92}
          roughness={0.21}
          clearcoat={0.55}
        />
      </mesh>
      <mesh position={[0, 0.034, 0]}>
        <boxGeometry args={[0.8, 0.018, 0.56]} />
        <meshPhysicalMaterial
          color="#173d68"
          metalness={0.4}
          roughness={0.17}
          clearcoat={0.92}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh position={[0, 0.045, 0]}>
        <planeGeometry args={[0.76, 0.52]} />
        <meshBasicMaterial color="#c8d8e3" transparent opacity={0.055} />
      </mesh>
    </group>
  );
}

function InstalledPanel({
  progress,
  index,
  target,
}: {
  progress: MutableRefObject<number>;
  index: number;
  target: [number, number, number];
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const p = clamp01(progress.current);
    const installation = range(p, 0.62, 0.96);
    const stagger = index * 0.045;
    const local = clamp01((installation - stagger) / Math.max(0.12, 1 - stagger));
    const eased = THREE.MathUtils.smoothstep(local, 0, 1);

    if (!root.current) return;

    const fanX = (index - 4.5) * 0.18;
    const fanZ = (index % 2 === 0 ? -1 : 1) * 0.28;
    const start = new THREE.Vector3(fanX, 4.7 + index * 0.06, 3.4 + fanZ);
    const end = new THREE.Vector3(...target);

    root.current.position.lerpVectors(start, end, eased);
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      THREE.MathUtils.lerp(-0.55, -0.08, eased),
      7,
      delta,
    );
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      THREE.MathUtils.lerp((index - 4.5) * 0.035, 0, eased),
      7,
      delta,
    );
    root.current.rotation.z = THREE.MathUtils.damp(
      root.current.rotation.z,
      THREE.MathUtils.lerp((index % 2 === 0 ? -1 : 1) * 0.09, 0.015, eased),
      7,
      delta,
    );

    const scale = THREE.MathUtils.damp(root.current.scale.x, 0.2 + eased * 0.8, 7, delta);
    root.current.scale.setScalar(scale);
  });

  return (
    <group ref={root}>
      <RoofPanelSurface />
    </group>
  );
}

function VillaInstallation({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const reveal = THREE.MathUtils.smoothstep(progress.current, 0.5, 0.7);
    if (!root.current) return;

    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, THREE.MathUtils.lerp(-6.2, -1.25, reveal), 4, delta);
    root.current.position.z = THREE.MathUtils.damp(root.current.position.z, THREE.MathUtils.lerp(-5.5, 0, reveal), 4, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, THREE.MathUtils.lerp(-0.4, -0.27, reveal), 4, delta);

    const scale = THREE.MathUtils.damp(root.current.scale.x, THREE.MathUtils.lerp(0.7, 1, reveal), 4, delta);
    root.current.scale.setScalar(scale);
  });

  return (
    <group ref={root}>
      <Suspense fallback={null}>
        <RealModel url={REAL_ASSETS.modernHouse} fit={7.3} />
      </Suspense>

      {ROOF_TARGETS.map((target, index) => (
        <InstalledPanel
          key={index}
          progress={progress}
          index={index}
          target={target}
        />
      ))}

      <mesh receiveShadow position={[0.45, -1.05, 2.05]}>
        <boxGeometry args={[4.55, 0.08, 1.55]} />
        <meshPhysicalMaterial color="#173d42" metalness={0.05} roughness={0.1} />
      </mesh>
      <mesh position={[0.45, -1.0, 2.06]}>
        <planeGeometry args={[4.15, 1.22]} />
        <meshBasicMaterial color="#92d0d0" transparent opacity={0.21} />
      </mesh>
    </group>
  );
}

function HeroWorld({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const p = clamp01(progress.current);
    const wide = THREE.MathUtils.smoothstep(p, 0.5, 0.76);

    const closeCamera = new THREE.Vector3(0.3, 0.1, 7.4);
    const wideCamera = new THREE.Vector3(6.7, 3.15, 8.8);
    const desiredCamera = closeCamera.clone().lerp(wideCamera, wide);

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, desiredCamera.x, 3.2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, desiredCamera.y, 3.2, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, desiredCamera.z, 3.2, delta);

    const lookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(0.5, 0.15, wide),
      THREE.MathUtils.lerp(0.1, 0.15, wide),
      THREE.MathUtils.lerp(0.1, 0, wide),
    );
    state.camera.lookAt(lookAt);

    if (rig.current) {
      const pointerInfluence = 1 - wide;
      rig.current.rotation.y = THREE.MathUtils.damp(
        rig.current.rotation.y,
        state.pointer.x * 0.045 * pointerInfluence,
        3,
        delta,
      );
      rig.current.rotation.x = THREE.MathUtils.damp(
        rig.current.rotation.x,
        state.pointer.y * -0.02 * pointerInfluence,
        3,
        delta,
      );
    }
  });

  return (
    <group ref={rig}>
      <ambientLight intensity={0.62} />
      <hemisphereLight args={["#f5ead9", "#17221c", 1.05]} />

      <directionalLight
        castShadow
        position={[6.5, 8, 5]}
        intensity={4.8}
        color="#ffe3bd"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <pointLight position={[4.8, 3.8, 1.2]} intensity={18} distance={12} color="#d9ff5a" />

      <ExplodedSolarPanel progress={progress} />
      <VillaInstallation progress={progress} />

      <mesh receiveShadow position={[0, -2.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 18]} />
        <meshStandardMaterial color="#0c100d" roughness={1} />
      </mesh>
    </group>
  );
}

export function HeroEnergyScene({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [0.3, 0.1, 7.4], fov: 35 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#060806", 12.5, 23]} />
      <HeroWorld progress={progress} />
    </Canvas>
  );
}
