"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const nodeX = [-4.8, -2.4, 0, 2.4, 4.8];

function MiniPanel() {
  const cells = useMemo(() => {
    const items: Array<[number, number]> = [];
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        items.push([-0.72 + col * 0.48, 0.48 - row * 0.48]);
      }
    }
    return items;
  }, []);

  return (
    <group rotation={[-0.18, 0.28, -0.08]}>
      <mesh>
        <boxGeometry args={[2.15, 1.55, 0.1]} />
        <meshStandardMaterial color="#0c1416" metalness={0.85} roughness={0.25} />
      </mesh>
      {cells.map(([x, y], index) => (
        <mesh key={index} position={[x, y, 0.065]}>
          <boxGeometry args={[0.38, 0.38, 0.018]} />
          <meshStandardMaterial
            color="#102022"
            emissive="#1a3328"
            emissiveIntensity={0.25}
            metalness={0.55}
            roughness={0.34}
          />
        </mesh>
      ))}
    </group>
  );
}

function EnergyWorld({ progress }: { progress: MutableRefObject<number> }) {
  const nodes = useRef<Array<THREE.Group | null>>([]);
  const mover = useRef<THREE.Group>(null);

  const flowCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.8, -1.2, 0),
        new THREE.Vector3(-2.4, -1.05, 0),
        new THREE.Vector3(0, -1.1, 0),
        new THREE.Vector3(2.4, -1.05, 0),
        new THREE.Vector3(4.8, -1.15, 0),
      ]),
    [],
  );

  useFrame(({ camera }, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const focusX = THREE.MathUtils.lerp(-2.9, 2.9, p);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, focusX, 2.6, delta);
    camera.lookAt(focusX * 0.55, 0.05, 0);

    const activeIndex = p * 4;
    nodes.current.forEach((node, index) => {
      if (!node) return;
      const distance = Math.abs(activeIndex - index);
      const focus = THREE.MathUtils.clamp(1 - distance, 0, 1);
      const targetScale = 0.93 + focus * 0.14;
      const current = node.scale.x;
      const next = THREE.MathUtils.damp(current, targetScale, 4.5, delta);
      node.scale.setScalar(next);
      node.position.y = THREE.MathUtils.damp(node.position.y, focus * 0.12, 4.5, delta);

      node.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const material = child.material;
        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissiveIntensity = THREE.MathUtils.damp(
            material.emissiveIntensity,
            0.12 + focus * 0.75,
            4.5,
            delta,
          );
        }
      });
    });

    if (mover.current) {
      mover.current.position.copy(flowCurve.getPointAt(p));
    }
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 6, 6]} intensity={2.3} color="#f2f1ec" />
      <pointLight position={[-4.8, 0.7, 0]} intensity={10} distance={5} color="#d9ff5a" />

      <group ref={(el) => { nodes.current[0] = el; }} position={[nodeX[0], 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.72, 40, 40]} />
          <meshStandardMaterial color="#eaff9b" emissive="#d9ff5a" emissiveIntensity={2.8} roughness={0.22} />
        </mesh>
      </group>

      <group ref={(el) => { nodes.current[1] = el; }} position={[nodeX[1], 0, 0]}>
        <MiniPanel />
      </group>

      <group ref={(el) => { nodes.current[2] = el; }} position={[nodeX[2], 0, 0]}>
        <mesh>
          <boxGeometry args={[1.25, 1.7, 0.62]} />
          <meshStandardMaterial color="#d9dcda" emissive="#d9ff5a" emissiveIntensity={0.12} metalness={0.65} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.2, 0.33]}>
          <boxGeometry args={[0.55, 0.13, 0.03]} />
          <meshBasicMaterial color="#172018" />
        </mesh>
        <mesh position={[0, -0.15, 0.34]}>
          <circleGeometry args={[0.12, 24]} />
          <meshBasicMaterial color="#d9ff5a" />
        </mesh>
      </group>

      <group ref={(el) => { nodes.current[3] = el; }} position={[nodeX[3], 0, 0]}>
        <mesh>
          <boxGeometry args={[1.18, 1.95, 0.72]} />
          <meshStandardMaterial color="#202526" emissive="#d9ff5a" emissiveIntensity={0.12} metalness={0.75} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.2, 0.38]}>
          <boxGeometry args={[0.72, 0.85, 0.025]} />
          <meshBasicMaterial color="#0f1515" />
        </mesh>
        <mesh position={[0, -0.48, 0.4]}>
          <boxGeometry args={[0.68, 0.08, 0.025]} />
          <meshBasicMaterial color="#d9ff5a" />
        </mesh>
      </group>

      <group ref={(el) => { nodes.current[4] = el; }} position={[nodeX[4], -0.05, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[1.7, 1.25, 1.4]} />
          <meshStandardMaterial color="#ecebe5" emissive="#d9ff5a" emissiveIntensity={0.08} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.95, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.25, 0.9, 4]} />
          <meshStandardMaterial color="#171b1c" emissive="#d9ff5a" emissiveIntensity={0.08} roughness={0.45} />
        </mesh>
      </group>

      <mesh>
        <tubeGeometry args={[flowCurve, 120, 0.025, 10, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.62} />
      </mesh>
      <mesh>
        <tubeGeometry args={[flowCurve, 120, 0.085, 10, false]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.055} />
      </mesh>

      <group ref={mover}>
        <mesh>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshBasicMaterial color="#edffae" />
        </mesh>
        <pointLight intensity={5} distance={2.2} color="#d9ff5a" />
      </group>

      <gridHelper args={[14, 28, "#263128", "#141918"]} position={[0, -1.75, 0]} />
    </>
  );
}

export function EnergySystemScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [-2.9, 1.25, 12.4], fov: 39 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#080a0b", 11, 19]} />
      <EnergyWorld progress={progress} />
    </Canvas>
  );
}
