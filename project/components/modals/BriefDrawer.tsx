'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';

export function BriefDrawer() {
  const { showBriefDrawer, setShowBriefDrawer, prefillTimeline, prefillTrack, setPrefillTrack } = useSectionContext();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    engagementTrack: '',
    budget: '',
    timeline: '',
    email: '',
    contact: '',
  });

  // Pre-fill timeline when opened via calculator
  useEffect(() => {
    if (showBriefDrawer && prefillTimeline > 0) {
      const weeks = prefillTimeline;
      let label = 'short';
      if (weeks <= 4) label = 'urgent';
      else if (weeks <= 8) label = 'short';
      else if (weeks <= 16) label = 'medium';
      else label = 'long';
      setFormData((prev) => ({ ...prev, timeline: label }));
    }
  }, [showBriefDrawer, prefillTimeline]);

  // Pre-fill engagement track when opened via track selection
  useEffect(() => {
    if (showBriefDrawer && prefillTrack) {
      setFormData((prev) => ({ ...prev, engagementTrack: prefillTrack }));
    }
  }, [showBriefDrawer, prefillTrack]);

  if (!showBriefDrawer) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        setShowBriefDrawer(false);
        setStep(1);
        setSubmitted(false);
        setPrefillTrack('');
        setFormData({ projectName: '', description: '', engagementTrack: '', budget: '', timeline: '', email: '', contact: '' });
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-end overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur"
          onClick={() => setShowBriefDrawer(false)}
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative h-full w-full max-w-md overflow-y-auto custom-scrollbar bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Submit Brief</h2>
              <button
                onClick={() => setShowBriefDrawer(false)}
                className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Brief Submitted!</h3>
                <p className="text-gray-400">
                  We&apos;ll review your project and get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step Indicator */}
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        s <= step ? 'bg-emerald-500' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Project Details</h3>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Project Name</label>
                      <input
                        type="text"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Enter project name"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Tell us about your project"
                        rows={4}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Engagement Track</label>
                      <select
                        name="engagementTrack"
                        value={formData.engagementTrack}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select engagement track</option>
                        <option value="intelligence-build">Track 01: Intelligence System Build</option>
                        <option value="research-sprint">Track 02: Research Sprint</option>
                        <option value="infrastructure-audit">Track 03: Infrastructure Audit</option>
                      </select>
                      {prefillTrack && (
                        <p className="text-xs text-emerald-400 font-mono-tech mt-1">
                          Pre-selected from track card
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Budget & Timeline</h3>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select budget range</option>
                        <option value="<25k">&lt; $25K</option>
                        <option value="25-50k">$25K - $50K</option>
                        <option value="50-100k">$50K - $100K</option>
                        <option value=">100k">&gt; $100K</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select timeline</option>
                        <option value="urgent">Urgent (1-4 weeks)</option>
                        <option value="short">Short-term (4-8 weeks)</option>
                        <option value="medium">Medium-term (8-16 weeks)</option>
                        <option value="long">Long-term (16+ weeks)</option>
                      </select>
                    </div>
                    {prefillTimeline > 0 && (
                      <p className="text-xs text-emerald-400 font-mono-tech">
                        Pre-filled from calculator: {prefillTimeline} weeks
                      </p>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Contact Information</h3>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">Contact Name</label>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-t border-white/10">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 font-medium text-white transition-all hover:bg-white/5"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-500/30 px-6 py-2.5 font-medium text-emerald-300 transition-all hover:bg-emerald-500/40"
                  >
                    {step === 3 ? 'Submit' : 'Next'}
                    {step < 3 && <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
