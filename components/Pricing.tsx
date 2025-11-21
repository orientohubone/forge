import React from 'react';
import { Check, X as XIcon } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { PLANS } from '../constants';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-dark-900 relative overflow-hidden">
       
       {/* Background Glows */}
       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Investimento Flexível" 
          subtitle="Escolha o plano que se adapta ao seu momento profissional." 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                  ? 'bg-white/5 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                  : 'bg-transparent border-white/10 hover:bg-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-emerald-100/60 text-sm h-10 leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    {feature.included ? (
                      <div className="p-1 rounded-full bg-emerald-500/20 mr-3 mt-0.5">
                         <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="p-1 rounded-full bg-white/5 mr-3 mt-0.5">
                         <XIcon className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? 'primary' : 'outline'} 
                fullWidth
                className={!plan.popular ? 'text-white border-white/10 hover:bg-white/5 hover:border-emerald-500/50 hover:text-emerald-400' : 'shadow-lg shadow-emerald-500/20'}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};