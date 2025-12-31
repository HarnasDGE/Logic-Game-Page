import React, { useState } from 'react';
import { QuizCard } from '@components/molecules';
import { Button, Badge } from '@components/atoms';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { cn } from '@lib/utils/cn';
import type { Quiz, QuizCategory, QuizDifficulty } from '@types/index';

export interface QuizGridProps {
  quizzes: Quiz[];
  title?: string;
  description?: string;
  showFilters?: boolean;
  className?: string;
  onPlayQuiz?: (quizId: string) => void;
}

/**
 * QuizGrid Component - Atomic Design: Organism
 *
 * Grid layout displaying quiz cards with filtering options.
 * Responsive grid that adapts to screen size.
 * Mobile-first design with touch-friendly controls.
 *
 * @example
 * <QuizGrid quizzes={quizData} showFilters onPlayQuiz={handlePlay} />
 */
export const QuizGrid: React.FC<QuizGridProps> = ({
  quizzes,
  title = 'Featured Quizzes',
  description,
  showFilters = true,
  className,
  onPlayQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | 'all'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const categories: Array<QuizCategory | 'all'> = [
    'all',
    'trivia',
    'logic',
    'math',
    'sudoku',
    'crossword',
    'riddles',
  ];

  const difficulties: Array<QuizDifficulty | 'all'> = ['all', 'easy', 'medium', 'hard', 'expert'];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch = selectedCategory === 'all' || quiz.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-2">
                {title}
              </h2>
              {description && (
                <p className="text-base sm:text-lg text-dark-600">{description}</p>
              )}
            </div>

            {showFilters && (
              <Button
                variant="outline"
                size="md"
                leftIcon={<SlidersHorizontal size={18} />}
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="sm:hidden w-full"
              >
                Filters
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div
              className={cn(
                'space-y-4',
                'sm:block',
                showFilterMenu ? 'block' : 'hidden sm:block'
              )}
            >
              {/* Category Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter size={16} className="text-dark-600" />
                  <span className="text-sm font-medium text-dark-700">Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant={selectedCategory === cat ? 'primary' : 'neutral'}
                      size="md"
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <SlidersHorizontal size={16} className="text-dark-600" />
                  <span className="text-sm font-medium text-dark-700">Difficulty</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <Badge
                      key={diff}
                      variant={selectedDifficulty === diff ? 'primary' : 'neutral'}
                      size="md"
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedDifficulty(diff)}
                    >
                      {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-dark-600">
          Showing <span className="font-semibold">{filteredQuizzes.length}</span>{' '}
          {filteredQuizzes.length === 1 ? 'quiz' : 'quizzes'}
        </div>

        {/* Quiz Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onPlay={onPlayQuiz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-bold text-dark-900 mb-2">No quizzes found</h3>
            <p className="text-dark-600 mb-6">
              Try adjusting your filters or search for something else
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
