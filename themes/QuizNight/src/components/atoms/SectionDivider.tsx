import React from 'react';
import { cn } from '@lib/utils/cn';

export interface SectionDividerProps {
  variant?: 'dots' | 'waves' | 'zigzag' | 'stars' | 'puzzle' | 'brain';
  className?: string;
}

/**
 * SectionDivider Component - Atomic Design: Atom
 *
 * Animated decorative section dividers with unique icons/shapes
 * Each variant has its own personality and animation
 *
 * @example
 * <SectionDivider variant="puzzle" />
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ variant = 'stars', className }) => {
  const variants = {
    dots: (
      <div className="flex items-center justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    ),
    waves: (
      <div className="flex items-center justify-center gap-1">
        <span className="text-4xl animate-float" style={{ animationDelay: '0s' }}>〰</span>
        <span className="text-4xl animate-float" style={{ animationDelay: '0.2s' }}>〰</span>
        <span className="text-4xl animate-float" style={{ animationDelay: '0.4s' }}>〰</span>
      </div>
    ),
    zigzag: (
      <div className="flex items-center justify-center gap-0.5 text-3xl text-primary-500">
        {[...Array(7)].map((_, i) => (
          <span
            key={i}
            className="inline-block animate-float"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {i % 2 === 0 ? '⌃' : '⌄'}
          </span>
        ))}
      </div>
    ),
    stars: (
      <div className="flex items-center justify-center gap-3">
        <span className="text-2xl animate-spin-slow">✦</span>
        <span className="text-3xl animate-pulse text-primary-500">★</span>
        <span className="text-2xl animate-spin-slow" style={{ animationDirection: 'reverse' }}>✦</span>
      </div>
    ),
    puzzle: (
      <div className="flex items-center justify-center gap-2">
        {['🧩', '🎯', '🎲', '🎮', '🧠'].map((emoji, i) => (
          <span
            key={i}
            className="text-2xl animate-float"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>
    ),
    brain: (
      <div className="flex items-center justify-center gap-4">
        <span className="text-3xl animate-wiggle">🧠</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <span className="text-3xl animate-wiggle" style={{ animationDelay: '0.5s' }}>💡</span>
      </div>
    ),
  };

  return (
    <div className={cn('py-6 sm:py-8 flex items-center justify-center', className)}>
      {variants[variant]}
    </div>
  );
};
