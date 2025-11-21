import React from 'react';
import { Button } from '../../components/ui/Button';
import { Users, Library, Award, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';

export const InstructorDashboard: React.FC = () => {
  const { courses } = useCourses();

  return (
    <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white font-display">
                    Painel Pedagógico
                </h1>
                <p className="text-gray-400 mt-1">Visão geral do desempenho da plataforma.</p>
            </div>
            <Link to="/instructor/courses">
                <Button className="bg-violet-600 hover:bg-violet-500 shadow-lg shadow-violet-500/20 border-none">
                    <Plus size={18} className="mr-2" />
                    Novo Curso
                </Button>
            </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
                        <Users size={20} />
                    </div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Total Alunos</span>
                </div>
                <p className="text-3xl font-bold text-white">1,240</p>
                <p className="text-xs text-emerald-400 mt-2 flex items-center">
                    <TrendingUp size={12} className="mr-1" /> +12% este mês
                </p>
            </div>
            
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                        <Library size={20} />
                    </div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Cursos Ativos</span>
                </div>
                <p className="text-3xl font-bold text-white">{courses.length}</p>
                <p className="text-xs text-gray-500 mt-2">3 em rascunho</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 backdrop-blur-sm flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg">
                        <Award size={20} />
                    </div>
                    <span className="text-xs text-gray-400 uppercase font-bold">Certificados</span>
                </div>
                <p className="text-3xl font-bold text-white">856</p>
                <p className="text-xs text-emerald-400 mt-2">Emitidos automaticamente</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Courses */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white">Cursos Recentes</h2>
                    <Link to="/instructor/courses" className="text-violet-400 text-sm hover:underline flex items-center">
                        Gerenciar todos <ArrowRight size={14} className="ml-1" />
                    </Link>
                </div>
                
                <div className="space-y-4">
                    {courses.slice(0, 4).map(course => (
                        <div key={course.id} className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-violet-500/20">
                            <img src={course.image} alt="" className="w-12 h-12 rounded-lg object-cover mr-4" />
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm">{course.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span>{course.modules} Módulos</span>
                                    <span>•</span>
                                    <span>{course.level}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-violet-400 font-bold text-sm">{course.xp} XP</span>
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                                    Ativo
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pending Actions */}
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-violet-900/50 to-dark-900 border border-violet-500/20 rounded-3xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Ações Pendentes</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 pb-4 border-b border-white/5">
                            <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
                            <div>
                                <p className="text-sm text-white font-medium">Aprovar projetos finais</p>
                                <p className="text-xs text-gray-400">5 alunos aguardando revisão</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 pb-4 border-b border-white/5">
                            <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500"></div>
                            <div>
                                <p className="text-sm text-white font-medium">Atualizar ementa Python</p>
                                <p className="text-xs text-gray-400">Solicitado pela coordenação</p>
                            </div>
                        </li>
                    </ul>
                    <Button fullWidth className="mt-6 bg-white/10 hover:bg-white/20 text-white border-none text-sm">
                        Ver Central de Tarefas
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};