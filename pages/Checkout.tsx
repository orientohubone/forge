import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PLANS } from '../constants';
import { Button } from '../components/ui/Button';

export const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get('plan');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPlan = PLANS.find(p => p.id === planId);

  // Redirect if no valid plan is selected (or if it's starter)
  useEffect(() => {
    if (!selectedPlan || selectedPlan.id === 'starter') {
        navigate('/#pricing');
    }
  }, [selectedPlan, navigate]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Payment Processing
    setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        // Redirect to dashboard after showing success for a moment
        setTimeout(() => {
            navigate('/register'); // In real app, maybe create account first or pass token
        }, 3000);
    }, 2000);
  };

  if (!selectedPlan) return null;

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
            <div className="bg-white/5 border border-emerald-500/30 p-8 rounded-3xl text-center max-w-md w-full backdrop-blur-md animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Pagamento Confirmado!</h2>
                <p className="text-gray-400 mb-6">Sua assinatura {selectedPlan.name} está ativa. Redirecionando para criação de conta...</p>
                <Button onClick={() => navigate('/register')} fullWidth>
                    Acessar Plataforma
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
            
            <Link to="/#pricing" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Voltar aos Planos
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-900/20 to-dark-950 border border-emerald-500/20 rounded-3xl p-8">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-4">Resumo do Pedido</h3>
                        <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white">{selectedPlan.name}</h2>
                                <p className="text-emerald-400 text-sm">{selectedPlan.period}</p>
                            </div>
                            <p className="text-4xl font-bold text-white">{selectedPlan.price}</p>
                        </div>
                        
                        <ul className="space-y-3 mb-8">
                            {selectedPlan.features.filter(f => f.included).map((feat, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-emerald-500 mr-2 mt-0.5 shrink-0" />
                                    {feat.text}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-3 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                            <ShieldCheck size={24} className="text-emerald-400" />
                            <div>
                                <p className="text-white font-bold text-sm">Garantia de 7 dias</p>
                                <p className="text-xs text-gray-400">Satisfação garantida ou seu dinheiro de volta.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white">Dados de Pagamento</h2>
                            <div className="flex gap-2">
                                <div className="w-8 h-5 bg-white/10 rounded"></div>
                                <div className="w-8 h-5 bg-white/10 rounded"></div>
                                <div className="w-8 h-5 bg-white/10 rounded"></div>
                            </div>
                        </div>

                        <form onSubmit={handlePayment} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nome no Cartão</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                    placeholder="COMO NO CARTAO"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Número do Cartão</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-emerald-500 focus:outline-none"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        required
                                    />
                                    <CreditCard className="absolute left-4 top-3.5 text-gray-500" size={20} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Validade</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                        placeholder="MM/AA"
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">CVV</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                                        placeholder="123"
                                        maxLength={3}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button 
                                    type="submit" 
                                    fullWidth 
                                    size="lg" 
                                    disabled={isLoading}
                                    className="bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 text-white"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                            Processando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Lock size={16} className="mr-2" />
                                            Pagar {selectedPlan.price}
                                        </span>
                                    )}
                                </Button>
                                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
                                    <Lock size={12} className="mr-1" /> Pagamento 100% Seguro e Criptografado
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};