'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Network, ShieldCheck } from 'lucide-react';

const tickerItems = [
  { icon: Network, label: 'NETWORK STATUS', value: 'OPERATIONAL', color: 'text-green-400' },
  { icon: Zap, label: 'AVG LATENCY', value: '42ms', color: 'text-cyan-400' },
  { icon: Activity, label: 'ACTIVE NODES', value: '1,200', color: 'text-indigo-400' },
  { icon: ShieldCheck, label: 'QUANTUM SECURITY', value: 'ACTIVE', color: 'text-violet-400' },
];

export function TelemetryTicker() {
  const content = (
    <div className="flex items-center gap-8 px-4 whitespace-nowrap">
      {tickerItems.map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
            <span className="text-xs font-mono-tech font-medium text-gray-400">
              {item.label}:
            </span>
            <span className={`text-xs font-mono-tech font-bold ${item.color}`}>
              {item.value}
            </span>
          </div>
          {i < tickerItems.length - 1 && (
            <span className="text-gray-700">|</span>
          )}
        </React.Fragment>
      ))}
      {/* Duplicate for seamless loop */}
      {tickerItems.map((item, i) => (
        <React.Fragment key={`dup-${i}`}>
          <div className="flex items-center gap-2">
            <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
            <span className="text-xs font-mono-tech font-medium text-gray-400">
              {item.label}:
            </span>
            <span className={`text-xs font-mono-tech font-bold ${item.color}`}>
              {item.value}
            </span>
          </div>
          {i < tickerItems.length - 1 && (
            <span className="text-gray-700">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="fixed top-[65px] left-0 right-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center py-2">
        {/* Status dot */}
        <div className="flex items-center gap-2 pl-4 pr-6 border-r border-white/5 shrink-0">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-75" />
          </div>
        </div>
        {/* Scrolling ticker */}
        <motion.div
          className="flex animate-ticker"
        >
          {content}
        </motion.div>
      </div>
    </div>
  );
}
