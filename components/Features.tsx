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
              className="group relative h-full rounded-3xl overflow-hidden p-[1px] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Animated Rotating Border Gradient - Visible on Hover */}
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#0f172a_50%,#10b981_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Inner Card Content */}
              <div className="relative h-full bg-dark-900 rounded-[calc(1.5rem-1px)] p-8 border border-white/5 group-hover:border-transparent transition-colors backdrop-blur-xl">
                
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};