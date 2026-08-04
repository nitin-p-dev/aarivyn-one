'use client'

import React, { useState } from 'react'
import { researchPapers, members } from '@/data/mockData'
import { GlassmorphCard } from '@/components/ui/GlassmorphCard'
import { ArrowRight } from 'lucide-react'

export function ResearchSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const researchMembers = members.filter((m) => m.tracks.includes('research'))
  const categories = Array.from(new Set(researchPapers.map((p) => p.category)))

  const filteredPapers = selectedCategory
    ? researchPapers.filter((p) => p.category === selectedCategory)
    : researchPapers

  return (
    <div className="space-y-12">
      {/* Active Researchers */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Active Researchers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchMembers.map((member) => (
            <GlassmorphCard key={member.id} hover glow>
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-10 w-10 rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-gray-400">{member.title}</p>
                </div>
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Research Papers */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Research Papers</h2>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-blue-500/30 text-blue-300'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            All Papers
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500/30 text-blue-300'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Papers Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPapers.map((paper) => (
            <GlassmorphCard key={paper.id} hover glow>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="mb-3 text-lg font-bold text-blue-300">{paper.title}</h3>
                  <p className="mb-4 text-sm text-gray-400">{paper.abstract}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded bg-blue-500/20 px-2 py-1 text-xs text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-500">{new Date(paper.date).toLocaleDateString()}</span>
                  <a
                    href={paper.url}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-all hover:text-blue-300"
                  >
                    Read <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-400">{researchPapers.length}</div>
            <div className="text-sm text-gray-400">Published Papers</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-400">{researchMembers.length}</div>
            <div className="text-sm text-gray-400">Active Researchers</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-400">{categories.length}</div>
            <div className="text-sm text-gray-400">Research Areas</div>
          </div>
        </GlassmorphCard>
      </div>
    </div>
  )
}
