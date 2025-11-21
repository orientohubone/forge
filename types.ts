import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  isAnchor: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  xp: number;
  duration: string;
  image: string;
  tags: string[];
  modules: number;
  status?: 'draft' | 'published';
  authorId?: string;
  progress?: number; // 0-100 for students
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  specialties: string[];
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

// --- Auth & Gamification Types ---

export interface UserBadge {
  id: string;
  name: string;
  icon: string; // Emoji or Icon Name
  unlockedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  streakDays: number;
  badges: UserBadge[];
  role: 'student' | 'instructor';
}