import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: 'student' | 'instructor', name?: string) => Promise<void>;
  logout: () => void;
  addXP: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock User Generator
const createMockUser = (email: string, role: 'student' | 'instructor', name: string): User => ({
  id: Math.random().toString(36).substr(2, 9),
  name: name || (role === 'instructor' ? 'Professor ' : 'Aluno ') + email.split('@')[0],
  email: email,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || email}`,
  level: role === 'instructor' ? 99 : 3,
  currentXP: role === 'instructor' ? 99999 : 2450,
  nextLevelXP: 3000,
  streakDays: 12,
  role: role,
  badges: [
    { id: 'b1', name: 'Primeiros Passos', icon: '🚀', unlockedAt: '2023-01-15' },
    { id: 'b2', name: 'Bug Hunter', icon: '🐛', unlockedAt: '2023-02-20' },
    { id: 'b3', name: 'Code Ninja', icon: '⚔️', unlockedAt: '2023-03-10' },
  ]
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de sessão persistida
    const storedUser = localStorage.getItem('learnhub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: 'student' | 'instructor' = 'student', name: string = '') => {
    setIsLoading(true);
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = createMockUser(email, role, name);
    setUser(newUser);
    localStorage.setItem('learnhub_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnhub_user');
  };

  const addXP = (amount: number) => {
    if (!user) return;
    
    const updatedUser = { ...user, currentXP: user.currentXP + amount };
    // Lógica simples de Level Up
    if (updatedUser.currentXP >= updatedUser.nextLevelXP) {
      updatedUser.level += 1;
      updatedUser.nextLevelXP = Math.floor(updatedUser.nextLevelXP * 1.5);
    }
    
    setUser(updatedUser);
    localStorage.setItem('learnhub_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, addXP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};