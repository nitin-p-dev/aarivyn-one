'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'

const domains = [
  { id: 'research', label: 'Research', icon: '🔬', color: 'from-blue-600 to-blue-400', borderColor: 'border-blue-500/20', textColor: 'text-blue-400' },
  { id: 'agency', label: 'Agency', icon: '⚙️', color: 'from-amber-600 to-amber-400', borderColor: 'border-amber-500/20', textColor: 'text-amber-400' },
  { id: 'hackathons', label: 'Hackathons', icon: '⚡', color: 'from-green-600 to-green-400', borderColor: 'border-green-500/20', textColor: 'text-green-400' },
  { id: 'mission', label: 'Mission', icon: '🌍', color: 'from-orange-600 to-orange-400', borderColor: 'border-orange-500/20', textColor: 'text-orange-400' },
]

export function DomainHub() {
  const { activeSection, setActiveSection } = useSectionContext()
  
  // Use Research as default display when on main page (default section)
  const displaySection = activeSection === 'default' ? 'research' : activeSection

  return (
    <div className="relative z-20 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-center mb-16 text-white"
        >
          Dynamic Domain Hub
        </motion.h2>

        {/* Domain Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {domains.map((domain) => (
            <motion.button
              key={domain.id}
              onClick={() => setActiveSection(domain.id as any)}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === domain.id
                  ? `bg-gradient-to-r ${domain.color} text-white shadow-lg shadow-current/50`
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{domain.icon}</span>
              {domain.label}
            </motion.button>
          ))}
        </div>

        {/* Content Display */}
        <motion.div
          key={displaySection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-96"
        >
          {displaySection === 'research' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Research Domain</h3>
              <p className="text-gray-300 mb-6">
                Pushing the boundaries of blockchain science through rigorous peer-reviewed research in cryptography, consensus mechanisms, MEV mitigation, and scaling solutions.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {['AI Agents', 'ZK Proofs', 'L1 Design'].map((tag, idx) => (
                  <motion.div 
                    key={tag} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-blue-500/10 border border-white/10 hover:border-blue-500/50 rounded-lg p-4 text-center text-blue-300 font-medium backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {displaySection === 'agency' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Agency Domain</h3>
              <p className="text-gray-300 mb-6">
                Full-stack Web3 development, protocol consulting, and product strategy for leading blockchain projects and protocols.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {['Smart Contracts', 'Frontend Dev', 'Auditing'].map((tag, idx) => (
                  <motion.div 
                    key={tag} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-amber-500/10 border border-white/10 hover:border-amber-500/50 rounded-lg p-4 text-center text-amber-300 font-medium backdrop-blur-sm hover:bg-amber-500/20 transition-all duration-300"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {displaySection === 'hackathons' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4">Hackathons Domain</h3>
              <p className="text-gray-300 mb-6">
                Community-driven competitions with substantial bounty pools, mentorship, and direct path to venture backing for winning teams.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {['$100k Bounties', 'Live Feedback', 'Venture Support'].map((tag, idx) => (
                  <motion.div 
                    key={tag} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-green-500/10 border border-white/10 hover:border-green-500/50 rounded-lg p-4 text-center text-green-300 font-medium backdrop-blur-sm hover:bg-green-500/20 transition-all duration-300"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {displaySection === 'mission' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Mission Domain</h3>
              <p className="text-gray-300 mb-6">
                Advancing decentralized systems and democratizing access to cutting-edge technology and knowledge through research, education, and community building.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {['Core Values', 'Roadmap', 'Community'].map((tag, idx) => (
                  <motion.div 
                    key={tag} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-orange-500/10 border border-white/10 hover:border-orange-500/50 rounded-lg p-4 text-center text-orange-300 font-medium backdrop-blur-sm hover:bg-orange-500/20 transition-all duration-300"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
