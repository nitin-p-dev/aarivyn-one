'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SectionId, SectionTheme, MemberCategory, NodeProfile, NodeStatus, SkillTag } from '@/types';
import { sectionThemes } from '@/data/content';

interface SectionContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  theme: SectionTheme;
  showBriefDrawer: boolean;
  setShowBriefDrawer: (show: boolean) => void;
  showJoinDrawer: boolean;
  setShowJoinDrawer: (show: boolean) => void;
  showCommandPalette: boolean;
  setShowCommandPalette: (show: boolean) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  prefillTimeline: number;
  setPrefillTimeline: (weeks: number) => void;
  memberFilter: MemberCategory | 'all';
  setMemberFilter: (filter: MemberCategory | 'all') => void;
  showJoinModal: boolean;
  setShowJoinModal: (show: boolean) => void;
  agencyGlowTrigger: number;
  triggerAgencyGlow: () => void;
  prefillTrack: string;
  setPrefillTrack: (track: string) => void;
  // Node Activation / Profile
  activeProfile: NodeProfile | null;
  setActiveProfile: (profile: NodeProfile | null) => void;
  showNodeActivation: boolean;
  setShowNodeActivation: (show: boolean) => void;
  showPitchModal: boolean;
  setShowPitchModal: (show: boolean) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [showBriefDrawer, setShowBriefDrawer] = useState(false);
  const [showJoinDrawer, setShowJoinDrawer] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [prefillTimeline, setPrefillTimeline] = useState(4);
  const [memberFilter, setMemberFilter] = useState<MemberCategory | 'all'>('all');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [agencyGlowTrigger, setAgencyGlowTrigger] = useState(0);
  const [prefillTrack, setPrefillTrack] = useState('');
  const [activeProfile, setActiveProfile] = useState<NodeProfile | null>(null);
  const [showNodeActivation, setShowNodeActivation] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);

  const triggerAgencyGlow = () => setAgencyGlowTrigger((n) => n + 1);

  const theme = sectionThemes[activeSection] || sectionThemes.home;

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        theme,
        showBriefDrawer,
        setShowBriefDrawer,
        showJoinDrawer,
        setShowJoinDrawer,
        showCommandPalette,
        setShowCommandPalette,
        selectedProjectId,
        setSelectedProjectId,
        prefillTimeline,
        setPrefillTimeline,
        memberFilter,
        setMemberFilter,
        showJoinModal,
        setShowJoinModal,
        agencyGlowTrigger,
        triggerAgencyGlow,
        prefillTrack,
        setPrefillTrack,
        activeProfile,
        setActiveProfile,
        showNodeActivation,
        setShowNodeActivation,
        showPitchModal,
        setShowPitchModal,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within a SectionProvider');
  }
  return context;
}
