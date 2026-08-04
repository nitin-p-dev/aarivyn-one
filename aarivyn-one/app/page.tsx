'use client'

import React, { Suspense } from 'react'
import { ThreeBackground } from '@/components/canvas/ThreeBackground'
import { HeaderNavigation } from '@/components/sections/HeaderNavigation'
import { Footer } from '@/components/layout/Footer'
import { HeroWithMetrics } from '@/components/sections/HeroWithMetrics'
import { ThesisPillars } from '@/components/sections/ThesisPillars'
import { ResearchShowcase } from '@/components/sections/ResearchShowcase'
import { AgencyServices } from '@/components/sections/AgencyServices'
import { DualPersonaCallout } from '@/components/sections/DualPersonaCallout'
import { MembersOrbitModal } from '@/components/sections/MembersOrbitModal'
import { MemberLoginModal } from '@/components/modals/MemberLoginModal'
import { MemberSignupModal } from '@/components/modals/MemberSignupModal'

function PageContent() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Navigation */}
      <HeaderNavigation />

      {/* MODULE 01: Header Navigation - done in HeaderNavigation */}

      {/* MODULE 02: Hero Section with Live Metrics */}
      <HeroWithMetrics />

      {/* MODULE 03: Thesis & Core Value Pillars */}
      <ThesisPillars />

      {/* MODULE 04: Research & Innovation Showcase */}
      <ResearchShowcase />

      {/* MODULE 05: Agency & Client Service Intake */}
      <AgencyServices />

      {/* MODULE 06: Dual-Persona Split Callout */}
      <DualPersonaCallout />

      {/* Footer */}
      <Footer />

      {/* MODULE 07: Authentication Modals */}
      <MembersOrbitModal />
      <MemberLoginModal />
      <MemberSignupModal />
    </div>
  )
}

export default function Home() {
  return <PageContent />
}
