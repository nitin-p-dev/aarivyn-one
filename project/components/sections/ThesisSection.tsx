'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Rocket } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { thesisPillars } from '@/data/content';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Users,
  Rocket,
};

export function ThesisSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="thesis" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 01 // ARCHITECTURAL THESIS ]"
          title="Thesis"
          glowColor="#e2e8f0"
          centered
        />

        {/* Philosophy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xl sm:text-2xl text-slate-300 italic font-light">
            &ldquo;Learning is only valuable when it becomes capability.&rdquo;
          </p>
        </motion.div>

        {/* 3 Pillar Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {thesisPillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || BookOpen;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 bg-gradient-to-br ${pillar.color} ${pillar.border} transition-all duration-300 ${pillar.glow}`}
              >
                <div className="mb-4 inline-flex items-center justify-center h-14 w-14 rounded-xl bg-white/5 border border-white/10">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Core Values Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-500/10 to-slate-400/5 border border-white/10 text-center"
        >
          <p className="text-gray-300 text-lg">
            We believe in building infrastructure that matters — research that informs strategy,
            talent that executes with precision, and delivery mechanisms that scale impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
