'use client'

import React from 'react'

interface ProofOfWorkTickerProps {
  items: string[]
  speed?: number
}

export function ProofOfWorkTicker({ items, speed = 30 }: ProofOfWorkTickerProps) {
  const repeatedItems = [...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/40 py-4 backdrop-blur">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `scroll ${speed}s linear infinite`,
        }}
      >
        {repeatedItems.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-sm font-medium text-gray-300">
            {item}
            <span className="h-1 w-1 rounded-full bg-blue-400" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </div>
  )
}
