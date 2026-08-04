'use client'

import React, { useState } from 'react'
import { useSectionContext } from '@/contexts/SectionContext'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'

export function BriefDrawer() {
  const { showBriefDrawer, setShowBriefDrawer } = useSectionContext()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    budget: '',
    timeline: '',
    email: '',
    contact: '',
  })

  if (!showBriefDrawer) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      setSubmitted(true)
      setTimeout(() => {
        setShowBriefDrawer(false)
        setStep(1)
        setSubmitted(false)
        setFormData({
          projectName: '',
          description: '',
          budget: '',
          timeline: '',
          email: '',
          contact: '',
        })
      }, 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur"
        onClick={() => setShowBriefDrawer(false)}
      />

      <div className="relative h-full w-full max-w-md overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Submit Brief</h2>
            <button
              onClick={() => setShowBriefDrawer(false)}
              className="rounded-lg bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Brief Submitted!</h3>
              <p className="text-gray-400">
                We&apos;ll review your project and get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step Indicator */}
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      s <= step ? 'bg-amber-500' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Project Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Project Details</h3>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none"
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none"
                      placeholder="Tell us about your project"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Budget & Timeline</h3>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-2 text-white border border-white/10 focus:border-amber-500 focus:outline-none"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="<25k">{'< $25K'}</option>
                      <option value="25-50k">$25K - $50K</option>
                      <option value="50-100k">$50K - $100K</option>
                      <option value=">100k">{'>$100K'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-2 text-white border border-white/10 focus:border-amber-500 focus:outline-none"
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="urgent">Urgent (1-2 months)</option>
                      <option value="short">Short-term (2-4 months)</option>
                      <option value="medium">Medium-term (4-6 months)</option>
                      <option value="long">Long-term (6+ months)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Contact Information</h3>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/5 px-4 py-2 text-white placeholder-gray-500 border border-white/10 focus:border-amber-500 focus:outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 font-medium text-white transition-all hover:bg-white/5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto flex items-center gap-2 rounded-lg bg-amber-500/30 px-6 py-2 font-medium text-amber-300 transition-all hover:bg-amber-500/40"
                >
                  {step === 3 ? 'Submit' : 'Next'}
                  {step < 3 && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
