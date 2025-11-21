import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  fullWidth = false,
  asChild = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 border border-transparent",
    secondary: "bg-white text-dark-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    outline: "bg-transparent border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-950/30",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // If custom className is provided that conflicts with variants, the custom one usually wins in CSS cascade if it's later in the class list, 
  // but strictly speaking we should use tailwind-merge. 
  // For this specific "Synthetic Hero" implementation which passes full class strings, 
  // we will allow className to append to baseStyles but IF it contains specific overrides, relying on CSS order.
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (asChild) {
    return (
        <span className={combinedClassName} {...props}>
            {children}
        </span>
    )
  }

  return (
    <button 
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};