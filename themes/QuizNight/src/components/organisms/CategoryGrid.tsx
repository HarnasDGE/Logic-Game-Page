import React from 'react';
import { CategoryCard } from '@components/molecules';
import { cn } from '@lib/utils/cn';

export interface CategoryGridProps {
  className?: string;
}

const categories = [
  { title: 'Movies & TV', icon: '🎬', difficulty: 'easy' as const, timeMinutes: 18 },
  { title: 'Geography', icon: '🌍', difficulty: 'medium' as const, timeMinutes: 18 },
  { title: 'History & Science', icon: '📚', difficulty: 'hard' as const, timeMinutes: 15 },
  { title: 'Sports', icon: '⚽', difficulty: 'medium' as const, timeMinutes: 18 },
  { title: 'Arts & Culture', icon: '🎨', difficulty: 'easy' as const, timeMinutes: 15 },
  { title: 'Math & Logic', icon: '🧪', difficulty: 'medium' as const, timeMinutes: 15 },
  { title: 'World Records', icon: '🏆', difficulty: 'hard' as const, timeMinutes: 15 },
  { title: 'Nature & Animals', icon: '⛰️', difficulty: 'medium' as const, timeMinutes: 18 },
];

/**
 * CategoryGrid Component - Grid of knowledge categories
 *
 * Displays category cards in responsive grid
 *
 * @example
 * <CategoryGrid />
 */
export const CategoryGrid: React.FC<CategoryGridProps> = ({ className }) => {
  return (
    <section className={cn('py-16 sm:py-24 bg-gray-50', className)}>
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-4">
            Discover Your Knowledge Category
          </h2>
          <p className="text-lg sm:text-xl text-dark-600 max-w-2xl mx-auto">
            Choose a topic that interests you and test your knowledge!
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              difficulty={category.difficulty}
              timeMinutes={category.timeMinutes}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
