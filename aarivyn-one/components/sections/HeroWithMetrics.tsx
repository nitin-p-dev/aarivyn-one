'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'

export function HeroWithMetrics() {
  const { setShowJoinDrawer, setShowBriefDrawer } = useSectionContext()

  const metrics = [
    { value: '16', label: 'Members in Orbit' },
    { value: '4', label: 'Research Tracks' },
    { value: '4', label: 'Active Builds' },
    { value: '3', label: 'Agency Briefs' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="hero" className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto w-full">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-blue-300 font-medium">Independent research & delivery collective</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            We build{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              what comes next
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A collective of researchers, builders, and visionaries architecting decentralized solutions. From cutting-edge research to production systems that scale.
          </p>
        </motion.div>

        {/* Dual Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowJoinDrawer(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            Join the research network
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBriefDrawer(true)}
            className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Bring us a hard problem
          </motion.button>
        </motion.div>

        {/* Live Metrics Matrix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="glass backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <div className="text-gray-500 text-sm mb-2">Scroll to explore</div>
            <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
