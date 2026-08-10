"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AbstractObject() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y += delta * 0.32;
    g.rotation.x = Math.sin(t * 0.2) * 0.12;
    g.rotation.z = Math.sin(t * 0.15) * 0.06;
    g.position.y = Math.sin(t * 0.9) * 0.1;
    if (shell.current) shell.current.rotation.y -= delta * 0.4;
    if (core.current) {
      core.current.rotation.y += delta * 0.25;
      core.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group ref={group}>
      {/* outer wireframe shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#5dffd9"
          wireframe
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* inner rotating core */}
      <mesh ref={core} scale={0.62}>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshBasicMaterial color="#0e1412" wireframe transparent opacity={0.4} />
      </mesh>

      {/* orbit rings */}
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[2.3, 0.006, 8, 120]} />
        <meshBasicMaterial color="#c6ff00" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[2.6, 0.004, 8, 120]} />
        <meshBasicMaterial color="#5dffd9" transparent opacity={0.16} />
      </mesh>

      {/* ground reflection */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -2.35, 0]}>
        <ringGeometry args={[1.9, 2.35, 80]} />
        <meshBasicMaterial
          color="#4dffc8"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -2.34, 0]}>
        <ringGeometry args={[2.05, 2.1, 80]} />
        <meshBasicMaterial
          color="#c6ff00"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <AbstractObject />
    </Canvas>
  );
}
