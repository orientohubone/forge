import React from 'react';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/ui/Button';
import { Play, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyCourses: React.FC = () => {
  const { myCourses } = useCourses();

  if (myCourses.length === 0) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Nenhum curso iniciado</h2>
            <p className="text-gray-400 mb-8">Explore nossa biblioteca e comece sua primeira missão!</p>
            <Link to="/courses">
                <Button className="bg-emerald-500 hover:bg-emerald-400 border-none">Explorar Cursos</Button>
            </Link>
        </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-3xl font-bold text-white font-display">Meus Cursos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myCourses.map(course => (
            <div key={course.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row hover:border-emerald-500/30 transition-all">
                <div className="w-full md:w-48 h-48 relative">
                    <img src={course.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                            <Play size={24} className="ml-1" />
                        </div>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white text-lg">{course.title}</h3>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                            +{course.xp} XP
                        </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-6">{course.level} • {course.modules} Módulos</p>

                    <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-xs text-gray-300 font-medium">
                            <span>Progresso</span>
                            <span>{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-dark-950 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        <div className="pt-4">
                            <Button fullWidth size="sm" className="bg-white/10 hover:bg-white/20 border-none text-white">
                                Continuar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};