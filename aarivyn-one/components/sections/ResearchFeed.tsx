'use client'

import React from 'react'
import { motion } from 'framer-motion'

const researchPapers = [
  {
    id: 1,
    title: 'MEV Mitigation in Proof-of-Stake Networks',
    authors: 'Alex Chen, Sam Patel',
    date: 'Jan 2025',
    tags: ['MEV', 'PoS', 'L1 Design'],
    arxivId: '2501.12345',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Zero-Knowledge Proofs for Privacy-Preserving DeFi',
    authors: 'Riley Martinez, Jordan Lee',
    date: 'Dec 2024',
    tags: ['ZK', 'Privacy', 'DeFi'],
    arxivId: '2412.67890',
    status: 'Under Review',
  },
  {
    id: 3,
    title: 'Scaling Consensus: Novel Approaches to L1 Throughput',
    authors: 'Morgan Davis, Casey Kim',
    date: 'Dec 2024',
    tags: ['Scaling', 'Consensus', 'Performance'],
    arxivId: '2412.54321',
    status: 'Published',
  },
  {
    id: 4,
    title: 'AI Agents in Decentralized Networks',
    authors: 'Alex Chen, Taylor Singh',
    date: 'Nov 2024',
    tags: ['AI Agents', 'Autonomy', 'Multi-Agent'],
    arxivId: '2411.98765',
    status: 'In Progress',
  },
]

export function ResearchFeed() {
  return (
    <div className="relative z-20 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Research in Public</h2>
          <p className="text-gray-400 text-lg">
            Live feed of ongoing research papers, arXiv links, and weekly lab logs from our team.
          </p>
        </motion.div>

        {/* Papers Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {researchPapers.map((paper, idx) => (
            <motion.a
              key={paper.id}
              href={`https://arxiv.org/abs/${paper.arxivId}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group glass backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-gray-400">{paper.authors}</p>
                </div>
                <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  paper.status === 'Published' ? 'bg-green-500/20 text-green-300' :
                  paper.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {paper.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map((tag) => (
                  <motion.span 
                    key={tag} 
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 bg-blue-500/10 border border-white/10 hover:border-blue-500/50 rounded text-xs text-blue-300 backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{paper.date}</span>
                <span className="group-hover:text-blue-300 transition-colors">View on arXiv →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
