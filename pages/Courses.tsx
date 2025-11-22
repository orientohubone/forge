import React from 'react';
import { Clock, Award, BarChart } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { useCourses } from '../context/CourseContext';
import { Link } from 'react-router-dom';

export const Courses: React.FC = () => {
  const { courses } = useCourses();

  return (
    <div className="pt-32 pb-20 bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
            title="Explorar Missões" 
            subtitle="Escolha sua próxima aventura de aprendizado e ganhe XP."
            align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <div key={course.id} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-lg backdrop-blur-md
                                ${course.level === 'Iniciante' ? 'bg-emerald-500/80' : course.level === 'Intermediário' ? 'bg-yellow-500/80' : 'bg-red-500/80'}`}>
                                {course.level}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-4 font-mono">
                            <div className="flex items-center">
                                <Clock size={14} className="mr-1.5 text-emerald-500" />
                                {course.duration}
                            </div>
                            <div className="flex items-center text-emerald-400 font-bold">
                                <Award size={14} className="mr-1.5" />
                                +{course.xp} XP
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-emerald-400 transition-colors leading-tight">
                            {course.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {course.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded uppercase tracking-wider">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                             <div className="flex items-center text-sm text-gray-500">
                                <BarChart size={16} className="mr-2" />
                                {course.modules} Módulos
                             </div>
                             <Link to="/register">
                                 <Button variant="outline" size="sm" className="border-white/20 text-white hover:border-emerald-500 hover:text-emerald-400">
                                    Detalhes
                                 </Button>
                             </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};