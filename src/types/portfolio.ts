export interface SkillItem {
  name: string;
  category: 'backend' | 'frontend' | 'database' | 'devops' | 'tools' | 'ai';
  icon?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: string[];
  iconName: string;
}

export interface ProjectPlaceholder {
  id: string;
  slotNumber: number;
  title: string;
  status: string;
  badge: string;
  note: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  university?: string;
  location?: string;
  duration: string;
  score?: string;
  highlights: string[];
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}
