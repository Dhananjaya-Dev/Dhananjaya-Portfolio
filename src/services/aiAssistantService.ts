import { PERSONAL_INFO } from '../data/portfolioData';

export type ActionType = 'resume' | 'contact' | 'github' | 'linkedin';

export interface ChatAction {
  type: ActionType;
  label: string;
  url?: string;
}

export interface AIAssistantResponse {
  reply: string;
  suggestedFollowUps?: string[];
  actions?: ChatAction[];
  isGemini?: boolean;
}

/**
 * Standard recruiter-focused system instruction for Gemini integration.
 * Adheres strictly to project constraints:
 * - Dhananjaya Barik is a Full Stack Java Developer and a fresher seeking entry-level roles.
 * - Title must remain exactly Full Stack Java Developer.
 * - Projects are currently in active development ("Projects in Progress"). Never fabricate projects.
 */
export const RECRUITER_SYSTEM_INSTRUCTION = `You are Dhananjaya Barik's portfolio assistant. Answer questions using only the verified portfolio information provided to you. Dhananjaya Barik is a Full Stack Java Developer and a fresher seeking entry-level opportunities. Be concise, professional, friendly, and recruiter-focused. Never invent experience, projects, achievements, employment history, or technologies. If information is unavailable, say so clearly. Help recruiters quickly understand his technical skills, education, current project status, resume, and contact options.

VERIFIED FACTS:
- Name: Dhananjaya Barik
- Title: Full Stack Java Developer
- Candidate Status: Fresher • Actively open to entry-level Full Stack Java Developer and Backend Developer roles
- Location: Hyderabad, Telangana, India
- Email: dhananjayabrk@gmail.com
- Phone: +91 7750804634
- Resume URL: /assets/Dhananjaya-Barik-Resume.pdf
- GitHub: https://github.com/Dhananjaya-Dev
- LinkedIn: https://www.linkedin.com/in/dhananjaya-barik
- LeetCode: https://leetcode.com/u/Dhananjaya-Dev/
- Education:
  1. B.Tech in Computer Science Engineering (CSE): Bhadrak Institute of Engineering and Technology (BPUT, Odisha) | 2022 – 2026 | CGPA: 7.76 / 10
  2. Full Stack Java Development Certification: Naresh i Technologies, Hyderabad | 2026 | Intensive enterprise training
  3. +2 Science: Council of Higher Secondary Education (CHSE), Odisha | 2019 – 2021
- Technical Skills:
  - Languages: Java (Core Java, OOPs), JavaScript
  - Backend Stack: Spring Core, Spring JDBC, Spring Boot, Hibernate, Spring Data JPA, Spring Security, JWT, Microservices Architecture, JDBC, Servlets, JSP
  - Frontend Stack: React.js, HTML5, CSS3, Bootstrap
  - Databases: Oracle SQL, MySQL
  - DevOps & Cloud: Docker, AWS fundamentals, Git, GitHub
  - Tools & IDEs: VS Code, Eclipse
  - AI Accelerators: ChatGPT, Claude, Gemini, Cursor, Antigravity, Canva
- Why Java: Java provides a battle-tested foundation in object-oriented programming, enterprise backend architecture, concurrency, and security. The Spring and Spring Boot ecosystems provide unparalleled robustness for scalable systems.
- Why Full Stack: Enjoys end-to-end understanding and ownership—connecting intuitive React user interfaces with reliable Spring Boot microservices and ACID-compliant relational databases.
- Projects Status: Projects are currently in active progress across Java, Spring Boot, React, and cloud. No fabricated projects. Repositories and architectural walk-throughs will be published upon milestone completion.
- Availability: Open to immediate joining in Hyderabad, relocation, hybrid, or remote positions.`;

/**
 * Communicates with the secure backend endpoint (/api/chat).
 * Security Rule: Client-side JavaScript NEVER contains or exposes GEMINI_API_KEY.
 * If backend is not yet configured or unreachable, seamlessly falls back
 * to the deterministic local recruiter intelligence engine.
 */
export async function queryAIAssistant(prompt: string): Promise<AIAssistantResponse> {
  const trimmed = prompt.trim();
  if (!trimmed) {
    return {
      reply: "Please provide a question regarding Dhananjaya's technical skills, education, or profile.",
      suggestedFollowUps: ['What are his skills?', 'Tell me about his education.'],
      isGemini: false
    };
  }

  // 1. Attempt secure backend endpoint call
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed })
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.reply === 'string' && data.reply.trim().length > 0) {
        return {
          reply: data.reply.trim(),
          suggestedFollowUps: data.suggestedFollowUps || getRelevantFollowUps(trimmed),
          actions: getRelevantActions(trimmed),
          isGemini: Boolean(data.isGemini)
        };
      }
    }
  } catch {
    // Backend endpoint not active or network unreachable; smoothly proceed to local fallback
  }

  // 2. Deterministic local recruiter engine fallback
  // Simulated slight thinking delay for natural conversational rhythm (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350));
  return generateLocalRecruiterResponse(trimmed);
}

/**
 * Intelligent deterministic recruiter engine based strictly on Dhananjaya's verified profile facts.
 * Never invents experience or projects. Candidate is a Full Stack Java Developer.
 */
export function generateLocalRecruiterResponse(prompt: string): AIAssistantResponse {
  const p = prompt.toLowerCase().trim();

  // 1. Why Java?
  if (p.includes('why java') || p.includes('chose java') || p.includes('choose java') || p.includes('why did he choose java')) {
    return {
      reply:
        "Dhananjaya chose Java because of its solid foundation in object-oriented programming, enterprise backend architecture, and scalability.\n\n" +
        "He values the robustness of the Java ecosystem—particularly Spring Boot, Spring Security, and Spring Data JPA—which empowers developers to build secure, transactionally sound, and high-performance applications.",
      suggestedFollowUps: [
        'Why Full Stack Development?',
        'What are his Java skills?',
        'Tell me about his education.'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'github', label: 'Open GitHub' }
      ],
      isGemini: false
    };
  }

  // 2. Why Full Stack?
  if (p.includes('why full stack') || p.includes('why fullstack')) {
    return {
      reply:
        "Dhananjaya chose Full Stack Development because he values end-to-end ownership. He enjoys understanding an application from the ground up—from user-centric React interfaces, through RESTful Spring Boot microservices, down to relational database transactions.\n\n" +
        "This holistic view allows him to design clean APIs and troubleshoot across the entire stack effectively.",
      suggestedFollowUps: [
        'Why Java?',
        'What are his skills?',
        'Is he open to opportunities?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'contact', label: 'Contact Dhananjaya' }
      ],
      isGemini: false
    };
  }

  // 3. Java Skills & Backend
  if (
    p.includes('java') ||
    p.includes('spring') ||
    p.includes('backend') ||
    p.includes('hibernate') ||
    p.includes('servlet') ||
    p.includes('jsp') ||
    p.includes('jdbc') ||
    p.includes('microservice') ||
    p.includes('jwt') ||
    p.includes('security')
  ) {
    return {
      reply:
        "Dhananjaya's core specialization is enterprise Java and modern backend engineering:\n\n" +
        "• Core & Advanced Java: OOP principles, Multithreading, Collections Framework, Exception Handling, JDBC, Servlets, and JSP\n" +
        "• Frameworks: Spring Core, Spring JDBC, Spring Boot, Hibernate ORM, and Spring Data JPA\n" +
        "• Enterprise Architecture: Microservices Architecture, Spring Security, and JWT stateless authentication\n\n" +
        "He builds clean, layered RESTful APIs with strict validation, error handling, and transactional integrity.",
      suggestedFollowUps: [
        'What databases does he use?',
        'Tell me about his education.',
        'Is he open to opportunities?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'github', label: 'Open GitHub' }
      ],
      isGemini: false
    };
  }

  // 4. Frontend & React
  if (
    p.includes('react') ||
    p.includes('frontend') ||
    p.includes('javascript') ||
    p.includes('html') ||
    p.includes('css') ||
    p.includes('bootstrap') ||
    p.includes('ui')
  ) {
    return {
      reply:
        "On the frontend, Dhananjaya develops modern, responsive user interfaces that connect seamlessly with backend APIs:\n\n" +
        "• Frameworks & Libraries: React.js and Bootstrap\n" +
        "• Fundamentals: JavaScript (ES6+), HTML5, and CSS3\n" +
        "• Practices: Component-driven architecture, modular styles, responsive design, and clean RESTful API integration.",
      suggestedFollowUps: [
        'What are his Java skills?',
        'What databases does he work with?',
        'Is he open to opportunities?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'github', label: 'Open GitHub' }
      ],
      isGemini: false
    };
  }

  // 5. Databases & Persistence
  if (
    p.includes('database') ||
    p.includes('sql') ||
    p.includes('mysql') ||
    p.includes('oracle') ||
    p.includes('data') ||
    p.includes('acid')
  ) {
    return {
      reply:
        "Dhananjaya has practical database persistence skills across relational database management systems:\n\n" +
        "• Databases: Oracle SQL and MySQL\n" +
        "• Capabilities: Relational schema modeling, ACID transactions, complex queries, joins, and indexing\n" +
        "• Java Connectivity: Raw JDBC, Spring JDBC, Hibernate ORM, and Spring Data JPA repositories.",
      suggestedFollowUps: [
        'What are his Java skills?',
        'What DevOps tools does he use?',
        'Tell me about his education.'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'github', label: 'Open GitHub' }
      ],
      isGemini: false
    };
  }

  // 6. DevOps, Cloud & Tools
  if (
    p.includes('docker') ||
    p.includes('aws') ||
    p.includes('cloud') ||
    p.includes('devops') ||
    p.includes('git') ||
    p.includes('tools') ||
    p.includes('vscode') ||
    p.includes('eclipse')
  ) {
    return {
      reply:
        "Dhananjaya utilizes modern DevOps and software engineering tools:\n\n" +
        "• Containerization: Docker (containerizing applications for consistent deployment)\n" +
        "• Cloud Basics: AWS fundamentals\n" +
        "• Version Control: Git and GitHub for collaborative source control\n" +
        "• Developer Environments: VS Code and Eclipse IDE.",
      suggestedFollowUps: [
        'What are his Java skills?',
        'Tell me about his education.',
        'Is he open to opportunities?'
      ],
      actions: [
        { type: 'github', label: 'Open GitHub' },
        { type: 'resume', label: 'View Resume' }
      ],
      isGemini: false
    };
  }

  // 7. General Skills Overview
  if (
    p.includes('skill') ||
    p.includes('tech stack') ||
    p.includes('stack') ||
    p.includes('technologies')
  ) {
    return {
      reply:
        "Here is a concise breakdown of Dhananjaya's technical stack:\n\n" +
        "• Programming: Java (Core & Advanced), JavaScript\n" +
        "• Backend: Spring Boot, Spring Core, Spring Security, JWT, Microservices, Hibernate, Spring Data JPA, Servlets, JSP\n" +
        "• Frontend: React.js, HTML5, CSS3, Bootstrap\n" +
        "• Databases: Oracle SQL, MySQL\n" +
        "• DevOps & Cloud: Docker, AWS fundamentals, Git, GitHub\n" +
        "• Tools: VS Code, Eclipse\n" +
        "• AI Tools: ChatGPT, Claude, Gemini, Cursor (leveraged as developer productivity multipliers).",
      suggestedFollowUps: [
        'Tell me about his education.',
        'Why Java?',
        'Is he open to opportunities?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'github', label: 'Open GitHub' }
      ],
      isGemini: false
    };
  }

  // 8. Education & Training
  if (
    p.includes('education') ||
    p.includes('college') ||
    p.includes('degree') ||
    p.includes('university') ||
    p.includes('btech') ||
    p.includes('bput') ||
    p.includes('naresh') ||
    p.includes('cgpa') ||
    p.includes('training')
  ) {
    return {
      reply:
        "Dhananjaya's verified educational background includes:\n\n" +
        "1. B.Tech in Computer Science Engineering (2022 – 2026)\n" +
        "   • Bhadrak Institute of Engineering and Technology\n" +
        "   • Biju Patnaik University of Technology (BPUT), Odisha\n" +
        "   • CGPA: 7.76 / 10\n\n" +
        "2. Full Stack Java Development Certification (2026)\n" +
        "   • Naresh i Technologies, Hyderabad\n" +
        "   • Intensive training in Core & Advanced Java, Spring Boot, Microservices, Oracle SQL, and React integration.\n\n" +
        "3. +2 Science (2019 – 2021)\n" +
        "   • Council of Higher Secondary Education (CHSE), Odisha.",
      suggestedFollowUps: [
        'What are his Java skills?',
        'Is he open to opportunities?',
        'How can I contact him?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'contact', label: 'Contact Dhananjaya' }
      ],
      isGemini: false
    };
  }

  // 9. Projects Status (Strict adherence to project rule: no fabrications)
  if (
    p.includes('project') ||
    p.includes('portfolio work') ||
    p.includes('build') ||
    p.includes('experience with projects')
  ) {
    return {
      reply:
        "Dhananjaya is currently building practical applications across Java, Spring Boot, React, relational databases, and cloud technologies.\n\n" +
        "In keeping with honest and verifiable engineering, the Projects section is currently in active development. Detailed specifications, architectural diagrams, and public GitHub repository links will be added as each milestone is finalized.",
      suggestedFollowUps: [
        'What are his Java skills?',
        'Tell me about his education.',
        'Open GitHub'
      ],
      actions: [
        { type: 'github', label: 'Open GitHub' },
        { type: 'resume', label: 'View Resume' }
      ],
      isGemini: false
    };
  }

  // 10. Open to Opportunities / Fresher Status / Availability
  if (
    p.includes('open') ||
    p.includes('hire') ||
    p.includes('job') ||
    p.includes('opportunity') ||
    p.includes('available') ||
    p.includes('fresher') ||
    p.includes('status') ||
    p.includes('relocat') ||
    p.includes('join')
  ) {
    return {
      reply:
        "Yes! Dhananjaya is a fresher actively open to entry-level Full Stack Java Developer and Backend Developer opportunities.\n\n" +
        "• Availability: Available for immediate joining\n" +
        "• Current Location: Hyderabad, Telangana, India\n" +
        "• Work Modes: Open to on-site, hybrid, or remote positions\n" +
        "• Relocation: Open to relocation for suitable roles\n\n" +
        "He brings strong OOP foundations, clean code practices, and genuine enthusiasm to contribute to engineering teams.",
      suggestedFollowUps: [
        'How can I contact him?',
        'View Resume',
        'What are his Java skills?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'contact', label: 'Contact Dhananjaya' }
      ],
      isGemini: false
    };
  }

  // 11. Resume
  if (p.includes('resume') || p.includes('cv')) {
    return {
      reply:
        "Dhananjaya's verified resume is accessible directly. It outlines his technical competencies, B.Tech coursework, and full-stack development certifications.",
      suggestedFollowUps: [
        'Tell me about his education.',
        'What are his Java skills?',
        'How can I contact him?'
      ],
      actions: [
        { type: 'resume', label: 'View Resume' },
        { type: 'contact', label: 'Contact Dhananjaya' }
      ],
      isGemini: false
    };
  }

  // 12. Contact / Reach out
  if (
    p.includes('contact') ||
    p.includes('email') ||
    p.includes('phone') ||
    p.includes('reach') ||
    p.includes('connect') ||
    p.includes('linkedin') ||
    p.includes('github') ||
    p.includes('leetcode')
  ) {
    return {
      reply:
        "You can connect directly with Dhananjaya through any of these verified channels:\n\n" +
        `• Email: ${PERSONAL_INFO.email}\n` +
        "• Phone: +91 7750804634\n" +
        `• LinkedIn: linkedin.com/in/dhananjaya-barik\n` +
        `• GitHub: github.com/Dhananjaya-Dev\n` +
        `• LeetCode: leetcode.com/u/Dhananjaya-Dev/\n` +
        "• Location: Hyderabad, Telangana, India\n\n" +
        "You can also use the contact form at the bottom of this portfolio.",
      suggestedFollowUps: [
        'Is he open to opportunities?',
        'View Resume',
        'What are his Java skills?'
      ],
      actions: [
        { type: 'contact', label: 'Contact Dhananjaya' },
        { type: 'linkedin', label: 'Open LinkedIn' },
        { type: 'github', label: 'Open GitHub' }
      ],
      isGemini: false
    };
  }

  // Default Fallback
  return {
    reply:
      "I can answer questions regarding Dhananjaya Barik's profile:\n\n" +
      "• Core & Advanced Java, Spring Boot, and Microservices\n" +
      "• React frontend and modern web technologies\n" +
      "• Oracle SQL and MySQL database persistence\n" +
      "• B.Tech CSE degree & Full Stack Java certification\n" +
      "• Availability for entry-level developer roles\n\n" +
      "What would you like to explore?",
    suggestedFollowUps: [
      'What are his skills?',
      'Why Java?',
      'Tell me about his education.',
      'Is he open to opportunities?'
    ],
    actions: [
      { type: 'resume', label: 'View Resume' },
      { type: 'contact', label: 'Contact Dhananjaya' }
    ],
    isGemini: false
  };
}

function getRelevantFollowUps(prompt: string): string[] {
  const p = prompt.toLowerCase();
  if (p.includes('skill') || p.includes('java')) {
    return ['Tell me about his education.', 'Why Java?', 'Is he open to opportunities?'];
  }
  if (p.includes('education')) {
    return ['What are his skills?', 'Is he open to opportunities?', 'How can I contact him?'];
  }
  return ['What are his skills?', 'Tell me about his education.', 'How can I contact him?'];
}

function getRelevantActions(prompt: string): ChatAction[] {
  const p = prompt.toLowerCase();
  const actions: ChatAction[] = [];

  if (p.includes('resume') || p.includes('cv') || p.includes('hire') || p.includes('experience')) {
    actions.push({ type: 'resume', label: 'View Resume' });
  }
  if (p.includes('contact') || p.includes('email') || p.includes('reach') || p.includes('hire')) {
    actions.push({ type: 'contact', label: 'Contact Dhananjaya' });
  }
  if (p.includes('github') || p.includes('code') || p.includes('project')) {
    actions.push({ type: 'github', label: 'Open GitHub' });
  }
  if (p.includes('linkedin') || p.includes('profile')) {
    actions.push({ type: 'linkedin', label: 'Open LinkedIn' });
  }

  if (actions.length === 0) {
    actions.push({ type: 'resume', label: 'View Resume' });
  }

  return actions;
}
