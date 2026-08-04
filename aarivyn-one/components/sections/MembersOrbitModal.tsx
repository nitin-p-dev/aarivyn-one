'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSectionContext } from '@/contexts/SectionContext'
import { members } from '@/data/mockData'
import { Member, TrackType } from '@/types'
import { X, Code, Share2, Link2, Globe, ChevronLeft } from 'lucide-react'

export function MembersOrbitModal() {
  const { showMembersModal, setShowMembersModal, selectedMemberId, setSelectedMemberId } =
    useSectionContext()
  const [filter, setFilter] = useState<TrackType | 'all'>('all')

  const filteredMembers = members.filter((member) =>
    filter === 'all' ? true : member.tracks.includes(filter)
  )

  const selectedMember = members.find((m) => m.id === selectedMemberId)

  const trackFilters: Array<{ id: TrackType | 'all'; label: string }> = [
    { id: 'all', label: 'All Members' },
    { id: 'research', label: 'Research' },
    { id: 'agency', label: 'Agency' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'founders', label: 'Founders' },
  ]

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showMembersModal) {
        setShowMembersModal(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showMembersModal, setShowMembersModal])

  return (
    <AnimatePresence>
      {showMembersModal && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMembersModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-[85vh] max-w-6xl mx-4 pointer-events-auto">
              {/* Glass Modal Container */}
              <div className="glass rounded-2xl h-full flex flex-col overflow-hidden">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 glass-header bg-black/60 backdrop-blur-xl border-b border-white/10 px-8 py-6 shrink-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white">Members in Orbit</h2>
                      <p className="mt-1 text-sm text-gray-400">Connect with the collective</p>
                    </div>

                    {/* Close Button - Glowing & Prominent */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowMembersModal(false)}
                        className="group shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                      >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="text-sm font-medium">Back to Portal</span>
                      </button>

                      <button
                        onClick={() => setShowMembersModal(false)}
                        className="group shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 hover:from-blue-500/30 hover:to-cyan-500/30 hover:text-blue-200 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                  {/* Filter Tabs */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    {trackFilters.map((trackFilter) => (
                      <motion.button
                        key={trackFilter.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(trackFilter.id)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          filter === trackFilter.id
                            ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50 shadow-lg shadow-blue-500/20'
                            : 'bg-white/10 text-gray-400 border border-white/10 hover:bg-white/20 hover:text-gray-300'
                        }`}
                      >
                        {trackFilter.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Members Grid */}
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
                    {filteredMembers.map((member, idx) => (
                      <motion.button
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        onClick={() => setSelectedMemberId(member.id)}
                        className={`group text-left rounded-xl p-4 transition-all duration-300 border ${
                          selectedMemberId === member.id
                            ? 'bg-white/15 border-blue-400/50 ring-2 ring-blue-400/30 shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="mb-4 h-12 w-12 rounded-lg border border-white/10 group-hover:border-blue-400/50 transition-all"
                        />
                        <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                          {member.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{member.title}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {member.tracks.map((track) => (
                            <span
                              key={track}
                              className="inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-gray-300"
                            >
                              {track}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Detail Panel */}
                  {selectedMember && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 pt-8 mt-8"
                    >
                      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* Left: Avatar & Social */}
                        <div className="flex flex-col items-start md:col-span-1">
                          <img
                            src={selectedMember.avatar}
                            alt={selectedMember.name}
                            className="mb-4 h-24 w-24 rounded-xl border-2 border-blue-400/30"
                          />
                          <h2 className="text-xl font-bold text-white">{selectedMember.name}</h2>
                          <p className="mt-1 text-sm text-blue-400">{selectedMember.title}</p>

                          {/* Social Links */}
                          <div className="mt-4 flex gap-2">
                            {selectedMember.socialLinks.twitter && (
                              <a
                                href={`https://twitter.com/${selectedMember.socialLinks.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-blue-500/20 hover:text-blue-400"
                              >
                                <Share2 className="h-4 w-4" />
                              </a>
                            )}
                            {selectedMember.socialLinks.github && (
                              <a
                                href={`https://github.com/${selectedMember.socialLinks.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white"
                              >
                                <Code className="h-4 w-4" />
                              </a>
                            )}
                            {selectedMember.socialLinks.linkedin && (
                              <a
                                href={`https://linkedin.com/in/${selectedMember.socialLinks.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-blue-500/20 hover:text-blue-400"
                              >
                                <Link2 className="h-4 w-4" />
                              </a>
                            )}
                            {selectedMember.socialLinks.website && (
                              <a
                                href={selectedMember.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white"
                              >
                                <Globe className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Right: Bio & Details */}
                        <div className="md:col-span-1 lg:col-span-2">
                          <div className="mb-6">
                            <h3 className="mb-2 text-sm font-bold text-white uppercase tracking-wide">
                              About
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{selectedMember.bio}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="mb-2 text-sm font-bold text-white uppercase tracking-wide">
                                Tracks
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedMember.tracks.map((track) => (
                                  <span
                                    key={track}
                                    className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-xs text-blue-300 border border-blue-400/20"
                                  >
                                    {track}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="mb-2 text-sm font-bold text-white uppercase tracking-wide">
                                Contributions
                              </h3>
                              <ul className="space-y-1">
                                {selectedMember.contributions.slice(0, 3).map((contribution, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-xs text-gray-400"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                                    <span className="line-clamp-2">{contribution}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
