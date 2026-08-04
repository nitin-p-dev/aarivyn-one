'use client'

import React from 'react'

/**
 * High-performance 2D CSS/SVG Cyberpunk Ambient Background
 * - Animated cyber gridlines using CSS gradients
 * - Glowing ambient orbs with aurora effect
 * - Floating CSS particles for depth
 * - No performance impact - purely CSS-based
 */
export function CyberpunkAmbientBg() {
  return (
    <>
      {/* Base Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
            opacity: 0.4,
          }}
        />

        {/* Gradient Overlay - Dark to slightly lighter edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900/90" />
      </div>

      {/* Hero Section - Cyan/Indigo Aurora Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none z-5">
        <div
          className="absolute top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.15) 30%, transparent 70%)',
            animation: 'aurora-drift 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Middle Section - Violet/Purple Aurora Glow */}
      <div className="fixed top-1/3 left-0 w-full h-96 pointer-events-none z-5">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
            animation: 'aurora-drift-slow 12s ease-in-out infinite 2s',
          }}
        />
      </div>

      {/* Bottom Section - Emerald/Blue Aurora Glow */}
      <div className="fixed bottom-0 right-0 w-full h-96 pointer-events-none z-5">
        <div
          className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(34, 197, 94, 0.08) 40%, transparent 70%)',
            animation: 'aurora-drift 10s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Floating CSS Particles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.1,
              boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`,
              animation: `float-up ${Math.random() * 10 + 8}s linear infinite`,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Global Keyframe Animations */}
      <style>{`
        @keyframes aurora-drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          25% {
            transform: translate(30px, -20px) scale(1.1);
            opacity: 0.2;
          }
          50% {
            transform: translate(-40px, 30px) scale(0.95);
            opacity: 0.18;
          }
          75% {
            transform: translate(20px, 50px) scale(1.05);
            opacity: 0.17;
          }
        }

        @keyframes aurora-drift-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.12;
          }
          25% {
            transform: translate(-50px, 20px) scale(1.15);
            opacity: 0.15;
          }
          50% {
            transform: translate(60px, -40px) scale(0.9);
            opacity: 0.13;
          }
          75% {
            transform: translate(-30px, 60px) scale(1.1);
            opacity: 0.14;
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        /* Ensure z-stacking works correctly */
        .fixed.z-5 {
          z-index: 5;
        }
      `}</style>
    </>
  )
}
