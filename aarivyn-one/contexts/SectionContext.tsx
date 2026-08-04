'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { SectionTheme } from '@/types'

type SectionType = 'research' | 'agency' | 'hackathons' | 'mission' | 'default'

interface SectionContextType {
  activeSection: SectionType
  setActiveSection: (section: SectionType) => void
  theme: SectionTheme
  showMembersModal: boolean
  setShowMembersModal: (show: boolean) => void
  showBriefDrawer: boolean
  setShowBriefDrawer: (show: boolean) => void
  showJoinDrawer: boolean
  setShowJoinDrawer: (show: boolean) => void
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
  showSignupModal: boolean
  setShowSignupModal: (show: boolean) => void
  selectedMemberId: string | null
  setSelectedMemberId: (id: string | null) => void
}

const defaultTheme: SectionTheme = {
  name: 'default',
  primary: '#0F172A',
  secondary: '#1E293B',
  accent: '#64748B',
  glow: '#3B82F6',
  dark: '#0A0F1F',
}

const themeMap: Record<SectionType, SectionTheme> = {
  default: {
    name: 'default',
    primary: '#0F172A',
    secondary: '#1E293B',
    accent: '#64748B',
    glow: '#3B82F6',
    dark: '#0A0F1F',
  },
  research: {
    name: 'research',
    primary: '#030712',
    secondary: '#1E1B4B',
    accent: '#3B82F6',
    glow: '#60A5FA',
    dark: '#0F0E1B',
  },
  agency: {
    name: 'agency',
    primary: '#090A0F',
    secondary: '#1F2937',
    accent: '#F59E0B',
    glow: '#FCD34D',
    dark: '#050506',
  },
  hackathons: {
    name: 'hackathons',
    primary: '#0D0221',
    secondary: '#1A0033',
    accent: '#8B5CF6',
    glow: '#A78BFA',
    dark: '#08000F',
  },
  mission: {
    name: 'mission',
    primary: '#0F0500',
    secondary: '#2D1B14',
    accent: '#F97316',
    glow: '#FB923C',
    dark: '#0A0300',
  },
}

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionType>('default')
  const [showMembersModal, setShowMembersModal] = useState(false)
  const [showBriefDrawer, setShowBriefDrawer] = useState(false)
  const [showJoinDrawer, setShowJoinDrawer] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)

  const theme = themeMap[activeSection] || defaultTheme

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        theme,
        showMembersModal,
        setShowMembersModal,
        showBriefDrawer,
        setShowBriefDrawer,
        showJoinDrawer,
        setShowJoinDrawer,
        showLoginModal,
        setShowLoginModal,
        showSignupModal,
        setShowSignupModal,
        selectedMemberId,
        setSelectedMemberId,
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}

export function useSectionContext() {
  const context = useContext(SectionContext)
  if (!context) {
    throw new Error('useSectionContext must be used within a SectionProvider')
  }
  return context
}
