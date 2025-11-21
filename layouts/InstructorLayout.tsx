import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Library, 
  Users, 
  Award, 
  LogOut, 
  Menu, 
  Bell, 
  Search,
} from 'lucide-react';
import { APP_NAME } from '../constants';

export const InstructorLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (isLoading) return <div className="flex items-center justify-center h-screen bg-dark-900 text-violet-500">Carregando Painel Pedagógico...</div>;
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'instructor') return <Navigate to="/dashboard" />;

  const navItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/instructor' },
    { icon: Library, label: 'Gerenciar Cursos', path: '/instructor/courses' },
    { icon: Users, label: 'Alunos', path: '/instructor/students' },
    { icon: Award, label: 'Certificados', path: '/instructor/certificates' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 flex font-sans text-slate-100 selection:bg-violet-500">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Violet Theme) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0B0A15] border-r border-white/5 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <span className="text-lg font-bold font-display text-white tracking-tight">
                For<span className="text-emerald-500">gether</span> <span className="text-violet-400 text-xs align-top">Pro</span>
            </span>
          </div>

          {/* Instructor Info */}
          <div className="p-6 border-b border-white/5 bg-violet-900/10">
             <div className="flex items-center gap-3">
                <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-violet-500/30" />
                <div>
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                    <p className="text-xs text-violet-300 font-medium">Instrutor Sênior</p>
                </div>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Pedagógico</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-violet-500/10 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <item.icon size={18} className={`mr-3 ${isActive ? 'text-violet-500' : 'text-gray-500'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer Logout */}
          <div className="p-4 border-t border-white/5">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-dark-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 lg:px-8 z-10">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center relative max-w-md w-full ml-4">
             <Search size={18} className="absolute left-3 text-gray-500" />
             <input 
                type="text" 
                placeholder="Buscar aluno ou curso..." 
                className="w-full bg-dark-800 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50"
             />
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-dark-900 p-4 lg:p-8 scroll-smooth">
            <Outlet />
        </main>
      </div>
    </div>
  );
};