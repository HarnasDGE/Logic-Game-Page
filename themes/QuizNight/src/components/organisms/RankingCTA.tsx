import React from 'react';
import { Button } from '@components/atoms';
import { Trophy } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface RankingCTAProps {
  className?: string;
}

/**
 * RankingCTA Component - "Don't play alone" section
 *
 * White section with wavy top, encouraging users to join leaderboard
 *
 * @example
 * <RankingCTA />
 */
export const RankingCTA: React.FC<RankingCTAProps> = ({ className }) => {
  return (
    <section className={cn('relative bg-white py-16 sm:py-24', className)}>
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] transform rotate-180">
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

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trophy icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full shadow-xl">
            <Trophy className="w-12 h-12 text-white" fill="white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-4">
            Don't Play Alone!
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-dark-600 mb-8 max-w-2xl mx-auto">
            Collect points, earn badges, and climb the League Ranking.
          </p>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 shadow-xl hover:scale-105 transition-all"
          >
            View League Ranking
          </Button>
        </div>
      </div>
    </section>
  );
};
