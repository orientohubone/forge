import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  TechOrbitDisplay, 
  AnimatedForm, 
  Ripple,
  Field
} from '../../components/ui/AnimatedLoginComponents';
import { Briefcase, GraduationCap, Rocket, Sparkles, Zap, Star, Code, Home } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
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
        // In our mock context, login acts as register too
        await login(email, role, name);
        
        if (role === 'instructor') {
            navigate('/instructor');
        } else {
            navigate('/dashboard');
        }
    } catch (err) {
        setError('Erro ao criar conta. Tente novamente.');
    }
  };

  // Configuração de Cores Baseada no Papel
  const themeColor = isInstructor ? "#8b5cf6" : "#10b981"; // Violet vs Emerald
  const buttonClass = isInstructor 
    ? "bg-violet-600 hover:bg-violet-500 shadow-violet-500/20" 
    : "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20";

  // Ícones para a animação orbital (Temática de "Início/Jornada")
  const icons = [
    {
        component: () => <Rocket size={30} className="text-white" />,
        className: "size-[50px] border-none bg-transparent",
        duration: 20,
        delay: 20,
        radius: 80,
    },
    {
        component: () => <Zap size={30} className="text-white" />,
        className: "size-[50px] border-none bg-transparent",
        duration: 20,
        delay: 10,
        radius: 80,
    },
    {
        component: () => <Star size={40} className="text-white" />,
        className: "size-[70px] border-none bg-transparent",
        duration: 20,
        delay: 10,
        radius: 140,
        reverse: true,
    },
    {
        component: () => <Code size={40} className="text-white" />,
        className: "size-[70px] border-none bg-transparent",
        duration: 20,
        delay: 20,
        radius: 140,
        reverse: true,
    },
    {
        component: () => <Sparkles size={50} className="text-white" />,
        className: "size-[90px] border-none bg-transparent",
        duration: 20,
        delay: 5,
        radius: 210,
    }
  ];

  const fields: Field[] = [
    {
      label: "Nome Completo",
      type: "text",
      placeholder: "Seu nome",
      required: true,
      value: name,
      onChange: (e) => setName(e.target.value)
    },
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
      placeholder: "Crie uma senha forte",
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
                            {isInstructor ? "Cadastro de Docente" : "Comece sua Jornada"}
                        </span>
                    </div>
                }
            />
         </div>
         {/* Overlay Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900 pointer-events-none z-20" />
      </div>

      {/* Lado Direito: Formulário */}
      {/* FIX: Added lg:pt-24 to push content down below Navbar on Desktop/Laptop */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start pt-32 pb-10 lg:justify-center lg:pt-24 relative p-6 min-h-screen">
          
          {/* Home Button (Absolute Top Right) */}
          {/* FIX: Changed lg:top-6 to lg:top-28 to sit below the Navbar */}
          <div className="absolute top-24 right-6 lg:top-28 z-30">
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
                    <h2 className="text-3xl font-bold text-white font-display">Criar Conta</h2>
                </div>
            }
            subHeader={isInstructor ? "Junte-se ao time de especialistas." : "Acesso ilimitado a cursos e desafios."}
            fields={fields}
            submitButton={isInstructor ? "Cadastrar como Instrutor" : "Criar Conta Grátis"}
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
                <p className="text-gray-400 text-sm">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition-colors">
                        Fazer Login
                    </Link>
                </p>
            }
          />
      </div>
    </div>
  );
};