'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function ResearchShowcase() {
  const projects = [
    {
      title: 'OptiSight PCB Inspector',
      trl: 'TRL 4',
      status: 'Prototype',
      tags: ['Computer Vision', 'AOI'],
      description: 'AI-powered Automated Optical Inspection for PCB quality assurance.',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'WhatsApp Context Agent',
      trl: 'Prototype',
      status: 'In Development',
      tags: ['Agents', 'RAG'],
      description: 'Intelligent agent that understands and responds to contextual WhatsApp conversations.',
      color: 'from-green-500/20 to-emerald-500/20',
    },
    {
      title: 'Autonomous UAV Payload Lab',
      trl: 'Research',
      status: 'Active Research',
      tags: ['CUDA', 'MLOps'],
      description: 'Research platform for autonomous drone payload optimization and management.',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Community GPU Cluster',
      trl: 'In Progress',
      status: 'Development',
      tags: ['Kubernetes', 'CUDA'],
      description: 'Distributed GPU computing infrastructure for collaborative research.',
      color: 'from-orange-500/20 to-red-500/20',
    },
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
    <section id="research" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">02 / Research & Innovation</h2>
          <p className="text-lg text-gray-400">
            Active projects spanning computer vision, AI agents, distributed systems, and next-generation infrastructure.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className={`glass backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 bg-gradient-to-br ${project.color} transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20`}
            >
              {/* Header with TRL Badge */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/50 text-xs font-semibold text-blue-300">
                  {project.trl}
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300">
                  {project.status}
                </span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 text-xs text-gray-300 transition-all"
                  >
                    [{tag}]
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 font-semibold hover:border-blue-400/60 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300"
          >
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
