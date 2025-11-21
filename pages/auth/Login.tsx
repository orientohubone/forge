import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Sparkles, Briefcase, GraduationCap } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const role = isInstructor ? 'instructor' : 'student';
    await login(email, role);
    
    if (role === 'instructor') {
      navigate('/instructor');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden px-4">
       {/* Ambient Glows - Change color based on role */}
       <div className={`absolute top-1/4 -left-24 w-96 h-96 rounded-full blur-[128px] transition-colors duration-1000 ${isInstructor ? 'bg-violet-500/20' : 'bg-emerald-500/20'}`}></div>
       <div className={`absolute bottom-1/4 -right-24 w-96 h-96 rounded-full blur-[128px] transition-colors duration-1000 ${isInstructor ? 'bg-fuchsia-500/10' : 'bg-teal-500/10'}`}></div>

       <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-2 text-white shadow-lg transition-colors duration-500 ${isInstructor ? 'bg-violet-600 shadow-violet-500/30' : 'bg-emerald-500 shadow-emerald-500/30'}`}>
                    <Sparkles size={20} />
                </div>
            </Link>
            <h1 className="text-3xl font-bold text-white font-display">
              {isInstructor ? 'Portal Pedagógico' : 'Área do Aluno'}
            </h1>
            <p className="text-gray-400 mt-2">
              {isInstructor ? 'Gerencie cursos e acompanhe alunos.' : 'Entre para continuar sua jornada.'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-6 backdrop-blur-md">
            <button 
              type="button"
              onClick={() => setIsInstructor(false)}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium transition-all ${!isInstructor ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <GraduationCap size={16} className="mr-2" />
              Aluno
            </button>
            <button 
              type="button"
              onClick={() => setIsInstructor(true)}
              className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium transition-all ${isInstructor ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Briefcase size={16} className="mr-2" />
              Instrutor
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Corporativo ou Pessoal</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-dark-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all ${isInstructor ? 'focus:border-violet-500 focus:ring-violet-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`}
                        placeholder={isInstructor ? "professor@learnhub.com" : "aluno@email.com"}
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-dark-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all ${isInstructor ? 'focus:border-violet-500 focus:ring-violet-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`}
                        placeholder="••••••••"
                      />
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    className={`text-white shadow-lg border-none transition-colors ${isInstructor ? 'bg-violet-600 hover:bg-violet-500 shadow-violet-500/25' : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/25'}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Acessando...' : (isInstructor ? 'Acessar Painel' : 'Entrar na Plataforma')}
                  </Button>
              </form>

              {!isInstructor && (
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-gray-400 text-sm">
                        Ainda não tem conta?{' '}
                        <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline">
                            Criar conta grátis
                        </Link>
                    </p>
                </div>
              )}
          </div>
       </div>
    </div>
  );
};