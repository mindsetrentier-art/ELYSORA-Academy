export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
  type: 'villa' | 'suite' | 'spa' | 'restaurant' | 'lobby' | 'garden';
  budget: string;
  tasksCount: number;
  completedTasksCount: number;
  description: string;
  status: 'planning' | 'designing' | 'construction' | 'completed';
  documents: string[];
}

export type NodeCategory = 'architectural' | 'concept' | 'study';

export interface KnowledgeNode {
  id: string;
  name: string;
  category: NodeCategory;
  description: string;
  content: string;
  impactScore: number;
  resourcesCount: number;
  relatedConcepts: string[];
  imageUrl: string;
}

export interface GraphConnection {
  source: string;
  target: string;
  type: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  progress: number;
  description: string;
  instructor: string;
  imageUrl: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  quiz?: Quiz;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GalleryAsset {
  id: string;
  name: string;
  category: 'architectural' | 'moodboard' | 'concept' | 'interior' | 'lighting' | 'operations' | 'finance' | 'staffing' | 'planning' | string;
  imageUrl: string;
  dimensions?: string;
  tags: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inprogress' | 'completed';
  assignee: string;
  deadline: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  references?: string[];
  comparison?: {
    optionA: { name: string; desc: string };
    optionB: { name: string; desc: string };
  };
}

export interface IdeaTrend {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  category: string;
  simulatedScenario?: string;
}
