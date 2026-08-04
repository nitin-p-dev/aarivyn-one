'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'
import Link from 'next/link'

export function HeaderNavigation() {
  const { setActiveSection, setShowLoginModal, setShowSignupModal } = useSectionContext()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveSection('default')}
          className="flex items-center gap-2 text-lg font-bold text-white transition-all duration-300"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400" />
          <span>AARIVYN ONE</span>
        </motion.button>

        {/* Anchor Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#mission" className="text-sm text-gray-300 hover:text-white transition-colors">
            Mission
          </Link>
          <Link href="#research" className="text-sm text-gray-300 hover:text-white transition-colors">
            Research
          </Link>
          <Link href="#agency" className="text-sm text-gray-300 hover:text-white transition-colors">
            Agency
          </Link>
          <Link href="/showcase" className="text-sm text-gray-300 hover:text-white transition-colors">
            Showcase
          </Link>
        </nav>

        {/* Dual Auth Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLoginModal(true)}
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSignupModal(true)}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
          >
            Join AARIVYN
          </motion.button>
        </div>
      </div>
    </header>
  )
}
