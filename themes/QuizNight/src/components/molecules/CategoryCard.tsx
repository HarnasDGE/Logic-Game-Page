import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface CategoryCardProps {
  title: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeMinutes: number;
  className?: string;
  onClick?: () => void;
}

/**
 * CategoryCard Component - LogicLeague Style
 *
 * Shows category with icon, difficulty bar, time, and play button
 *
 * @example
 * <CategoryCard title="Geography" icon="🌍" difficulty="medium" timeMinutes={15} />
 */
export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  difficulty,
  timeMinutes,
  className,
  onClick,
}) => {
  const difficultyColors = {
    easy: 'bg-accent-400',
    medium: 'bg-secondary-400',
    hard: 'bg-primary-500',
  };

  const difficultyWidth = {
    easy: 'w-1/3',
    medium: 'w-2/3',
    hard: 'w-full',
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-primary-300',
        className
      )}
      onClick={onClick}
    >
      {/* Icon/Illustration */}
      <div className="w-full aspect-square mb-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
        <div className="text-8xl">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-display font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>

      {/* Difficulty bar */}
      <div className="mb-3">
        <div className="text-xs font-semibold text-dark-500 mb-1.5 uppercase tracking-wide">
          Difficulty
        </div>
        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              difficultyColors[difficulty],
              difficultyWidth[difficulty]
            )}
          />
        </div>
      </div>

      {/* Time and Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-dark-600">
          <Clock size={16} />
          <span className="text-sm font-medium">{timeMinutes} min</span>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-lg transition-all group-hover:scale-105">
          Zagraj
        </button>
      </div>
    </div>
  );
};
