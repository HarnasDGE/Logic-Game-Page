import React from 'react';
import { cn } from '@lib/utils/cn';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

/**
 * Card Component - Atomic Design: Atom
 *
 * Flexible card container with multiple variants and interactive states.
 * Optimized for mobile-first responsive layouts.
 *
 * @example
 * <Card variant="elevated" hoverable>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  as: Component = 'div',
}) => {
  const variants = {
    default: 'bg-white shadow-card',
    bordered: 'bg-white border-2 border-dark-200',
    elevated: 'bg-white shadow-card-hover',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <Component
      className={cn(
        'rounded-2xl transition-all duration-300',
        variants[variant],
        paddings[padding],
        hoverable && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-1',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </Component>
  );
};

// Card sub-components
export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={cn('mb-4', className)}>{children}</div>;

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <h3 className={cn('text-xl font-bold text-dark-900', className)}>{children}</h3>;

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <p className={cn('text-sm text-dark-600 mt-1', className)}>{children}</p>;

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={cn('', className)}>{children}</div>;

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={cn('mt-4 pt-4 border-t border-dark-100', className)}>{children}</div>;
