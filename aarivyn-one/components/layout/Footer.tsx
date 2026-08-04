'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      {/* System Status */}
      <div className="border-b border-white/5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="relative flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-400">All Systems Operational</span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-sm text-gray-400">Orbit 16 Active</span>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Domains */}
            <div>
              <h3 className="font-bold text-white mb-4">Domains</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#research" className="hover:text-blue-400 transition-colors">Research</a></li>
                <li><a href="#agency" className="hover:text-amber-400 transition-colors">Agency</a></li>
                <li><a href="#hackathons" className="hover:text-purple-400 transition-colors">Hackathons</a></li>
                <li><a href="#mission" className="hover:text-orange-400 transition-colors">Mission</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#papers" className="hover:text-blue-400 transition-colors">Research Papers</a></li>
                <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                <li><a href="#members" className="hover:text-blue-400 transition-colors">Team</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#disclaimer" className="hover:text-blue-400 transition-colors">Disclaimer</a></li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#twitter" className="hover:text-blue-400 transition-colors">Twitter / X</a></li>
                <li><a href="#github" className="hover:text-blue-400 transition-colors">GitHub</a></li>
                <li><a href="#discord" className="hover:text-blue-400 transition-colors">Discord</a></li>
                <li><a href="#email" className="hover:text-blue-400 transition-colors">Email</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600"></div>
              <span className="font-bold text-white">Aarivyn One</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Aarivyn One. Shaping the decentralized future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
