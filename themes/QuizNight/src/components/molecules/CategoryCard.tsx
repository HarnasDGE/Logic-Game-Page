import React from 'react';
import { Card, Badge } from '@components/atoms';
import { cn } from '@lib/utils/cn';
import { ChevronRight } from 'lucide-react';
import type { QuizCategory } from '@types/index';

export interface CategoryCardProps {
  category: QuizCategory;
  count: number;
  icon: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * CategoryCard Component - Atomic Design: Molecule
 *
 * Interactive category card with icon, count, and hover effects.
 * Optimized for mobile touch interactions.
 *
 * @example
 * <CategoryCard category="trivia" count={45} icon={<Brain />} />
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  count,
  icon,
  color = 'from-primary-500 to-primary-600',
  className,
  onClick,
}) => {
  const categoryLabels: Record<QuizCategory, string> = {
    trivia: 'Trivia',
    logic: 'Logic Puzzles',
    math: 'Math Games',
    sudoku: 'Sudoku',
    crossword: 'Crosswords',
    riddles: 'Riddles',
    memory: 'Memory Games',
    'word-games': 'Word Games',
    general: 'General',
  };

  return (
    <Card
      variant="default"
      padding="md"
      hoverable
      className={cn(
        'relative overflow-hidden cursor-pointer group',
        'active:scale-95 transition-transform',
        className
      )}
      onClick={onClick}
      as="article"
    >
      {/* Background gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity',
          color
        )}
      />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16',
            'flex items-center justify-center',
            'rounded-xl bg-gradient-to-br',
            'text-white shadow-lg',
            'group-hover:scale-110 transition-transform',
            color
          )}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8">{icon}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-dark-900 mb-1 group-hover:text-primary-600 transition-colors">
            {categoryLabels[category]}
          </h3>
          <p className="text-sm text-dark-600">
            {count} {count === 1 ? 'quiz' : 'quizzes'} available
          </p>
        </div>

        {/* Arrow icon */}
        <div className="flex-shrink-0 text-dark-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all">
          <ChevronRight size={20} />
        </div>
      </div>

      {/* Count badge (optional alternate display) */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Badge variant="primary" size="sm">
          {count}
        </Badge>
      </div>
    </Card>
  );
};
