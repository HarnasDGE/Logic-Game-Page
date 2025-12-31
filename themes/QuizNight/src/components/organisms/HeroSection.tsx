import React from 'react';
import { Button, FloatingIcon } from '@components/atoms';
import { QuizCarousel } from '@components/molecules';
import { Play, Zap } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface HeroSectionProps {
  className?: string;
}

/**
 * Playful HeroSection Component - Gaming First!
 *
 * Fun, visual hero with quiz format carousel
 * Less corporate, more gaming vibes
 *
 * @example
 * <HeroSection />
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section
      className={cn(
        'relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden',
        className
      )}
    >
      {/* Playful Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50 to-green-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Fun Floating Icons */}
        <FloatingIcon icon="🎮" className="top-20 left-[5%]" size="lg" delay={0} />
        <FloatingIcon icon="🏆" className="top-32 right-[8%]" size="md" delay={0.5} />
        <FloatingIcon icon="⭐" className="bottom-40 left-[10%]" size="md" delay={1} />
        <FloatingIcon icon="🎯" className="top-[40%] right-[5%]" size="sm" delay={1.5} />
        <FloatingIcon icon="💡" className="bottom-32 right-[15%]" size="lg" delay={2} />
        <FloatingIcon icon="🧩" className="top-[60%] left-[8%]" size="sm" delay={2.5} />
      </div>

      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Simple, Fun Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-dark-900 mb-4 animate-slide-up">
              <span className="inline-block">Let's</span>{' '}
              <span className="inline-block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent animate-float">
                Play!
              </span>{' '}
              <span className="text-6xl sm:text-7xl lg:text-8xl animate-wiggle inline-block">🎮</span>
            </h1>
            <p className="text-xl sm:text-2xl text-dark-600 font-medium max-w-2xl mx-auto">
              Pick your game style & start having fun!
            </p>
          </div>

          {/* Quiz Format Carousel - Main Feature */}
          <div className="mb-10 sm:mb-12">
            <QuizCarousel />
          </div>

          {/* Simple CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play size={24} fill="white" />}
              className="w-full sm:w-auto min-w-[240px] text-lg shadow-2xl hover:scale-110 transition-all animate-pulse-glow"
            >
              Start Playing Now!
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Zap size={24} />}
              className="w-full sm:w-auto min-w-[240px] text-lg border-2 hover:scale-105 transition-all"
            >
              Random Quiz 🎲
            </Button>
          </div>

          {/* Quick Stats - Playful */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-1 group-hover:scale-125 transition-transform">
                10K+
              </div>
              <div className="text-sm text-dark-600 font-medium">Quizzes</div>
            </div>
            <div className="text-4xl text-dark-300">•</div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl sm:text-4xl font-bold text-secondary-600 mb-1 group-hover:scale-125 transition-transform">
                50+
              </div>
              <div className="text-sm text-dark-600 font-medium">Categories</div>
            </div>
            <div className="text-4xl text-dark-300">•</div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl sm:text-4xl font-bold text-accent-600 mb-1 group-hover:scale-125 transition-transform">
                ∞
              </div>
              <div className="text-sm text-dark-600 font-medium">Fun!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
