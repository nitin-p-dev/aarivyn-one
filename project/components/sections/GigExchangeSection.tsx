'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { gigDirectives, skillTags, skillTagColor } from '@/data/content';
import { SkillTag, GigDirective } from '@/types';

export function GigExchangeSection() {
  const { activeProfile, setShowNodeActivation } = useSectionContext();
  const [filterSkill, setFilterSkill] = useState<SkillTag | 'all'>('all');
  const [gigs, setGigs] = useState<GigDirective[]>(gigDirectives);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  const filteredGigs = useMemo(() => {
    if (filterSkill === 'all') return gigs;
    return gigs.filter((g) => g.requiredSkills.includes(filterSkill));
  }, [filterSkill, gigs]);

  const handleApply = (gigId: string) => {
    if (!activeProfile) {
      setShowNodeActivation(true);
      return;
    }
    setApplyingId(gigId);
    setTimeout(() => {
      setAppliedIds((prev) => new Set(prev).add(gigId));
      setApplyingId(null);
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="gigs" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 08 // GIG EXCHANGE ]"
          title="Gig Exchange"
          subtitle="Active micro-gigs and freelance directives. Filter by skill, claim a bounty, and execute."
          glowColor="#22d3ee"
          centered
        />

        {/* Skill Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
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

        {/* Gig Grid */}
        <motion.div
          key={filterSkill}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredGigs.map((gig) => {
              const isApplied = appliedIds.has(gig.id);
              const isApplying = applyingId === gig.id;
              return (
                <motion.div
                  key={gig.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -4 }}
                  className={`border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 bg-gradient-to-br ${gig.color} hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-bold text-white flex-1 pr-3">{gig.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <DollarSign className="h-4 w-4 text-cyan-400" />
                      <span className="text-lg font-bold text-cyan-400 font-mono-tech">
                        {gig.bounty.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{gig.description}</p>

                  {/* Required Skills */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 font-mono-tech mb-1.5 block">REQUIRED:</span>
                    <div className="flex flex-wrap gap-1">
                      {gig.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-1.5 py-0.5 rounded text-xs font-mono-tech border ${skillTagColor(skill)}`}
                        >
                          [ {skill} ]
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(gig.id)}
                    disabled={isApplied || isApplying}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isApplied
                        ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300'
                        : 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30'
                    } disabled:cursor-not-allowed`}
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : isApplied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Directive Claimed
                      </>
                    ) : (
                      <>
                        Apply Directive
                        <ArrowUpRight className="h-4 w-4" />
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
