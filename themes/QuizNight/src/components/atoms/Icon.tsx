import React from 'react';
import { cn } from '@lib/utils/cn';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  'aria-label'?: string;
}

/**
 * Icon Component - Atomic Design: Atom
 *
 * Wrapper for Lucide React icons with consistent sizing.
 * Uses lucide-react library for icons.
 *
 * @example
 * <Icon name="play" size="md" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  return (
    <svg
      className={cn(sizes[size], className)}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};

// Export individual icon components wrapper
export { default as LucideIcon } from 'lucide-react';
