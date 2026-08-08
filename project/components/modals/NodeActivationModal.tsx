'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Check, Loader2, Zap, UserCircle } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';
import { supabase } from '@/lib/supabaseClient';
import { skillTags } from '@/data/content';
import { SkillTag, NodeStatus } from '@/types';

const statusOptions: { id: NodeStatus; label: string; icon: string }[] = [
  { id: 'seeking_squad', label: 'Seeking Squad', icon: 'Users' },
  { id: 'available_gigs', label: 'Available for Gigs', icon: 'Briefcase' },
  { id: 'building_project', label: 'Building Project', icon: 'Code' },
];

export function NodeActivationModal() {
  const { showNodeActivation, setShowNodeActivation, setActiveProfile, showJoinModal, setShowJoinModal } = useSectionContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: '',
    skills: [] as SkillTag[],
    status: 'seeking_squad' as NodeStatus,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync with legacy JoinModal trigger
  useEffect(() => {
    if (showJoinModal) {
      setShowNodeActivation(true);
      setShowJoinModal(false);
    }
  }, [showJoinModal, setShowNodeActivation, setShowJoinModal]);

  useEffect(() => {
    if (showNodeActivation) {
      setStatus('idle');
      setErrorMsg('');
      setStep(1);
    }
  }, [showNodeActivation]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNodeActivation) setShowNodeActivation(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showNodeActivation, setShowNodeActivation]);

  useEffect(() => {
    if (showNodeActivation) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showNodeActivation]);

  const toggleSkill = (skill: SkillTag) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const generateNodeId = () => {
    const hex = Math.random().toString(16).slice(2, 4).toUpperCase();
    return `NODE-0X${hex}`;
  };

  const handleSubmit = async () => {
    setStatus('submitting');
    setErrorMsg('');

    const nodeId = generateNodeId();
    const avatarColors = [
      'from-cyan-500 to-indigo-500',
      'from-violet-500 to-purple-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-pink-500 to-rose-500',
    ];
    const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    try {
      const { data, error } = await supabase
        .from('node_profiles')
        .insert({
          node_id: nodeId,
          display_name: formData.displayName,
          email: formData.email || null,
          skills: formData.skills,
          status: formData.status,
          bio: formData.bio || null,
          avatar_color: avatarColor,
        })
        .select()
        .single();

      if (error) throw error;

      setActiveProfile({
        id: data.id,
        nodeId: data.node_id,
        displayName: data.display_name,
        email: data.email || '',
        skills: data.skills || [],
        status: data.status,
        bio: data.bio || '',
        avatarColor: data.avatar_color || avatarColor,
      });

      setStatus('success');
      setTimeout(() => {
        setShowNodeActivation(false);
        setFormData({ displayName: '', email: '', bio: '', skills: [], status: 'seeking_squad' });
        setStatus('idle');
      }, 2500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Activation failed. Please try again.');
    }
  };

  if (!showNodeActivation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setShowNodeActivation(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 glass-header bg-black/50 backdrop-blur-xl px-6 py-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-mono-tech">[ NODE ACTIVATION ]</h2>
                  <p className="text-xs text-gray-400">Initialize your AARIVYN ONE identity</p>
                </div>
              </div>
              <button
                onClick={() => setShowNodeActivation(false)}
                className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="mb-6 h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center"
                >
                  <Check className="h-10 w-10 text-emerald-400" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white font-mono-tech">NODE ONLINE</h3>
                <p className="text-gray-400 max-w-sm">
                  Your node has been activated. Welcome to the AARIVYN ONE collective.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                        step >= s ? 'bg-cyan-500' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">
                        [ DISPLAY NAME ]
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
                        required
                        placeholder="Your name or alias"
                        className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">
                        [ EMAIL ] (optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300 font-mono-tech">
                        [ SHORT BIO ]
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        placeholder="What are you building?"
                        className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!formData.displayName}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:from-cyan-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap className="h-4 w-4" />
                      Configure Skills & Status
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    {/* Skill Selection */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-gray-300 font-mono-tech">
                        [ CORE DOMAIN SKILLS ]
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {skillTags.map((tag) => {
                          const isSelected = formData.skills.includes(tag.id);
                          return (
                            <button
                              key={tag.id}
                              onClick={() => toggleSkill(tag.id)}
                              className={`px-3 py-2 rounded-lg text-sm font-mono-tech border transition-all duration-200 ${
                                isSelected
                                  ? `${tag.color} shadow-lg`
                                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                              }`}
                            >
                              [ {tag.label} ]
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Status Selection */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-gray-300 font-mono-tech">
                        [ NODE STATUS ]
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {statusOptions.map((opt) => {
                          const isSelected = formData.status === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setFormData((prev) => ({ ...prev, status: opt.id }))}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-200 ${
                                isSelected
                                  ? 'border-cyan-500/50 bg-cyan-500/10 text-white'
                                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                              }`}
                            >
                              <div className={`h-3 w-3 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-white/20'}`} />
                              <span className="text-sm font-medium">{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400"
                      >
                        {errorMsg}
                      </motion.div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3.5 rounded-lg border border-white/20 text-gray-300 font-medium hover:bg-white/5 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={status === 'submitting' || formData.skills.length === 0}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:from-cyan-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Activating...
                          </>
                        ) : (
                          <>
                            <Cpu className="h-4 w-4" />
                            Activate Node
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
