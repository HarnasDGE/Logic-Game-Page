import React from 'react';
import { Card, CardContent } from '@components/atoms';
import { cn } from '@lib/utils/cn';

export interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

export interface QuizStatsProps {
  stats: StatItemProps[];
  className?: string;
}

/**
 * QuizStats Component - Atomic Design: Molecule
 *
 * Displays statistics in a grid layout.
 * Responsive mobile-first design.
 *
 * @example
 * <QuizStats stats={[
 *   { label: 'Total Quizzes', value: 150, icon: <Trophy /> },
 *   { label: 'Active Users', value: '10K', icon: <Users /> }
 * ]} />
 */
export const QuizStats: React.FC<QuizStatsProps> = ({ stats, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4',
        className
      )}
    >
      {stats.map((stat, index) => (
        <Card
          key={index}
          variant="bordered"
          padding="md"
          className="text-center"
        >
          <CardContent>
            <div
              className={cn(
                'w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3',
                'flex items-center justify-center rounded-full',
                stat.color || 'bg-primary-100 text-primary-600'
              )}
            >
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-dark-900 mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-dark-600">
              {stat.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
