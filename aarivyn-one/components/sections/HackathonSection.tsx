'use client'

import React from 'react'
import { hackathons, members } from '@/data/mockData'
import { GlassmorphCard } from '@/components/ui/GlassmorphCard'
import { Trophy, Clock, Users } from 'lucide-react'

export function HackathonSection() {
  const hackathonMembers = members.filter((m) => m.tracks.includes('hackathons'))
  const activeHackathons = hackathons.filter((h) => h.status !== 'completed')
  const completedHackathons = hackathons.filter((h) => h.status === 'completed')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500/20 text-green-300'
      case 'upcoming':
        return 'bg-purple-500/20 text-purple-300'
      case 'completed':
        return 'bg-gray-500/20 text-gray-300'
      default:
        return 'bg-blue-500/20 text-blue-300'
    }
  }

  return (
    <div className="space-y-12">
      {/* CTA Section */}
      <div className="glass rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">Join a Hackathon</h2>
        <p className="mb-6 text-gray-400">
          Build innovative projects, compete for prizes, and join a community of talented developers.
        </p>
        <button className="inline-flex items-center gap-2 rounded-lg bg-purple-500/30 px-6 py-3 font-medium text-purple-300 transition-all duration-300 hover:bg-purple-500/40">
          Register Now
        </button>
      </div>

      {/* Active Hackathons */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Active Hackathons</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {activeHackathons.map((hackathon) => (
            <GlassmorphCard key={hackathon.id} hover glow>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-purple-300">{hackathon.name}</h3>
                    <span className={`rounded-lg px-3 py-1 text-xs font-medium ${getStatusColor(hackathon.status)}`}>
                      {hackathon.status === 'live' ? '🔴 Live' : '⏳ Upcoming'}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-400">{hackathon.description}</p>

                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Trophy className="h-4 w-4 text-amber-400" />
                      Prize Pool: <span className="font-bold text-amber-400">{hackathon.prizePool}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4 text-blue-400" />
                      Ends: {new Date(hackathon.endDate).toLocaleDateString()}
                    </div>
                    {hackathon.participants.length > 0 && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-4 w-4 text-green-400" />
                        {hackathon.participants.length} Participants
                      </div>
                    )}
                  </div>
                </div>

                <button className="mt-4 rounded-lg bg-purple-500/20 px-4 py-2 font-medium text-purple-300 transition-all duration-300 hover:bg-purple-500/30">
                  {hackathon.status === 'live' ? 'Submit Project' : 'Learn More'}
                </button>
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Hackathon Team */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">Hackathon Organizers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hackathonMembers.map((member) => (
            <GlassmorphCard key={member.id} hover glow>
              <div className="flex flex-col gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-12 w-12 rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-purple-400">{member.title}</p>
                </div>
                <p className="text-sm text-gray-400">{member.bio}</p>
              </div>
            </GlassmorphCard>
          ))}
        </div>
      </div>

      {/* Past Winners */}
      {completedHackathons.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Past Winners</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {completedHackathons.map((hackathon) => (
              <GlassmorphCard key={hackathon.id}>
                <h3 className="mb-4 text-lg font-bold text-amber-400">{hackathon.name}</h3>
                {hackathon.winners && hackathon.winners.length > 0 ? (
                  <div className="space-y-2">
                    {hackathon.winners.map((winnerId) => {
                      const winner = members.find((m) => m.id === winnerId)
                      return (
                        <div key={winnerId} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                          <Trophy className="h-5 w-5 text-amber-400" />
                          <span className="font-medium text-white">{winner?.name}</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400">Winners to be announced</p>
                )}
              </GlassmorphCard>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-purple-400">{hackathons.length}</div>
            <div className="text-sm text-gray-400">Total Hackathons</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-purple-400">$155K</div>
            <div className="text-sm text-gray-400">Total Prize Pool</div>
          </div>
        </GlassmorphCard>
        <GlassmorphCard>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-purple-400">{hackathonMembers.length}</div>
            <div className="text-sm text-gray-400">Organizers</div>
          </div>
        </GlassmorphCard>
      </div>
    </div>
  )
}
