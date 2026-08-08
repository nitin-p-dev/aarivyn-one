'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Check, Loader2, Send } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';
import { supabase } from '@/lib/supabaseClient';

const domainOptions = [
  'AI & Neural Systems',
  'Cryptography & Security',
  'Distributed Systems',
  'Agency & Infrastructure',
];

export function JoinModal() {
  const { showJoinModal, setShowJoinModal } = useSectionContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    portfolioUrl: '',
    researchDomain: '',
    pitch: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (showJoinModal) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [showJoinModal]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showJoinModal) setShowJoinModal(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showJoinModal, setShowJoinModal]);

  useEffect(() => {
    if (showJoinModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showJoinModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('collective_applications').insert({
        full_name: formData.fullName,
        email: formData.email,
        portfolio_url: formData.portfolioUrl || null,
        research_domain: formData.researchDomain,
        pitch: formData.pitch,
      });

      if (error) throw error;

      setStatus('success');
      setTimeout(() => {
        setShowJoinModal(false);
        setFormData({ fullName: '', email: '', portfolioUrl: '', researchDomain: '', pitch: '' });
        setStatus('idle');
      }, 2500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (!showJoinModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setShowJoinModal(false)}
        />

        {/* Modal */}
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
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Join the Collective</h2>
                  <p className="text-xs text-gray-400">Build the frontier with AARIVYN ONE</p>
                </div>
              </div>
              <button
                onClick={() => setShowJoinModal(false)}
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
                <h3 className="mb-2 text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-gray-400 max-w-sm">
                  Welcome to the orbit. We&apos;ll review your application and reach out within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Portfolio URL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    GitHub / Portfolio URL
                  </label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/yourname"
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Research Domain */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Research Domain Interest
                  </label>
                  <select
                    name="researchDomain"
                    value={formData.researchDomain}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-slate-900">Select a domain</option>
                    {domainOptions.map((d) => (
                      <option key={d} value={d} className="bg-slate-900">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Short Pitch */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Short Pitch</label>
                  <textarea
                    name="pitch"
                    value={formData.pitch}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your background and what you want to build..."
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
