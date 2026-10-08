import type { SkillCategory, ProjectPlaceholder, EducationItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Dhananjaya Barik',
  title: 'Full Stack Java Developer',
  location: 'Hyderabad, Telangana, India',
  email: 'dhananjayabrk@gmail.com',
  profilePhoto: '/assets/profile-photo.jpg',
  github: 'https://github.com/Dhananjaya-Dev',
  linkedin: 'https://www.linkedin.com/in/dhananjaya-barik',
  leetcode: 'https://leetcode.com/u/Dhananjaya-Dev/',
  resumePath: '/assets/Dhananjaya-Barik-Resume.pdf',
  status: 'Fresher • Open to Entry-Level Full Stack Java Roles',
  summaryHeadline:
    'Building scalable backend systems and modern web experiences with Java, Spring, React, and cloud technologies.',
  aboutParagraphs: [
    'I am a Full Stack Java Developer focused on building reliable backend systems and modern web applications.',
    "I chose Java because it provides a strong foundation in object-oriented programming, backend development, and enterprise application development. I enjoy working with Java's ecosystem and frameworks such as Spring and Spring Boot to build scalable and secure applications.",
    'I want to work as a Full Stack Developer because I enjoy understanding how an application works end-to-end, from frontend experience to backend services and databases.'
  ],
  coreValues: [
    {
      title: 'Solid OOP Foundations',
      description: 'Disciplined use of clean abstractions, encapsulation, and robust design patterns in Core & Advanced Java.'
    },
    {
      title: 'Spring Ecosystem Mastery',
      description: 'Building RESTful APIs with Spring Boot, Spring Security, JWT, and Spring Data JPA with transactional integrity.'
    },
    {
      title: 'End-to-End Ownership',
      description: 'Bridging the divide between responsive React interfaces, high-throughput microservices, and relational databases.'
    },
    {
      title: 'Cloud & Modern Workflow',
      description: 'Leveraging Docker containerization, Git version control, and modern developer tooling for continuous delivery.'
    }
  ]
};

export const HERO_TECH_BADGES = [
  { name: 'Java', color: '#f89820' },
  { name: 'Spring', color: '#6db33f' },
  { name: 'React', color: '#61dafb' },
  { name: 'SQL', color: '#00758f' },
  { name: 'Docker', color: '#2496ed' }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    name: 'Backend Engineering',
    description: 'Enterprise Java ecosystem, Spring frameworks, security, and microservices architecture',
    iconName: 'Server',
    skills: [
      'Java',
      'Spring Core',
      'Spring JDBC',
      'Spring Boot',
      'Hibernate',
      'JDBC',
      'Advanced Java',
      'Servlets',
      'JSP',
      'Spring Data JPA',
      'Spring Security',
      'JWT',
      'Microservices Architecture'
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Modern, reactive UI components, semantic markup, and responsive design',
    iconName: 'Layout',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap']
  },
  {
    id: 'database',
    name: 'Databases & Persistence',
    description: 'Relational data modeling, ACID transactions, complex queries, and ORM mapping',
    iconName: 'Database',
    skills: ['Oracle SQL', 'MySQL']
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    description: 'Containerization, cloud deployment basics, and collaborative source control',
    iconName: 'Cloud',
    skills: ['Docker', 'AWS', 'Git', 'GitHub']
  },
  {
    id: 'tools',
    name: 'Development Tools',
    description: 'Integrated development environments and professional debugging workflows',
    iconName: 'Terminal',
    skills: ['VS Code', 'Eclipse']
  },
  {
    id: 'ai',
    name: 'AI-Assisted Development',
    description: 'Leveraged as development accelerators and productivity multipliers',
    iconName: 'Sparkles',
    skills: ['ChatGPT', 'Gemini', 'Claude', 'Cursor', 'Antigravity', 'Canva']
  }
];

export const PROJECTS_IN_PROGRESS: ProjectPlaceholder[] = [
  {
    id: 'proj-placeholder-1',
    slotNumber: 1,
    title: 'Project Coming Soon',
    status: 'In Progress',
    badge: 'Slot #1 • Active Development',
    note: 'Detailed project information, architectural overview, and repository links will be added later.'
  },
  {
    id: 'proj-placeholder-2',
    slotNumber: 2,
    title: 'Project Coming Soon',
    status: 'In Progress',
    badge: 'Slot #2 • Active Development',
    note: 'Detailed project information, architectural overview, and repository links will be added later.'
  },
  {
    id: 'proj-placeholder-3',
    slotNumber: 3,
    title: 'Project Coming Soon',
    status: 'In Progress',
    badge: 'Slot #3 • Active Development',
    note: 'Detailed project information, architectural overview, and repository links will be added later.'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'Bhadrak Institute of Engineering and Technology',
    university: 'Biju Patnaik University of Technology (BPUT), Odisha',
    location: 'Odisha, India',
    duration: '2022 - 2026',
    score: 'CGPA: 7.76 / 10',
    badge: 'Degree Program',
    highlights: [
      'Core foundation in Computer Science, Data Structures & Algorithms, and Object-Oriented Programming',
      'Database Management Systems, Software Engineering Methodologies, and Operating Systems',
      'Active focus on problem-solving, clean code design, and collaborative engineering practices'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Full Stack Java Development',
    institution: 'Naresh i Technologies',
    university: 'Professional Technology Certification & Intensive Bootcamp',
    location: 'Hyderabad, Telangana, India',
    duration: '2026',
    score: 'Intensive Training',
    badge: 'Specialized Program',
    highlights: [
      'Comprehensive enterprise training in Core Java, Multi-threading, Collections, and Exception Handling',
      'Advanced Java stack: Servlets, JSP, JDBC, Hibernate, Spring Core, Spring Boot & Spring Data JPA',
      'Microservices architecture, Spring Security, JWT authentication, Oracle SQL & MySQL integration',
      'Full Stack integration with modern JavaScript and React.js frontend applications'
    ]
  }
];

export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' }
];
