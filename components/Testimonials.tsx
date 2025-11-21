import React from 'react';
import { Quote } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-dark-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Quem joga, aprova" 
          subtitle="Junte-se a milhares de profissionais que mudaram de carreira com a LearnHub Pro."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col h-full">
              <div className="mb-6 text-emerald-500/50">
                <Quote size={40} strokeWidth={1} />
              </div>
              <p className="text-emerald-100/80 italic mb-8 flex-1 leading-relaxed text-sm font-light">
                "{t.content}"
              </p>
              <div className="flex items-center mt-auto">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-10 h-10 rounded-full object-cover mr-4 ring-2 ring-emerald-500/30 grayscale group-hover:grayscale-0"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-emerald-500/60">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};