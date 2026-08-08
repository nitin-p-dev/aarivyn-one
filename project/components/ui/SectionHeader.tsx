'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  glowColor?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  glowColor = '#00f0ff',
  centered = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {/* Mono-spaced tech index badge */}
      <div className={`mb-4 ${centered ? 'flex justify-center' : ''}`}>
        <span
          className="inline-block px-4 py-1.5 rounded-md bg-white/5 border border-white/10 font-mono-tech text-xs font-medium tracking-wider text-gray-400"
          style={{ color: glowColor }}
        >
          {badge}
        </span>
      </div>

      <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{title}</h2>
      {subtitle && (
        <p
          className={`text-lg text-gray-400 ${centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
