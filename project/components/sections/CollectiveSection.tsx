'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { collectiveMembers, memberCategories } from '@/data/content';
import { MemberCategory } from '@/types';

const categoryColors: Record<string, string> = {
  all: 'text-amber-400 border-amber-400/40 bg-amber-500/10',
  ai: 'text-cyan-400 border-cyan-400/40 bg-cyan-500/10',
  crypto: 'text-violet-400 border-violet-400/40 bg-violet-500/10',
  distributed: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10',
  agency: 'text-orange-400 border-orange-400/40 bg-orange-500/10',
};

const cardGlow: Record<string, string> = {
  ai: 'hover:border-cyan-500/50 hover:shadow-cyan-500/20',
  crypto: 'hover:border-violet-500/50 hover:shadow-violet-500/20',
  distributed: 'hover:border-emerald-500/50 hover:shadow-emerald-500/20',
  agency: 'hover:border-amber-500/50 hover:shadow-amber-500/20',
};

export function CollectiveSection() {
  const { memberFilter, setMemberFilter, setShowJoinModal } = useSectionContext();

  const filteredMembers = useMemo(() => {
    if (memberFilter === 'all') return collectiveMembers;
    return collectiveMembers.filter((m) => m.category === memberFilter);
  }, [memberFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="collective" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 05 // COLLECTIVE MEMBERS DIRECTORY ]"
          title="The Collective"
          subtitle="The researchers, engineers, and operators building AARIVYN ONE. Filter by domain to find the right mind for the right problem."
          glowColor="#f59e0b"
          centered
        />

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {memberCategories.map((cat) => {
            const isActive = memberFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setMemberFilter(cat.id as MemberCategory | 'all')}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium font-mono-tech transition-all duration-300 border ${
                  isActive
                    ? `${categoryColors[cat.id]} shadow-lg`
                    : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                [ {cat.label} ]
              </button>
            );
          })}
        </motion.div>

        {/* Member Grid */}
        <motion.div
          key={memberFilter}
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
                whileHover={{ y: -4 }}
                className={`border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 ${cardGlow[member.category]}`}
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`h-14 w-14 rounded-xl bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0`}
                  >
                    {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{member.role}</p>
                  </div>
                </div>

                {/* Domain Tag */}
                <div className="mb-3">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono-tech font-medium border ${categoryColors[member.category]}`}>
                    [{member.domainTag}]
                  </span>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{member.bio}</p>

                {/* Social Links */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      aria-label="GitHub"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      aria-label="Twitter"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      aria-label="LinkedIn"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/20">
            <h3 className="text-2xl font-bold text-white mb-3">Want to join the collective?</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              We&apos;re always looking for exceptional builders across AI, cryptography, distributed systems, and infrastructure.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowJoinModal(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/20"
            >
              Join Collective
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
