import React from 'react';
import { SectionHeading } from './ui/SectionHeading';
import { STEPS } from '../constants';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-dark-950 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="A jornada do herói é sua" 
          subtitle="Uma metodologia simples e poderosa para levar você do zero ao nível sênior."
        />

        <div className="relative mt-24">
          {/* 
            Background Line (Static Gray) 
            Positioned absolutely to align with the center of the circles
          */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-1 bg-white/5 z-0 rounded-full"></div>
          
          {/* 
            Animated Green Line (The Light Beam)
            We animate the width/scaleX to simulate flow
          */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-1 z-0 rounded-full overflow-hidden">
             <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 box-shadow-[0_0_20px_#10b981]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 2.5, 
                    ease: "linear",
                    delay: 0.5 // Wait for first circle to pop
                }}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {STEPS.map((step, index) => {
              // Timings based on the line animation
              // Total line duration is 2.5s.
              // Step 1: Starts immediately (delay 0)
              // Step 2: Starts when line reaches 50% (approx 1.25s + delay)
              // Step 3: Starts when line reaches 100% (approx 2.5s + delay)
              
              const delay = index * 1.25; 

              return (
                <div key={index} className="relative text-center p-4 md:p-0 group">
                  
                  {/* Animated Circle Wrapper */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, borderColor: "rgba(255,255,255,0.05)" }}
                    whileInView={{ 
                        scale: 1, 
                        opacity: 1,
                        borderColor: "#10b981", // Emerald-500
                        boxShadow: "0 0 40px rgba(16, 185, 129, 0.3)"
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                        duration: 0.5, 
                        delay: delay,
                        type: "spring",
                        stiffness: 200
                    }}
                    className="w-20 h-20 mx-auto bg-dark-900 rounded-full border-4 flex items-center justify-center mb-8 relative z-10"
                  >
                    {/* Pulsing Inner Glow (Infinite) */}
                    <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: delay }}
                        className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md"
                    />

                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-500 font-display relative z-20">
                      {step.number}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.2, duration: 0.5 }}
                  >
                      <h3 className="text-2xl font-bold text-white mb-4 font-display">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 max-w-xs mx-auto font-light text-sm leading-relaxed">
                        {step.description}
                      </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};