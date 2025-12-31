import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button } from '@components/atoms';
import { Play, Clock, Users, Star } from 'lucide-react';
import { cn } from '@lib/utils/cn';
import type { Quiz } from '@types/index';

export interface QuizCardProps {
  quiz: Quiz;
  className?: string;
  onPlay?: (quizId: string) => void;
}

/**
 * QuizCard Component - Atomic Design: Molecule
 *
 * Displays quiz information with play action.
 * Mobile-optimized card layout with hover effects.
 *
 * @example
 * <QuizCard quiz={quizData} onPlay={handlePlay} />
 */
export const QuizCard: React.FC<QuizCardProps> = ({ quiz, className, onPlay }) => {
  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'error',
    expert: 'secondary',
  } as const;

  return (
    <Card
      variant="elevated"
      padding="none"
      hoverable
      className={cn('overflow-hidden group', className)}
      as="article"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500">
        {quiz.image ? (
          <img
            src={quiz.image}
            alt={quiz.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <Play size={48} className="opacity-50" />
          </div>
        )}

        {/* Featured badge */}
        {quiz.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning" size="sm">
              <Star size={12} fill="currentColor" />
              Featured
            </Badge>
          </div>
        )}

        {/* Difficulty badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={difficultyColors[quiz.difficulty]} size="sm">
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Badge>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Play size={20} />}
            onClick={() => onPlay?.(quiz.id)}
            className="transform scale-90 group-hover:scale-100 transition-transform"
          >
            Play Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <CardHeader className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="primary" size="sm">
              {quiz.category}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-medium text-dark-700">{quiz.rating.toFixed(1)}</span>
            </div>
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary-600 transition-colors">
            {quiz.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-1.5">
            {quiz.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-dark-600">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-dark-400" />
              <span>{quiz.estimatedTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-dark-400" />
              <span>{quiz.plays.toLocaleString()} plays</span>
            </div>
          </div>

          {/* Tags */}
          {quiz.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {quiz.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-dark-100 text-dark-600 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        {/* Mobile play button */}
        <div className="mt-4 sm:hidden">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            leftIcon={<Play size={18} />}
            onClick={() => onPlay?.(quiz.id)}
          >
            Play Quiz
          </Button>
        </div>
      </div>
    </Card>
  );
};
