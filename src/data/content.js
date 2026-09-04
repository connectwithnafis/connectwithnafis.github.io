// ─────────────────────────────────────────────────────────────
//  Central content for the portfolio. Edit here to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'MD Nahid Uddin',
  firstName: 'Nahid',
  role: 'Software Engineer',
  // Rotating taglines for the animated hero headline
  roles: [
    'Software Engineer',
    'Backend Architect',
    'Systems Designer',
    'Cloud-Native Builder',
  ],
  location: 'Dhaka, Bangladesh',
  email: 'connectwithnafis@gmail.com',
  phone: '+8801876694743',
  whatsapp: '8801876694743', // digits only, for wa.me links
  socials: {
    github: 'https://github.com/connectwithnafis',
    linkedin: 'https://www.linkedin.com/in/mdnahiduddin/',
  },
  // Résumé PDF lives in /public. BASE_URL keeps the link correct on both
  // user pages (/) and project pages (/repo/).
  resumeUrl: import.meta.env.BASE_URL + 'MD_Nahid_Uddin.pdf',
  tagline:
    'I turn complex business requirements into clean, scalable backend systems — from enterprise reporting engines to cloud-native data pipelines.',
  summary:
    "Backend-focused Software Engineer specializing in enterprise reporting engines and modernizing legacy systems with Clean Architecture, DDD & CQRS — built on NestJS, .NET and PostgreSQL. Currently Software Engineer II at Innospace Infotech, grown from junior engineer to architecting platforms and leading Oracle→PostgreSQL cloud migrations.",
  // Short "what I'm doing now" line shown in the sidebar
  now: 'Architecting a NestJS BI reporting engine & deepening AWS + system design.',
}

export const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '10+', label: 'Systems Shipped' },
  { value: '20+', label: 'Technologies' },
]

export const skills = [
  {
    title: 'Backend Architecture',
    icon: 'Layers',
    items: [
      'Clean Architecture',
      'Domain-Driven Design (DDD)',
      'CQRS',
      'Modular Monolith',
      'SOLID Principles',
    ],
  },
  {
    title: 'Languages & Frameworks',
    icon: 'Code2',
    items: ['C#', 'TypeScript', 'ASP.NET Core', '.NET Framework', 'NestJS', 'Flutter'],
  },
  {
    title: 'Databases & ORM',
    icon: 'Database',
    items: [
      'PostgreSQL',
      'Oracle',
      'Microsoft SQL Server',
      'Entity Framework Core',
      'Dapper',
      'TypeORM',
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    items: ['AWS (EC2, S3, Lambda, CloudWatch)', 'Docker', 'Jenkins', 'CI/CD', 'IIS'],
  },
  {
    title: 'Methodologies',
    icon: 'GitBranch',
    items: [
      'Agile',
      'System Design',
      'RESTful API Design',
      'Microservices',
      'Message Queuing (RabbitMQ)',
    ],
  },
]

// Compact list for the marquee / tech ticker
export const techStack = [
  'NestJS',
  'ASP.NET Core',
  'C#',
  'TypeScript',
  'PostgreSQL',
  'Oracle',
  'Docker',
  'AWS',
  'RabbitMQ',
  'Jenkins',
  'Flutter',
  'TypeORM',
  'CQRS',
  'DDD',
]

// System-design concepts — signals depth beyond frameworks
export const systemDesign = [
  'Scalability',
  'Reliability',
  'Caching',
  'Message Queues',
  'Observability',
  'Fault Tolerance',
]

// Grouped by company (LinkedIn-style). Roles are ordered newest → oldest.
export const experience = [
  {
    company: 'Innospace Infotech Ltd',
    location: 'Dhaka, Bangladesh',
    duration: 'Oct 2023 – Present',
    current: true,
    roles: [
      {
        role: 'Software Engineer II',
        period: 'Jan 2026 – Present',
        current: true,
        points: [
          'Enterprise Reporting Engine — Architect & Core Developer: Developed a reporting engine boilerplate using NestJS and Clean Architecture principles.',
          'DDD Implementation: Engineered a decoupled system with distinct Domain, Application, Infrastructure, and API layers to ensure maximum maintainability.',
          'BI-Ready Engine: Designed the core for advanced data aggregation, analytics, and future Power BI REST API integrations.',
          'Containerization: Standardized development and deployment using Docker and Docker Compose for multi-tenant data layers.',
          'Field-Force Tracking Platform: Architected a Modular Monolith with CQRS and ACID-compliant transaction management, featuring JWT access/refresh token rotation and RBAC for field-force tracking.',
          'ETL Migration Lead: Spearheaded automated daily synchronization from Oracle 11g to PostgreSQL using AWS EC2, Docker, Python, AWS S3 and Lambda.',
        ],
      },
      {
        role: 'Software Engineer',
        period: 'Jan 2025 – Dec 2025',
        points: [
          'Architected efficient RESTful APIs in ASP.NET Core, significantly optimizing internal business workflows and system interactions.',
          'Led the migration of legacy applications to modern frameworks and cloud-based solutions, improving system scalability and long-term maintainability.',
          'Optimized server deployments and security configurations on IIS, ensuring peak performance for production web applications.',
        ],
      },
      {
        role: 'Junior Software Engineer',
        period: 'Oct 2023 – Dec 2024',
        points: [
          'Developed and maintained key ERP solutions including a sales-force tracking system and an in-house ERP platform, enhancing core business processes and user experience.',
          'Built the sales-force tracking mobile application using Flutter, delivering a responsive, intuitive, and user-friendly interface across platforms.',
          'Worked across a diverse stack including ASP.NET Core, ASP.NET Framework, Oracle, AJAX, jQuery, and Flutter to deliver high-performance applications.',
        ],
      },
    ],
  },
  {
    company: 'Tawoon Software Solution',
    location: 'Dhaka, Bangladesh',
    duration: 'Nov 2022 – Jun 2023',
    roles: [
      {
        role: 'Junior Software Engineer',
        period: 'Nov 2022 – Jun 2023',
        points: [
          'Developed and maintained ERP systems for multiple enterprise clients, leveraging .NET Core RESTful APIs to optimize business operations.',
          'Designed and implemented Jenkins-based CI/CD pipelines for automated deployment and continuous integration.',
          'Integrated RabbitMQ for efficient message queuing and Amazon S3 for scalable image storage and retrieval.',
        ],
      },
    ],
  },
]

export const projects = [
  {
    name: 'Enterprise BI Reporting Engine',
    tag: 'Architecture',
    year: '2026',
    description:
      'An enterprise reporting engine boilerplate built on NestJS with Clean Architecture. Decoupled Domain, Application, Infrastructure, and API layers with a BI-ready core for advanced aggregation, analytics, and future Power BI REST API integration.',
    highlights: ['NestJS', 'Clean Architecture', 'DDD', 'Docker', 'PostgreSQL'],
    featured: true,
  },
  {
    name: 'Field-Force Tracking Platform',
    tag: 'Backend',
    year: '2026',
    description:
      'A Modular Monolith for field-force tracking with CQRS and ACID-compliant transaction management. Secured with JWT access/refresh token rotation and role-based access control (RBAC).',
    highlights: ['CQRS', 'Modular Monolith', 'JWT + RBAC', 'PostgreSQL'],
    featured: true,
  },
  {
    name: 'Oracle → PostgreSQL ETL Pipeline',
    tag: 'Data / Cloud',
    year: '2026',
    description:
      'Led an automated daily synchronization pipeline migrating data from Oracle 11g to PostgreSQL, orchestrated across AWS EC2, Lambda and S3 with Python and Docker.',
    highlights: ['AWS EC2', 'AWS Lambda', 'AWS S3', 'Python', 'Docker'],
    featured: true,
  },
  {
    name: 'Sales-Force Tracking Suite',
    tag: 'Full-Stack',
    year: '2024',
    description:
      'ERP solution for sales-force tracking with a cross-platform Flutter mobile app delivering a responsive, intuitive interface, backed by ASP.NET Core and Oracle.',
    highlights: ['Flutter', 'ASP.NET Core', 'Oracle', 'REST API'],
  },
  {
    name: 'In-House ERP Platform',
    tag: 'ERP',
    year: '2024',
    description:
      'Core in-house ERP platform enhancing key business processes and user experience across a diverse stack including ASP.NET, Oracle, AJAX and jQuery.',
    highlights: ['ASP.NET', 'Oracle', 'jQuery', 'AJAX'],
  },
  {
    name: 'Multi-Client ERP Systems',
    tag: 'Backend / DevOps',
    year: '2023',
    description:
      'ERP systems built on .NET Core RESTful APIs with Jenkins CI/CD pipelines, RabbitMQ message queuing, and Amazon S3 for scalable image storage.',
    highlights: ['.NET Core', 'Jenkins CI/CD', 'RabbitMQ', 'Amazon S3'],
  },
]

export const education = [
  {
    school: 'Kurukshetra University',
    degree: 'B-Tech in Computer Science & Engineering',
    period: 'Jun 2019 – Jun 2023',
    location: 'Haryana, India',
    detail: 'CGPA: 8.19 / 10',
    extra:
      'Leadership: Student Ambassador; Led Web Development Bootcamp; Active member of AICTE Idea Lab and AR/VR Lab.',
  },
]

export const certifications = [
  {
    name: 'Foundational C# with Microsoft',
    issuer: 'freeCodeCamp',
    period: 'Sep 2023 – Nov 2023',
  },
  {
    name: 'Web Development Bootcamp',
    issuer: 'Udemy',
    period: 'Jul 2022 – Sep 2023',
  },
]

// Placeholder recommendations — replace quotes/names with real ones when you have them.
export const testimonials = [
  {
    quote:
      'Nahid has a rare talent for turning tangled legacy systems into clean, well-architected services. He owned our reporting engine from design to delivery.',
    name: 'Team Lead',
    role: 'Engineering Manager',
    company: 'Innospace Infotech',
  },
  {
    quote:
      'One of the most dependable backend engineers I’ve worked with — thoughtful about architecture and relentless about getting the details right.',
    name: 'Senior Colleague',
    role: 'Senior Software Engineer',
    company: 'Innospace Infotech',
  },
  {
    quote:
      'He led our Oracle-to-PostgreSQL migration calmly and cleanly — zero data loss and a pipeline the whole team now trusts.',
    name: 'Product Owner',
    role: 'Product Manager',
    company: 'Innospace Infotech',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
