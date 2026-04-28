import type { CvData } from '../types';

export const cv: CvData = {
  profile: {
    name: 'Hélder Gonçalves',
    title: 'Lead Software Engineer',
    photo: '/portrait.jpg',
    paragraphs: [
      'Lead Software Engineer with 10+ years of experience specialising in building mission-critical developer tools. I operate at the intersection of Product Strategy, User Experience, and Technical Execution.',
      'Expert in translating complex business requirements into scalable, cloud-native architectures (React/AWS) while bridging the gap between design and engineering. Record of leading teams to deliver flexible, maintainable software used by thousands of enterprise developers.',
      'Currently driving the integration of Generative AI into the OutSystems IDE, architecting the systems that leverage LLMs to power conversational workflows.',
    ],
    contacts: [
      { label: 'heldergoncalves92@gmail.com', href: 'mailto:heldergoncalves92@gmail.com', icon: 'email' },
      { label: 'linkedin.com/in/helderjagoncalves', href: 'https://linkedin.com/in/helderjagoncalves', icon: 'linkedin' },
      { label: 'github.com/heldergoncalves92', href: 'https://github.com/heldergoncalves92', icon: 'github' },
    ],
  },

  work: {
    company: 'OutSystems',
    primaryTitle: 'Lead Software Engineer',
    history: [
      { title: 'Lead SWE', period: '2023 – Present' },
      { title: 'Senior SWE', period: '2020 – 2023' },
      { title: 'SWE', period: '2018 – 2020' },
      { title: 'Junior SWE', period: '2016 – 2018' },
    ],
    groups: [
      {
        heading: 'AI Innovation & Strategic Leadership',
        bullets: [
          {
            label: 'Conversational AI IDE (Current)',
            description:
              'Leading the architectural integration of Large Language Models (LLMs) into the core product, transforming the IDE into a conversational interface that accelerates developer productivity.',
          },
          {
            label: 'Product–Tech Bridge',
            description:
              'Translate high-level roadmaps into scalable technical execution plans. Partner with Product Management to align architectural decisions with long-term business goals.',
          },
          {
            label: 'Team Leadership',
            description:
              'Mentored high-performing teams, fostering a culture of technical excellence (SOLID, Clean Code) while ensuring alignment with business goals.',
          },
        ],
      },
      {
        heading: 'Reliability & Quality Engineering',
        bullets: [
          {
            label: 'Stability & Metrics',
            description:
              'Spearheaded a targeted initiative to improve product stability, resulting in a dramatic improvement in Crash Ratio metrics (decreased by 8%). Implemented advanced telemetry to pinpoint and resolve high-impact failures.',
          },
          {
            label: 'SRE Practices',
            description:
              'Introduced Site Reliability Engineering practices and Dark Launches, balancing feature velocity with the need for a resilient core product.',
          },
        ],
      },
      {
        heading: 'UX & Frontend Strategy',
        bullets: [
          {
            label: 'Bridging UX & Engineering',
            description:
              'Review designs for technical feasibility and propose architectural alternatives that balance user experience with engineering costs.',
          },
          {
            label: 'Design System Governance',
            description:
              'Review the implementation of the internal Design System, defining reusable components that enforce visual consistency and accelerate cross-team development.',
          },
          {
            label: 'User-Centric Innovation',
            description:
              'Revamped “Automatic Text Merge” by combining algorithm optimisation (>50% success rate) with a UI redesign, solving a critical user pain point.',
          },
        ],
      },
      {
        heading: 'Technical Architecture & Cloud Migration',
        bullets: [
          {
            label: 'Cloud-Native Transition',
            description:
              'Architected ODC Studio, spearheading the strategic shift from legacy desktop apps to a modern, browser-based cloud environment.',
          },
          {
            label: 'Modern Web Stack',
            description:
              'Migrated the core IDE from WPF to a cross-platform stack (React, TypeScript, .NET), unlocking macOS support.',
          },
        ],
      },
    ],
    techPills: ['React', 'TypeScript', 'Node.js', '.NET', 'Azure', 'Avalonia', 'REST', 'AWS', 'Snowflake'],
  },

  internships: [
    {
      title: 'Software Developer Internship',
      organisation: 'TU Darmstadt',
      period: 'January – August 2016',
      paragraphs: [
        'Selected for an Erasmus+ exchange at TU Darmstadt’s Institute for Scientific Computing, developing optimised software modules for post-quantum cryptography research, including an Arithmetic Multiple Precision library that outperformed the GMP library in key operations.',
        'Parallelised and optimised lattice basis reduction algorithms (LLL and Qiao’s Jacobi method) to accelerate cryptographic computations.',
        'Work formed the basis of my MSc thesis at Universidade do Minho.',
      ],
      techPills: ['C', 'Intel Intrinsics', 'OpenMP', 'Assembly'],
    },
    {
      title: 'Summer Internship in Advanced Computing Research',
      organisation: 'UT Austin',
      period: 'July – August 2015',
      paragraphs: [
        'Built a multithreaded C++ framework for the GUIDE project (Graph Unified Irregular Distributed Environment), enabling parallel and distributed operations over complex graph structures.',
      ],
      techPills: ['C++', 'Multithreading'],
    },
  ],

  education: {
    degree: 'BSc. and MSc. in Informatics Engineering',
    institution: 'Universidade do Minho',
    period: '2011 – 2016',
    coursework:
      'Parallel and Distributed Computing, Distributed Systems & Cryptography, Computer Graphics.',
    thesis: {
      title: 'Towards an efficient lattice basis reduction implementation',
      advisors: 'Prof. Alberto Proença, Artur Mariano',
    },
  },

  sideProjects: [
    {
      title: 'Self-Hosted Home Lab',
      subtitle: 'Personal infrastructure (ongoing)',
      description:
        'NAS-based private cloud serving the whole family with self-hosted services (Immich, Plex / Plexamp, OpenCloud), most running in Docker containers managed via Portainer, exposed through Cloudflare Tunnel and a reverse proxy. Custom DNS via Pi-hole with local rewrites mapping public hostnames to internal services. Zero-trust access enforced with mTLS, OAuth, service tokens, and Cloudflare Access policies; HTTPS everywhere; uptime monitoring, centralised logging, and alerting. Full stack declaratively configured and versioned in Git for reproducibility.',
      techPills: [
        'Docker',
        'Portainer',
        'Cloudflare Zero Trust',
        'Pi-hole',
        'mTLS',
        'OAuth',
        'Reverse Proxy',
        'Configuration-as-Code',
        'Self-Hosted',
        'Observability',
      ],
    },
  ],

  languages: ['Portuguese (native)', 'English (fluent)'],

  certifications: [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', code: 'CLF-C01' },
    { name: 'Certified SCRUM Developer', issuer: 'Scopphu', code: 'CSD' },
  ],

  awards: [
    {
      title: 'Top Performer Award',
      context: 'OutSystems',
      description: 'Company-wide recognition for delivering high-impact technical results.',
    },
  ],
};
