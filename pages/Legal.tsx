import React from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { APP_NAME } from '../constants';

export const Legal: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-dark-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
            title="Termos e Privacidade" 
            subtitle="Transparência total sobre como cuidamos dos seus dados."
            align="left"
        />
        
        <div className="mt-12 space-y-12">
            <section className="bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 font-display">1. Termos de Uso</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                    Ao acessar o {APP_NAME}, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
                </p>
            </section>

            <section className="bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 font-display">2. Uso de Licença</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                    É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site {APP_NAME}, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título, e sob esta licença você não pode: modificar ou copiar os materiais; usar os materiais para qualquer finalidade comercial ou para exibição pública.
                </p>
            </section>

            <section className="bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 font-display">3. Gamificação e Moedas Virtuais</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                    As moedas virtuais (XP/Coins) adquiridos na plataforma não possuem valor monetário real fora do ambiente da {APP_NAME} e não podem ser trocados por moeda fiduciária. Elas servem exclusivamente para desbloquear funcionalidades e personalizar a experiência dentro da plataforma.
                </p>
            </section>

            <section className="bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 font-display">4. Privacidade</h3>
                <p className="text-gray-400 leading-relaxed font-light">
                    Sua privacidade é importante para nós. É política do {APP_NAME} respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site {APP_NAME}, e outros sites que possuímos e operamos. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};