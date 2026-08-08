'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSectionContext } from '@/contexts/SectionContext';
import { sectionThemes } from '@/data/content';

const THREE_COLOR = THREE.Color;

// ── Lerp helper ──────────────────────────────────────────────
function lerpColor(current: THREE.Color, target: THREE.Color, t: number) {
  current.r += (target.r - current.r) * t;
  current.g += (target.g - current.g) * t;
  current.b += (target.b - current.b) * t;
}

// ── Constellation Grid (Home) ────────────────────────────────
function ConstellationGrid({ colorA, colorB }: { colorA: THREE.Color; colorB: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, linePositions } = useMemo(() => {
    const count = 400;
    const pts = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 600;
      pts[i * 3 + 1] = (Math.random() - 0.5) * 400;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    // build connecting lines for nearby points
    const linePos: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pts[i * 3] - pts[j * 3];
        const dy = pts[i * 3 + 1] - pts[j * 3 + 1];
        const dz = pts[i * 3 + 2] - pts[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 60) {
          linePos.push(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2]);
          linePos.push(pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2]);
        }
      }
    }
    return { positions: pts, linePositions: new Float32Array(linePos) };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.1;
    }
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.color.copy(colorB);
      mat.opacity = 0.15 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.color.copy(colorA);
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={2} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

// ── Wireframe Lattice (Thesis) ────────────────────────────────
function WireframeLattice({ colorA, colorB }: { colorA: THREE.Color; colorB: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  const geometries = useMemo(
    () => [
      { type: 'ico', radius: 80, detail: 1 },
      { type: 'box', size: 60 },
      { type: 'ico', radius: 120, detail: 0 },
      { type: 'box', size: 90 },
      { type: 'ico', radius: 50, detail: 2 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = clock.elapsedTime * 0.02;
    }
    meshesRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = clock.elapsedTime * (0.1 + i * 0.03);
        mesh.rotation.y = clock.elapsedTime * (0.15 + i * 0.02);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {geometries.map((geo, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshesRef.current[i] = el; }}
          position={[
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 150,
            (Math.random() - 0.5) * 100,
          ]}
        >
          {geo.type === 'ico' ? (
            <icosahedronGeometry args={[geo.radius, geo.detail]} />
          ) : (
            <boxGeometry args={[geo.size, geo.size, geo.size]} />
          )}
          <meshBasicMaterial
            color={i % 2 === 0 ? colorA : colorB}
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Quantum Field Particle Wave (Research) ────────────────────
function QuantumField({ colorA, colorB }: { colorA: THREE.Color; colorB: THREE.Color }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const original = useRef(positions);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const orig = original.current;
    for (let i = 0; i < count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];
      const wave = Math.sin(t * 0.5 + ox * 0.01) * 15 + Math.cos(t * 0.3 + oy * 0.01) * 10;
      const scale = 1 + wave * 0.01;
      posAttr.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.05;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.color.copy(colorA);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.5} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

// ── Optical Data Stream Grid (Agency) ────────────────────────
function DataStreamGrid({ colorA, colorB }: { colorA: THREE.Color; colorB: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  const streamsRef = useRef<THREE.Points[]>([]);

  const streamData = useMemo(() => {
    const streams: { positions: Float32Array; speed: number; offset: number }[] = [];
    for (let s = 0; s < 8; s++) {
      const count = 300;
      const positions = new Float32Array(count * 3);
      const zBase = -200 + s * 50;
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 400;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
        positions[i * 3 + 2] = zBase + Math.random() * 40;
      }
      streams.push({ positions, speed: 0.5 + Math.random() * 1.5, offset: Math.random() * 100 });
    }
    return streams;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
    streamsRef.current.forEach((points, idx) => {
      if (!points) return;
      const geom = points.geometry;
      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      const data = streamData[idx];
      const t = clock.elapsedTime * data.speed + data.offset;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        posAttr.setZ(i, -200 + idx * 50 + ((t + i * 2) % 100));
        posAttr.setX(i, x + Math.sin(t + i * 0.1) * 0.5);
      }
      posAttr.needsUpdate = true;
      const mat = points.material as THREE.PointsMaterial;
      mat.color.copy(idx % 2 === 0 ? colorA : colorB);
    });
  });

  return (
    <group ref={groupRef}>
      {streamData.map((stream, i) => (
        <points
          key={i}
          ref={(el) => { if (el) streamsRef.current[i] = el; }}
        >
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[stream.positions, 3]} />
          </bufferGeometry>
          <pointsMaterial size={1.2} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
        </points>
      ))}
    </group>
  );
}

// ── Multi-ring Orbital Swarm (Ecosystem) ──────────────────────
function OrbitalSwarm({ colorA, colorB }: { colorA: THREE.Color; colorB: THREE.Color }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 80 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.01;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;
    }
    ringsRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = t * (0.1 + i * 0.02);
        mesh.rotation.y = t * (0.15 + i * 0.03);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.copy(i % 2 === 0 ? colorA : colorB);
      }
    });
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.03;
      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.copy(colorB);
    }
  });

  return (
    <group ref={groupRef}>
      {[80, 130, 180, 230, 280].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringsRef.current[i] = el; }}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <torusGeometry args={[radius, 0.4, 16, 100]} />
          <meshBasicMaterial wireframe transparent opacity={0.1 + i * 0.02} />
        </mesh>
      ))}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={1.5} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
      </points>
    </group>
  );
}

// ── Main Scene Controller ────────────────────────────────────
function Scene() {
  const { theme } = useSectionContext();
  const colorARef = useRef(new THREE_COLOR('#00f0ff'));
  const colorBRef = useRef(new THREE_COLOR('#6366f1'));
  const targetA = useRef(new THREE_COLOR());
  const targetB = useRef(new THREE_COLOR());
  const { mouse } = useThree();

  useEffect(() => {
    const t = sectionThemes[theme.id] || sectionThemes.home;
    targetA.current.set(t.primary);
    targetB.current.set(t.secondary);
  }, [theme]);

  useFrame(({ clock }) => {
    lerpColor(colorARef.current, targetA.current, 0.04);
    lerpColor(colorBRef.current, targetB.current, 0.04);
  });

  // mouse parallax via group
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.1 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (-mouse.y * 0.1 - groupRef.current.rotation.x) * 0.02;
    }
  });

  const mode = theme.mode;

  return (
    <group ref={groupRef}>
      {mode === 'constellation' && (
        <ConstellationGrid colorA={colorARef.current} colorB={colorBRef.current} />
      )}
      {mode === 'wireframe' && (
        <WireframeLattice colorA={colorARef.current} colorB={colorBRef.current} />
      )}
      {mode === 'quantum' && (
        <QuantumField colorA={colorARef.current} colorB={colorBRef.current} />
      )}
      {mode === 'datastream' && (
        <DataStreamGrid colorA={colorARef.current} colorB={colorBRef.current} />
      )}
      {mode === 'orbital' && (
        <OrbitalSwarm colorA={colorARef.current} colorB={colorBRef.current} />
      )}
    </group>
  );
}

export function DynamicCanvas() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 300], fov: 75 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0f1f']} />
        <fog attach="material" args={['#0a0f1f', 200, 600]} />
        <Scene />
      </Canvas>
    </div>
  );
}
