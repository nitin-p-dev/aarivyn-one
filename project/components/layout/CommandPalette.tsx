'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Briefcase, Layers, Users } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';
import { commandItems } from '@/data/content';

const typeIcons: Record<string, React.ElementType> = {
  project: FileText,
  service: Briefcase,
  section: Layers,
  member: Users,
};

const typeColors: Record<string, string> = {
  project: 'text-violet-400',
  service: 'text-emerald-400',
  section: 'text-cyan-400',
  member: 'text-amber-400',
};

export function CommandPalette() {
  const { showCommandPalette, setShowCommandPalette } = useSectionContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = commandItems.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (showCommandPalette) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [showCommandPalette]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!showCommandPalette) return;
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((p) => Math.min(p + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((p) => Math.max(p - 1, 0));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        jumpTo(filtered[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCommandPalette, filtered, selectedIndex, setShowCommandPalette]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const jumpTo = (item: (typeof commandItems)[number]) => {
    setShowCommandPalette(false);
    const el = document.getElementById(item.section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!showCommandPalette) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setShowCommandPalette(false)}
        />

        {/* Palette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl"
        >
          <div className="glass-lg bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <Search className="h-5 w-5 text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search papers, projects, members, services..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm outline-none"
              />
              <kbd className="px-2 py-1 rounded bg-white/5 text-xs text-gray-500 border border-white/10">
                ESC
              </kbd>
              <button
                onClick={() => setShowCommandPalette(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto custom-scrollbar p-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((item, i) => {
                  const Icon = typeIcons[item.type] || Layers;
                  const color = typeColors[item.type] || 'text-gray-400';
                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setSelectedIndex(i)}
                      onClick={() => jumpTo(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-150 ${
                        i === selectedIndex
                          ? 'bg-white/10 border border-white/10'
                          : 'border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {item.description}
                        </div>
                      </div>
                      <span className={`text-xs font-mono-tech uppercase ${color}`}>
                        {item.type}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd>
                  Select
                </span>
              </div>
              <span className="font-mono-tech">AARIVYN ONE</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
