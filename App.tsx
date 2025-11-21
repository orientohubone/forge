import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { InstructorLayout } from './layouts/InstructorLayout';

// Public Pages
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Mentors } from './pages/Mentors';
import { Blog } from './pages/Blog';
import { Legal } from './pages/Legal';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Student Pages
import { Overview } from './pages/dashboard/Overview';
import { MyCourses } from './pages/dashboard/MyCourses';

// Instructor Pages
import { InstructorDashboard } from './pages/instructor/InstructorDashboard';
import { CourseManager } from './pages/instructor/CourseManager';

// Scroll Restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Fallbacks */}
            <Route path="/careers" element={<div className="pt-40 text-center bg-dark-900 h-screen"><h1 className="text-2xl text-white">Em breve...</h1></div>} />
            <Route path="/companies" element={<div className="pt-40 text-center bg-dark-900 h-screen"><h1 className="text-2xl text-white">Em breve...</h1></div>} />
            <Route path="/community" element={<div className="pt-40 text-center bg-dark-900 h-screen"><h1 className="text-2xl text-white">Em breve...</h1></div>} />
            <Route path="/help" element={<div className="pt-40 text-center bg-dark-900 h-screen"><h1 className="text-2xl text-white">Em breve...</h1></div>} />
          </Route>

          {/* Student Private Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="achievements" element={<div className="text-white p-8">Minhas Conquistas (Em breve)</div>} />
            <Route path="settings" element={<div className="text-white p-8">Configurações (Em breve)</div>} />
          </Route>

          {/* Instructor Private Routes */}
          <Route path="/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="courses" element={<CourseManager />} />
            <Route path="students" element={<div className="text-white p-8">Gestão de Alunos (Em breve)</div>} />
            <Route path="certificates" element={<div className="text-white p-8">Emissão de Certificados (Em breve)</div>} />
          </Route>

        </Routes>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;