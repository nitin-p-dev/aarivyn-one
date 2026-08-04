'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { members } from '@/data/mockData'
import { TechMemberCard } from '@/components/ui/TechMemberCard'

export function MembersGrid() {
  return (
    <div className="relative z-20 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Members in Orbit</h2>
          <p className="text-gray-400 text-lg">
            Meet the 16 core builders, researchers, and strategists driving Aarivyn One forward.
          </p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.slice(0, 16).map((member, idx) => (
            <TechMemberCard
              key={member.id}
              name={member.name}
              title={member.title}
              track={member.tracks?.[0] || 'research'}
              contributions={member.contributions}
              socialLinks={member.socialLinks}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
