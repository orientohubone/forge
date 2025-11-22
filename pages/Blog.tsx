import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { BLOG_POSTS } from '../constants';

export const Blog: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
            title="Blog Forgether" 
            subtitle="Artigos, tutoriais e insights sobre carreira e tecnologia."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
                <article key={post.id} className="bg-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-white/5 hover:border-emerald-500/30 flex flex-col group">
                    <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-dark-900/20 z-10 group-hover:bg-transparent transition-all"></div>
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-5 uppercase tracking-wider">
                            <span className="text-emerald-400 font-bold border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">{post.category}</span>
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center"><Calendar size={12} className="mr-1.5"/> {post.date}</span>
                                <span className="flex items-center"><Clock size={12} className="mr-1.5"/> {post.readTime}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4 font-display group-hover:text-emerald-400 transition-colors cursor-pointer leading-tight">
                            {post.title}
                        </h3>
                        <p className="text-emerald-100/60 text-sm leading-relaxed mb-8 flex-1 font-light">
                            {post.excerpt}
                        </p>
                        <a href="#" className="inline-flex items-center text-white font-bold text-sm hover:text-emerald-400 transition-colors mt-auto">
                            Ler artigo completo 
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-emerald-500" />
                        </a>
                    </div>
                </article>
            ))}
        </div>
      </div>
    </div>
  );
};