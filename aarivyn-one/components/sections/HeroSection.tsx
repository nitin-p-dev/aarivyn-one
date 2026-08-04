'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'

export function HeroSection() {
  const { setShowMembersModal, setActiveSection } = useSectionContext()

  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Aarivyn One —{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Shape The Horizon
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collective of researchers, builders, and visionaries architecting the decentralized future. From consensus protocols to scalable dApps.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          {/* Members Pill Button */}
          <button
            onClick={() => setShowMembersModal(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full hover:border-blue-400/60 transition-all duration-300"
          >
            <div className="relative flex items-center gap-2">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-50 animate-ping"></div>
              </div>
              <span className="text-sm font-semibold text-blue-300">16 Members in Orbit</span>
            </div>
            <span className="text-xl">→</span>
          </button>

          <div className="hidden sm:block text-gray-600">•</div>

          <button
            onClick={() => setActiveSection('research')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Explore Research
          </button>

          <button
            onClick={() => setActiveSection('agency')}
            className="px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Hire Agency
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <div className="text-gray-500 text-sm mb-2">Scroll to explore</div>
            <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
