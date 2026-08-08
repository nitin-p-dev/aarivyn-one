'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';
import { metrics } from '@/data/content';
import { MetricFilterTarget, MemberCategory } from '@/types';

export function HeroSection() {
  const { setShowJoinDrawer, setShowBriefDrawer, setMemberFilter, setShowJoinModal, triggerAgencyGlow } = useSectionContext();

  const handleMetricClick = (filterTarget?: MetricFilterTarget) => {
    if (filterTarget === 'agency-briefs') {
      const agencyEl = document.getElementById('agency');
      if (agencyEl) agencyEl.scrollIntoView({ behavior: 'smooth' });
      triggerAgencyGlow();
      return;
    }

    const collectiveEl = document.getElementById('collective');
    if (!collectiveEl) return;

    if (filterTarget === 'all' || !filterTarget) {
      setMemberFilter('all');
    } else if (filterTarget === 'ai') {
      setMemberFilter('ai');
    } else if (filterTarget === 'agency') {
      setMemberFilter('agency');
    } else {
      setMemberFilter('all');
    }

    collectiveEl.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="home" className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20 pt-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-cyan-300 font-medium">
              Independent research &amp; delivery collective
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            We build{' '}
            <span className="text-gradient-cyan">what comes next</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A collective of researchers, builders, and visionaries architecting deep-tech systems.
            From cutting-edge research to production systems that scale.
          </p>
        </motion.div>

        {/* Dual Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowJoinModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold hover:from-cyan-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            Join the research network
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBriefDrawer(true)}
            className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Bring us a hard problem
          </motion.button>
        </motion.div>

        {/* Live Metrics Matrix — Clickable interactive stat cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {metrics.map((metric) => {
            const isClickable = Boolean(metric.filterTarget);
            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                whileHover={isClickable ? { y: -4, scale: 1.02 } : { y: -2 }}
                whileTap={isClickable ? { scale: 0.97 } : {}}
                onClick={isClickable ? () => handleMetricClick(metric.filterTarget) : undefined}
                className={`group relative border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-xl p-6 transition-all duration-300 ${
                  isClickable
                    ? 'cursor-pointer hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20'
                    : 'hover:border-white/20'
                }`}
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2 font-mono-tech">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                {isClickable && (
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-cyan-400 font-mono-tech">View members</span>
                    <ArrowUpRight className="h-3 w-3 text-cyan-400" />
                  </div>
                )}
                {isClickable && (
                  <div className="absolute inset-0 rounded-xl border-2 border-cyan-500/0 group-hover:border-cyan-500/30 transition-all duration-300 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <div className="text-gray-500 text-sm mb-2">Scroll to explore</div>
            <ChevronDown className="w-6 h-6 mx-auto text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
