'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { researchProjects } from '@/data/content';

export function ResearchSection() {
  const { setSelectedProjectId } = useSectionContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="research" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 02 // LAB & TRL SHOWCASE ]"
          title="Research & Innovation"
          subtitle="Active projects spanning computer vision, AI agents, distributed systems, and next-generation infrastructure. Click any card for the full technical dossier."
          glowColor="#8b5cf6"
        />

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {researchProjects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProjectId(project.id)}
              className={`group cursor-pointer border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-xl p-6 bg-gradient-to-br ${project.color} hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-violet-500/20 border border-violet-400/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.shortDescription}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-600 group-hover:text-violet-400 transition-colors" />
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-xs font-semibold text-violet-300 font-mono-tech">
                  {project.trlLabel}
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300">
                  {project.status}
                </span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 text-xs text-gray-300 transition-all font-mono-tech"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>

              {/* Click hint */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500 group-hover:text-violet-400 transition-colors">
                <span className="font-mono-tech">View technical dossier</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
