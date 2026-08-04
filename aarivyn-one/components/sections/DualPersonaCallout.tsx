'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'

export function DualPersonaCallout() {
  const { setShowJoinDrawer, setShowBriefDrawer } = useSectionContext()

  const personas = [
    {
      title: 'I want to join',
      action: 'Build profile & find your next team.',
      button: 'Join as Builder',
      onClick: () => setShowJoinDrawer(true),
      icon: '🚀',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30 hover:border-blue-400/60',
    },
    {
      title: 'I need a solution',
      action: 'Bring a brief & work with AARIVYN.',
      button: 'Submit Client Brief',
      onClick: () => setShowBriefDrawer(true),
      icon: '🎯',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-400/30 hover:border-amber-400/60',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Choose Your Path</h2>
          <p className="text-lg text-gray-400">Join AARIVYN as a builder or bring us your hardest problems as a client.</p>
        </motion.div>

        {/* Dual Persona Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {personas.map((persona) => (
            <motion.div
              key={persona.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`glass backdrop-blur-md rounded-2xl p-12 border ${persona.borderColor} bg-gradient-to-br ${persona.color} transition-all duration-300 hover:shadow-lg`}
            >
              {/* Icon */}
              <div className="text-6xl mb-6">{persona.icon}</div>

              {/* Content */}
              <h3 className="text-3xl font-bold text-white mb-3">{persona.title}</h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{persona.action}</p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={persona.onClick}
                className="w-full px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                {persona.button} →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
