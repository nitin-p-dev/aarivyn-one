'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Target, Send, Calculator, Clock, DollarSign, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { agencyServices } from '@/data/content';

const iconMap: Record<string, React.ElementType> = {
  ClipboardList,
  Target,
  Send,
};

export function AgencySection() {
  const { setShowBriefDrawer, setPrefillTimeline, agencyGlowTrigger, setPrefillTrack } = useSectionContext();
  const [weeks, setWeeks] = useState(4);
  const [complexity, setComplexity] = useState(50);
  const [glowingCards, setGlowingCards] = useState<Set<string>>(new Set());
  const glowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger glow animation on all 3 track cards when agencyGlowTrigger changes
  useEffect(() => {
    if (agencyGlowTrigger === 0) return;
    const cardIds = agencyServices.map((s) => s.id);
    setGlowingCards(new Set(cardIds));

    if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    glowTimeoutRef.current = setTimeout(() => {
      setGlowingCards(new Set());
    }, 3000);

    return () => {
      if (glowTimeoutRef.current) clearTimeout(glowTimeoutRef.current);
    };
  }, [agencyGlowTrigger]);

  // Calculate estimated cost based on weeks and complexity
  const baseWeeklyRate = 8000;
  const complexityMultiplier = 0.5 + (complexity / 100) * 1.5;
  const estimatedCost = Math.round(weeks * baseWeeklyRate * complexityMultiplier);
  const teamSize = Math.max(2, Math.ceil(weeks / 3) + Math.ceil(complexity / 40));

  const handleStartBrief = () => {
    setPrefillTimeline(weeks);
    setShowBriefDrawer(true);
  };

  const handleSelectTrack = (trackValue: string) => {
    setPrefillTrack(trackValue);
    setPrefillTimeline(weeks);
    setShowBriefDrawer(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="agency" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 03 // ENTERPRISE SERVICES ]"
          title="Agency Services"
          subtitle="Your hardest technical problem is our next research brief."
          glowColor="#10b981"
          centered
        />

        {/* 3 Engagement Track Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {agencyServices.map((item, i) => {
            const Icon = iconMap[item.icon] || ClipboardList;
            const isGlowing = glowingCards.has(item.id);
            return (
              <motion.div key={item.id} variants={itemVariants} className="relative">
                {/* Connector Line */}
                {i < agencyServices.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-400/50 to-transparent" />
                )}
                <motion.div
                  animate={
                    isGlowing
                      ? {
                          boxShadow: [
                            '0 0 0px rgba(16, 185, 129, 0)',
                            '0 0 40px rgba(16, 185, 129, 0.5)',
                            '0 0 20px rgba(16, 185, 129, 0.3)',
                            '0 0 40px rgba(16, 185, 129, 0.5)',
                            '0 0 0px rgba(16, 185, 129, 0)',
                          ],
                          borderColor: [
                            'rgba(16, 185, 129, 0.2)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(16, 185, 129, 0.4)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(16, 185, 129, 0.2)',
                          ],
                        }
                      : {}
                  }
                  transition={
                    isGlowing
                      ? { duration: 3, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' }
                      : {}
                  }
                  className="border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 h-full flex flex-col"
                >
                  <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400">
                    <span className="text-lg font-bold text-white">{item.step}</span>
                  </div>
                  <Icon className="h-6 w-6 text-emerald-400 mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs font-mono-tech text-emerald-400 mb-3">
                    Track 0{item.step}: {item.trackLabel}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 flex-1">{item.description}</p>

                  {/* Select Brief Track Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectTrack(item.trackValue)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      isGlowing
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40'
                        : 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/30'
                    }`}
                  >
                    Select Brief Track
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Scope Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/20 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">R&amp;D Scope Calculator</h3>
              <p className="text-sm text-gray-400">Adjust parameters to estimate your engagement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sliders */}
            <div className="space-y-6">
              {/* Duration Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    R&amp;D Duration
                  </label>
                  <span className="text-sm font-mono-tech font-bold text-emerald-400">
                    {weeks} weeks
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={12}
                  value={weeks}
                  onChange={(e) => setWeeks(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-emerald-500"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((weeks - 2) / 10) * 100}%, rgba(255,255,255,0.1) ${((weeks - 2) / 10) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-600 font-mono-tech">
                  <span>2 weeks</span>
                  <span>12 weeks</span>
                </div>
              </div>

              {/* Complexity Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Complexity Factor
                  </label>
                  <span className="text-sm font-mono-tech font-bold text-emerald-400">
                    {complexity}%
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={complexity}
                  onChange={(e) => setComplexity(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-emerald-500"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${((complexity - 10) / 90) * 100}%, rgba(255,255,255,0.1) ${((complexity - 10) / 90) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-600 font-mono-tech">
                  <span>Standard</span>
                  <span>Frontier</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <DollarSign className="h-3 w-3" />
                    Est. Investment
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono-tech">
                    ${estimatedCost.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Clock className="h-3 w-3" />
                    Timeline
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono-tech">
                    {weeks}w
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Team Size</div>
                  <div className="text-2xl font-bold text-white font-mono-tech">
                    {teamSize} people
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Complexity</div>
                  <div className="text-2xl font-bold text-white font-mono-tech">
                    {complexity < 30 ? 'Low' : complexity < 60 ? 'Med' : 'High'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartBrief}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/20"
              >
                Pre-fill Intake Form with {weeks} weeks
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Client Onboarding CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBriefDrawer(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            Start a Client Account
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
