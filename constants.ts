import { 
  Gamepad2, 
  Trophy, 
  Zap, 
  Target, 
  Users, 
  BarChart3 
} from "lucide-react";
import { Feature, PricingPlan, Testimonial, Step, Stat, NavItem, Course, Mentor, BlogPost } from "./types";

export const APP_NAME = "Forgether";

// Navbar: Mix de âncoras (Home) e rotas
export const NAV_ITEMS: NavItem[] = [
  { label: "Como Funciona", path: "/#how-it-works", isAnchor: true },
  { label: "Recursos", path: "/#features", isAnchor: true },
  { label: "Cursos", path: "/courses", isAnchor: false },
  { label: "Mentores", path: "/mentors", isAnchor: false },
  { label: "Blog", path: "/blog", isAnchor: false },
];

export const HERO_STATS: Stat[] = [
  { value: "15k+", label: "Alunos Ativos" },
  { value: "98%", label: "Taxa de Conclusão" },
  { value: "4.9/5", label: "Avaliação Média" },
];

export const FEATURES: Feature[] = [
  {
    title: "Gamificação Real",
    description: "Ganhe XP, desbloqueie badges e suba no ranking global enquanto domina novas habilidades.",
    icon: Gamepad2,
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "Trilhas Adaptativas",
    description: "Nossa IA ajusta o ritmo e a dificuldade do conteúdo com base no seu desempenho em tempo real.",
    icon: Zap,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    title: "Certificação Verificada",
    description: "Emita certificados com hash único na blockchain para validar suas conquistas no LinkedIn.",
    icon: Trophy,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Desafios Práticos",
    description: "Nada de apenas teoria. Resolva problemas reais do mercado para provar seu conhecimento.",
    icon: Target,
    color: "text-red-600 bg-red-100",
  },
  {
    title: "Comunidade Peer-to-Peer",
    description: "Aprenda em grupo, faça code reviews e receba feedback de mentores da indústria.",
    icon: Users,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Analytics de Carreira",
    description: "Visualize seus pontos fortes e receba recomendações de vagas baseadas no seu perfil de skills.",
    icon: BarChart3,
    color: "text-cyan-600 bg-cyan-100",
  },
];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Defina seu Objetivo",
    description: "Escolha sua carreira de interesse ou deixe nossa IA analisar seu perfil para sugerir o melhor caminho.",
  },
  {
    number: "02",
    title: "Aprenda Jogando",
    description: "Complete módulos interativos, ganhe moedas virtuais e compita em desafios semanais.",
  },
  {
    number: "03",
    title: "Construa seu Portfólio",
    description: "Cada projeto concluído vira um case automático no seu perfil público para recrutadores.",
  },
];

export const PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 0",
    period: "/mês",
    description: "Ideal para começar a jornada e explorar trilhas básicas.",
    features: [
      { text: "Acesso a 5 trilhas introdutórias", included: true },
      { text: "Comunidade básica", included: true },
      { text: "Certificados simples", included: true },
      { text: "Mentoria ao vivo", included: false },
      { text: "Projetos práticos avançados", included: false },
    ],
    cta: "Começar Grátis",
    href: "/register",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Gamer",
    price: "R$ 49",
    period: "/mês",
    description: "Acelere sua carreira com acesso total e mentorias.",
    features: [
      { text: "Acesso ilimitado a todas as trilhas", included: true },
      { text: "Comunidade VIP + Mentores", included: true },
      { text: "Certificados verificados", included: true },
      { text: "1 Mentoria em grupo mensal", included: true },
      { text: "Code Review semanal", included: false },
    ],
    cta: "Assinar Pro",
    href: "/checkout?plan=pro",
    popular: true,
  },
  {
    id: "legendary",
    name: "Legendary",
    price: "R$ 99",
    period: "/mês",
    description: "Para quem busca excelência e acompanhamento individual.",
    features: [
      { text: "Tudo do plano Pro", included: true },
      { text: "Mentoria individual mensal", included: true },
      { text: "Acesso antecipado a novos cursos", included: true },
      { text: "Code Review ilimitado", included: true },
      { text: "Destaque no portal de talentos", included: true },
    ],
    cta: "Ser Lendário",
    href: "/checkout?plan=legendary",
    popular: false,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Mariana Costa",
    role: "UX Designer",
    company: "TechFlow",
    content: "A Forgether transformou a maneira como estudo. A gamificação me manteve motivada quando eu normalmente teria desistido.",
    avatar: "https://picsum.photos/100/100?random=1",
  },
  {
    id: 2,
    name: "Carlos Eduardo",
    role: "Frontend Dev",
    company: "StartUp Inc",
    content: "Os desafios práticos são o diferencial. Consegui meu emprego atual mostrando o portfólio que construí na plataforma.",
    avatar: "https://picsum.photos/100/100?random=2",
  },
  {
    id: 3,
    name: "Fernanda Lima",
    role: "Data Analyst",
    company: "DataBig",
    content: "A trilha adaptativa é incrível. Não perco tempo com o que já sei e foco no que preciso melhorar. Recomendo demais!",
    avatar: "https://picsum.photos/100/100?random=3",
  },
];

export const COURSES: Course[] = [
  {
    id: "c1",
    title: "Frontend Masterclass: React & Next.js",
    level: "Intermediário",
    category: "Desenvolvimento Web",
    description: "Domine a biblioteca mais popular do mundo. Aprenda Hooks, Context API, Server Components e construa aplicações performáticas do zero.",
    requirements: ["Lógica de Programação", "HTML/CSS Básico", "JavaScript ES6+"],
    xp: 2500,
    duration: "45h",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "Frontend", "Web"],
    modules: 12
  },
  {
    id: "c2",
    title: "Python para Data Science",
    level: "Iniciante",
    category: "Dados & IA",
    description: "Aprenda a linguagem mais usada em Ciência de Dados. Manipule grandes volumes de dados com Pandas, crie visualizações com Matplotlib e dê seus primeiros passos em Machine Learning.",
    requirements: ["Nenhum conhecimento prévio necessário"],
    xp: 1800,
    duration: "30h",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    tags: ["Python", "Data", "AI"],
    modules: 8
  },
  {
    id: "c3",
    title: "UX/UI Design System Avançado",
    level: "Avançado",
    category: "Design",
    description: "Aprofunde-se na criação de Design Systems escaláveis. Aprenda Tokens, Componentização no Figma, Documentação e como fazer o handoff perfeito para desenvolvedores.",
    requirements: ["Figma Intermediário", "Conceitos de UI"],
    xp: 3200,
    duration: "60h",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=800&auto=format&fit=crop",
    tags: ["Design", "Figma", "Systems"],
    modules: 15
  },
  {
    id: "c4",
    title: "DevOps & Cloud Infrastructure",
    level: "Avançado",
    category: "Infraestrutura",
    description: "Torne-se um especialista em CI/CD, Docker e Kubernetes. Entenda como orquestrar containers e escalar aplicações na nuvem AWS com segurança e eficiência.",
    requirements: ["Linux Básico", "Redes de Computadores"],
    xp: 4000,
    duration: "55h",
    image: "https://images.unsplash.com/photo-1667372393119-c85c02088b67?q=80&w=800&auto=format&fit=crop",
    tags: ["AWS", "Docker", "CI/CD"],
    modules: 18
  }
];

export const MENTORS: Mentor[] = [
  {
    id: "m1",
    name: "Roberto Silva",
    role: "Senior Software Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    specialties: ["System Design", "Backend", "Golang"],
    bio: "10 anos de experiência em sistemas distribuídos de alta escala."
  },
  {
    id: "m2",
    name: "Ana Paula",
    role: "Lead Product Designer",
    company: "Nubank",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    specialties: ["UX Research", "Design Ops", "Figma"],
    bio: "Especialista em criar experiências financeiras acessíveis e intuitivas."
  },
  {
    id: "m3",
    name: "Diego Santos",
    role: "CTO",
    company: "StartupX",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    specialties: ["Leadership", "Startup", "Fullstack"],
    bio: "Fundador de 3 startups tech com exits bem sucedidos."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "p1",
    title: "O Futuro da IA na Educação",
    excerpt: "Como algoritmos generativos estão personalizando a jornada de aprendizado.",
    date: "12 Out, 2023",
    category: "Inovação",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p2",
    title: "5 Dicas para seu primeiro emprego Tech",
    excerpt: "O que os recrutadores realmente olham além do código no GitHub.",
    date: "05 Out, 2023",
    category: "Carreira",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "p3",
    title: "Design System: Por onde começar?",
    excerpt: "Guia prático para unificar a identidade visual do seu produto digital.",
    date: "28 Set, 2023",
    category: "Design",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop"
  }
];