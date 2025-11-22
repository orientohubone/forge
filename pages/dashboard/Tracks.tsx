import React from 'react';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/ui/Button';
import { Clock, Award, BarChart, Play, CheckCircle2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Tracks: React.FC = () => {
  const { courses, myCourses, enrollInCourse } = useCourses();

  const isEnrolled = (courseId: string) => {
    return myCourses.some(c => c.id === courseId);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <h1 className="text-3xl font-bold text-white font-display">Explorar Trilhas</h1>
             <p className="text-gray-400 mt-1">Descubra novas habilidades e adicione ao seu repertório.</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10 cursor-pointer hover:bg-white/10">Frontend</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10 cursor-pointer hover:bg-white/10">Backend</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10 cursor-pointer hover:bg-white/10">Design</span>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => {
          const enrolled = isEnrolled(course.id);

          return (
            <div key={course.id} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md bg-black/50 border border-white/10`}>
                            {course.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md
                            ${course.level === 'Iniciante' ? 'bg-emerald-500/80' : course.level === 'Intermediário' ? 'bg-yellow-500/80' : 'bg-red-500/80'}`}>
                            {course.level}
                        </span>
                    </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 font-display group-hover:text-emerald-400 transition-colors leading-tight">
                        {course.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 font-light leading-relaxed">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6 font-mono border-t border-white/5 pt-4 mt-auto">
                        <div className="flex items-center">
                            <Clock size={14} className="mr-1.5" />
                            {course.duration}
                        </div>
                        <div className="flex items-center">
                            <BarChart size={14} className="mr-1.5" />
                            {course.modules} Módulos
                        </div>
                        <div className="flex items-center text-emerald-400 font-bold">
                            <Award size={14} className="mr-1.5" />
                            {course.xp} XP
                        </div>
                    </div>

                    <div className="mt-auto">
                        {enrolled ? (
                             <Link to="/dashboard/courses">
                                <Button fullWidth variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
                                    <Play size={16} className="mr-2" /> Continuar
                                </Button>
                             </Link>
                        ) : (
                            <Button 
                                fullWidth 
                                className="bg-white/10 hover:bg-emerald-500 text-white border-none hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
                                onClick={() => enrollInCourse(course.id)}
                            >
                                <CheckCircle2 size={16} className="mr-2" /> Matricular Grátis
                            </Button>
                        )}
                    </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};