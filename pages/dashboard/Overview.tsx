import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/ui/Button';
import { Play, Award, Flame, Target, Clock, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Overview: React.FC = () => {
  const { user } = useAuth();
  const { myCourses } = useCourses();
  const navigate = useNavigate();

  // Get the most recent course or first one
  const activeCourse = myCourses[0];

  return (
    <div className="space-y-8 pb-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white font-display">
                    Olá, {user?.name}! 👋
                </h1>
                <p className="text-gray-400 mt-1">Sua jornada de evolução continua hoje.</p>
            </div>
            <Button 
                onClick={() => activeCourse ? navigate('/dashboard/courses') : navigate('/courses')}
                className="shadow-lg shadow-emerald-500/20"
            >
                <Play size={18} className="mr-2 fill-current" />
                {activeCourse ? 'Retomar Aprendizado' : 'Começar um Curso'}
            </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                    <Flame size={24} />
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Ofensiva</p>
                    <p className="text-2xl font-bold text-white">{user?.streakDays} dias</p>
                </div>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                    <Award size={24} />
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Nível Atual</p>
                    <p className="text-2xl font-bold text-white">{user?.level}</p>
                </div>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                    <Target size={24} />
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Próximo Nível</p>
                    <p className="text-sm font-medium text-gray-300 mt-1">
                        {user?.nextLevelXP ? user.nextLevelXP - user.currentXP : 0} XP restantes
                    </p>
                </div>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Cursos</p>
                    <p className="text-2xl font-bold text-white">{myCourses.length}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Continue Watching */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white">Em Andamento</h2>
                        <Link to="/dashboard/courses" className="text-emerald-400 text-sm hover:underline">Ver todos</Link>
                    </div>
                    
                    {activeCourse ? (
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-emerald-500/30 transition-colors group cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500"></div>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden relative">
                                    <img 
                                        src={activeCourse.image}
                                        alt="Course" 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                            <Play size={20} className="text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase">
                                            {activeCourse.level}
                                        </span>
                                        <span className="text-xs text-gray-500">Última aula vista há 2h</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{activeCourse.title}</h3>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">Continue de onde parou para garantir seus {activeCourse.xp} XP.</p>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Progresso do Curso</span>
                                            <span>{activeCourse.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-dark-950 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${activeCourse.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white/5 border border-dashed border-white/10 rounded-3xl p-8 text-center">
                            <p className="text-gray-400 mb-4">Você não está matriculado em nenhum curso.</p>
                            <Link to="/courses">
                                <Button variant="outline" className="border-emerald-500 text-emerald-400">Explorar Catálogo</Button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* Recommended Tracks */}
                <section>
                    <h2 className="text-lg font-bold text-white mb-4">Próximas Missões Sugeridas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Target size={20} />
                            </div>
                            <h3 className="font-bold text-white mb-1">Arquitetura Limpa</h3>
                            <p className="text-xs text-gray-400 mb-3">Intermediário • +1500 XP</p>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-0"></div>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Target size={20} />
                            </div>
                            <h3 className="font-bold text-white mb-1">Docker & Kubernetes</h3>
                            <p className="text-xs text-gray-400 mb-3">Avançado • +3200 XP</p>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-0"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                
                {/* Badges */}
                <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-white">Suas Badges</h2>
                        <span className="text-xs text-gray-500">{user?.badges.length} conquistadas</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {user?.badges.map((badge) => (
                            <div key={badge.id} className="aspect-square bg-dark-950/50 rounded-xl flex flex-col items-center justify-center p-2 tooltip relative group border border-white/5 hover:border-emerald-500/30 transition-colors" title={badge.name}>
                                <span className="text-2xl mb-1 filter drop-shadow-lg">{badge.icon}</span>
                            </div>
                        ))}
                        <div className="aspect-square bg-dark-950/30 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-600">
                            ?
                        </div>
                    </div>
                </section>

                {/* Ranking/Leaderboard Mini */}
                <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h2 className="text-base font-bold text-white mb-4">Ranking Semanal</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-yellow-500 font-bold text-sm w-4">1</span>
                                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                <span className="text-sm text-white">Sarah J.</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-400">5200 XP</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 -mx-2">
                            <div className="flex items-center gap-3">
                                <span className="text-emerald-400 font-bold text-sm w-4">12</span>
                                <img src={user?.avatar} className="w-8 h-8 rounded-full border border-emerald-500" alt="Me" />
                                <span className="text-sm text-white font-bold">Você</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-400">{user?.currentXP} XP</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-bold text-sm w-4">13</span>
                                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                <span className="text-sm text-gray-400">Mike T.</span>
                            </div>
                            <span className="text-xs font-bold text-gray-600">2100 XP</span>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" fullWidth className="mt-6 border-white/10 hover:border-emerald-500 text-xs text-white">
                        Ver Ranking Completo
                    </Button>
                </section>
            </div>
        </div>
    </div>
  );
};