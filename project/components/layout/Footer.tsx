'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

const footerLinks = {
  Domains: [
    { label: 'Research', href: '#research' },
    { label: 'Agency', href: '#agency' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Thesis', href: '#thesis' },
  ],
  Resources: [
    { label: 'Research Papers', href: '#research' },
    { label: 'Projects', href: '#research' },
    { label: 'Team', href: '#ecosystem' },
    { label: 'Contact', href: '#ecosystem' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      {/* System Status */}
      <div className="border-b border-white/5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="relative flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-400 font-mono-tech">
                All Systems Operational
              </span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400 font-mono-tech">Orbit 16 Active</span>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500" />
                <span className="font-bold text-white text-lg">AARIVYN ONE</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Independent research &amp; delivery collective architecting frontier deep-tech systems.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold text-white mb-4">{title}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="hover:text-cyan-400 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500" />
              <span className="font-bold text-white">AARIVYN ONE</span>
            </div>
            <p className="text-sm text-gray-500 font-mono-tech">
              © 2025 AARIVYN ONE. Shaping the deep-tech future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
