"use client";

import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function range(value: number, start: number, end: number) {
  return clamp01((value - start) / (end - start));
}

function explodeAmount(progress: number) {
  if (progress < 0.12) return 0;
  if (progress < 0.3) return range(progress, 0.12, 0.3);
  if (progress < 0.43) return 1;
  if (progress < 0.58) return 1 - range(progress, 0.43, 0.58);
  return 0;
}

const CELL_COLUMNS = 12;
const CELL_ROWS = 6;
const CELL_WIDTH = 0.255;
const CELL_HEIGHT = 0.285;
const CELL_GAP = 0.018;

function CellField({ layerRef }: { layerRef: MutableRefObject<THREE.Group | null> }) {
  const cells = useMemo(() => {
    const result: Array<[number, number]> = [];
    const totalWidth = CELL_COLUMNS * CELL_WIDTH + (CELL_COLUMNS - 1) * CELL_GAP;
    const totalHeight = CELL_ROWS * CELL_HEIGHT + (CELL_ROWS - 1) * CELL_GAP;

    for (let row = 0; row < CELL_ROWS; row += 1) {
      for (let col = 0; col < CELL_COLUMNS; col += 1) {
        result.push([
          -totalWidth / 2 + CELL_WIDTH / 2 + col * (CELL_WIDTH + CELL_GAP),
          totalHeight / 2 - CELL_HEIGHT / 2 - row * (CELL_HEIGHT + CELL_GAP),
        ]);
      }
    }

    return result;
  }, []);

  return (
    <group ref={layerRef}>
      {cells.map(([x, y], index) => (
        <group key={index} position={[x, y, 0]}>
          <mesh>
            <boxGeometry args={[CELL_WIDTH, CELL_HEIGHT, 0.018]} />
            <meshPhysicalMaterial
              color="#173d68"
              metalness={0.42}
              roughness={0.17}
              clearcoat={0.9}
              clearcoatRoughness={0.12}
            />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.012, CELL_HEIGHT * 0.9]} />
            <meshBasicMaterial color="#b9cad6" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-CELL_WIDTH * 0.21, 0, 0.012]}>
            <planeGeometry args={[0.006, CELL_HEIGHT * 0.86]} />
            <meshBasicMaterial color="#d9e3e8" transparent opacity={0.35} />
          </mesh>
          <mesh position={[CELL_WIDTH * 0.21, 0, 0.012]}>
            <planeGeometry args={[0.006, CELL_HEIGHT * 0.86]} />
            <meshBasicMaterial color="#d9e3e8" transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AluminiumFrame() {
  const material = (
    <meshPhysicalMaterial
      color="#b9bdc0"
      metalness={0.92}
      roughness={0.22}
      clearcoat={0.65}
      clearcoatRoughness={0.16}
    />
  );

  return (
    <group>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[3.7, 0.11, 0.14]} />
        {material}
      </mesh>
      <mesh position={[0, -1.0, 0]}>
        <boxGeometry args={[3.7, 0.11, 0.14]} />
        {material}
      </mesh>
      <mesh position={[-1.795, 0, 0]}>
        <boxGeometry args={[0.11, 1.9, 0.14]} />
        {material}
      </mesh>
      <mesh position={[1.795, 0, 0]}>
        <boxGeometry args={[0.11, 1.9, 0.14]} />
        {material}
      </mesh>
    </group>
  );
}

export function ExplodedSolarPanel({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const root = useRef<THREE.Group>(null);
  const frame = useRef<THREE.Group>(null);
  const glass = useRef<THREE.Mesh>(null);
  const evaFront = useRef<THREE.Mesh>(null);
  const cells = useRef<THREE.Group>(null);
  const evaRear = useRef<THREE.Mesh>(null);
  const backsheet = useRef<THREE.Mesh>(null);
  const junction = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const p = clamp01(progress.current);
    const exploded = explodeAmount(p);
    const install = THREE.MathUtils.smoothstep(p, 0.58, 0.78);

    if (glass.current) glass.current.position.z = THREE.MathUtils.damp(glass.current.position.z, 0.09 + exploded * 1.0, 6, delta);
    if (evaFront.current) evaFront.current.position.z = THREE.MathUtils.damp(evaFront.current.position.z, 0.055 + exploded * 0.6, 6, delta);
    if (cells.current) cells.current.position.z = THREE.MathUtils.damp(cells.current.position.z, 0.02 + exploded * 0.16, 6, delta);
    if (evaRear.current) evaRear.current.position.z = THREE.MathUtils.damp(evaRear.current.position.z, -0.02 - exploded * 0.35, 6, delta);
    if (backsheet.current) backsheet.current.position.z = THREE.MathUtils.damp(backsheet.current.position.z, -0.055 - exploded * 0.72, 6, delta);
    if (junction.current) junction.current.position.z = THREE.MathUtils.damp(junction.current.position.z, -0.11 - exploded * 1.02, 6, delta);

    if (frame.current) {
      frame.current.scale.setScalar(THREE.MathUtils.damp(frame.current.scale.x, 1 + exploded * 0.025, 6, delta));
    }

    if (root.current) {
      const idle = p < 0.58 ? Math.sin(clock.elapsedTime * 0.55) * 0.035 : 0;
      root.current.position.x = THREE.MathUtils.damp(root.current.position.x, THREE.MathUtils.lerp(0.65, -1.6, install), 4, delta);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, THREE.MathUtils.lerp(0.25 + idle, 2.25, install), 4, delta);
      root.current.position.z = THREE.MathUtils.damp(root.current.position.z, THREE.MathUtils.lerp(0.5, -1.4, install), 4, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, THREE.MathUtils.lerp(-0.1, -0.52, install), 4, delta);
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, THREE.MathUtils.lerp(-0.48, -0.05, install), 4, delta);
      root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, THREE.MathUtils.lerp(-0.035, 0.02, install), 4, delta);

      const targetScale = THREE.MathUtils.lerp(1.03, 0.58, install);
      const scale = THREE.MathUtils.damp(root.current.scale.x, targetScale, 4, delta);
      root.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={root}>
      <group ref={frame}>
        <AluminiumFrame />
      </group>

      <mesh ref={glass} position={[0, 0, 0.09]}>
        <boxGeometry args={[3.5, 1.82, 0.045]} />
        <meshPhysicalMaterial
          color="#dce8ed"
          transparent
          opacity={0.18}
          transmission={0.58}
          roughness={0.08}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.06}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={evaFront} position={[0, 0, 0.055]}>
        <boxGeometry args={[3.45, 1.77, 0.018]} />
        <meshPhysicalMaterial color="#f2f1e8" transparent opacity={0.14} roughness={0.28} depthWrite={false} />
      </mesh>

      <CellField layerRef={cells} />

      <mesh ref={evaRear} position={[0, 0, -0.02]}>
        <boxGeometry args={[3.45, 1.77, 0.018]} />
        <meshPhysicalMaterial color="#eef0e9" transparent opacity={0.2} roughness={0.36} depthWrite={false} />
      </mesh>

      <mesh ref={backsheet} position={[0, 0, -0.055]}>
        <boxGeometry args={[3.5, 1.82, 0.04]} />
        <meshStandardMaterial color="#e9ece8" roughness={0.72} />
      </mesh>

      <group ref={junction} position={[0, 0, -0.11]}>
        <mesh position={[0.42, 0.1, 0]}>
          <boxGeometry args={[0.72, 0.46, 0.22]} />
          <meshStandardMaterial color="#191d1d" roughness={0.45} metalness={0.25} />
        </mesh>
        <mesh position={[0.28, -0.38, -0.02]} rotation={[0.1, 0, 0.08]}>
          <cylinderGeometry args={[0.025, 0.025, 0.68, 12]} />
          <meshStandardMaterial color="#181a1a" roughness={0.65} />
        </mesh>
        <mesh position={[0.58, -0.38, -0.02]} rotation={[0.1, 0, -0.08]}>
          <cylinderGeometry args={[0.025, 0.025, 0.68, 12]} />
          <meshStandardMaterial color="#181a1a" roughness={0.65} />
        </mesh>
      </group>
    </group>
  );
}
