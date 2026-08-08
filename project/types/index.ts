export type SectionId =
  | 'home'
  | 'thesis'
  | 'research'
  | 'agency'
  | 'ecosystem'
  | 'collective'
  | 'forge'
  | 'hackathon'
  | 'gigs'
  | 'vault';

export interface SectionTheme {
  id: SectionId;
  label: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  mode: 'constellation' | 'wireframe' | 'quantum' | 'datastream' | 'orbital';
}

export interface ResearchProject {
  id: string;
  title: string;
  trl: number;
  trlLabel: string;
  status: 'Prototype' | 'In Development' | 'Active Research' | 'Deployed';
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  specs: { label: string; value: string }[];
  team: string[];
  bibtex: string;
  color: string;
}

export interface AgencyService {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  trackLabel: string;
  trackValue: string;
}

export interface EcosystemPersona {
  id: string;
  title: string;
  action: string;
  button: string;
  icon: string;
  color: string;
  borderColor: string;
}

export type CommandItemType = 'project' | 'service' | 'section' | 'member' | 'pitch' | 'gig' | 'resource' | 'hackathon';

export interface CommandItem {
  id: string;
  label: string;
  type: CommandItemType;
  section: string;
  description: string;
}

export type MetricFilterTarget = 'all' | 'ai' | 'crypto' | 'distributed' | 'agency' | 'agency-briefs';

export interface Metric {
  value: string;
  label: string;
  filterTarget?: MetricFilterTarget;
}

export type MemberCategory = 'ai' | 'crypto' | 'distributed' | 'agency';

export interface CollectiveMember {
  id: string;
  name: string;
  role: string;
  category: MemberCategory;
  domainTag: string;
  bio: string;
  socials: { github?: string; twitter?: string; linkedin?: string };
  avatarColor: string;
}

export interface MemberCategoryInfo {
  id: MemberCategory | 'all';
  label: string;
  shortLabel: string;
}

// ── Community Platform Types ────────────────────────────────

export type SkillTag =
  | 'AI Mesh'
  | 'Cryptography'
  | 'Distributed'
  | 'Infrastructure'
  | 'Security'
  | 'UI/UX'
  | 'Hardware';

export type NodeStatus = 'seeking_squad' | 'available_gigs' | 'building_project';

export interface NodeProfile {
  id: string;
  nodeId: string;
  displayName: string;
  email: string;
  skills: SkillTag[];
  status: NodeStatus;
  bio: string;
  avatarColor: string;
}

export interface ForgePitch {
  id: string;
  title: string;
  abstract: string;
  creatorNodeId: string;
  requiredRoles: string[];
  skills: SkillTag[];
  color: string;
}

export interface GigDirective {
  id: string;
  title: string;
  description: string;
  bounty: number;
  requiredSkills: SkillTag[];
  status: 'open' | 'assigned' | 'completed';
  color: string;
}

export type ResourceType = 'roadmap' | 'snippet' | 'paper';

export interface VaultResource {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  tags: SkillTag[];
  url: string;
  contributor: string;
  color: string;
}

export interface Hackathon {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  prizePool: string;
  tags: SkillTag[];
  color: string;
}

export interface Squad {
  id: string;
  hackathonId: string;
  name: string;
  leadNodeId: string;
  members: number;
  maxMembers: number;
  filledRoles: SkillTag[];
  missingRoles: SkillTag[];
  status: 'recruiting' | 'full' | 'competing';
}
