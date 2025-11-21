import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Sparkles } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, 'student', name);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden px-4">
       {/* Ambient Glows */}
       <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
       <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>

       <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-2 text-white shadow-lg shadow-emerald-500/30">
                    <Sparkles size={20} />
                </div>
            </Link>
            <h1 className="text-3xl font-bold text-white font-display">Comece sua Jornada</h1>
            <p className="text-gray-400 mt-2">Crie sua conta e ganhe acesso instantâneo.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-dark-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="Seu nome"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="seu@email.com"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-dark-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="Crie uma senha forte"
                      />
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando...' : 'Criar Conta Grátis'}
                  </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <p className="text-gray-400 text-sm">
                      Já tem uma conta?{' '}
                      <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline">
                          Fazer Login
                      </Link>
                  </p>
              </div>
          </div>
       </div>
    </div>
  );
};