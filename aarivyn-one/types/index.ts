export type TrackType = 'research' | 'agency' | 'hackathons' | 'founders' | 'core'

export interface Member {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  tracks: TrackType[]
  contributions: string[]
  socialLinks: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
  isActive: boolean
}

export interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  abstract: string
  url: string
  date: string
  category: string
  tags: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'pending'
  members: string[]
  technologies: string[]
  link?: string
}

export interface AgencyBrief {
  id: string
  title: string
  client: string
  scope: string
  budget: string
  timeline: string
  status: 'open' | 'in-progress' | 'completed'
}

export interface HackathonTrack {
  id: string
  name: string
  description: string
  prizePool: string
  status: 'live' | 'upcoming' | 'completed'
  participants: string[]
  winners?: string[]
  endDate: string
}

export interface SectionTheme {
  name: 'research' | 'agency' | 'hackathons' | 'mission' | 'default'
  primary: string
  secondary: string
  accent: string
  glow: string
  dark: string
}

export interface Stats {
  label: string
  value: string
  icon?: string
}
