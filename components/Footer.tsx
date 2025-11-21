import React from 'react';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-6">
               <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center mr-2 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                <Sparkles size={14} />
              </div>
              <span className="text-lg font-bold font-display text-white">{APP_NAME}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              Transformando a educação através da tecnologia e gamificação. Sua carreira, no próximo nível.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Plataforma</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li><Link to="/courses" className="hover:text-emerald-400 transition-colors">Cursos</Link></li>
              <li><Link to="/mentors" className="hover:text-emerald-400 transition-colors">Mentores</Link></li>
              <li><Link to="/companies" className="hover:text-emerald-400 transition-colors">Para Empresas</Link></li>
              <li><Link to="/#testimonials" className="hover:text-emerald-400 transition-colors">Depoimentos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Recursos</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Carreiras</Link></li>
              <li><Link to="/community" className="hover:text-emerald-400 transition-colors">Comunidade</Link></li>
              <li><Link to="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li><Link to="/legal" className="hover:text-emerald-400 transition-colors">Privacidade</Link></li>
              <li><Link to="/legal" className="hover:text-emerald-400 transition-colors">Termos de Uso</Link></li>
              <li><Link to="/legal" className="hover:text-emerald-400 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-600 font-light">
          &copy; {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};