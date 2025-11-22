import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  TechOrbitDisplay, 
  AnimatedForm, 
  Ripple,
  Field
} from '../../components/ui/AnimatedLoginComponents';
import { Briefcase, GraduationCap, Code2, Cpu, Globe, Database, Award, Home } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        const role = isInstructor ? 'instructor' : 'student';
        await login(email, role);
        
        if (role === 'instructor') {
            navigate('/instructor');
        } else {
            navigate('/dashboard');
        }
    } catch (err) {
        setError('Falha ao realizar login. Tente novamente.');
    }
  };

  // Configuração de Cores Baseada no Papel
  const themeColor = isInstructor ? "#8b5cf6" : "#10b981"; // Violet vs Emerald
  const buttonClass = isInstructor 
    ? "bg-violet-600 hover:bg-violet-500 shadow-violet-500/20" 
    : "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20";

  // Ícones para a animação orbital
  const icons = [
    {
        component: () => <Code2 size={30} className="text-white" />,
        className: "size-[50px] border-none bg-transparent",
        duration: 20,
        delay: 20,
        radius: 80,
    },
    {
        component: () => <Cpu size={30} className="text-white" />,
        className: "size-[50px] border-none bg-transparent",
        duration: 20,
        delay: 10,
        radius: 80,
    },
    {
        component: () => <Globe size={40} className="text-white" />,
        className: "size-[70px] border-none bg-transparent",
        duration: 20,
        delay: 10,
        radius: 140,
        reverse: true,
    },
    {
        component: () => <Database size={40} className="text-white" />,
        className: "size-[70px] border-none bg-transparent",
        duration: 20,
        delay: 20,
        radius: 140,
        reverse: true,
    },
    {
        component: () => <Award size={50} className="text-white" />,
        className: "size-[90px] border-none bg-transparent",
        duration: 20,
        delay: 5,
        radius: 210,
    }
  ];

  const fields: Field[] = [
    {
      label: "Email",
      type: "email",
      placeholder: isInstructor ? "professor@forgether.com" : "aluno@email.com",
      required: true,
      value: email,
      onChange: (e) => setEmail(e.target.value)
    },
    {
      label: "Senha",
      type: "password",
      placeholder: "••••••••",
      required: true,
      value: password,
      onChange: (e) => setPassword(e.target.value)
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-dark-900">
      
      {/* Lado Esquerdo: Visual Orbitante (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-dark-950/50 border-r border-white/5 h-screen sticky top-0 overflow-hidden">
         <Ripple mainCircleSize={300} mainCircleOpacity={0.15} numCircles={6} />
         <div className="absolute inset-0 z-10">
            <TechOrbitDisplay 
                iconsArray={icons}
                text={
                    <div className="text-center z-20 relative">
                         <span className="text-5xl font-bold font-display tracking-tight text-white block mb-2">
                            For<span style={{ color: themeColor }}>gether</span>
                        </span>
                        <span className="text-lg text-gray-400 font-light">
                            {isInstructor ? "Painel Pedagógico" : "Aprenda com inovação"}
                        </span>
                    </div>
                }
            />
         </div>
         {/* Overlay Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900 pointer-events-none z-20" />
      </div>

      {/* Lado Direito: Formulário */}
      {/* Adjusted lg:pt-32 for better Laptop clearance */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start pt-32 pb-10 lg:justify-center lg:pt-32 relative p-6 min-h-screen">
          
          {/* Home Button (Absolute Top Right) */}
          <div className="absolute top-24 right-6 lg:top-32 z-30">
            <Link 
                to="/" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg backdrop-blur-sm"
                title="Voltar para Home"
            >
                <Home size={20} />
            </Link>
          </div>

          <AnimatedForm 
            header={
                <div className="mb-1">
                    <h2 className="text-3xl font-bold text-white font-display">Bem-vindo de volta</h2>
                </div>
            }
            subHeader={isInstructor ? "Gerencie suas turmas e conteúdos." : "Continue sua jornada de evolução."}
            fields={fields}
            submitButton={isInstructor ? "Acessar Painel" : "Entrar na Plataforma"}
            onSubmit={handleSubmit}
            errorField={error}
            highlightColor={themeColor}
            buttonColorClass={buttonClass}
            isLoading={isLoading}
            topContent={
                <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-2 backdrop-blur-md">
                    <button 
                        type="button"
                        onClick={() => setIsInstructor(false)}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium transition-all ${!isInstructor ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        <GraduationCap size={16} className="mr-2" />
                        Aluno
                    </button>
                    <button 
                        type="button"
                        onClick={() => setIsInstructor(true)}
                        className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm font-medium transition-all ${isInstructor ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Briefcase size={16} className="mr-2" />
                        Instrutor
                    </button>
                </div>
            }
            textVariantButton={
                !isInstructor && (
                    <p className="text-gray-400 text-sm">
                        Ainda não tem conta?{' '}
                        <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition-colors">
                            Criar conta grátis
                        </Link>
                    </p>
                )
            }
          />
      </div>
    </div>
  );
};