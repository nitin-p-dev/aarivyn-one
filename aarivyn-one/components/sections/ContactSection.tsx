'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactSection() {
  const [activeTab, setActiveTab] = useState('clients')
  const [clientForm, setClientForm] = useState({ project: '', budget: '', timeline: '', email: '' })
  const [joinForm, setJoinForm] = useState({ name: '', expertise: '', background: '', email: '' })
  const [submitted, setSubmitted] = useState<string | null>(null)

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted('clients')
    setTimeout(() => setSubmitted(null), 3000)
    setClientForm({ project: '', budget: '', timeline: '', email: '' })
  }

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted('join')
    setTimeout(() => setSubmitted(null), 3000)
    setJoinForm({ name: '', expertise: '', background: '', email: '' })
  }

  return (
    <div className="relative z-20 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Work With Us</h2>
          <p className="text-gray-400 text-lg">
            Whether you&apos;re a client looking for cutting-edge Web3 development or a builder ready to join the collective.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'clients'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            For Clients
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'join'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            Join Network
          </button>
        </div>

        {/* Forms */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'clients' && (
            <div className="glass rounded-2xl p-8 border border-blue-500/20">
              <form onSubmit={handleClientSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Project Scope</label>
                  <textarea
                    value={clientForm.project}
                    onChange={(e) => setClientForm({ ...clientForm, project: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="Describe your project needs..."
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Budget Range</label>
                    <select
                      value={clientForm.budget}
                      onChange={(e) => setClientForm({ ...clientForm, budget: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="10-50k">$10k - $50k</option>
                      <option value="50-100k">$50k - $100k</option>
                      <option value="100k+">$100k+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Timeline</label>
                    <select
                      value={clientForm.timeline}
                      onChange={(e) => setClientForm({ ...clientForm, timeline: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="1-3">1-3 months</option>
                      <option value="3-6">3-6 months</option>
                      <option value="6+">6+ months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {submitted === 'clients' ? '✓ Message Sent!' : 'Send Brief'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'join' && (
            <div className="glass rounded-2xl p-8 border border-purple-500/20">
              <form onSubmit={handleJoinSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={joinForm.name}
                    onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Primary Expertise</label>
                  <select
                    value={joinForm.expertise}
                    onChange={(e) => setJoinForm({ ...joinForm, expertise: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                    required
                  >
                    <option value="">Select expertise</option>
                    <option value="research">Research</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Tell Us About Yourself</label>
                  <textarea
                    value={joinForm.background}
                    onChange={(e) => setJoinForm({ ...joinForm, background: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="Your background, experience, and why you want to join..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={joinForm.email}
                    onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  {submitted === 'join' ? '✓ Application Sent!' : 'Apply to Join'}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
