"use client";

import type { MutableRefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeRoundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

function useScreenTexture(materialRef: MutableRefObject<THREE.MeshBasicMaterial | null>) {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 780;
    canvas.height = 1640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, "#0b1010");
    bg.addColorStop(1, "#060908");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(530, 140, 0, 530, 140, 480);
    glow.addColorStop(0, "rgba(217,255,90,.16)");
    glow.addColorStop(1, "rgba(217,255,90,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, 620);

    ctx.fillStyle = "rgba(255,255,255,.45)";
    ctx.font = "500 24px Arial";
    ctx.fillText("WATT POWER", 58, 110);

    ctx.fillStyle = "rgba(255,255,255,.92)";
    ctx.font = "600 44px Arial";
    ctx.fillText("Mon énergie", 58, 170);

    ctx.fillStyle = "rgba(255,255,255,.34)";
    ctx.font = "400 22px Arial";
    ctx.fillText("Production solaire", 58, 285);

    ctx.fillStyle = "#f3f3ef";
    ctx.font = "600 92px Arial";
    ctx.fillText("4.8", 58, 380);
    ctx.fillStyle = "rgba(255,255,255,.36)";
    ctx.font = "500 34px Arial";
    ctx.fillText("kW", 235, 375);

    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(50, 425, 680, 400, 34);
    ctx.stroke();

    const chartGradient = ctx.createLinearGradient(0, 470, 0, 760);
    chartGradient.addColorStop(0, "rgba(217,255,90,.25)");
    chartGradient.addColorStop(1, "rgba(217,255,90,0)");

    const points = [
      [82, 735],
      [160, 710],
      [230, 650],
      [300, 670],
      [370, 565],
      [460, 595],
      [545, 500],
      [630, 525],
      [700, 465],
    ];

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const mx = (x0 + x1) / 2;
      ctx.bezierCurveTo(mx, y0, mx, y1, x1, y1);
    }
    ctx.lineTo(700, 780);
    ctx.lineTo(82, 780);
    ctx.closePath();
    ctx.fillStyle = chartGradient;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const mx = (x0 + x1) / 2;
      ctx.bezierCurveTo(mx, y0, mx, y1, x1, y1);
    }
    ctx.strokeStyle = "#d9ff5a";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();

    const cards = [
      ["Maison", "2.1 kW"],
      ["Batterie", "78%"],
      ["Autonomie", "82%"],
    ] as const;

    cards.forEach(([label, value], index) => {
      const x = 50 + index * 228;
      ctx.fillStyle = "rgba(255,255,255,.025)";
      ctx.beginPath();
      ctx.roundRect(x, 875, 205, 180, 30);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.075)";
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,.32)";
      ctx.font = "400 20px Arial";
      ctx.fillText(label, x + 24, 925);

      ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.font = "600 34px Arial";
      ctx.fillText(value, x + 24, 995);
    });

    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.font = "400 20px Arial";
    ctx.fillText("Flux d’énergie", 58, 1145);

    const nodes = [
      [120, "Solaire"],
      [390, "Maison"],
      [660, "Batterie"],
    ] as const;

    nodes.forEach(([x, label], index) => {
      ctx.beginPath();
      ctx.arc(x, 1245, 34, 0, Math.PI * 2);
      ctx.fillStyle = index === 0 ? "rgba(217,255,90,.16)" : "rgba(255,255,255,.035)";
      ctx.fill();
      ctx.strokeStyle = index === 0 ? "rgba(217,255,90,.55)" : "rgba(255,255,255,.10)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,.43)";
      ctx.font = "400 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText(label, x, 1310);
    });

    ctx.strokeStyle = "rgba(217,255,90,.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(155, 1245);
    ctx.lineTo(355, 1245);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.beginPath();
    ctx.moveTo(425, 1245);
    ctx.lineTo(625, 1245);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,.28)";
    ctx.font = "400 20px Arial";
    ctx.fillText("Aujourd’hui", 58, 1445);
    ctx.fillStyle = "#d9ff5a";
    ctx.font = "600 22px Arial";
    ctx.fillText("Système opérationnel", 58, 1510);

    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 4;
    nextTexture.needsUpdate = true;
    if (materialRef.current) {
      materialRef.current.map = nextTexture;
      materialRef.current.color.set("#ffffff");
      materialRef.current.needsUpdate = true;
    }

    return () => nextTexture.dispose();
  }, [materialRef]);
}

function PhoneModel({ progress }: { progress: MutableRefObject<number> }) {
  const phone = useRef<THREE.Group>(null);
  const screenMaterial = useRef<THREE.MeshBasicMaterial>(null);
  useScreenTexture(screenMaterial);

  const bodyGeometry = useMemo(() => {
    const shape = makeRoundedRectShape(3.12, 6.35, 0.46);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.09,
      bevelThickness: 0.07,
      curveSegments: 28,
    });
    geometry.center();
    return geometry;
  }, []);

  useEffect(() => () => bodyGeometry.dispose(), [bodyGeometry]);

  useFrame(({ clock }, delta) => {
    if (!phone.current) return;
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);

    const targetRotY = THREE.MathUtils.lerp(-0.42, 0.32, p);
    const targetRotX = THREE.MathUtils.lerp(0.12, -0.07, p);
    const targetRotZ = THREE.MathUtils.lerp(-0.08, 0.035, p);
    const targetScale = THREE.MathUtils.lerp(0.92, 1.08, Math.sin(p * Math.PI));

    phone.current.rotation.y = THREE.MathUtils.damp(phone.current.rotation.y, targetRotY, 3.2, delta);
    phone.current.rotation.x = THREE.MathUtils.damp(phone.current.rotation.x, targetRotX, 3.2, delta);
    phone.current.rotation.z = THREE.MathUtils.damp(phone.current.rotation.z, targetRotZ, 3.2, delta);

    const s = THREE.MathUtils.damp(phone.current.scale.x, targetScale, 3, delta);
    phone.current.scale.setScalar(s);
    phone.current.position.y = THREE.MathUtils.damp(
      phone.current.position.y,
      Math.sin(clock.elapsedTime * 0.55) * 0.07,
      2.2,
      delta,
    );
  });

  return (
    <group ref={phone}>
      <mesh castShadow geometry={bodyGeometry}>
        <meshPhysicalMaterial
          color="#171a1a"
          metalness={0.92}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.13}
        />
      </mesh>

      <mesh position={[0, 0, 0.255]}>
        <planeGeometry args={[2.82, 6.0]} />
        <meshBasicMaterial ref={screenMaterial} color="#090d0c" toneMapped={false} />
      </mesh>

      <mesh position={[0, 2.78, 0.278]}>
        <boxGeometry args={[0.96, 0.19, 0.04]} />
        <meshBasicMaterial color="#020303" />
      </mesh>

      <mesh position={[-1.67, 1.05, -0.02]}>
        <boxGeometry args={[0.08, 0.75, 0.12]} />
        <meshStandardMaterial color="#242827" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.67, 0.05, -0.02]}>
        <boxGeometry args={[0.08, 0.58, 0.12]} />
        <meshStandardMaterial color="#242827" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.67, 0.72, -0.02]}>
        <boxGeometry args={[0.08, 1.0, 0.12]} />
        <meshStandardMaterial color="#242827" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function PhoneWorld({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.52} />
      <hemisphereLight args={["#f4f2e9", "#162019", 0.85]} />
      <directionalLight castShadow position={[5, 6, 5]} intensity={3.4} color="#f7f1de" />
      <pointLight position={[-3.4, 1.7, 3.2]} intensity={15} distance={9} color="#d9ff5a" />
      <pointLight position={[4.2, -1.0, 1.6]} intensity={7} distance={8} color="#8cb3ff" />

      <PhoneModel progress={progress} />

      <mesh receiveShadow position={[0, -3.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#080a09" roughness={1} />
      </mesh>

      <mesh position={[0, -3.45, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.6, 64]} />
        <meshBasicMaterial color="#d9ff5a" transparent opacity={0.025} depthWrite={false} />
      </mesh>
    </>
  );
}

export function PhoneScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.1, 9.7], fov: 34 }}
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
      <fog attach="fog" args={["#070908", 11, 18]} />
      <PhoneWorld progress={progress} />
    </Canvas>
  );
}
