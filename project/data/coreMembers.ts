export type CoreMemberCategory = 'all' | 'research' | 'tech';

export interface CoreMember {
  id: string;
  name: string;
  designation: string;
  domainTag: string;
  category: Exclude<CoreMemberCategory, 'all'>;
  image: string;
  bio: string;
  achievements: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  accentColor: string;
}

export const coreMemberCategories: { id: CoreMemberCategory; label: string }[] = [
  { id: 'all', label: 'All Members' },
  { id: 'research', label: 'Research Leads' },
  { id: 'tech', label: 'Core Tech' },
];

export const coreMembers: CoreMember[] = [
  {
    id: 'cm1',
    name: 'Dr. Elara Voss',
    designation: 'Lead AI Researcher',
    domainTag: 'AI Mesh',
    category: 'research',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Pioneering neural-symbolic reasoning systems that bridge deep learning with formal logic. Former research lead at a frontier AI lab, now driving AARIVYN\'s autonomous decision-making research vertical.',
    achievements: [
      'Published 12 papers on neural-symbolic integration at NeurIPS and ICML',
      'Architected the AARIVYN inference mesh now serving 1.2M queries/day',
      'Holds 3 patents in edge-deployed transformer optimization',
    ],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    accentColor: '#00f0ff',
  },
  {
    id: 'cm2',
    name: 'Kenji Nakamura',
    designation: 'Distributed Systems Architect',
    domainTag: 'Distributed',
    category: 'tech',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Byzantine fault-tolerant consensus specialist building planetary-scale state replication. Designed the backbone of AARIVYN\'s community GPU cluster and multi-region failover infrastructure.',
    achievements: [
      'Built Raft-based consensus engine handling 50K tx/s',
      'Reduced GPU cluster idle time by 73% via custom scheduler',
      'Open-sourced 4 production-grade distributed protocols',
    ],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    accentColor: '#34d399',
  },
  {
    id: 'cm3',
    name: 'Sofia Reyes',
    designation: 'Web Admin & Infrastructure Lead',
    domainTag: 'Infrastructure',
    category: 'tech',
    image: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Production-grade Kubernetes orchestration and zero-downtime delivery pipelines. Manages the AARIVYN platform infrastructure and leads the web engineering team responsible for the collective\'s digital presence.',
    achievements: [
      'Architected zero-downtime CI/CD pipeline serving 40+ microservices',
      'Maintains 99.99% uptime across all AARIVYN platform services',
      'Mentored 15+ engineers through the AARIVYN infrastructure track',
    ],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    accentColor: '#f59e0b',
  },
];
