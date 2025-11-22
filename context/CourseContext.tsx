import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';

interface CourseContextType {
  courses: Course[];
  myCourses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  enrollInCourse: (courseId: string) => void;
  deleteCourse: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Dados iniciais enriquecidos
const INITIAL_COURSES_RICH: Course[] = [
  {
    id: "c1",
    title: "Frontend Masterclass: React & Next.js",
    level: "Intermediário",
    category: "Desenvolvimento Web",
    description: "Domine a biblioteca mais popular do mundo. Aprenda Hooks, Context API, Server Components e construa aplicações performáticas do zero. Este curso cobre desde os fundamentos até padrões avançados de arquitetura frontend.",
    requirements: ["Lógica de Programação", "HTML/CSS Básico", "JavaScript ES6+"],
    videoPreview: "https://www.youtube.com/embed/SqcY0GlETPk", // Mock video
    xp: 2500,
    duration: "45h",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "Frontend", "Web"],
    modules: 12,
    status: 'published'
  },
  {
    id: "c2",
    title: "Python para Data Science",
    level: "Iniciante",
    category: "Dados & IA",
    description: "Aprenda a linguagem mais usada em Ciência de Dados. Manipule grandes volumes de dados com Pandas, crie visualizações com Matplotlib e dê seus primeiros passos em Machine Learning com Scikit-Learn.",
    requirements: ["Nenhum conhecimento prévio necessário"],
    videoPreview: "https://www.youtube.com/embed/rfscVS0vtbw",
    xp: 1800,
    duration: "30h",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    tags: ["Python", "Data", "AI"],
    modules: 8,
    status: 'published'
  },
  {
    id: "c3",
    title: "UX/UI Design System Avançado",
    level: "Avançado",
    category: "Design",
    description: "Aprofunde-se na criação de Design Systems escaláveis. Aprenda Tokens, Componentização no Figma, Documentação e como fazer o handoff perfeito para desenvolvedores.",
    requirements: ["Figma Intermediário", "Conceitos de UI"],
    xp: 3200,
    duration: "60h",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=800&auto=format&fit=crop",
    tags: ["Design", "Figma", "Systems"],
    modules: 15,
    status: 'published'
  },
  {
    id: "c4",
    title: "DevOps & Cloud Infrastructure",
    level: "Avançado",
    category: "Infraestrutura",
    description: "Torne-se um especialista em CI/CD, Docker e Kubernetes. Entenda como orquestrar containers e escalar aplicações na nuvem AWS com segurança e eficiência.",
    requirements: ["Linux Básico", "Redes de Computadores"],
    xp: 4000,
    duration: "55h",
    image: "https://images.unsplash.com/photo-1667372393119-c85c02088b67?q=80&w=800&auto=format&fit=crop",
    tags: ["AWS", "Docker", "CI/CD"],
    modules: 18,
    status: 'published'
  }
];

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const stored = localStorage.getItem('forgether_courses');
    return stored ? JSON.parse(stored) : INITIAL_COURSES_RICH;
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('forgether_enrollments');
    return stored ? JSON.parse(stored) : ['c1'];
  });

  useEffect(() => {
    localStorage.setItem('forgether_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('forgether_enrollments', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  const addCourse = (newCourseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...newCourseData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    // Also remove enrollments
    setEnrolledCourseIds(prev => prev.filter(id => id !== courseId));
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  const myCourses = courses
    .filter(c => enrolledCourseIds.includes(c.id))
    .map(c => ({ ...c, progress: Math.floor(Math.random() * 100) }));

  return (
    <CourseContext.Provider value={{ courses, myCourses, addCourse, enrollInCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};