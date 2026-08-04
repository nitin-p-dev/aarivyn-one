'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    name: 'ProtocolX L1',
    description: 'Novel consensus mechanism with MEV resistance',
    tags: ['Rust', 'Protocol Design', 'Consensus'],
    status: 'Deployed',
    github: 'https://github.com/aarivyn/protocolx',
  },
  {
    id: 2,
    name: 'ZK Privacy Suite',
    description: 'End-to-end encrypted privacy layer for DeFi',
    tags: ['ZK Circuits', 'Solidity', 'Cairo'],
    status: 'Deployed',
    github: 'https://github.com/aarivyn/zkprivacy',
  },
  {
    id: 3,
    name: 'AI Agent Framework',
    description: 'Autonomous agents for protocol governance',
    tags: ['Python', 'LLM Integration', 'Agents'],
    status: 'In Development',
    github: 'https://github.com/aarivyn/ai-agents',
  },
  {
    id: 4,
    name: 'Cross-Chain Bridge',
    description: 'Secure interoperability protocol',
    tags: ['Smart Contracts', 'Security', 'Multi-Chain'],
    status: 'Deployed',
    github: 'https://github.com/aarivyn/bridge',
  },
  {
    id: 5,
    name: 'Rollup Stack',
    description: 'Production-ready Optimistic Rollup framework',
    tags: ['Go', 'Layer 2', 'Solidity'],
    status: 'Deployed',
    github: 'https://github.com/aarivyn/rollup-stack',
  },
  {
    id: 6,
    name: 'Grant Distribution Protocol',
    description: 'Fair mechanism for research funding allocation',
    tags: ['Economics', 'Mechanism Design', 'Smart Contracts'],
    status: 'Deployed',
    github: 'https://github.com/aarivyn/grants',
  },
]

const stats = [
  { label: 'Hackathon Bounties Won', value: '$100k+', icon: '🏆' },
  { label: 'Deployed DApps', value: '12+', icon: '🚀' },
  { label: 'Research Publications', value: '5+', icon: '📚' },
]

export function ProofOfWorkSection() {
  const [counts, setCounts] = useState({ bounties: 0, dapps: 0, papers: 0 })

  useEffect(() => {
    // Animate counters
    const timer1 = setTimeout(() => setCounts((p) => ({ ...p, bounties: 100 })), 300)
    const timer2 = setTimeout(() => setCounts((p) => ({ ...p, dapps: 12 })), 400)
    const timer3 = setTimeout(() => setCounts((p) => ({ ...p, papers: 5 })), 500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="relative z-20 py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-cyan-500/50 text-center transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Proof of Work</h2>
          <p className="text-gray-400 text-lg">
            Live project matrix showcasing deployed dApps, active research, and completed deliverables.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group glass backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors flex-1">
                  {project.name}
                </h3>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                  project.status === 'Deployed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <motion.span 
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded text-xs text-gray-300 backdrop-blur-sm hover:text-cyan-300 transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-400 transition-colors">
                <span>View on GitHub</span>
                <span className="ml-2">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
