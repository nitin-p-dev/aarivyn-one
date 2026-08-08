'use client';

import React from 'react';

export function SectionDivider({ glowColor = '#00f0ff' }: { glowColor?: string }) {
  return (
    <div
      className="relative w-full max-w-7xl mx-auto py-0"
      style={{ '--glow-color': glowColor } as React.CSSProperties}
    >
      <div className="section-glow-divider" />
    </div>
  );
}
