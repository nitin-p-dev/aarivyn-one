'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Plus, X, ArrowUpRight, Loader2, Check, Send } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { supabase } from '@/lib/supabaseClient';
import { forgePitches, skillTags, skillTagColor } from '@/data/content';
import { ForgePitch, SkillTag } from '@/types';

export function ForgeSection() {
  const { activeProfile, setShowNodeActivation, showPitchModal, setShowPitchModal } = useSectionContext();
  const [filterSkill, setFilterSkill] = useState<SkillTag | 'all'>('all');
  const [pitches, setPitches] = useState<ForgePitch[]>(forgePitches);

  const filteredPitches = useMemo(() => {
    if (filterSkill === 'all') return pitches;
    return pitches.filter((p) => p.skills.includes(filterSkill) || p.requiredRoles.includes(filterSkill));
  }, [filterSkill, pitches]);

  const handleAddPitch = (pitch: ForgePitch) => {
    setPitches((prev) => [pitch, ...prev]);
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
    <section id="forge" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 06 // R&D FORGE ]"
          title="R&D Forge"
          subtitle="Pitch ideas, find collaborators, and build the next frontier. Filter by skill to find projects that need your expertise."
          glowColor="#f97316"
          centered
        />

        {/* Pitch Idea Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (activeProfile ? setShowPitchModal(true) : setShowNodeActivation(true))}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
          >
            <Plus className="h-4 w-4" />
            Pitch Idea
          </motion.button>
        </div>

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
              filterSkill === 'all'
                ? 'text-white border-white/30 bg-white/10'
                : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
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

        {/* Pitch Grid */}
        <motion.div
          key={filterSkill}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPitches.map((pitch) => (
              <motion.div
                key={pitch.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -4 }}
                className={`border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 bg-gradient-to-br ${pitch.color} hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-orange-400" />
                    <h3 className="text-lg font-bold text-white">{pitch.title}</h3>
                  </div>
                  <span className="text-xs font-mono-tech text-gray-500 shrink-0 ml-3">
                    {pitch.creatorNodeId}
                  </span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">{pitch.abstract}</p>

                {/* Required Roles */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500 font-mono-tech mb-2 block">REQUIRED ROLES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {pitch.requiredRoles.map((role) => (
                      <span
                        key={role}
                        className={`px-2 py-1 rounded-md text-xs font-mono-tech border ${skillTagColor(role)}`}
                      >
                        [ Needs: {role} ]
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pitch.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2 py-0.5 rounded text-xs font-mono-tech border ${skillTagColor(skill)}`}
                    >
                      [ {skill} ]
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => (activeProfile ? undefined : setShowNodeActivation(true))}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500/20 border border-orange-400/30 text-orange-300 text-sm font-medium hover:bg-orange-500/30 transition-all duration-300"
                >
                  Apply / Collaborate
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Pitch Idea Modal */}
      <PitchIdeaModal
        show={showPitchModal}
        onClose={() => setShowPitchModal(false)}
        onPitchCreated={handleAddPitch}
        creatorNodeId={activeProfile?.nodeId || 'NODE-ANON'}
      />
    </section>
  );
}

// ── Pitch Idea Modal ─────────────────────────────────────────

function PitchIdeaModal({
  show,
  onClose,
  onPitchCreated,
  creatorNodeId,
}: {
  show: boolean;
  onClose: () => void;
  onPitchCreated: (pitch: ForgePitch) => void;
  creatorNodeId: string;
}) {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<SkillTag[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<SkillTag[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (show) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [show]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && show) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [show, onClose]);

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [show]);

  const toggleSkill = (skill: SkillTag, list: SkillTag[], setter: React.Dispatch<React.SetStateAction<SkillTag[]>>) => {
    setter(list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill]);
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('forge_pitches')
        .insert({
          title,
          abstract,
          creator_node_id: creatorNodeId,
          required_roles: selectedRoles,
          skills: selectedSkills,
        })
        .select()
        .single();

      if (error) throw error;

      const colors = [
        'from-cyan-500/20 to-blue-500/20',
        'from-violet-500/20 to-purple-500/20',
        'from-emerald-500/20 to-teal-500/20',
        'from-amber-500/20 to-orange-500/20',
        'from-pink-500/20 to-rose-500/20',
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      onPitchCreated({
        id: data.id,
        title: data.title,
        abstract: data.abstract,
        creatorNodeId: data.creator_node_id,
        requiredRoles: data.required_roles || [],
        skills: data.skills || [],
        color,
      });

      setStatus('success');
      setTimeout(() => {
        onClose();
        setTitle('');
        setAbstract('');
        setSelectedSkills([]);
        setSelectedRoles([]);
        setStatus('idle');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to post pitch.');
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 rounded-2xl shadow-2xl"
        >
          <div className="sticky top-0 z-10 glass-header bg-black/50 backdrop-blur-xl px-6 py-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-mono-tech">[ PITCH IDEA ]</h2>
                  <p className="text-xs text-gray-400">Post a new R&D concept to the Forge</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="mb-6 h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                  <Check className="h-10 w-10 text-emerald-400" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white font-mono-tech">PITCH DEPLOYED</h3>
                <p className="text-gray-400 max-w-sm">Your idea is now live on the Forge board.</p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">[ PROJECT TITLE ]</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Name your project" className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-orange-500 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">[ ABSTRACT ]</label>
                  <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required rows={4} placeholder="Describe the core concept..." className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-orange-500 focus:outline-none transition-colors resize-none" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">[ PROJECT SKILLS ]</label>
                  <div className="flex flex-wrap gap-2">
                    {skillTags.map((tag) => (
                      <button key={tag.id} onClick={() => toggleSkill(tag.id, selectedSkills, setSelectedSkills)} className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${selectedSkills.includes(tag.id) ? tag.color : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}>
                        [ {tag.label} ]
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">[ REQUIRED ROLES ]</label>
                  <div className="flex flex-wrap gap-2">
                    {skillTags.map((tag) => (
                      <button key={tag.id} onClick={() => toggleSkill(tag.id, selectedRoles, setSelectedRoles)} className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech border transition-all ${selectedRoles.includes(tag.id) ? tag.color : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}>
                        [ Needs: {tag.label} ]
                      </button>
                    ))}
                  </div>
                </div>

                {status === 'error' && (
                  <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">{errorMsg}</div>
                )}

                <button onClick={handleSubmit} disabled={status === 'submitting' || !title || !abstract} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'submitting' ? (<><Loader2 className="h-4 w-4 animate-spin" />Deploying...</>) : (<><Send className="h-4 w-4" />Deploy Pitch</>)}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
