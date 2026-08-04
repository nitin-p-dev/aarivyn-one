'use client'

import React, { useState } from 'react'
import { useSectionContext } from '@/contexts/SectionContext'
import { X } from 'lucide-react'

export function MemberLoginModal() {
  const { showLoginModal, setShowLoginModal, setShowSignupModal } = useSectionContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Login:', { email, password })
    setShowLoginModal(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          showLoginModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowLoginModal(false)}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${
          showLoginModal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className={`relative w-full max-w-md mx-4 pointer-events-auto transform transition-all duration-300 ${
          showLoginModal ? 'scale-100' : 'scale-95'
        }`}>
          <div className="glass backdrop-blur-md rounded-2xl p-8 border border-white/10">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-white mb-2">Member Sign In</h2>
            <p className="text-gray-400 mb-6">Access your AARIVYN profile</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setShowLoginModal(false)
                    setShowSignupModal(true)
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
