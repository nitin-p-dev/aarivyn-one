'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'

export function AgencyServices() {
  const { setShowBriefDrawer } = useSectionContext()

  const workflow = [
    {
      step: '1',
      title: 'Scope',
      description: 'Turn open-ended need into precise technical brief.',
      icon: '📋',
    },
    {
      step: '2',
      title: 'Assemble',
      description: 'Match problem with right research & engineering talent.',
      icon: '🎯',
    },
    {
      step: '3',
      title: 'Deliver',
      description: 'Build prototype, system, or research artifact together.',
      icon: '✈️',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="agency" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">03 / Agency Services</h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
            Your hardest technical problem is our next research brief.
          </p>
        </motion.div>

        {/* 3-Step Workflow Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {workflow.map((item) => (
            <motion.div key={item.step} variants={itemVariants} className="relative">
              {/* Connector Line */}
              {parseInt(item.step) < workflow.length && (
                <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>
              )}

              <div className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 h-full">
                {/* Step Number */}
                <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400">
                  <span className="text-lg font-bold text-white">{item.step}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
                <div className="mt-4 text-4xl">{item.icon}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Onboarding CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBriefDrawer(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            Start a Client Account
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
