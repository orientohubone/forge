import React, { useState } from 'react';
import { useCourses } from '../../context/CourseContext';
import { Button } from '../../components/ui/Button';
import { Course } from '../../types';
import { Layout, Video, ListChecks, Image as ImageIcon, Eye, Edit2 } from 'lucide-react';

export const CourseManager: React.FC = () => {
  const { courses, addCourse, deleteCourse } = useCourses();
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    level: 'Iniciante' as 'Iniciante' | 'Intermediário' | 'Avançado',
    category: 'Desenvolvimento',
    xp: 1000,
    modules: 5,
    duration: '10h',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    description: '',
    requirements: '',
    videoPreview: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      ...formData,
      xp: Number(formData.xp),
      modules: Number(formData.modules),
      tags: [formData.category],
      requirements: formData.requirements.split(',').map(r => r.trim()),
      status: 'published'
    });
    setIsCreating(false);
    // Reset
    setFormData({
        title: '',
        level: 'Iniciante',
        category: 'Desenvolvimento',
        xp: 1000,
        modules: 5,
        duration: '10h',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        description: '',
        requirements: '',
        videoPreview: ''
    });
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
        <div className="bg-white/5 border border-violet-500/30 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4">
            {/* Tabs */}
            <div className="flex border-b border-white/5">
                <button 
                    onClick={() => setActiveTab('edit')}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'edit' ? 'bg-violet-500/20 text-violet-400 border-b-2 border-violet-500' : 'text-gray-400 hover:bg-white/5'}`}
                >
                    <div className="flex items-center justify-center gap-2"><Edit2 size={16} /> Editor</div>
                </button>
                <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'preview' ? 'bg-emerald-500/20 text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-400 hover:bg-white/5'}`}
                >
                    <div className="flex items-center justify-center gap-2"><Eye size={16} /> Preview Aluno</div>
                </button>
            </div>

            {activeTab === 'edit' ? (
                <form onSubmit={handleCreate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="col-span-2">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Layout size={18} /> Informações Básicas</h3>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Título</label>
                        <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" placeholder="Ex: Introdução à IA Generativa" />
                    </div>
                    
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Categoria</label>
                        <input name="category" value={formData.category} onChange={handleChange} required className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" placeholder="Ex: Backend, Design, Dados..." />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Nível</label>
                        <select name="level" value={formData.level} onChange={handleChange} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none">
                            <option value="Iniciante">Iniciante</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Avançado">Avançado</option>
                        </select>
                    </div>

                    <div>
                         <label className="block text-xs text-gray-400 uppercase font-bold mb-2">XP Reward</label>
                         <input type="number" name="xp" value={formData.xp} onChange={handleChange} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Descrição Completa (Ementa)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" placeholder="Descreva o que o aluno vai aprender..." />
                    </div>

                    {/* Media & Requirements */}
                    <div className="col-span-2 mt-4">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Video size={18} /> Mídia e Requisitos</h3>
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">URL da Capa (Imagem)</label>
                        <input name="image" value={formData.image} onChange={handleChange} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Preview Vídeo (URL Embed)</label>
                        <input name="videoPreview" value={formData.videoPreview} onChange={handleChange} placeholder="https://youtube.com/embed/..." className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Pré-requisitos (separados por vírgula)</label>
                        <input name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Lógica básica, Inglês técnico..." className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none" />
                    </div>

                    <div className="col-span-2 pt-6 border-t border-white/5">
                        <Button type="submit" fullWidth className="bg-violet-600 hover:bg-violet-500 border-none py-4 shadow-lg shadow-violet-500/20">
                            Publicar Curso na Plataforma
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="p-8 bg-dark-900/50">
                    {/* Preview Card */}
                    <div className="max-w-sm mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="h-48 relative">
                            <img src={formData.image} className="w-full h-full object-cover" alt="Cover" />
                            <span className="absolute bottom-4 left-4 bg-violet-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">{formData.level}</span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white">{formData.title || "Título do Curso"}</h3>
                                <span className="text-emerald-400 font-bold text-sm">+{formData.xp} XP</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-3">{formData.description || "Descrição do curso aparecerá aqui..."}</p>
                            <div className="space-y-2 text-xs text-gray-500">
                                <div className="flex items-center gap-2"><ListChecks size={14} /> {formData.requirements ? "Requisitos definidos" : "Sem requisitos"}</div>
                                <div className="flex items-center gap-2"><Video size={14} /> {formData.videoPreview ? "Vídeo incluso" : "Sem vídeo"}</div>
                            </div>
                            <Button fullWidth className="mt-6 bg-white/10 border-none text-white">Ver Detalhes</Button>
                        </div>
                    </div>
                </div>
            )}
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