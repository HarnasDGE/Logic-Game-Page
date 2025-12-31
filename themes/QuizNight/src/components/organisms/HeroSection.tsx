import React from 'react';
import { Button, Badge } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { Play, TrendingUp, Award } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface HeroSectionProps {
  className?: string;
  onSearch?: (query: string) => void;
}

/**
 * HeroSection Component - Atomic Design: Organism
 *
 * Main hero section with CTA and search.
 * Animated background with gradient.
 * Mobile-first responsive layout.
 *
 * @example
 * <HeroSection onSearch={handleSearch} />
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className, onSearch }) => {
  return (
    <section
      className={cn(
        'relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden',
        className
      )}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-purple-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000" />
      </div>

      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex mb-6 sm:mb-8 animate-slide-down">
            <Badge variant="primary" size="md" icon={<TrendingUp size={14} />}>
              🎉 Over 10,000+ quizzes available
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark-900 mb-4 sm:mb-6 animate-slide-up">
            Challenge Your Mind with
            <span className="block mt-2 text-gradient">
              Exciting Logic Games
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-dark-600 mb-8 sm:mb-10 max-w-2xl mx-auto animate-fade-in">
            Dive into a world of trivia, puzzles, and brain teasers. Test your knowledge,
            challenge friends, and climb the leaderboard!
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up">
            <SearchBar
              placeholder="Search for quizzes, categories, or topics..."
              onSearch={onSearch}
              showButton={true}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 animate-fade-in">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play size={20} />}
              className="w-full sm:w-auto min-w-[200px]"
            >
              Start Playing
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Award size={20} />}
              className="w-full sm:w-auto min-w-[200px]"
            >
              View Leaderboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-8 border-t border-dark-200">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark-900 mb-1">
                10K+
              </div>
              <div className="text-xs sm:text-sm text-dark-600">Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark-900 mb-1">
                500K+
              </div>
              <div className="text-xs sm:text-sm text-dark-600">Players</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-dark-900 mb-1">
                50+
              </div>
              <div className="text-xs sm:text-sm text-dark-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
