'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useSectionContext } from '@/contexts/SectionContext'

interface ParticlesProps {
  count?: number
}

function Particles({ count = 1500 }: ParticlesProps) {
  const { theme } = useSectionContext()
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const { mouse } = useThree()
  const scrollRef = useRef(0)

  // Track scroll for depth-based particle animation
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000
      positions[i + 1] = (Math.random() - 0.5) * 2000
      positions[i + 2] = (Math.random() - 0.5) * 2000
    }
    return positions
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return

    // Slow rotation with scroll influence
    const scrollInfluence = scrollRef.current * 0.00002
    pointsRef.current.rotation.x += 0.00005 + scrollInfluence * 0.5
    pointsRef.current.rotation.y += 0.00008 + scrollInfluence

    // Enhanced mouse-based movement
    const mouseInfluence = 0.0008
    pointsRef.current.rotation.x += mouse.y * mouseInfluence
    pointsRef.current.rotation.y += mouse.x * mouseInfluence

    // Smooth opacity pulse based on scroll
    const opacityPulse = 0.5 + Math.sin(clock.elapsedTime * 0.5) * 0.1 + Math.cos(scrollInfluence) * 0.05
    materialRef.current.opacity = Math.max(0.4, Math.min(0.8, opacityPulse))
  })

  const colorMap: Record<string, [number, number, number]> = {
    research: [0.37, 0.51, 0.96], // #3B82F6 - Electric Indigo
    agency: [0.96, 0.62, 0.11], // #F59E0B - Platinum Gold
    hackathons: [0.06, 0.48, 0.38], // #10B981 - Cyberpunk Neon Green (updated)
    mission: [0.98, 0.45, 0.1], // #F97316 - Solar Amber
    default: [0.38, 0.58, 0.97], // #3B82F6
  }

  const themeColor = colorMap[theme.name as keyof typeof colorMap] || colorMap.default

  return (
    <Points
      ref={pointsRef}
      positions={particlePositions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        ref={materialRef}
        transparent
        color={new THREE.Color(...themeColor)}
        size={1.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
        sizeAttenuation={true}
      />
    </Points>
  )
}

function OrbitRings() {
  const { theme } = useSectionContext()
  const groupRef = useRef<THREE.Group>(null)
  const meshesRef = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0001
      
      // Animate individual rings with slight offset
      meshesRef.current.forEach((mesh, idx) => {
        mesh.rotation.x = Math.sin(clock.elapsedTime * 0.3 + idx) * 0.1
      })
    }
  })

  const colorMap: Record<string, [number, number, number]> = {
    research: [0.37, 0.51, 0.96], // #3B82F6
    agency: [0.96, 0.62, 0.11], // #F59E0B
    hackathons: [0.06, 0.48, 0.38], // #10B981
    mission: [0.98, 0.45, 0.1], // #F97316
    default: [0.38, 0.58, 0.97], // #3B82F6
  }

  const themeColor = colorMap[theme.name as keyof typeof colorMap] || colorMap.default

  return (
    <group ref={groupRef}>
      {[100, 150, 200, 250].map((radius, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshesRef.current[i] = el
          }}
        >
          <torusGeometry args={[radius, 0.5, 16, 100]} />
          <meshBasicMaterial
            color={new THREE.Color(...themeColor)}
            wireframe
            transparent
            opacity={0.12 + i * 0.03}
          />
        </mesh>
      ))}
    </group>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 500], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#0a0f1f']} />
        <Particles count={1500} />
        <OrbitRings />
      </Canvas>
    </div>
  )
}
