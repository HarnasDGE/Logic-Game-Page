import React from 'react';
import { Users, Brain, Trophy, Zap } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface PlatformStatsProps {
  className?: string;
}

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

/**
 * PlatformStats Component - Platform statistics display
 *
 * Shows key platform metrics with icons
 *
 * @example
 * <PlatformStats />
 */
export const PlatformStats: React.FC<PlatformStatsProps> = ({ className }) => {
  const stats: Stat[] = [
    {
      icon: <Users size={32} />,
      value: '500K+',
      label: 'Active Players',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: <Brain size={32} />,
      value: '10K+',
      label: 'Quizzes',
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: <Trophy size={32} />,
      value: '50+',
      label: 'Categories',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: <Zap size={32} />,
      value: '1M+',
      label: 'Games Played',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className={cn('py-12 sm:py-16 bg-white', className)}>
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-gradient-to-br from-dark-50 to-white border-2 border-dark-100 hover:border-primary-300 transition-all hover:shadow-xl"
            >
              {/* Icon */}
              <div className={cn(
                'inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 transition-transform',
                stat.color
              )}>
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-3xl sm:text-4xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm sm:text-base text-dark-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
