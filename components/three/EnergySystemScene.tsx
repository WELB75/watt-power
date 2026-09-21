"use client";

import type { MutableRefObject } from "react";
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RealModel } from "@/components/three/RealModel";
import { REAL_ASSETS } from "@/components/three/realAssets";

function EnergyPulse({
  curve,
  offset,
  speed,
}: {
  curve: THREE.CatmullRomCurve3;
  offset: number;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.copy(curve.getPointAt((clock.elapsedTime * speed + offset) % 1));
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.06, 18, 18]} />
        <meshBasicMaterial color="#efffb4" />
      </mesh>
      <pointLight intensity={3.2} distance={1.6} color="#d9ff5a" />
    </group>
  );
}

function EnergyWorld({ progress }: { progress: MutableRefObject<number> }) {
  const world = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Group>(null);
  const inverter = useRef<THREE.Group>(null);
  const battery = useRef<THREE.Group>(null);

  const solarToInverter = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.8, 2.25, 0.1),
        new THREE.Vector3(-1.0, 1.65, 0.6),
        new THREE.Vector3(-1.65, 1.05, 1.0),
        new THREE.Vector3(-2.0, 0.55, 1.25),
      ]),
    [],
  );

  const inverterToBattery = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.0, 0.55, 1.25),
        new THREE.Vector3(-0.9, 0.35, 1.75),
        new THREE.Vector3(0.7, 0.3, 1.75),
        new THREE.Vector3(2.0, 0.45, 1.3),
      ]),
    [],
  );

  const batteryToHome = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.0, 0.45, 1.3),
        new THREE.Vector3(1.8, 0.45, 0.65),
        new THREE.Vector3(1.35, 0.45, 0.05),
        new THREE.Vector3(0.75, 0.35, -0.45),
      ]),
    [],
  );

  useFrame(({ camera }, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const panelsPhase = THREE.MathUtils.smoothstep(p, 0.06, 0.34);
    const inverterPhase = THREE.MathUtils.smoothstep(p, 0.26, 0.58);
    const batteryPhase = THREE.MathUtils.smoothstep(p, 0.5, 0.84);

    if (panels.current) {
      panels.current.position.y = THREE.MathUtils.damp(panels.current.position.y, 1.55 + panelsPhase * 1.0, 4, delta);
      panels.current.position.x = THREE.MathUtils.damp(panels.current.position.x, -0.55 - panelsPhase * 0.5, 4, delta);
    }

    if (inverter.current) {
      inverter.current.position.x = THREE.MathUtils.damp(inverter.current.position.x, -0.7 - inverterPhase * 1.45, 4, delta);
      inverter.current.position.z = THREE.MathUtils.damp(inverter.current.position.z, 0.85 + inverterPhase * 0.75, 4, delta);
    }

    if (battery.current) {
      battery.current.position.x = THREE.MathUtils.damp(battery.current.position.x, 0.8 + batteryPhase * 1.55, 4, delta);
      battery.current.position.z = THREE.MathUtils.damp(battery.current.position.z, 0.85 + batteryPhase * 0.75, 4, delta);
    }

    if (world.current) {
      world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, THREE.MathUtils.lerp(-0.22, 0.08, p), 3, delta);
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, THREE.MathUtils.lerp(6.6, 4.7, p), 2.8, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, THREE.MathUtils.lerp(3.1, 2.55, p), 2.8, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, THREE.MathUtils.lerp(8.2, 6.7, p), 2.8, delta);
    camera.lookAt(0.05, 0.45, 0.15);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#f5efe2", "#19251d", 1]} />
      <directionalLight
        castShadow
        position={[6, 7, 5]}
        intensity={4.2}
        color="#fff0d0"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-2.1, 1.2, 2]} intensity={5} distance={6} color="#d9ff5a" />

      <group ref={world} position={[0, -0.4, 0]}>
        <Suspense fallback={null}>
          <RealModel url={REAL_ASSETS.modernHouse} fit={5.9} />

          <group ref={panels} position={[-0.55, 1.55, -0.2]}>
            <RealModel url={REAL_ASSETS.solarPanel} fit={1.45} position={[-1.15, 0, 0]} />
            <RealModel url={REAL_ASSETS.solarPanel} fit={1.45} position={[0, 0, 0]} />
            <RealModel url={REAL_ASSETS.solarPanel} fit={1.45} position={[1.15, 0, 0]} />
          </group>

          <group ref={inverter} position={[-0.7, 0.25, 0.85]}>
            <RealModel
              url={REAL_ASSETS.inverter}
              fit={1.55}
              rotation={[0, Math.PI * 0.04, 0]}
            />
          </group>

          <group ref={battery} position={[0.8, 0.15, 0.85]}>
            <RealModel
              url={REAL_ASSETS.battery}
              fit={1.75}
              rotation={[0, -Math.PI * 0.04, 0]}
            />
          </group>
        </Suspense>
      </group>

      {[solarToInverter, inverterToBattery, batteryToHome].map((curve, index) => (
        <group key={index} position={[0, -0.4, 0]}>
          <mesh>
            <tubeGeometry args={[curve, 78, 0.018, 8, false]} />
            <meshBasicMaterial color="#d9ff5a" transparent opacity={0.78} />
          </mesh>
          <mesh>
            <tubeGeometry args={[curve, 78, 0.068, 8, false]} />
            <meshBasicMaterial color="#d9ff5a" transparent opacity={0.05} />
          </mesh>
          <EnergyPulse curve={curve} offset={index * 0.27} speed={0.15} />
        </group>
      ))}

      <mesh receiveShadow position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial color="#0e120f" roughness={1} />
      </mesh>
    </>
  );
}

export function EnergySystemScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [6.6, 3.1, 8.2], fov: 39 }}
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
      <fog attach="fog" args={["#060806", 11.5, 20]} />
      <EnergyWorld progress={progress} />
    </Canvas>
  );
}
