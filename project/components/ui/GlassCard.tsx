'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: string;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hoverGlow = 'hover:shadow-cyan-500/20',
  delay = 0,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={cn(
        'border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-2xl transition-all duration-300',
        hoverGlow,
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
