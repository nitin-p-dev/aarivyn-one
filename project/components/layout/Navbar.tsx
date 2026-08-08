'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';
import { SectionId } from '@/types';

const navItems: { id: SectionId; label: string; href: string }[] = [
  { id: 'thesis', label: 'Thesis', href: '#thesis' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'agency', label: 'Agency', href: '#agency' },
  { id: 'collective', label: 'Collective', href: '#collective' },
  { id: 'forge', label: 'Forge', href: '#forge' },
  { id: 'hackathon', label: 'LFG', href: '#hackathon' },
  { id: 'gigs', label: 'Gigs', href: '#gigs' },
  { id: 'vault', label: 'Vault', href: '#vault' },
];

export function Navbar() {
  const { setActiveSection, setShowCommandPalette, setShowJoinModal, activeProfile, setShowNodeActivation } = useSectionContext();
  const [activeId, setActiveId] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveId(id);
            setActiveSection(id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    const sections = ['home', 'thesis', 'research', 'agency', 'ecosystem', 'collective', 'forge', 'hackathon', 'gigs', 'vault'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setShowCommandPalette]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-header' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setActiveSection('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-lg font-bold text-white transition-all duration-300"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/30" />
          <span className="tracking-wide">AARIVYN ONE</span>
        </motion.button>

        {/* Nav Links with Scrollspy */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                activeId === item.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Command palette trigger */}
          <button
            onClick={() => setShowCommandPalette(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 text-xs text-gray-500">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (activeProfile ? undefined : setShowNodeActivation(true))}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-sm font-semibold text-white hover:from-cyan-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            {activeProfile ? activeProfile.nodeId : 'Join AARIVYN'}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
