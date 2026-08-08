'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Twitter, X, Award } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { coreMembers, coreMemberCategories, type CoreMember, type CoreMemberCategory } from '@/data/coreMembers';

export function CoreMembersSection() {
  const [filter, setFilter] = useState<CoreMemberCategory>('all');
  const [selectedMember, setSelectedMember] = useState<CoreMember | null>(null);

  const filteredMembers = useMemo(() => {
    if (filter === 'all') return coreMembers;
    return coreMembers.filter((m) => m.category === filter);
  }, [filter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="core-members" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 10 // CORE MEMBERS ]"
          title="CORE MEMBERS"
          subtitle="The builders and researchers driving AARIVYN forward."
          glowColor="#00f0ff"
          centered
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {coreMemberCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono-tech border transition-all duration-300 ${
                filter === cat.id
                  ? 'text-cyan-400 border-cyan-400/50 bg-cyan-500/10'
                  : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              [ {cat.label} ]
            </button>
          ))}
        </div>

        {/* Member Grid */}
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -6 }}
                onClick={() => setSelectedMember(member)}
                className="group relative border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10"
                style={{ '--member-glow': member.accentColor } as React.CSSProperties}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: member.accentColor, boxShadow: `0 0 12px ${member.accentColor}` }}
                />

                {/* Avatar */}
                <div className="relative mx-auto w-24 h-24 mb-5">
                  <div
                    className="absolute -inset-1 rounded-full opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-300"
                    style={{ background: member.accentColor }}
                  />
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2" style={{ borderColor: `${member.accentColor}80` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="text-lg font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-sm text-gray-400 text-center mb-3">{member.designation}</p>

                {/* Domain Tag */}
                <div className="flex justify-center mb-4">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-mono-tech border"
                    style={{
                      color: member.accentColor,
                      borderColor: `${member.accentColor}40`,
                      backgroundColor: `${member.accentColor}10`,
                    }}
                  >
                    [ {member.domainTag} ]
                  </span>
                </div>

                {/* View Profile Button */}
                <div className="flex justify-center">
                  <span className="flex items-center gap-1 text-xs font-mono-tech text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    View Profile <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto border border-white/10 bg-slate-900/90 backdrop-blur-xl rounded-2xl"
              style={{ boxShadow: `0 0 40px ${selectedMember.accentColor}20` }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header with avatar */}
              <div className="relative p-6 pb-4">
                <div
                  className="absolute top-0 left-0 right-0 h-24 rounded-t-2xl opacity-20"
                  style={{ background: `linear-gradient(to bottom, ${selectedMember.accentColor}, transparent)` }}
                />
                <div className="relative flex flex-col items-center">
                  <div className="relative w-28 h-28 mb-4">
                    <div
                      className="absolute -inset-1.5 rounded-full opacity-40 blur-lg"
                      style={{ background: selectedMember.accentColor }}
                    />
                    <div
                      className="relative w-28 h-28 rounded-full overflow-hidden border-2"
                      style={{ borderColor: selectedMember.accentColor }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-white">{selectedMember.name}</h2>
                  <p className="text-sm text-gray-400 mb-3">{selectedMember.designation}</p>
                  <span
                    className="px-3 py-1 rounded-md text-xs font-mono-tech border"
                    style={{
                      color: selectedMember.accentColor,
                      borderColor: `${selectedMember.accentColor}40`,
                      backgroundColor: `${selectedMember.accentColor}10`,
                    }}
                  >
                    [ {selectedMember.domainTag} ]
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-300 leading-relaxed">{selectedMember.bio}</p>
              </div>

              {/* Achievements */}
              <div className="px-6 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-4 w-4 text-gray-500" />
                  <span className="text-xs font-mono-tech text-gray-500 uppercase tracking-wider">Key Contributions</span>
                </div>
                <ul className="space-y-2">
                  {selectedMember.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                <div className="flex items-center gap-3">
                  {selectedMember.socialLinks.github && (
                    <a
                      href={selectedMember.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {selectedMember.socialLinks.linkedin && (
                    <a
                      href={selectedMember.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {selectedMember.socialLinks.twitter && (
                    <a
                      href={selectedMember.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
