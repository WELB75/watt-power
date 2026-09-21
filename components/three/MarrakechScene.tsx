"use client";

import type { MutableRefObject } from "react";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RealModel } from "@/components/three/RealModel";
import { REAL_ASSETS } from "@/components/three/realAssets";

const panels: Array<[number, number, number]> = [
  [-1.7, 1.28, -0.65],
  [-0.58, 1.28, -0.65],
  [0.54, 1.28, -0.65],
  [1.66, 1.28, -0.65],
  [-1.7, 1.28, 0.18],
  [-0.58, 1.28, 0.18],
  [0.54, 1.28, 0.18],
  [1.66, 1.28, 0.18],
];

function MarrakechWorld({ progress }: { progress: MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, THREE.MathUtils.lerp(6.8, 4.9, p), 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, THREE.MathUtils.lerp(3.45, 2.65, p), 2.2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, THREE.MathUtils.lerp(8.8, 7.2, p), 2.2, delta);
    camera.lookAt(0.25, 0.35, -0.15);

    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.2 - p * 0.06, 2.2, delta);
    }
  });

  return (
    <group ref={root} position={[0, -0.5, 0]}>
      <ambientLight intensity={0.42} />
      <hemisphereLight args={["#ffdcb5", "#332119", 1.1]} />
      <directionalLight
        castShadow
        position={[7.5, 7.5, 4.5]}
        intensity={4.5}
        color="#ffd2a2"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <Suspense fallback={null}>
        <RealModel url={REAL_ASSETS.modernHouse} fit={7.6} />
        <group>
          {panels.map((position, index) => (
            <RealModel
              key={index}
              url={REAL_ASSETS.solarPanel}
              fit={1.18}
              position={position}
              rotation={[0.08, 0, 0]}
            />
          ))}
        </group>
      </Suspense>

      <mesh receiveShadow position={[0.7, -1.05, 2.0]}>
        <boxGeometry args={[4.2, 0.08, 1.45]} />
        <meshPhysicalMaterial color="#173e40" roughness={0.11} metalness={0.04} />
      </mesh>
      <mesh position={[0.7, -1.0, 2.01]}>
        <planeGeometry args={[3.85, 1.15]} />
        <meshBasicMaterial color="#9bcfc3" transparent opacity={0.2} />
      </mesh>

      <mesh receiveShadow position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#7b5d47" roughness={1} />
      </mesh>
    </group>
  );
}

export function MarrakechScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [6.8, 3.45, 8.8], fov: 38 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#7d5d45", 12, 21]} />
      <MarrakechWorld progress={progress} />
    </Canvas>
  );
}
