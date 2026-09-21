"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RoofPanels({ panelRef }: { panelRef: React.MutableRefObject<THREE.Group | null> }) {
  const panels = useMemo(() => {
    const result: Array<[number, number]> = [];
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        result.push([-1.44 + col * 0.96, 0.48 - row * 0.96]);
      }
    }
    return result;
  }, []);

  return (
    <group ref={panelRef} position={[0.35, 2.05, -0.2]} rotation={[-0.1, -0.08, -0.04]}>
      {panels.map(([x, z], index) => (
        <mesh key={index} castShadow position={[x, 0, z]}>
          <boxGeometry args={[0.86, 0.055, 0.82]} />
          <meshPhysicalMaterial
            color="#0c1f23"
            metalness={0.88}
            roughness={0.18}
            clearcoat={0.72}
            clearcoatRoughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function Inverter({ inverterRef }: { inverterRef: React.MutableRefObject<THREE.Group | null> }) {
  return (
    <group ref={inverterRef} position={[-0.55, 0.62, 1.38]}>
      <mesh castShadow>
        <boxGeometry args={[0.92, 1.25, 0.34]} />
        <meshPhysicalMaterial color="#d9dbd6" metalness={0.35} roughness={0.26} clearcoat={0.45} />
      </mesh>
      <mesh position={[0, 0.17, 0.18]}>
        <boxGeometry args={[0.48, 0.11, 0.025]} />
        <meshBasicMaterial color="#121817" />
      </mesh>
      <mesh position={[0, -0.18, 0.185]}>
        <circleGeometry args={[0.085, 28]} />
        <meshBasicMaterial color="#d9ff5a" />
      </mesh>
    </group>
  );
}

function Battery({ batteryRef }: { batteryRef: React.MutableRefObject<THREE.Group | null> }) {
  return (
    <group ref={batteryRef} position={[0.82, 0.35, 1.32]}>
      <mesh castShadow>
        <boxGeometry args={[0.86, 1.72, 0.42]} />
        <meshPhysicalMaterial color="#1e2423" metalness={0.62} roughness={0.22} clearcoat={0.58} />
      </mesh>
      <mesh position={[0, 0.18, 0.225]}>
        <boxGeometry args={[0.55, 0.52, 0.025]} />
        <meshBasicMaterial color="#0c1110" />
      </mesh>
      <mesh position={[0, -0.48, 0.228]}>
        <boxGeometry args={[0.56, 0.055, 0.02]} />
        <meshBasicMaterial color="#d9ff5a" />
      </mesh>
    </group>
  );
}

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
    const t = (clock.elapsedTime * speed + offset) % 1;
    ref.current.position.copy(curve.getPointAt(t));
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#edffad" />
      </mesh>
      <pointLight intensity={2.8} distance={1.5} color="#d9ff5a" />
    </group>
  );
}

function EnergyWorld({ progress }: { progress: MutableRefObject<number> }) {
  const house = useRef<THREE.Group>(null);
  const panel = useRef<THREE.Group>(null);
  const inverter = useRef<THREE.Group>(null);
  const battery = useRef<THREE.Group>(null);

  const panelCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.25, 2.05, 0.35),
        new THREE.Vector3(-0.15, 1.72, 0.85),
        new THREE.Vector3(-0.55, 1.15, 1.38),
        new THREE.Vector3(-0.55, 0.72, 1.55),
      ]),
    [],
  );

  const storageCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.55, 0.65, 1.55),
        new THREE.Vector3(0.0, 0.62, 1.72),
        new THREE.Vector3(0.55, 0.5, 1.6),
        new THREE.Vector3(0.82, 0.35, 1.54),
      ]),
    [],
  );

  const homeCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.82, 0.15, 1.54),
        new THREE.Vector3(1.35, 0.05, 1.2),
        new THREE.Vector3(1.65, 0.15, 0.5),
        new THREE.Vector3(1.55, 0.55, -0.3),
      ]),
    [],
  );

  useFrame(({ camera }, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const phaseA = THREE.MathUtils.smoothstep(p, 0.06, 0.34);
    const phaseB = THREE.MathUtils.smoothstep(p, 0.28, 0.62);
    const phaseC = THREE.MathUtils.smoothstep(p, 0.56, 0.9);

    if (panel.current) {
      panel.current.position.y = THREE.MathUtils.damp(panel.current.position.y, 2.05 + phaseA * 0.68, 4, delta);
      panel.current.position.x = THREE.MathUtils.damp(panel.current.position.x, 0.35 - phaseA * 0.22, 4, delta);
    }
    if (inverter.current) {
      inverter.current.position.x = THREE.MathUtils.damp(inverter.current.position.x, -0.55 - phaseB * 0.9, 4, delta);
      inverter.current.position.z = THREE.MathUtils.damp(inverter.current.position.z, 1.38 + phaseB * 0.55, 4, delta);
    }
    if (battery.current) {
      battery.current.position.x = THREE.MathUtils.damp(battery.current.position.x, 0.82 + phaseC * 1.1, 4, delta);
      battery.current.position.z = THREE.MathUtils.damp(battery.current.position.z, 1.32 + phaseC * 0.65, 4, delta);
    }
    if (house.current) {
      house.current.rotation.y = THREE.MathUtils.damp(house.current.rotation.y, THREE.MathUtils.lerp(-0.16, 0.12, p), 3, delta);
    }

    const cameraX = THREE.MathUtils.lerp(6.2, 4.25, p);
    const cameraY = THREE.MathUtils.lerp(3.3, 2.45, p);
    const cameraZ = THREE.MathUtils.lerp(7.8, 6.35, p);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraX, 2.7, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraY, 2.7, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraZ, 2.7, delta);
    camera.lookAt(0.15, 0.72, 0.2);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#f5f1e7", "#263028", 1]} />
      <directionalLight
        castShadow
        position={[6, 7, 5]}
        intensity={4}
        color="#fff0d2"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <pointLight position={[-1.4, 1.3, 2.4]} intensity={4.5} distance={5} color="#d9ff5a" />

      <group ref={house}>
        <mesh castShadow receiveShadow position={[0, 0.45, -0.1]}>
          <boxGeometry args={[4.8, 2.6, 3.55]} />
          <meshStandardMaterial color="#dcd8cf" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0.45, 1.68]}>
          <boxGeometry args={[3.4, 1.72, 0.05]} />
          <meshPhysicalMaterial color="#172022" roughness={0.16} metalness={0.42} transmission={0.07} />
        </mesh>

        <mesh castShadow position={[0, 1.82, -0.1]}>
          <boxGeometry args={[5.05, 0.16, 3.8]} />
          <meshStandardMaterial color="#efebe1" roughness={0.72} />
        </mesh>

        <mesh castShadow receiveShadow position={[0, -0.93, 0]}>
          <boxGeometry args={[5.2, 0.16, 4.15]} />
          <meshStandardMaterial color="#a98f75" roughness={0.95} />
        </mesh>

        <mesh receiveShadow position={[0, -0.75, 0]}>
          <boxGeometry args={[3.4, 0.04, 2.55]} />
          <meshStandardMaterial color="#bdb6a9" roughness={0.86} />
        </mesh>

        <mesh position={[1.56, 0.0, -0.45]}>
          <boxGeometry args={[0.9, 1.25, 1.0]} />
          <meshStandardMaterial color="#b16848" roughness={0.9} />
        </mesh>

        <RoofPanels panelRef={panel} />
        <Inverter inverterRef={inverter} />
        <Battery batteryRef={battery} />
      </group>

      {[panelCurve, storageCurve, homeCurve].map((curve, index) => (
        <group key={index}>
          <mesh>
            <tubeGeometry args={[curve, 72, 0.018, 8, false]} />
            <meshBasicMaterial color="#d9ff5a" transparent opacity={0.76} />
          </mesh>
          <mesh>
            <tubeGeometry args={[curve, 72, 0.065, 8, false]} />
            <meshBasicMaterial color="#d9ff5a" transparent opacity={0.055} />
          </mesh>
          <EnergyPulse curve={curve} offset={index * 0.31} speed={0.15} />
        </group>
      ))}

      <mesh receiveShadow position={[0, -1.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial color="#101311" roughness={1} />
      </mesh>
    </>
  );
}

export function EnergySystemScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [6.2, 3.3, 7.8], fov: 39 }}
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
      <fog attach="fog" args={["#080a0b", 11.5, 19]} />
      <EnergyWorld progress={progress} />
    </Canvas>
  );
}
