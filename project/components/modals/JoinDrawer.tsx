'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';

export function JoinDrawer() {
  const { showJoinDrawer, setShowJoinDrawer } = useSectionContext();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    track: '',
    bio: '',
    portfolio: '',
  });

  if (!showJoinDrawer) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowJoinDrawer(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', track: '', bio: '', portfolio: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-end overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur"
          onClick={() => setShowJoinDrawer(false)}
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
              <h2 className="text-2xl font-bold text-white">Join the Orbit</h2>
              <button
                onClick={() => setShowJoinDrawer(false)}
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
                <div className="mb-4 h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Rocket className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">Welcome to the Orbit!</h3>
                <p className="text-gray-400">
                  We&apos;ve received your application. Expect to hear from us soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm text-gray-400">
                  Join our collective of researchers, builders, and visionaries.
                </p>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Interested Track</label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select a track</option>
                    <option value="research">Research</option>
                    <option value="agency">Agency</option>
                    <option value="hackathons">Hackathons</option>
                    <option value="founders">Founders</option>
                    <option value="multiple">Multiple Areas</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">About You</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Tell us about your background and interests"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Portfolio / Website (Optional)
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="https://your-portfolio.com"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowJoinDrawer(false)}
                    className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 font-medium text-white transition-all hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-amber-500/30 px-4 py-2.5 font-medium text-amber-300 transition-all hover:bg-amber-500/40"
                  >
                    Apply
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
