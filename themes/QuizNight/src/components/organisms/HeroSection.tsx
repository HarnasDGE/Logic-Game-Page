import React from 'react';
import { Button } from '@components/atoms';
import { Play } from 'lucide-react';
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
              Rozruszaj Swoje<br />
              Szare Komórki!
            </h1>

            <p className="text-lg sm:text-xl text-white/90 font-medium">
              Witaj w LogicLeague.
            </p>

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Play size={20} fill="currentColor" />}
                className="bg-accent-400 hover:bg-accent-500 text-dark-900 font-bold text-lg px-8 py-4 shadow-2xl hover:scale-105 transition-all border-0"
              >
                Zacznij Szybki Quiz Teraz!
              </Button>
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
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};
