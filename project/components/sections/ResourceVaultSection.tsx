'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Code, BookOpen, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { vaultResources, skillTags, skillTagColor } from '@/data/content';
import { SkillTag, ResourceType } from '@/types';

const typeIcons: Record<ResourceType, React.ElementType> = {
  roadmap: BookOpen,
  snippet: Code,
  paper: FileText,
};

const typeColors: Record<ResourceType, string> = {
  roadmap: 'text-emerald-400 border-emerald-400/40 bg-emerald-500/10',
  snippet: 'text-cyan-400 border-cyan-400/40 bg-cyan-500/10',
  paper: 'text-violet-400 border-violet-400/40 bg-violet-500/10',
};

const typeLabels: Record<ResourceType, string> = {
  roadmap: 'Roadmap',
  snippet: 'Snippet',
  paper: 'Paper',
};

export function ResourceVaultSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkill, setFilterSkill] = useState<SkillTag | 'all'>('all');
  const [filterType, setFilterType] = useState<ResourceType | 'all'>('all');

  const filteredResources = useMemo(() => {
    return vaultResources.filter((r) => {
      const matchesSearch =
        searchQuery === '' ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSkill = filterSkill === 'all' || r.tags.includes(filterSkill);
      const matchesType = filterType === 'all' || r.type === filterType;
      return matchesSearch && matchesSkill && matchesType;
    });
  }, [searchQuery, filterSkill, filterType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="vault" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 09 // RESOURCE VAULT ]"
          title="Resource Vault"
          subtitle="Community-curated learning roadmaps, code snippets, and research papers. Search, filter, and contribute."
          glowColor="#a3e635"
          centered
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full rounded-lg bg-white/5 pl-11 pr-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-lime-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${
              filterType === 'all' ? 'text-white border-white/30 bg-white/10' : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            [ All Types ]
          </button>
          {(Object.keys(typeLabels) as ResourceType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${
                filterType === t ? typeColors[t] : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              [ {typeLabels[t]} ]
            </button>
          ))}
        </div>

        {/* Skill Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilterSkill('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${
              filterSkill === 'all' ? 'text-white border-white/30 bg-white/10' : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            [ All Skills ]
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
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-500 font-mono-tech">
            [ {filteredResources.length} RESOURCE{filteredResources.length !== 1 ? 'S' : ''} FOUND ]
          </span>
        </div>

        {/* Resource Grid */}
        <motion.div
          key={`${filterSkill}-${filterType}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource) => {
              const Icon = typeIcons[resource.type];
              return (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -4 }}
                  className={`border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 bg-gradient-to-br ${resource.color} hover:border-lime-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/20 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-lime-400" />
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-mono-tech border ${typeColors[resource.type]}`}>
                      [ {typeLabels[resource.type]} ]
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{resource.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map((tag) => (
                      <span key={tag} className={`px-1.5 py-0.5 rounded text-xs font-mono-tech border ${skillTagColor(tag)}`}>
                        [ {tag} ]
                      </span>
                    ))}
                  </div>

                  {/* Contributor + Link */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-gray-500 font-mono-tech">{resource.contributor}</span>
                    <a
                      href={resource.url}
                      className="flex items-center gap-1 text-xs text-lime-400 hover:text-lime-300 transition-colors font-mono-tech"
                    >
                      Open <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-mono-tech">[ NO RESOURCES MATCH CURRENT FILTERS ]</p>
          </div>
        )}
      </div>
    </section>
  );
}
