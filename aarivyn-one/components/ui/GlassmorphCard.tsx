import React, { ReactNode } from 'react'

interface GlassmorphCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export function GlassmorphCard({
  children,
  className = '',
  hover = true,
  glow = false,
  onClick,
}: GlassmorphCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-2xl p-6 transition-all duration-300
        ${hover ? 'hover:bg-white/10 hover:-translate-y-1 cursor-pointer' : ''}
        ${glow ? 'glow-soft hover:glow-bright' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
