import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-dark-900">
      <div className="max-w-5xl mx-auto relative bg-gradient-to-r from-emerald-900 to-teal-900 rounded-[2.5rem] p-12 md:p-24 overflow-hidden text-center border border-emerald-500/20 shadow-2xl shadow-emerald-900/20">
        
        {/* Abstract Glows */}
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-emerald-100/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Junte-se a mais de 15.000 alunos e comece a construir o futuro da sua carreira hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 hover:text-emerald-950 border-none shadow-lg font-bold">
              Criar Conta Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <p className="mt-6 text-emerald-200/40 text-xs uppercase tracking-widest">
            Sem cartão de crédito necessário para o plano Starter
          </p>
        </div>
      </div>
    </section>
  );
};