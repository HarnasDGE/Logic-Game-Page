import React from 'react';
import { Button } from '@components/atoms';
import { Play, Sparkles, Zap } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface QuickPlayCTAProps {
  className?: string;
}

/**
 * QuickPlayCTA Component - Quick challenge CTA section
 *
 * Encourages users to start playing immediately
 *
 * @example
 * <QuickPlayCTA />
 */
export const QuickPlayCTA: React.FC<QuickPlayCTAProps> = ({ className }) => {
  return (
    <section className={cn('relative py-20 sm:py-28 overflow-hidden', className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 -z-10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Decorative icons */}
      <div className="absolute top-20 left-[10%] text-5xl opacity-30 animate-float">💡</div>
      <div className="absolute bottom-20 right-[15%] text-6xl opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>🎯</div>
      <div className="absolute top-[40%] right-[8%] text-4xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>⚡</div>
      <div className="absolute bottom-[30%] left-[12%] text-5xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }}>🧠</div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
            <Sparkles size={16} />
            <span>Gotowy na wyzwanie?</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Sprawdź Swoją Wiedzę<br className="hidden sm:block" />
            Już Teraz!
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Nie czekaj! Wybierz swój pierwszy quiz i dołącz do tysięcy graczy.
            Zdobywaj punkty, rywalizuj z innymi i wspinaj się na szczyt rankingu!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Play size={24} fill="white" />}
              className="bg-accent-400 hover:bg-accent-500 text-dark-900 font-bold text-lg px-10 py-5 shadow-2xl hover:scale-105 transition-all border-0 min-w-[250px]"
            >
              Zacznij Grać Teraz!
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Zap size={24} />}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white font-bold text-lg px-10 py-5 hover:scale-105 transition-all min-w-[250px]"
            >
              Losowy Quiz
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm font-medium">Bez rejestracji</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm font-medium">Całkowicie za darmo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm font-medium">Natychmiastowy start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
