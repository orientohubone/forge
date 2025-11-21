import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';
import { COURSES as INITIAL_COURSES } from '../constants';

interface CourseContextType {
  courses: Course[];
  myCourses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  enrollInCourse: (courseId: string) => void;
  deleteCourse: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializa com os cursos mockados das constantes, mas permite adição de novos
  const [courses, setCourses] = useState<Course[]>(() => {
    const stored = localStorage.getItem('learnhub_courses');
    return stored ? JSON.parse(stored) : INITIAL_COURSES.map(c => ({ ...c, status: 'published' as const }));
  });

  // Simula matrícula (IDs dos cursos matriculados)
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('learnhub_enrollments');
    return stored ? JSON.parse(stored) : ['c1']; // Começa com 1 curso matriculado
  });

  useEffect(() => {
    localStorage.setItem('learnhub_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('learnhub_enrollments', JSON.stringify(enrolledCourseIds));
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
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
    }
  };

  // Derivar a lista de objetos Course baseada nos IDs matriculados
  const myCourses = courses
    .filter(c => enrolledCourseIds.includes(c.id))
    .map(c => ({ ...c, progress: Math.floor(Math.random() * 100) })); // Mock progress

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