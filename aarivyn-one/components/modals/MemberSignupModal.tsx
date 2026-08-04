'use client'

import React, { useState } from 'react'
import { useSectionContext } from '@/contexts/SectionContext'
import { X } from 'lucide-react'

export function MemberSignupModal() {
  const { showSignupModal, setShowSignupModal, setShowLoginModal } = useSectionContext()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    track: 'research',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Signup:', formData)
    setShowSignupModal(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          showSignupModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowSignupModal(false)}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          showSignupModal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className={`relative w-full max-w-md mx-4 pointer-events-auto transform transition-all duration-300 ${
          showSignupModal ? 'scale-100' : 'scale-95'
        }`}>
          <div className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10">
            {/* Close Button */}
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-white mb-2">Join AARIVYN</h2>
            <p className="text-gray-400 mb-6">Create your builder profile</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Research Track</label>
                <select
                  name="track"
                  value={formData.track}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400/50 transition-colors"
                >
                  <option value="research">Research</option>
                  <option value="agency">Agency</option>
                  <option value="hackathons">Hackathons</option>
                  <option value="mission">Mission</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setShowSignupModal(false)
                    setShowLoginModal(true)
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
