'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function ThesisPillars() {
  const pillars = [
    {
      title: 'Research',
      description: 'Explore first principles and publish the learning.',
      icon: '📚',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-400/30',
    },
    {
      title: 'Talent',
      description: 'Find builders who care about the same frontier.',
      icon: '🤝',
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-400/30',
    },
    {
      title: 'Delivery',
      description: 'Ship useful solutions for real organizations.',
      icon: '🚀',
      color: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-400/30',
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
    <section id="mission" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Philosophy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">01 / Thesis</h2>
          <p className="text-xl sm:text-2xl text-gray-300 italic">
            "Learning is only valuable when it becomes capability."
          </p>
        </motion.div>

        {/* 3 Pillar Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`glass backdrop-blur-md rounded-2xl p-8 border ${pillar.border} bg-gradient-to-br ${pillar.color} transition-all duration-300 hover:border-opacity-100 hover:shadow-lg`}
            >
              <div className="text-5xl mb-4">{pillar.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/10 text-center"
        >
          <p className="text-gray-300 text-lg">
            We believe in building infrastructure that matters—research that informs strategy, talent that executes with precision, and delivery mechanisms that scale impact.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
