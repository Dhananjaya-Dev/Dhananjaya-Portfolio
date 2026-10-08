import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-4 h-4' }) => {
  const n = name.toLowerCase().trim();

  // 1. Java & Java Subsystems
  if (n === 'java' || n.includes('advanced java') || n.includes('jdbc') || n.includes('servlets') || n.includes('jsp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Java">
        <path fill="#f89820" d="M8.86 16.94c0-.05.52.4 1.55.51 1.25.13 2.87.1 4.3-.12 1.34-.2 1.83-.58 1.83-.58s-.42.31-1.42.53c-1.37.3-3.15.34-4.57.17-1.15-.14-1.69-.51-1.69-.51z" />
        <path fill="#5382a1" d="M8.2 18.3c0-.05.53.4 1.56.5 1.25.14 2.89.11 4.32-.1 1.35-.2 1.83-.59 1.83-.59s-.42.3-1.42.52c-1.37.31-3.15.35-4.57.18-1.15-.14-1.72-.51-1.72-.51z" />
        <path fill="#e76f00" d="M12.98 10.42c.87.97-.24 2.1-1.4 3.09-.94.8-1.9 1.3-1.9 1.3s1.24-.76 2.05-1.55c.78-.76 1.04-1.43.78-2.02-.27-.61-.95-.91-1.45-.96-.44-.04-.84.05-1.13.25.32-.23.82-.36 1.27-.32.65.05 1.34.45 1.78 1.21z" />
        <path fill="#5382a1" d="M17.7 19.86c-1.44.82-4.13 1.09-6.39.95-2.28-.14-4.32-.82-4.32-.82s.67.43 2.15.73c2.01.41 4.9.41 6.84-.22 1.45-.48 1.72-.64 1.72-.64z" />
        <path fill="#f89820" d="M6.9 21.37c3.15 1.05 9.07 1.08 12.05-.13 0 0-1.18.6-3.79.88-3.08.33-7.53.07-9.42-.71 0 0 .54-.08 1.16-.04z" />
        <path fill="#5382a1" d="M15.48 5.7c.48.56.32 1.33-.27 2.05-.62.77-1.57 1.4-1.57 1.4s.88-.63 1.37-1.29c.47-.64.44-1.25.04-1.63-.43-.41-1.28-.46-2.18-.15-1.05.35-1.98 1.05-1.98 1.05s1.17-.93 2.37-1.28c.95-.27 1.83-.24 2.22-.15z" />
        <path fill="#e76f00" d="M10.9 2.5c-.32.89.26 1.75 1.15 2.5 1.03.88 2.35 1.43 2.35 1.43s-1.39-.67-2.31-1.46c-.73-.62-1.07-1.28-.84-1.87.24-.62.94-.97 1.75-1.05.9-.09 1.89.15 1.89.15s-1.13-.38-2.18-.28c-.89.09-1.57.51-1.81 1.08z" />
      </svg>
    );
  }

  // 2. Spring, Spring Boot, Spring Core, Spring JDBC, Spring Data JPA
  if (n.includes('spring')) {
    if (n.includes('security')) {
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Spring Security">
          <path fill="#6db33f" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.05 8.79-7 9.88-3.95-1.09-7-5.34-7-9.88V6.3l7-3.12zm-1 5.32v6.5h2V8.5h-2z" />
        </svg>
      );
    }
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Spring Boot">
        <path
          fill="#6db33f"
          d="M21.57 13.91a8.47 8.47 0 0 1-5.11 7.15 8.5 8.5 0 0 1-9.52-2.19 8.5 8.5 0 0 1-1.92-9.61 8.47 8.47 0 0 1 7.13-5.24 8.2 8.2 0 0 1 3.25.43l-2.07 2.07a5.57 5.57 0 0 0-6.19 1.13 5.59 5.59 0 0 0-1.14 6.2 5.57 5.57 0 0 0 4.93 3.51 5.56 5.56 0 0 0 5.4-3.5 5.5 5.5 0 0 0-.48-5.35l2.06-2.06a8.4 8.4 0 0 1 3.66 7.46zm-.49-8.47a1.69 1.69 0 0 1-2.39 2.39L15.3 4.44a1.69 1.69 0 0 1 2.39-2.39l3.39 3.39z"
        />
      </svg>
    );
  }

  // 3. Hibernate
  if (n.includes('hibernate')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Hibernate">
        <path
          fill="#bcae79"
          d="M4.6 2.3h3.5v7.1h7.8V2.3h3.5v19.4h-3.5v-7.6H8.1v7.6H4.6V2.3z"
        />
      </svg>
    );
  }

  // 4. JWT (JSON Web Tokens)
  if (n.includes('jwt')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="JWT">
        <path
          fill="#fb015b"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"
        />
      </svg>
    );
  }

  // 5. Microservices Architecture
  if (n.includes('microservice')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Microservices">
        <rect x="2" y="3" width="6" height="6" rx="1.5" />
        <rect x="16" y="3" width="6" height="6" rx="1.5" />
        <rect x="9" y="15" width="6" height="6" rx="1.5" />
        <path d="M5 9v3a2 2 0 0 0 2 2h2m6 0h2a2 2 0 0 0 2-2V9" />
      </svg>
    );
  }

  // 6. React.js
  if (n.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-label="React">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61dafb" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61dafb" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61dafb" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#61dafb" />
      </svg>
    );
  }

  // 7. JavaScript
  if (n.includes('javascript') || n === 'js') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="JavaScript">
        <rect width="24" height="24" rx="3" fill="#f7df1e" />
        <path
          fill="#000000"
          d="M6.4 17.5c.5.8 1.2 1.4 2.2 1.4 1.2 0 1.9-.6 1.9-1.9v-6.2H8.4v6.1c0 .6-.3.9-.8.9-.4 0-.6-.3-.8-.7l-1.4.9zm6.6-.2c.7 1 1.7 1.6 3 1.6 1.8 0 2.9-1 2.9-2.5 0-1.5-.9-2.1-2.2-2.7l-.6-.3c-.8-.3-1.1-.6-1.1-1.1 0-.5.4-.9 1.1-.9.7 0 1.1.3 1.4.9l1.6-1c-.6-1.1-1.6-1.6-2.9-1.6-1.7 0-2.8 1-2.8 2.4 0 1.4.9 2.1 2.1 2.6l.6.3c.9.4 1.3.7 1.3 1.3 0 .6-.5 1-1.3 1-.8 0-1.4-.4-1.8-1.1l-1.4.9z"
        />
      </svg>
    );
  }

  // 8. HTML5
  if (n.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="HTML5">
        <path fill="#e34f26" d="M3 2l1.6 18.2L12 22.4l7.4-2.2L21 2H3zm14.8 5.7h-7l.2 2.3h6.6l-.6 6.3-5 1.4v.1l-5-1.4-.3-3.7h2.2l.2 2 2.9.8 2.9-.8.3-3.2H6.9L6.3 5.4h11.7l-.2 2.3z" />
      </svg>
    );
  }

  // 9. CSS3
  if (n.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="CSS3">
        <path fill="#1572b6" d="M3 2l1.6 18.2L12 22.4l7.4-2.2L21 2H3zm14.8 5.7h-7l.2 2.3h6.6l-.6 6.3-5 1.4v.1l-5-1.4-.3-3.7h2.2l.2 2 2.9.8 2.9-.8.3-3.2H6.9L6.3 5.4h11.7l-.2 2.3z" />
      </svg>
    );
  }

  // 10. Bootstrap
  if (n.includes('bootstrap')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Bootstrap">
        <rect width="24" height="24" rx="5" fill="#7952b3" />
        <path
          fill="#ffffff"
          d="M14.2 13.1c1.2-.6 1.8-1.6 1.8-2.8 0-2.3-1.8-3.4-4.5-3.4H7v10.2h4.8c2.8 0 4.8-1.2 4.8-3.5 0-1.5-.9-2.6-2.4-2.9v.4zm-4.7-4.1h1.9c1.4 0 2.2.6 2.2 1.7s-.8 1.7-2.2 1.7H9.5V9zm2.3 6h-2.3v-2.2h2.3c1.5 0 2.4.6 2.4 1.8s-.9 1.4-2.4 1.4z"
        />
      </svg>
    );
  }

  // 11. MySQL
  if (n.includes('mysql')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="MySQL">
        <path
          fill="#00758f"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.5 4.5c2.5 0 4.5 1.8 4.5 4 0 1.2-.6 2.3-1.5 3 .9.2 1.8.8 2.2 1.7.3.7.3 1.4.1 2.1-.3.8-.9 1.4-1.8 1.7h-7c-.9-.3-1.5-.9-1.8-1.7-.2-.7-.2-1.4.1-2.1.4-.9 1.3-1.5 2.2-1.7-.9-.7-1.5-1.8-1.5-3 0-2.2 2-4 4.5-4z"
        />
      </svg>
    );
  }

  // 12. Oracle SQL
  if (n.includes('oracle')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Oracle SQL">
        <rect width="24" height="15" y="4.5" rx="7.5" fill="#f80000" />
        <rect width="18" height="9" x="3" y="7.5" rx="4.5" fill="#090a0f" />
      </svg>
    );
  }

  // 13. Docker
  if (n.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Docker">
        <path
          fill="#2496ed"
          d="M13.98 11.08h1.85v1.85h-1.85zm-2.47 0h1.85v1.85h-1.85zm-2.47 0h1.85v1.85H9.04zm-2.47 0h1.85v1.85H6.57zm7.41-2.47h1.85v1.85h-1.85zm-2.47 0h1.85v1.85h-1.85zm-2.47 0h1.85v1.85H9.04zm4.94-2.47h1.85v1.85h-1.85zM22.5 12.8c-.5-.36-1.56-.47-2.4-.33-.18-.94-.78-1.74-1.63-2.1-.22-.09-.45-.14-.68-.14-.2 0-.34.02-.34.02s-.12-1.07-.94-1.83C15.65 7.63 14.5 7.5 14.5 7.5V6H5.5v7.26c0 1.25.32 2.45.92 3.49C8.36 19.88 11.96 21 16.2 21c4.54 0 7.3-2.58 7.3-6.17 0-.75-.19-1.46-.5-2.03h-.5z"
        />
      </svg>
    );
  }

  // 14. AWS
  if (n.includes('aws')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="AWS">
        <path
          fill="#ff9900"
          d="M6.4 12.8c0 .7.5 1.2 1.3 1.2.6 0 1.2-.4 1.7-1v-2.3c-.6-.4-1.3-.6-1.8-.6-1 0-1.8.6-1.8 1.7v1zm4.4-4.5h1.3v5.6c0 .7.1 1.2.4 1.5.3.3.7.4 1.2.4.6 0 1.1-.2 1.5-.6v-6.9h1.3v8.5h-1.2l-.2-1.2c-.6.9-1.5 1.4-2.5 1.4-1.9 0-2.8-1.1-2.8-3.1V8.3zM2.8 19.2c4.8 2.6 11.5 2.6 16.3 0 .4-.2.8.2.5.6-4.5 3.3-12.8 3.3-17.3 0-.4-.3 0-.8.5-.6zm16.7-.4c.4-.5 1.4-1.1 1.9-1.2.3 0 .4.2.3.5-.4 1.1-1.3 2.1-1.8 2.5-.2.1-.4 0-.4-.2v-1.6z"
        />
      </svg>
    );
  }

  // 15. Git
  if (n === 'git') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Git">
        <path
          fill="#f05032"
          d="M21.6 10.7l-8.3-8.3c-.8-.8-2.1-.8-2.9 0L8.6 4.2l3.4 3.4c.8-.3 1.8-.1 2.4.5.6.6.8 1.6.5 2.4l3.3 3.3c.8-.3 1.8-.1 2.4.5 1 .9 1 2.4 0 3.3s-2.4 1-3.3 0c-.8-.7-.9-1.8-.5-2.6l-3.1-3.1v4.4c.3.2.6.5.7.9.6 1.1.2 2.5-.9 3.1-1.1.6-2.5.2-3.1-.9-.6-1.1-.2-2.5.9-3.1.4-.2.9-.3 1.3-.2V8.9c-.4.1-.9 0-1.3-.2-.8-.4-1.3-1.2-1.3-2.1L2.4 13.8c-.8.8-.8 2.1 0 2.9l8.3 8.3c.8.8 2.1.8 2.9 0l8-8c.8-.8.8-2.1 0-2.9z"
        />
      </svg>
    );
  }

  // 16. GitHub
  if (n.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
        <path
          fill="#ffffff"
          d="M12 2C6.48 2 2 6.5 2 12.03c0 4.43 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48 3.97-1.32 6.83-5.07 6.83-9.5C22 6.5 17.52 2 12 2z"
        />
      </svg>
    );
  }

  // 17. VS Code
  if (n.includes('vs code') || n.includes('vscode')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="VS Code">
        <path
          fill="#007acc"
          d="M18.7 2.1l-4.5 4.1L8.5 2.1 4.3 4.8l5.2 4.8L4.3 14.4l4.2 2.7 5.7-4.1 4.5 4.1 3.1-1.5V3.6l-3.1-1.5zm.9 11.6l-3.8-3.4 3.8-3.4v6.8z"
        />
      </svg>
    );
  }

  // 18. Eclipse
  if (n.includes('eclipse')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Eclipse">
        <path
          fill="#2c2255"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
        />
        <path
          fill="#f7941e"
          d="M17.5 12c0 3.04-2.46 5.5-5.5 5.5s-5.5-2.46-5.5-5.5 2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5z"
        />
      </svg>
    );
  }

  // 19. ChatGPT / OpenAI
  if (n.includes('chatgpt')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="ChatGPT">
        <path
          fill="#10a37f"
          d="M22.28 10.42a6.38 6.38 0 0 0-.54-5.18 6.43 6.43 0 0 0-6.19-3.23 6.4 6.4 0 0 0-4.75 2.13 6.4 6.4 0 0 0-6.72 2.92 6.42 6.42 0 0 0 .8 7.37 6.4 6.4 0 0 0 .54 5.18 6.43 6.43 0 0 0 6.19 3.23 6.4 6.4 0 0 0 4.75-2.13 6.4 6.4 0 0 0 6.72-2.92 6.42 6.42 0 0 0-.8-7.37zm-7.6 10.58a4.9 4.9 0 0 1-3.23-1.22l.16-.09 5.34-3.08a.78.78 0 0 0 .39-.68v-5.26l1.58.91a4.9 4.9 0 0 1 2.48 4.25 4.93 4.93 0 0 1-6.72 5.17zm-11-4.8a4.9 4.9 0 0 1-.6-3.41l.16.1 5.34 3.08a.78.78 0 0 0 .78 0l4.56-2.63v1.82a4.9 4.9 0 0 1-3.69 3.56 4.93 4.93 0 0 1-6.55-2.52zm-1.22-9.42a4.9 4.9 0 0 1 2.63-2.19v6.34a.78.78 0 0 0 .39.68l4.56 2.63-1.58.91a4.9 4.9 0 0 1-5.18-.7 4.93 4.93 0 0 1-.82-7.67z"
        />
      </svg>
    );
  }

  // 20. Gemini
  if (n.includes('gemini')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Gemini">
        <path
          fill="#4285f4"
          d="M12 2C12 7.52 7.52 12 2 12c5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z"
        />
      </svg>
    );
  }

  // 21. Claude
  if (n.includes('claude')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Claude">
        <circle cx="12" cy="12" r="10" fill="#d97757" />
        <path fill="#ffffff" d="M12 6l1.8 4.2L18 12l-4.2 1.8L12 18l-1.8-4.2L6 12l4.2-1.8z" />
      </svg>
    );
  }

  // 22. Cursor
  if (n.includes('cursor')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Cursor">
        <path
          fill="#38bdf8"
          d="M4 2l16 9-7 2-2 7z"
        />
      </svg>
    );
  }

  // 23. Antigravity
  if (n.includes('antigravity')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Antigravity">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
        <polyline points="2 15.5 12 8.5 22 15.5" />
      </svg>
    );
  }

  // 24. Canva
  if (n.includes('canva')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Canva">
        <circle cx="12" cy="12" r="10" fill="#00c4cc" />
        <path
          fill="#ffffff"
          d="M14.5 15.8c-1.2.6-2.5.8-3.7.5-1.9-.5-2.7-2.3-2.3-4.2.4-1.9 2-3.4 4-3.6 1.4-.1 2.7.5 3.3 1.6l-1.8 1.1c-.4-.6-1-.9-1.7-.8-1 .1-1.8.9-2 1.9-.2 1 .3 1.8 1.2 2 .7.1 1.4-.1 1.9-.4l1.1 1.9z"
        />
      </svg>
    );
  }

  // Fallback for general database / server / tool
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
};
