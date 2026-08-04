'use client'

import React from 'react'
import { members } from '@/data/mockData'
import { useSectionContext } from '@/contexts/SectionContext'
import { GlassmorphCard } from '@/components/ui/GlassmorphCard'

export function MissionSection() {
  const { setShowJoinDrawer } = useSectionContext()
  const founderMembers = members.filter((m) => m.tracks.includes('founders'))

  const values = [
    { title: 'Decentralization', description: 'Empowering systems through distributed governance and control' },
    { title: 'Innovation', description: 'Pushing boundaries and exploring new possibilities in Web3' },
    { title: 'Collaboration', description: 'Building together across research, agency, and community' },
    { title: 'Accessibility', description: 'Making advanced technology available to everyone' },
    { title: 'Sustainability', description: 'Creating long-term value for the entire ecosystem' },
    { title: 'Transparency', description: 'Operating with honesty and openness in all endeavors' },
  ]

  return (
    <div className="space-y-12">
      {/* Mission Statement */}
      <div className="glass rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 p-8">
        <h2 className="mb-4 text-3xl font-bold text-white">Our Mission</h2>
        <p className="mb-6 text-lg text-gray-300">
          To advance the frontiers of decentralized systems through research, build world-class applications, and foster
          a community of builders dedicated to creating the infrastructure for a more open, transparent, and equitable future.
        </p>
      </div>

      {/* Core Values */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Core Values</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <GlassmorphCard key={value.title} hover glow>
              <h3 className="mb-3 text-lg font-bold text-orange-400">{value.title}</h3>
              <p className="text-sm text-gray-400">{value.description}</p>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Roadmap</h2>
        <div className="space-y-4">
          {[
            { phase: 'Q3 2024', items: ['Core collective formation', 'Research initiatives launch', 'Agency operations begin'] },
            { phase: 'Q4 2024', items: ['First hackathon series', 'Partnership announcements', 'Paper publications'] },
            { phase: 'Q1 2025', items: ['Expanded team', 'New research domains', 'Community grants program'] },
            { phase: 'Q2-Q3 2025', items: ['Infrastructure launch', 'Global presence', 'Major deployments'] },
          ].map((milestone) => (
            <GlassmorphCard key={milestone.phase} hover>
              <h3 className="mb-3 text-lg font-bold text-orange-400">{milestone.phase}</h3>
              <ul className="space-y-2">
                {milestone.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Founders */}
      {founderMembers.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Leadership</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {founderMembers.map((member) => (
              <GlassmorphCard key={member.id} hover glow>
                <div className="flex flex-col gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-16 w-16 rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-orange-400">{member.title}</p>
                    <p className="mt-2 text-xs text-gray-400">{member.bio}</p>
                  </div>
                </div>
              </GlassmorphCard>
            ))}
          </div>
        </div>
      )}

      {/* Join CTA */}
      <div className="glass rounded-2xl p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Join the Collective</h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-400">
          Whether you&apos;re a researcher, builder, designer, or visionary, there&apos;s a place for you in Aarivyn One.
        </p>
        <button
          onClick={() => setShowJoinDrawer(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500/30 px-8 py-3 font-medium text-orange-300 transition-all duration-300 hover:bg-orange-500/40"
        >
          Apply Now
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-400">16</div>
            <div className="text-sm text-gray-400">Core Members</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-400">4</div>
            <div className="text-sm text-gray-400">Domains</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-400">∞</div>
            <div className="text-sm text-gray-400">Impact Potential</div>
          </div>
        </GlassmorphCard>
      </div>
    </div>
  )
}
