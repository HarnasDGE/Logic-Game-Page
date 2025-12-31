import React from 'react';
import { cn } from '@lib/utils/cn';

export interface FloatingIconProps {
  icon: string;
  className?: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * FloatingIcon Component - Atomic Design: Atom
 *
 * Floating animated icon/emoji for background decoration
 * Creates dynamic, playful atmosphere
 *
 * @example
 * <FloatingIcon icon="🎯" size="md" delay={0.5} />
 */
export const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon,
  className,
  delay = 0,
  size = 'md',
}) => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <div
      className={cn(
        'absolute animate-float opacity-20 pointer-events-none',
        sizes[size],
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${3 + delay}s`,
      }}
    >
      {icon}
    </div>
  );
};
