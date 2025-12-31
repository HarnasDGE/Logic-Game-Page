import React from 'react';
import { cn } from '@lib/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Badge Component - Atomic Design: Atom
 *
 * Small status or category indicators with color variants.
 * Mobile-optimized sizing.
 *
 * @example
 * <Badge variant="success">Completed</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    neutral: 'bg-dark-100 text-dark-700 border-dark-200',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'font-medium rounded-full border',
        'transition-colors duration-200',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  );
};
