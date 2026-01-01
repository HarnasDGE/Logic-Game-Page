import React from 'react';
import { Play, Users, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  players: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizListSectionProps {
  title: string;
  description: string;
  quizzes: Quiz[];
  viewAllLink?: string;
  className?: string;
}

/**
 * QuizListSection Component - Displays a list of quizzes
 *
 * Used for trivia, riddles, crosswords, personality quizzes, etc.
 *
 * @example
 * <QuizListSection title="Latest Trivia" quizzes={triviaQuizzes} />
 */
export const QuizListSection: React.FC<QuizListSectionProps> = ({
  title,
  description,
  quizzes,
  viewAllLink,
  className,
}) => {
  const difficultyColors = {
    easy: 'bg-accent-100 text-accent-700',
    medium: 'bg-secondary-100 text-secondary-700',
    hard: 'bg-primary-100 text-primary-700',
  };

  return (
    <section className={cn('py-16 sm:py-20 bg-white', className)}>
      <div className="container-custom">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-2">
              {title}
            </h2>
            <p className="text-lg text-dark-600">{description}</p>
          </div>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
            >
              View All
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>

        {/* Quiz grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group bg-white rounded-2xl p-6 border-2 border-dark-100 hover:border-primary-300 hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Icon */}
              <div className="text-6xl mb-4">{quiz.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-display font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {quiz.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-dark-600 mb-4 line-clamp-2">{quiz.description}</p>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-dark-600">
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  <span>{quiz.players.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{quiz.duration} min</span>
                </div>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-semibold capitalize',
                    difficultyColors[quiz.difficulty]
                  )}
                >
                  {quiz.difficulty}
                </span>
              </div>

              {/* Play button */}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all group-hover:scale-105">
                <Play size={18} fill="white" />
                Play Now
              </button>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        {viewAllLink && (
          <div className="mt-8 sm:hidden text-center">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-100 hover:bg-dark-200 text-dark-900 font-semibold rounded-lg transition-colors"
            >
              View All
              <ChevronRight size={20} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
