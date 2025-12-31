import React from 'react';
import { CategoryCard } from '@components/molecules';
import { Brain, Calculator, Grid3x3, Crosshair, Lightbulb, Zap, BookOpen, Puzzle } from 'lucide-react';
import { cn } from '@lib/utils/cn';
import type { QuizCategory } from '@types/index';

export interface CategoryGridProps {
  className?: string;
  onCategoryClick?: (category: QuizCategory) => void;
}

/**
 * CategoryGrid Component - Atomic Design: Organism
 *
 * Grid of quiz categories with icons.
 * Mobile-first responsive grid layout.
 *
 * @example
 * <CategoryGrid onCategoryClick={handleCategoryClick} />
 */
export const CategoryGrid: React.FC<CategoryGridProps> = ({ className, onCategoryClick }) => {
  const categories = [
    {
      category: 'trivia' as QuizCategory,
      count: 2500,
      icon: <Brain size={32} />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      category: 'logic' as QuizCategory,
      count: 1800,
      icon: <Puzzle size={32} />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      category: 'math' as QuizCategory,
      count: 1200,
      icon: <Calculator size={32} />,
      color: 'from-green-500 to-green-600',
    },
    {
      category: 'sudoku' as QuizCategory,
      count: 950,
      icon: <Grid3x3 size={32} />,
      color: 'from-orange-500 to-orange-600',
    },
    {
      category: 'crossword' as QuizCategory,
      count: 780,
      icon: <Crosshair size={32} />,
      color: 'from-red-500 to-red-600',
    },
    {
      category: 'riddles' as QuizCategory,
      count: 1500,
      icon: <Lightbulb size={32} />,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      category: 'memory' as QuizCategory,
      count: 650,
      icon: <Zap size={32} />,
      color: 'from-pink-500 to-pink-600',
    },
    {
      category: 'word-games' as QuizCategory,
      count: 890,
      icon: <BookOpen size={32} />,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-base sm:text-lg text-dark-600 max-w-2xl mx-auto">
            Explore our vast collection of quizzes organized by category. Find your favorite
            type of challenge!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.category}
              category={cat.category}
              count={cat.count}
              icon={cat.icon}
              color={cat.color}
              onClick={() => onCategoryClick?.(cat.category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
