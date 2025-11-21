import React from 'react';
import { Linkedin, Calendar } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { MENTORS } from '../constants';

export const Mentors: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-dark-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
            title="Mestres da Guilda" 
            subtitle="Aprenda diretamente com quem constrói o mercado de tecnologia mundial."
            align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {MENTORS.map((mentor) => (
                <div key={mentor.id} className="bg-white/5 rounded-3xl p-8 text-center border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300 relative group backdrop-blur-sm">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                        <img 
                            src={mentor.image} 
                            alt={mentor.name} 
                            className="w-full h-full object-cover rounded-full ring-4 ring-white/10 shadow-2xl grayscale group-hover:grayscale-0 transition-all"
                        />
                        <div className="absolute bottom-0 right-0 bg-[#0077b5] text-white p-2 rounded-full shadow-lg">
                            <Linkedin size={14} />
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-white font-display mb-1">{mentor.name}</h3>
                    <p className="text-emerald-400 font-medium text-sm mb-1">{mentor.role}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-5">at {mentor.company}</p>

                    <p className="text-emerald-100/60 text-sm mb-8 leading-relaxed font-light">
                        "{mentor.bio}"
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {mentor.specialties.map(spec => (
                            <span key={spec} className="px-3 py-1 bg-dark-900/50 rounded-full text-[10px] font-semibold text-gray-300 border border-white/10">
                                {spec}
                            </span>
                        ))}
                    </div>

                    <Button variant="primary" size="sm" className="w-full shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/30">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar Sessão
                    </Button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};