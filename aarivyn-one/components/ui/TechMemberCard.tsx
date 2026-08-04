'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Share2, Link2, Globe } from 'lucide-react'

interface TechMemberCardProps {
  name: string
  title: string
  track: string
  contributions: string[]
  socialLinks: {
    github?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
  index: number
}

const trackColors: Record<string, { border: string; badge: string; text: string; initials: string }> = {
  research: {
    border: 'border-blue-500/50 group-hover:border-blue-400/80',
    badge: 'bg-gradient-to-r from-blue-600 to-blue-800',
    text: 'text-blue-300 group-hover:text-blue-200',
    initials: 'bg-blue-600/30 text-blue-300',
  },
  agency: {
    border: 'border-amber-500/50 group-hover:border-amber-400/80',
    badge: 'bg-gradient-to-r from-amber-600 to-amber-800',
    text: 'text-amber-300 group-hover:text-amber-200',
    initials: 'bg-amber-600/30 text-amber-300',
  },
  hackathons: {
    border: 'border-green-500/50 group-hover:border-green-400/80',
    badge: 'bg-gradient-to-r from-green-600 to-green-800',
    text: 'text-green-300 group-hover:text-green-200',
    initials: 'bg-green-600/30 text-green-300',
  },
  mission: {
    border: 'border-orange-500/50 group-hover:border-orange-400/80',
    badge: 'bg-gradient-to-r from-orange-600 to-orange-800',
    text: 'text-orange-300 group-hover:text-orange-200',
    initials: 'bg-orange-600/30 text-orange-300',
  },
}

export function TechMemberCard({ name, title, track, contributions, socialLinks, index }: TechMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = trackColors[track] || trackColors.research
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <div className={`relative h-full glass rounded-2xl p-6 border-2 ${colors.border} transition-all duration-300 overflow-hidden`}>
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 -z-10 opacity-20 blur-3xl ${colors.badge}`}
          />
        )}

        <div className="h-full flex flex-col">
          {/* Avatar Ring */}
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`w-20 h-20 rounded-full ${colors.badge} p-0.5 shadow-lg transition-shadow duration-300`}
              style={{
                boxShadow: isHovered ? `0 0 20px rgba(59, 130, 246, 0.4)` : '0 0 8px rgba(59, 130, 246, 0)',
              }}
            >
              <div className={`w-full h-full rounded-full ${colors.initials} flex items-center justify-center font-bold text-xl`}>
                {initials}
              </div>
            </motion.div>
          </div>

          {/* Name & Title */}
          <motion.div animate={{ y: isHovered ? -2 : 0 }} transition={{ duration: 0.2 }} className="text-center mb-3">
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <p className={`text-sm ${colors.text} transition-colors duration-300 font-semibold`}>{title}</p>
          </motion.div>

          {/* Track Badge */}
          <div className="flex justify-center mb-4">
            <motion.span
              animate={{
                boxShadow: isHovered ? `0 0 20px rgba(59, 130, 246, 0.4)` : `0 0 0px rgba(59, 130, 246, 0)`,
              }}
              transition={{ duration: 0.3 }}
              className={`px-3 py-1 ${colors.badge} text-white text-xs font-bold rounded-full uppercase tracking-wide`}
            >
              {track}
            </motion.span>
          </div>

          {/* Contributions */}
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {contributions.slice(0, 2).map((contrib) => (
              <motion.span
                key={contrib}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`px-2 py-0.5 ${colors.badge} bg-opacity-20 border border-current rounded text-xs font-semibold ${colors.text.split(' ')[0]}`}
              >
                {contrib}
              </motion.span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />

          {/* Social Links */}
          <div className="flex gap-2 justify-center mt-auto pt-4">
            {socialLinks.github && (
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/${socialLinks.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all duration-300"
              >
                <Code className="w-4 h-4 text-gray-300" />
              </motion.a>
            )}
            {socialLinks.twitter && (
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://twitter.com/${socialLinks.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 text-gray-300" />
              </motion.a>
            )}
            {socialLinks.linkedin && (
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://linkedin.com/in/${socialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all duration-300"
              >
                <Link2 className="w-4 h-4 text-gray-300" />
              </motion.a>
            )}
            {socialLinks.website && (
              <motion.a
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 transition-all duration-300"
              >
                <Globe className="w-4 h-4 text-gray-300" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
