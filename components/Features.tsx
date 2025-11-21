import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { FEATURES } from '../constants';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading 
          title="Tecnologia que impulsiona" 
          subtitle="Esqueça as videoaulas passivas. Aqui você interage, constrói e evolui com ferramentas de última geração." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                {feature.title}
              </h3>
              <p className="text-emerald-100/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};