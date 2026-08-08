'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ThesisSection } from '@/components/sections/ThesisSection';
import { ResearchSection } from '@/components/sections/ResearchSection';
import { AgencySection } from '@/components/sections/AgencySection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { CollectiveSection } from '@/components/sections/CollectiveSection';
import { ForgeSection } from '@/components/sections/ForgeSection';
import { HackathonSection } from '@/components/sections/HackathonSection';
import { GigExchangeSection } from '@/components/sections/GigExchangeSection';
import { ResourceVaultSection } from '@/components/sections/ResourceVaultSection';
import { CoreMembersSection } from '@/components/sections/CoreMembersSection';
import { SlideOver } from '@/components/modals/SlideOver';
import { BriefDrawer } from '@/components/modals/BriefDrawer';
import { JoinDrawer } from '@/components/modals/JoinDrawer';
import { JoinModal } from '@/components/modals/JoinModal';
import { NodeActivationModal } from '@/components/modals/NodeActivationModal';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { sectionThemes } from '@/data/content';

const DynamicCanvas = dynamic(
  () => import('@/components/canvas/DynamicCanvas').then((m) => m.DynamicCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <DynamicCanvas />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main className="relative z-20">
        <HeroSection />

        <SectionDivider glowColor={sectionThemes.thesis.glow} />
        <ThesisSection />

        <SectionDivider glowColor={sectionThemes.research.glow} />
        <ResearchSection />

        <SectionDivider glowColor={sectionThemes.agency.glow} />
        <AgencySection />

        <SectionDivider glowColor={sectionThemes.ecosystem.glow} />
        <EcosystemSection />

        <SectionDivider glowColor={sectionThemes.collective.glow} />
        <CollectiveSection />

        <SectionDivider glowColor={sectionThemes.forge.glow} />
        <ForgeSection />

        <SectionDivider glowColor={sectionThemes.hackathon.glow} />
        <HackathonSection />

        <SectionDivider glowColor={sectionThemes.gigs.glow} />
        <GigExchangeSection />

        <SectionDivider glowColor={sectionThemes.vault.glow} />
        <ResourceVaultSection />

        <CoreMembersSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <CommandPalette />
      <SlideOver />
      <BriefDrawer />
      <JoinDrawer />
      <JoinModal />
      <NodeActivationModal />
    </div>
  );
}
