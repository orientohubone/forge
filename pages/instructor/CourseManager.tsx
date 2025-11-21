import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/ui/Button';
import { Input } from 'lucide-react'; // Placeholder import if needed

export const CourseManager: React.FC = () => {
  const { courses, addCourse, deleteCourse } = useCourses();
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  const [xp, setXp] = useState(1000);
  const [modules, setModules] = useState(5);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      title,
      level,
      xp: Number(xp),
      modules: Number(modules),
      image,
      duration: '10h', // Default for MVP
      tags: ['Novo'],
      status: 'published'
    });
    setIsCreating(false);
    // Reset form
    setTitle('');
    setXp(1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-display">Gerenciar Cursos</h1>
        <Button 
            onClick={() => setIsCreating(!isCreating)}
            className={isCreating ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50" : "bg-violet-600 hover:bg-violet-500 border-none"}
        >
            {isCreating ? 'Cancelar' : 'Criar Novo Curso'}
        </Button>
      </div>

      {isCreating && (
        <div className="bg-white/5 border border-violet-500/30 rounded-3xl p-8 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-bold text-white mb-6">Detalhes do Novo Curso</h2>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Título do Curso</label>
                    <input 
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                        placeholder="Ex: Introdução à IA Generativa"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Nível de Dificuldade</label>
                    <select 
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                        value={level}
                        onChange={e => setLevel(e.target.value as any)}
                    >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Recompensa (XP)</label>
                    <input 
                        type="number"
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                        value={xp}
                        onChange={e => setXp(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Qtd. Módulos</label>
                    <input 
                        type="number"
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                        value={modules}
                        onChange={e => setModules(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-400 uppercase font-bold mb-2">URL da Capa</label>
                    <input 
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>

                <div className="col-span-2 pt-4">
                    <Button type="submit" fullWidth className="bg-violet-600 hover:bg-violet-500 border-none py-4">
                        Publicar Curso
                    </Button>
                </div>
            </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {courses.map(course => (
            <div key={course.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl hover:border-violet-500/30 transition-colors">
                <div className="flex items-center gap-4">
                    <img src={course.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                    <div>
                        <h3 className="font-bold text-white">{course.title}</h3>
                        <p className="text-sm text-gray-400">{course.level} • {course.modules} Módulos • {course.xp} XP</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">Publicado</span>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300"
                        onClick={() => deleteCourse(course.id)}
                    >
                        Excluir
                    </Button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};