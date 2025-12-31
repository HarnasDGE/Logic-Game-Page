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
      style={{ perspective: '1000px' }}
    >
      {/* Layered Background with Depth */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50 to-green-50" />

        {/* Mid-depth gradient orbs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-300 to-orange-100 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ transform: 'translateZ(-50px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-300 to-purple-100 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: '1s', transform: 'translateZ(-30px)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-green-300 to-green-100 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: '2s', transform: 'translateZ(-70px)' }}
        />

        {/* Geometric shapes for depth */}
        <div className="absolute top-20 left-[15%] w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-100 rounded-3xl rotate-12 opacity-20 blur-sm" style={{ transform: 'translateZ(-40px) rotateX(15deg)' }} />
        <div className="absolute bottom-32 right-[20%] w-40 h-40 bg-gradient-to-br from-secondary-200 to-secondary-100 rounded-full opacity-20 blur-sm" style={{ transform: 'translateZ(-60px) rotateY(15deg)' }} />
        <div className="absolute top-[45%] left-[8%] w-24 h-24 bg-gradient-to-br from-accent-200 to-accent-100 rounded-2xl -rotate-12 opacity-20 blur-sm" style={{ transform: 'translateZ(-50px) rotateZ(-15deg)' }} />

        {/* Floating Icons with Depth Layers */}
        <div style={{ transform: 'translateZ(10px)' }}>
          <FloatingIcon icon="🎮" className="top-20 left-[5%] drop-shadow-2xl" size="lg" delay={0} />
          <FloatingIcon icon="🏆" className="top-32 right-[8%] drop-shadow-xl" size="md" delay={0.5} />
        </div>
        <div style={{ transform: 'translateZ(5px)' }}>
          <FloatingIcon icon="⭐" className="bottom-40 left-[10%] drop-shadow-xl" size="md" delay={1} />
          <FloatingIcon icon="🎯" className="top-[40%] right-[5%] drop-shadow-lg" size="sm" delay={1.5} />
        </div>
        <div style={{ transform: 'translateZ(0px)' }}>
          <FloatingIcon icon="💡" className="bottom-32 right-[15%] drop-shadow-2xl" size="lg" delay={2} />
          <FloatingIcon icon="🧩" className="top-[60%] left-[8%] drop-shadow-lg" size="sm" delay={2.5} />
        </div>
      </div>

      <div className="container-custom">
        <div className="max-w-6xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
          {/* Simple, Fun Header with Depth */}
          <div className="text-center mb-8 sm:mb-12" style={{ transform: 'translateZ(20px)' }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-dark-900 mb-4 animate-slide-up drop-shadow-2xl">
              <span className="inline-block drop-shadow-lg">Let's</span>{' '}
              <span className="inline-block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent animate-float drop-shadow-2xl" style={{ filter: 'drop-shadow(0 4px 12px rgba(249, 115, 22, 0.3))' }}>
                Play!
              </span>{' '}
              <span className="text-6xl sm:text-7xl lg:text-8xl animate-wiggle inline-block drop-shadow-2xl">🎮</span>
            </h1>
            <p className="text-xl sm:text-2xl text-dark-600 font-medium max-w-2xl mx-auto drop-shadow-lg">
              Pick your game style & start having fun!
            </p>
          </div>

          {/* Quiz Format Carousel - Main Feature with 3D Depth */}
          <div className="mb-10 sm:mb-12" style={{ transform: 'translateZ(30px)' }}>
            <div className="relative" style={{ filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.15))' }}>
              <QuizCarousel />
            </div>
          </div>

          {/* CTA Buttons with 3D Depth */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ transform: 'translateZ(25px)' }}>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play size={24} fill="white" />}
              className="w-full sm:w-auto min-w-[240px] text-lg shadow-2xl hover:scale-110 transition-all animate-pulse-glow"
              style={{ filter: 'drop-shadow(0 10px 40px rgba(249, 115, 22, 0.4))' }}
            >
              Start Playing Now!
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Zap size={24} />}
              className="w-full sm:w-auto min-w-[240px] text-lg border-2 hover:scale-105 transition-all shadow-xl"
              style={{ filter: 'drop-shadow(0 8px 30px rgba(0, 0, 0, 0.1))' }}
            >
              Random Quiz 🎲
            </Button>
          </div>

          {/* Quick Stats - Playful with Depth */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8" style={{ transform: 'translateZ(15px)' }}>
            <div className="text-center group cursor-pointer transform transition-all hover:translate-y-[-4px]" style={{ filter: 'drop-shadow(0 4px 15px rgba(249, 115, 22, 0.2))' }}>
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-1 group-hover:scale-125 transition-transform">
                10K+
              </div>
              <div className="text-sm text-dark-600 font-medium">Quizzes</div>
            </div>
            <div className="text-4xl text-dark-300">•</div>
            <div className="text-center group cursor-pointer transform transition-all hover:translate-y-[-4px]" style={{ filter: 'drop-shadow(0 4px 15px rgba(217, 70, 239, 0.2))' }}>
              <div className="text-3xl sm:text-4xl font-bold text-secondary-600 mb-1 group-hover:scale-125 transition-transform">
                50+
              </div>
              <div className="text-sm text-dark-600 font-medium">Categories</div>
            </div>
            <div className="text-4xl text-dark-300">•</div>
            <div className="text-center group cursor-pointer transform transition-all hover:translate-y-[-4px]" style={{ filter: 'drop-shadow(0 4px 15px rgba(34, 197, 94, 0.2))' }}>
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
