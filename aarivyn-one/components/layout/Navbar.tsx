'use client'

import React from 'react'
import { useSectionContext } from '@/contexts/SectionContext'
import { Users, Search } from 'lucide-react'

export function Navbar() {
  const {
    activeSection,
    setActiveSection,
    theme,
    setShowMembersModal,
  } = useSectionContext()

  const sections = [
    { id: 'research', label: 'Research', icon: '📊' },
    { id: 'agency', label: 'Agency', icon: '💼' },
    { id: 'hackathons', label: 'Hackathons', icon: '🚀' },
    { id: 'mission', label: 'Mission', icon: '🌍' },
  ] as const

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo - Clickable to reset to home */}
        <button
          onClick={() => setActiveSection('default')}
          className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400" />
          <span className="text-lg font-bold text-white">Aarivyn One</span>
        </button>

        {/* Section Tabs */}
        <div className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-white/15 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMembersModal(true)}
            className="group flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-white/15 hover:text-white"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Members</span>
          </button>

          <button className="flex items-center justify-center rounded-lg bg-white/5 p-2 text-gray-400 transition-all duration-300 hover:bg-white/15 hover:text-white">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Section Tabs */}
      <div className="flex justify-center gap-1 border-t border-white/10 bg-black/20 px-4 py-2 sm:hidden">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`rounded px-2 py-1 text-xs font-medium transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-white/15 text-white'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            {section.icon}
          </button>
        ))}
      </div>
    </nav>
  )
}
