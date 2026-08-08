'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Quote, FileText, Users, Gauge } from 'lucide-react';
import { useSectionContext } from '@/contexts/SectionContext';
import { researchProjects } from '@/data/content';

export function SlideOver() {
  const { selectedProjectId, setSelectedProjectId } = useSectionContext();
  const isOpen = selectedProjectId !== null;
  const project = researchProjects.find((p) => p.id === selectedProjectId);
  const bibtexRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setSelectedProjectId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, setSelectedProjectId]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  const handleDownloadBibtex = () => {
    if (!project) return;
    const blob = new Blob([project.bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}.bib`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!project) return;
    const content = `AARIVYN ONE Research Report\n\nTitle: ${project.title}\nTRL: ${project.trlLabel}\nStatus: ${project.status}\n\n${project.fullDescription}\n\nTechnical Specifications:\n${project.specs.map((s) => `  ${s.label}: ${s.value}`).join('\n')}\n\nTeam: ${project.team.join(', ')}\n`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.id}-report.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const trlPercent = project ? (project.trl / 9) * 100 : 0;
  const trlColor =
    project && project.trl <= 3
      ? '#ef4444'
      : project && project.trl <= 6
      ? '#f59e0b'
      : '#10b981';

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProjectId(null)}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[95] w-full max-w-lg overflow-y-auto custom-scrollbar bg-gradient-to-b from-slate-900 to-slate-950 border-l border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 glass-header bg-black/50 backdrop-blur-xl px-6 py-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-violet-400" />
                  <h2 className="text-lg font-bold text-white">Technical Dossier</h2>
                </div>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Title block */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-xs font-semibold text-violet-300">
                    {project.trlLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{project.fullDescription}</p>
              </div>

              {/* TRL Gauge */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-4 w-4 text-violet-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    Technology Readiness Level
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono-tech text-gray-500">
                    <span>TRL 1</span>
                    <span style={{ color: trlColor }} className="font-bold">
                      TRL {project.trl}
                    </span>
                    <span>TRL 9</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${trlPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #ef4444, #f59e0b, #10b981)`,
                        boxShadow: `0 0 12px ${trlColor}80`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {project.trl <= 3 && 'Basic principles observed and validated'}
                    {project.trl > 3 && project.trl <= 6 && 'Validated in relevant environment'}
                    {project.trl > 6 && 'System proven in operational environment'}
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-400/20 text-xs text-violet-300 font-mono-tech"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
                  Technical Specifications
                </h4>
                <div className="space-y-2">
                  {project.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 border border-white/10"
                    >
                      <span className="text-sm text-gray-400">{spec.label}</span>
                      <span className="text-sm font-mono-tech font-medium text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-violet-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    Research Team
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.team.map((member) => (
                    <span
                      key={member}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              {/* BibTeX Citation */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Quote className="h-4 w-4 text-violet-400" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                      BibTeX Citation
                    </h4>
                  </div>
                  <button
                    onClick={handleDownloadBibtex}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-400/30 text-xs font-medium text-violet-300 hover:bg-violet-500/30 transition-all"
                  >
                    <Download className="h-3 w-3" />
                    .bib
                  </button>
                </div>
                <pre
                  ref={bibtexRef}
                  className="p-4 rounded-lg bg-black/40 border border-white/10 text-xs font-mono-tech text-gray-400 overflow-x-auto custom-scrollbar"
                >
                  {project.bibtex}
                </pre>
              </div>

              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleDownloadPdf}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/20"
                >
                  <Download className="h-4 w-4" />
                  Download PDF Report
                </button>
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className="px-4 py-3 rounded-lg border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
