'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useSectionContext } from '@/contexts/SectionContext';
import { ecosystemPersonas } from '@/data/content';

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Target,
};

export function EcosystemSection() {
  const { setShowJoinModal, setShowBriefDrawer } = useSectionContext();

  const handleClicks: Record<string, () => void> = {
    p1: () => setShowJoinModal(true),
    p2: () => setShowBriefDrawer(true),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="ecosystem" className="relative z-20 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="[ 04 // DUAL-PERSONA COLLECTIVE ]"
          title="Choose Your Path"
          subtitle="Join AARIVYN ONE as a builder or bring us your hardest problems as a client."
          glowColor="#f59e0b"
          centered
        />

        {/* Dual Persona Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ecosystemPersonas.map((persona) => {
            const Icon = iconMap[persona.icon] || Rocket;
            return (
              <motion.div
                key={persona.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`border ${persona.borderColor} bg-slate-900/50 backdrop-blur-md rounded-2xl p-12 bg-gradient-to-br ${persona.color} transition-all duration-300 hover:shadow-lg`}
              >
                <div className="mb-6 inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">{persona.title}</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">{persona.action}</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClicks[persona.id]}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                >
                  {persona.button}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
