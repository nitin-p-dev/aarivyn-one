'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, MapPin, Calendar, ArrowUpRight, Plus } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { hackathons, squads, skillTags, skillTagColor } from '@/data/content';
import { SkillTag, Squad } from '@/types';

export function HackathonSection() {
  const { activeProfile, setShowNodeActivation } = useSectionContext();
  const [filterSkill, setFilterSkill] = useState<SkillTag | 'all'>('all');
  const [squadList, setSquadList] = useState<Squad[]>(squads);

  const filteredSquads = useMemo(() => {
    if (filterSkill === 'all') return squadList;
    return squadList.filter(
      (s) => s.missingRoles.includes(filterSkill) || s.filledRoles.includes(filterSkill)
    );
  }, [filterSkill, squadList]);

  const handleJoinSquad = (squadId: string) => {
    if (!activeProfile) {
      setShowNodeActivation(true);
      return;
    }
    setSquadList((prev) =>
      prev.map((s) =>
        s.id === squadId && s.members < s.maxMembers
          ? { ...s, members: s.members + 1, status: s.members + 1 >= s.maxMembers ? 'full' : 'recruiting' }
          : s
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="hackathon" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 07 // HACKATHON LFG ]"
          title="Hackathon LFG"
          subtitle="Find your squad before the timer starts. Browse upcoming hackathons, join teams, and fill missing technical roles."
          glowColor="#ec4899"
          centered
        />

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {hackathons.map((hk, i) => (
            <motion.div
              key={hk.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 bg-gradient-to-br ${hk.color} hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-5 w-5 text-pink-400" />
                <h3 className="text-lg font-bold text-white">{hk.name}</h3>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {hk.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {hk.location}
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{hk.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-pink-400 font-mono-tech">{hk.prizePool}</span>
                <div className="flex flex-wrap gap-1">
                  {hk.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={`px-1.5 py-0.5 rounded text-xs font-mono-tech border ${skillTagColor(tag)}`}>
                      [ {tag} ]
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Squad Board */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white font-mono-tech mb-2">[ ACTIVE SQUADS ]</h3>
          <p className="text-sm text-gray-400 mb-6">Teams looking for members. Filter by your skill to find squads that need you.</p>
        </div>

        {/* Skill Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setFilterSkill('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${
              filterSkill === 'all' ? 'text-white border-white/30 bg-white/10' : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            [ All ]
          </button>
          {skillTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setFilterSkill(tag.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${
                filterSkill === tag.id ? tag.color : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              [ {tag.label} ]
            </button>
          ))}
        </motion.div>

        {/* Squad Grid */}
        <motion.div
          key={filterSkill}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSquads.map((squad) => {
              const hk = hackathons.find((h) => h.id === squad.hackathonId);
              const isFull = squad.members >= squad.maxMembers;
              return (
                <motion.div
                  key={squad.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -3 }}
                  className="border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-xl p-5 hover:border-pink-500/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">{squad.name}</h4>
                      <p className="text-xs text-gray-500 font-mono-tech">{hk?.name || 'Unknown event'}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-mono-tech border ${
                      squad.status === 'recruiting'
                        ? 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10'
                        : squad.status === 'full'
                        ? 'text-gray-400 border-gray-400/40 bg-gray-500/10'
                        : 'text-pink-400 border-pink-400/40 bg-pink-500/10'
                    }`}>
                      [ {squad.status.toUpperCase()} ]
                    </span>
                  </div>

                  {/* Members count */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    {squad.members} / {squad.maxMembers} members
                    <span className="text-xs text-gray-600 font-mono-tech ml-2">Lead: {squad.leadNodeId}</span>
                  </div>

                  {/* Filled Roles */}
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 font-mono-tech mb-1 block">FILLED:</span>
                    <div className="flex flex-wrap gap-1">
                      {squad.filledRoles.map((role) => (
                        <span key={role} className={`px-1.5 py-0.5 rounded text-xs font-mono-tech border ${skillTagColor(role)}`}>
                          [ {role} ]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Roles */}
                  {squad.missingRoles.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs text-pink-400 font-mono-tech mb-1 block">MISSING:</span>
                      <div className="flex flex-wrap gap-1">
                        {squad.missingRoles.map((role) => (
                          <span key={role} className="px-1.5 py-0.5 rounded text-xs font-mono-tech border border-pink-400/40 bg-pink-500/10 text-pink-400">
                            [ Needs: {role} ]
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleJoinSquad(squad.id)}
                    disabled={isFull}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-pink-500/20 border border-pink-400/30 text-pink-300 text-sm font-medium hover:bg-pink-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFull ? 'Squad Full' : (
                      <>
                        <Plus className="h-4 w-4" />
                        Join Squad
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
