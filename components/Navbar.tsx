import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { NAV_ITEMS, APP_NAME } from '../constants';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = scrolled || isOpen
    ? 'glass-panel py-3 shadow-lg bg-dark-900/80 border-b border-white/10' 
    : 'bg-transparent py-6 border-b border-transparent';
    
  const textClasses = "text-white/80 hover:text-emerald-400";

  const handleNavigation = (path: string, isAnchor: boolean) => {
    setIsOpen(false);
    if (isAnchor && location.pathname !== '/') {
      navigate(`/${path}`);
      return;
    }
    if (isAnchor && location.pathname === '/') {
        const elementId = path.replace('/#', '');
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navbarClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center mr-2 text-white shadow-[0_0_15px_rgba(52,211,153,0.5)]">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-white">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
                const isHome = location.pathname === '/';
                
                if (item.isAnchor) {
                    return (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.path, true)}
                            className={`text-sm font-medium transition-colors bg-transparent border-none cursor-pointer ${textClasses}`}
                        >
                            {item.label}
                        </button>
                    )
                }

                return (
                    <Link 
                        key={item.label} 
                        to={item.path}
                        className={`text-sm font-medium transition-colors ${textClasses}`}
                    >
                        {item.label}
                    </Link>
                );
            })}
            
            {isAuthenticated ? (
               <Link to="/dashboard">
                  <Button 
                      className="bg-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 border border-emerald-500/50" 
                      size="sm"
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Dashboard
                  </Button>
               </Link>
            ) : (
              <Link to="/login">
                <Button 
                    className="bg-emerald-500 hover:bg-emerald-400 text-white border-none shadow-lg shadow-emerald-500/20" 
                    size="sm" 
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-900 border-b border-white/10 shadow-xl py-6 px-6 flex flex-col space-y-6 animate-in slide-in-from-top-5">
          {NAV_ITEMS.map((item) => {
              return (
                <Link 
                    key={item.label} 
                    to={item.path.startsWith('/#') ? '/' : item.path}
                    className="text-lg font-medium text-white/90 hover:text-emerald-400 block"
                    onClick={() => {
                      if (item.isAnchor) handleNavigation(item.path, true);
                      else setIsOpen(false);
                    }}
                >
                    {item.label}
                </Link>
              )
          })}
          
          {isAuthenticated ? (
             <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500">
                  Ir para Dashboard
                </Button>
             </Link>
          ) : (
             <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-emerald-500">
                  Entrar
                </Button>
             </Link>
          )}
        </div>
      )}
    </nav>
  );
};