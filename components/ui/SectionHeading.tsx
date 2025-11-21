import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = ''
}) => {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl mx-auto ${className}`}>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 font-display text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl leading-relaxed text-emerald-100/60 font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};