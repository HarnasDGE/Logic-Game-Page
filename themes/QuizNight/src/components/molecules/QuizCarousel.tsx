import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@lib/utils/cn';

interface QuizFormat {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  example: string;
}

export interface QuizCarouselProps {
  className?: string;
}

const quizFormats: QuizFormat[] = [
  {
    id: 'trivia',
    icon: '🎯',
    title: 'Trivia Challenge',
    description: 'Test your general knowledge',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    example: 'Who painted the Mona Lisa?',
  },
  {
    id: 'true-false',
    icon: '✓✗',
    title: 'True or False',
    description: 'Quick-fire fact checking',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    example: 'The Earth is flat - True or False?',
  },
  {
    id: 'multiple',
    icon: '🎲',
    title: 'Multiple Choice',
    description: 'Pick the right answer',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    example: 'What is 2+2? A) 3 B) 4 C) 5',
  },
  {
    id: 'puzzle',
    icon: '🧩',
    title: 'Logic Puzzles',
    description: 'Solve brain-bending challenges',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    example: 'If A>B and B>C, then A__C?',
  },
  {
    id: 'speed',
    icon: '⚡',
    title: 'Speed Round',
    description: 'Beat the clock!',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    example: '60 seconds, 20 questions - GO!',
  },
];

/**
 * QuizCarousel Component - Interactive carousel showing quiz formats
 *
 * @example
 * <QuizCarousel />
 */
export const QuizCarousel: React.FC<QuizCarouselProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quizFormats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + quizFormats.length) % quizFormats.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quizFormats.length);
    setIsAutoPlaying(false);
  };

  const currentFormat = quizFormats[currentIndex];

  return (
    <div className={cn('relative', className)}>
      {/* Main Carousel Card */}
      <div className="relative overflow-hidden">
        <div
          className={cn(
            'rounded-3xl p-8 sm:p-12 transition-all duration-500',
            currentFormat.bgColor,
            'border-4 border-white shadow-2xl'
          )}
        >
          {/* Format Content */}
          <div className="text-center">
            <div className="text-8xl mb-4 animate-bounce-slow">{currentFormat.icon}</div>

            <div className={cn(
              'inline-block text-4xl sm:text-5xl font-display font-bold mb-4',
              'bg-gradient-to-r bg-clip-text text-transparent',
              currentFormat.color
            )}>
              {currentFormat.title}
            </div>

            <p className="text-xl sm:text-2xl text-dark-700 font-semibold mb-6">
              {currentFormat.description}
            </p>

            {/* Example Question */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border-2 border-dark-200 shadow-lg">
              <div className="text-sm font-bold text-dark-500 mb-2">Example:</div>
              <div className="text-lg font-medium text-dark-800 font-mono">
                "{currentFormat.example}"
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center group"
          aria-label="Previous quiz format"
        >
          <ChevronLeft className="text-dark-700 group-hover:text-primary-600" size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center group"
          aria-label="Next quiz format"
        >
          <ChevronRight className="text-dark-700 group-hover:text-primary-600" size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {quizFormats.map((format, index) => (
          <button
            key={format.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'transition-all duration-300',
              index === currentIndex
                ? 'w-8 h-3 rounded-full bg-gradient-to-r ' + format.color
                : 'w-3 h-3 rounded-full bg-dark-300 hover:bg-dark-400'
            )}
            aria-label={`Go to ${format.title}`}
          />
        ))}
      </div>

      {/* Format Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        {quizFormats.map((format, index) => (
          <button
            key={format.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-all',
              index === currentIndex
                ? 'bg-gradient-to-r ' + format.color + ' text-white shadow-lg scale-110'
                : 'bg-white text-dark-700 hover:bg-dark-100 shadow'
            )}
          >
            {format.icon} {format.title}
          </button>
        ))}
      </div>
    </div>
  );
};
