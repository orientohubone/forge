import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { STEPS } from '../constants';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-dark-950 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="A jornada do herói é sua" 
          subtitle="Uma metodologia simples e poderosa para levar você do zero ao nível sênior."
        />

        <div className="relative mt-20">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-white/10 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {STEPS.map((step, index) => (
              <div key={index} className="relative text-center p-4 md:p-0 group">
                
                {/* Number Circle */}
                <div className="w-20 h-20 mx-auto bg-dark-900 rounded-full border-4 border-dark-950 shadow-xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/50">
                  <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-500 font-display">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 font-display">
                  {step.title}
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto font-light text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};