"use client";

import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { REAL_ASSETS } from "@/components/three/realAssets";

type RealModelProps = {
  url: string;
  fit?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export function RealModel({
  url,
  fit = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
}: RealModelProps) {
  const gltf = useLoader(GLTFLoader, url);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = castShadow;
      child.receiveShadow = receiveShadow;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone());
      } else if (child.material) {
        child.material = child.material.clone();
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);
    clone.scale.setScalar(fit / maxDimension);

    return clone;
  }, [gltf.scene, fit, castShadow, receiveShadow]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

useLoader.preload(GLTFLoader, REAL_ASSETS.solarPanel);
useLoader.preload(GLTFLoader, REAL_ASSETS.battery);
useLoader.preload(GLTFLoader, REAL_ASSETS.inverter);
useLoader.preload(GLTFLoader, REAL_ASSETS.modernHouse);
