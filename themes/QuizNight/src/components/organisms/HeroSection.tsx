import React from 'react';
import { Button, Badge, FloatingIcon } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { Play, Sparkles, Zap, Trophy } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface HeroSectionProps {
  className?: string;
  onSearch?: (query: string) => void;
}

/**
 * Enhanced HeroSection Component - Atomic Design: Organism
 *
 * Energetic hero section with:
 * - Floating animated icons
 * - Engaging copy
 * - Interactive search
 * - Eye-catching CTAs
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
      {/* Animated Background with Floating Icons */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-300 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Icons */}
        <FloatingIcon icon="🎯" className="top-20 left-10" size="md" delay={0} />
        <FloatingIcon icon="🧩" className="top-40 right-20" size="lg" delay={0.5} />
        <FloatingIcon icon="⭐" className="bottom-32 left-20" size="sm" delay={1} />
        <FloatingIcon icon="🎮" className="top-1/3 right-10" size="md" delay={1.5} />
        <FloatingIcon icon="💡" className="bottom-20 right-32" size="lg" delay={2} />
        <FloatingIcon icon="🏆" className="top-1/2 left-16" size="sm" delay={2.5} />
        <FloatingIcon icon="🎲" className="bottom-40 right-16" size="md" delay={3} />
      </div>

      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Energy Badge */}
          <div className="inline-flex mb-6 sm:mb-8 animate-slide-down">
            <Badge variant="primary" size="md" icon={<Sparkles size={14} />} className="shadow-lg">
              🔥 Join 500K+ Players Worldwide!
            </Badge>
          </div>

          {/* Powerful Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark-900 mb-4 sm:mb-6 animate-slide-up">
            <span className="inline-block animate-float">Ready to Test</span>{' '}
            <span className="inline-block text-gradient animate-float" style={{ animationDelay: '0.2s' }}>
              Your Brain Power?
            </span>
          </h1>

          {/* Engaging Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-dark-700 font-semibold mb-3 sm:mb-4 animate-fade-in">
            Dive into endless fun with trivia, puzzles & brain teasers! 🧠✨
          </p>
          <p className="text-base sm:text-lg text-dark-600 mb-8 sm:mb-10 max-w-2xl mx-auto animate-fade-in">
            Challenge yourself, compete with friends, and unlock achievements.
            Every quiz is a new adventure waiting for you!
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up">
            <SearchBar
              placeholder="🔍 Find your perfect quiz... (Try 'history', 'math', 'fun')"
              onSearch={onSearch}
              showButton={true}
            />
          </div>

          {/* Energetic CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 animate-fade-in">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play size={20} fill="white" />}
              className="w-full sm:w-auto min-w-[220px] shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              🚀 Start Playing NOW!
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Trophy size={20} />}
              className="w-full sm:w-auto min-w-[220px] border-2 hover:scale-105 transition-all"
            >
              🏆 View Leaderboard
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-8 border-t border-dark-300">
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-1 animate-pulse">
                10K+
              </div>
              <div className="text-xs sm:text-sm text-dark-600 font-semibold">Epic Quizzes</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-500 bg-clip-text text-transparent mb-1 animate-pulse" style={{ animationDelay: '0.2s' }}>
                500K+
              </div>
              <div className="text-xs sm:text-sm text-dark-600 font-semibold">Active Players</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent-600 to-accent-500 bg-clip-text text-transparent mb-1 animate-pulse" style={{ animationDelay: '0.4s' }}>
                50+
              </div>
              <div className="text-xs sm:text-sm text-dark-600 font-semibold">Categories</div>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 animate-slide-up">
            <span className="text-sm text-dark-600 font-medium">Popular now:</span>
            {['🎯 Trivia', '🧩 Logic', '🎲 Sudoku', '💡 Riddles'].map((tag, i) => (
              <button
                key={tag}
                className="px-3 py-1.5 text-sm font-medium bg-white/80 hover:bg-primary-100 text-dark-700 rounded-full border border-dark-200 hover:border-primary-400 transition-all hover:scale-105 shadow-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
