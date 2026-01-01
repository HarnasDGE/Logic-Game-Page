import React from 'react';
import { Button } from '@components/atoms';
import { Play, Star, Users, Award, TrendingUp } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface HeroSectionProps {
  className?: string;
}

/**
 * HeroSection Component - LogicLeague Style
 *
 * Purple to cyan gradient with text left, illustration right
 *
 * @example
 * <HeroSection />
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section
      className={cn(
        'relative pt-24 sm:pt-32 pb-20 sm:pb-32 overflow-hidden',
        className
      )}
    >
      {/* Gradient Background - Purple to Cyan */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-400 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">⭐</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>❓</div>
      <div className="absolute bottom-32 left-[15%] text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>⚙️</div>
      <div className="absolute top-[30%] right-[10%] text-5xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>💡</div>
      <div className="absolute bottom-40 right-[25%] text-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🏆</div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Exercise Your<br />
              Grey Matter!
            </h1>

            <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed">
              Welcome to LogicLeague - the best platform for developing your mind through fun!
              Join our community of knowledge enthusiasts and test yourself with thousands of quizzes from every field.
            </p>

            {/* Features list */}
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-400 flex items-center justify-center flex-shrink-0">
                  <Award size={16} className="text-dark-900" />
                </div>
                <span className="text-white/95 font-medium">Over 1,000+ unique quizzes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-400 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} className="text-dark-900" />
                </div>
                <span className="text-white/95 font-medium">Compete live with other players</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-400 flex items-center justify-center flex-shrink-0">
                  <Star size={16} className="text-dark-900" fill="currentColor" />
                </div>
                <span className="text-white/95 font-medium">Earn badges and rewards</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Play size={20} fill="currentColor" />}
                className="bg-accent-400 hover:bg-accent-500 text-dark-900 font-bold text-lg px-8 py-4 shadow-2xl hover:scale-105 transition-all border-0"
              >
                Start a Quick Quiz Now!
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={18} fill="#facc15" className="text-accent-400" />
                    <Star size={18} fill="#facc15" className="text-accent-400" />
                    <Star size={18} fill="#facc15" className="text-accent-400" />
                    <Star size={18} fill="#facc15" className="text-accent-400" />
                    <Star size={18} fill="#facc15" className="text-accent-400" />
                  </div>
                  <p className="text-sm text-white/80">4.8/5 rating</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={18} className="text-accent-400" />
                    <span className="text-2xl font-bold">10K+</span>
                  </div>
                  <p className="text-sm text-white/80">Active players</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={18} className="text-accent-400" />
                    <span className="text-2xl font-bold">50K+</span>
                  </div>
                  <p className="text-sm text-white/80">Games played</p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-accent-400 text-xl">✓</span>
                <span className="text-sm font-medium text-white/90">100% Free</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-accent-400 text-xl">✓</span>
                <span className="text-sm font-medium text-white/90">No Registration</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-accent-400 text-xl">✓</span>
                <span className="text-sm font-medium text-white/90">Play Anywhere</span>
              </div>
            </div>
          </div>

          {/* Right side - Illustration placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Placeholder for brain illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl animate-bounce-slow filter drop-shadow-2xl">🧠</div>
              </div>

              {/* Floating quiz elements around brain */}
              <div className="absolute top-[10%] left-[10%] text-4xl animate-float">❓</div>
              <div className="absolute top-[15%] right-[15%] text-3xl animate-float" style={{ animationDelay: '0.3s' }}>🎯</div>
              <div className="absolute bottom-[20%] left-[5%] text-3xl animate-float" style={{ animationDelay: '0.6s' }}>⚡</div>
              <div className="absolute bottom-[15%] right-[10%] text-4xl animate-float" style={{ animationDelay: '0.9s' }}>🏆</div>
              <div className="absolute top-[50%] left-[0%] text-3xl animate-float" style={{ animationDelay: '1.2s' }}>⭐</div>
              <div className="absolute top-[50%] right-[0%] text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🎲</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy bottom border */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[60px] sm:h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,92.79V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};
