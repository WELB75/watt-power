"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PanelField() {
  const panels = useMemo(() => {
    const items: Array<[number, number]> = [];
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 6; col += 1) {
        items.push([-2.45 + col * 0.98, 1.0 - row * 0.92]);
      }
    }
    return items;
  }, []);

  return (
    <group position={[0.8, 1.52, -0.45]} rotation={[-0.14, -0.22, -0.03]}>
      {panels.map(([x, z], index) => (
        <mesh key={index} castShadow position={[x, 0, z]}>
          <boxGeometry args={[0.86, 0.05, 0.78]} />
          <meshPhysicalMaterial
            color="#0f2327"
            metalness={0.86}
            roughness={0.17}
            clearcoat={0.8}
            clearcoatRoughness={0.14}
          />
        </mesh>
      ))}
    </group>
  );
}

function MarrakechWorld({ progress }: { progress: MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const targetX = THREE.MathUtils.lerp(6.6, 4.9, p);
    const targetY = THREE.MathUtils.lerp(3.7, 2.85, p);
    const targetZ = THREE.MathUtils.lerp(8.7, 7.3, p);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.1, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.1, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.1, delta);
    camera.lookAt(0.4, 0.7, -0.2);

    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, p * -0.05, 2, delta);
    }
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffd9aa", "#2f241d", 1.2]} />
      <directionalLight
        castShadow
        position={[8, 7, 4]}
        intensity={4.8}
        color="#ffd7a8"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <mesh castShadow receiveShadow position={[0.45, 0.4, 0]}>
        <boxGeometry args={[6.1, 1.8, 4.0]} />
        <meshStandardMaterial color="#d9d0c0" roughness={0.88} />
      </mesh>

      <mesh castShadow receiveShadow position={[-2.5, 0.05, -0.25]}>
        <boxGeometry args={[2.0, 1.15, 2.9]} />
        <meshStandardMaterial color="#a95f3f" roughness={0.95} />
      </mesh>

      <mesh castShadow position={[0.45, 1.43, 0]}>
        <boxGeometry args={[6.45, 0.18, 4.28]} />
        <meshStandardMaterial color="#eee7d9" roughness={0.78} />
      </mesh>

      <PanelField />

      <mesh position={[1.1, 0.35, 2.02]}>
        <boxGeometry args={[2.35, 1.02, 0.04]} />
        <meshPhysicalMaterial color="#172024" roughness={0.15} metalness={0.45} transmission={0.08} />
      </mesh>

      <mesh position={[-1.7, 0.32, 1.47]}>
        <boxGeometry args={[1.18, 0.92, 0.04]} />
        <meshPhysicalMaterial color="#151d1f" roughness={0.16} metalness={0.4} transmission={0.06} />
      </mesh>

      <mesh receiveShadow position={[0, -0.58, 1.65]}>
        <boxGeometry args={[8.2, 0.14, 3.7]} />
        <meshStandardMaterial color="#b69573" roughness={0.95} />
      </mesh>

      <mesh receiveShadow position={[1.65, -0.47, 2.3]}>
        <boxGeometry args={[3.65, 0.08, 1.4]} />
        <meshPhysicalMaterial color="#255353" roughness={0.12} metalness={0.05} transmission={0.05} />
      </mesh>

      <mesh position={[1.65, -0.42, 2.31]}>
        <planeGeometry args={[3.35, 1.15]} />
        <meshBasicMaterial color="#9bc5bb" transparent opacity={0.2} />
      </mesh>

      <mesh position={[5.2, 4.2, -3.2]}>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshBasicMaterial color="#f9cc85" />
      </mesh>
      <pointLight position={[5.2, 4.2, -3.2]} intensity={28} distance={14} color="#ffbf76" />

      <mesh position={[0, -1.15, -5.4]}>
        <boxGeometry args={[13, 0.3, 1.2]} />
        <meshStandardMaterial color="#4c382f" roughness={1} />
      </mesh>
      <mesh position={[-3.3, -0.45, -5.0]} rotation={[0, 0, -0.25]}>
        <coneGeometry args={[2.2, 4.2, 4]} />
        <meshStandardMaterial color="#5c4537" roughness={1} />
      </mesh>
      <mesh position={[0.2, -0.55, -5.4]} rotation={[0, 0.18, -0.2]}>
        <coneGeometry args={[2.65, 4.6, 4]} />
        <meshStandardMaterial color="#60483a" roughness={1} />
      </mesh>
      <mesh position={[3.6, -0.5, -5.25]} rotation={[0, -0.1, -0.18]}>
        <coneGeometry args={[2.25, 4.1, 4]} />
        <meshStandardMaterial color="#5a4035" roughness={1} />
      </mesh>

      <mesh receiveShadow position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#7b604b" roughness={1} />
      </mesh>
    </group>
  );
}

export function MarrakechScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [6.6, 3.7, 8.7], fov: 38 }}
      dpr={[1, 1.4]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#7f5f48", 13, 24]} />
      <MarrakechWorld progress={progress} />
    </Canvas>
  );
}
