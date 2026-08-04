'use client'

import React from 'react'
import { projects, members } from '@/data/mockData'
import { useSectionContext } from '@/contexts/SectionContext'
import { GlassmorphCard } from '@/components/ui/GlassmorphCard'
import { FileText, ExternalLink } from 'lucide-react'

export function AgencySection() {
  const { setShowBriefDrawer } = useSectionContext()
  const agencyMembers = members.filter((m) => m.tracks.includes('agency'))
  const activeProjects = projects.filter((p) => p.status === 'active')

  return (
    <div className="space-y-12">
      {/* CTA Section */}
      <div className="glass rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">Submit a Client Brief</h2>
        <p className="mb-6 text-gray-400">
          Tell us about your project and let&apos;s build something exceptional together.
        </p>
        <button
          onClick={() => setShowBriefDrawer(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500/30 px-6 py-3 font-medium text-amber-300 transition-all duration-300 hover:bg-amber-500/40"
        >
          <FileText className="h-5 w-5" />
          Submit Brief
        </button>
      </div>

      {/* Team */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Agency Team</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agencyMembers.map((member) => (
            <GlassmorphCard key={member.id} hover glow>
              <div className="flex flex-col gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-12 w-12 rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-amber-400">{member.title}</p>
                </div>
                <p className="text-sm text-gray-400">{member.bio}</p>
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Active Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {activeProjects.map((project) => (
            <GlassmorphCard key={project.id} hover glow>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="mb-2 text-lg font-bold text-amber-300">{project.name}</h3>
                  <p className="mb-4 text-gray-400">{project.description}</p>
                  <div className="mb-4">
                    <div className="mb-2 text-xs font-medium text-gray-500">Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block rounded bg-amber-500/20 px-2 py-1 text-xs text-amber-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-all hover:text-amber-300"
                  >
                    View Project <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Our Services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Smart Contract Development', icon: '🔐' },
            { title: 'Protocol Design', icon: '🏗️' },
            { title: 'Security Audits', icon: '🛡️' },
            { title: 'DeFi Solutions', icon: '💰' },
            { title: 'UI/UX Design', icon: '🎨' },
            { title: 'Infrastructure Setup', icon: '⚙️' },
            { title: 'Team Training', icon: '👨‍🎓' },
            { title: 'Technical Consulting', icon: '💡' },
          ].map((service) => (
            <GlassmorphCard key={service.title} hover>
              <div className="text-center">
                <div className="mb-3 text-3xl">{service.icon}</div>
                <h3 className="text-sm font-bold text-white">{service.title}</h3>
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-amber-400">30+</div>
            <div className="text-sm text-gray-400">Clients Served</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-amber-400">{agencyMembers.length}</div>
            <div className="text-sm text-gray-400">Team Members</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-amber-400">100%</div>
            <div className="text-sm text-gray-400">Delivery Success</div>
          </div>
        </GlassmorphCard>
      </div>
    </div>
  )
}
