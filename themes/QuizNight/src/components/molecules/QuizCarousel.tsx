import React, { useState, useEffect } from 'react';
import { cn } from '@lib/utils/cn';

interface QuizFormat {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  question: string;
  answers: string[];
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
    question: 'Who painted the Mona Lisa?',
    answers: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
  },
  {
    id: 'true-false',
    icon: '✓✗',
    title: 'True or False',
    description: 'Quick-fire fact checking',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    question: 'The Great Wall of China is visible from space.',
    answers: ['True', 'False'],
  },
  {
    id: 'multiple',
    icon: '🎲',
    title: 'Multiple Choice',
    description: 'Pick the right answer',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    question: 'What is the capital of France?',
    answers: ['London', 'Berlin', 'Paris', 'Madrid'],
  },
  {
    id: 'puzzle',
    icon: '🧩',
    title: 'Logic Puzzles',
    description: 'Solve brain-bending challenges',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely:',
    answers: ['Lazzies', 'Razzies', 'Not Lazzies', 'Cannot be determined'],
  },
  {
    id: 'speed',
    icon: '⚡',
    title: 'Speed Round',
    description: 'Beat the clock!',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    question: 'Quick! How many continents are there?',
    answers: ['5', '6', '7', '8'],
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
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };

    setTouchEnd(currentTouch);

    const deltaX = currentTouch.x - touchStart.x;
    const deltaY = currentTouch.y - touchStart.y;

    // Check if horizontal swipe is more dominant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Prevent vertical scroll when swiping horizontally
      e.preventDefault();
      setDragOffset(deltaX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    // Only trigger swipe if horizontal movement is more than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;

      if (isLeftSwipe) {
        goToNext();
      } else if (isRightSwipe) {
        goToPrevious();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentFormat = quizFormats[currentIndex];

  return (
    <div className={cn('relative', className)}>
      {/* Main Carousel Card */}
      <div
        className="relative overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          touchAction: 'pan-y',
        }}
      >
        <div
          className={cn(
            'rounded-3xl p-8 sm:p-12 transition-all',
            currentFormat.bgColor,
            'border-4 border-white shadow-2xl',
            isDragging ? 'duration-100' : 'duration-500 ease-out'
          )}
          style={{
            transform: isDragging ? `translateX(${dragOffset}px) scale(${1 - Math.abs(dragOffset) / 2000})` : 'translateX(0) scale(1)',
            opacity: isDragging ? 1 - Math.abs(dragOffset) / 1000 : 1,
          }}
        >
          {/* Format Content */}
          <div className="text-center">
            <div className={cn(
              'text-8xl mb-4 transition-transform duration-300',
              isDragging ? 'scale-90' : 'scale-100 animate-bounce-slow'
            )}>
              {currentFormat.icon}
            </div>

            <div className={cn(
              'inline-block text-4xl sm:text-5xl font-display font-bold mb-4',
              'bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300',
              currentFormat.color,
              isDragging && 'blur-[1px]'
            )}>
              {currentFormat.title}
            </div>

            <p className={cn(
              'text-xl sm:text-2xl text-dark-700 font-semibold mb-6 transition-all duration-300',
              isDragging && 'opacity-70'
            )}>
              {currentFormat.description}
            </p>

            {/* Quiz Example */}
            <div className={cn(
              'bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border-2 border-dark-200 shadow-lg transition-all duration-300',
              isDragging && 'opacity-70 scale-95'
            )}>
              <div className="text-lg font-bold text-dark-800 mb-4">
                {currentFormat.question}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentFormat.answers.map((answer, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-dark-300 rounded-xl p-3 text-left font-medium text-dark-700 hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer"
                  >
                    <span className="font-bold text-primary-600 mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {answer}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {quizFormats.map((format, index) => (
          <button
            key={format.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'transition-all duration-500 ease-out',
              index === currentIndex
                ? 'w-8 h-3 rounded-full bg-gradient-to-r ' + format.color + ' animate-pulse'
                : 'w-3 h-3 rounded-full bg-dark-300 hover:bg-dark-400 hover:scale-125'
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
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
              index === currentIndex
                ? 'bg-gradient-to-r ' + format.color + ' text-white shadow-lg scale-110 animate-pulse-glow'
                : 'bg-white text-dark-700 hover:bg-dark-100 hover:scale-105 shadow hidden sm:inline-block'
            )}
          >
            <span className={cn(
              'inline-block transition-transform duration-300',
              index === currentIndex && 'animate-wiggle'
            )}>
              {format.icon}
            </span>{' '}
            {format.title}
          </button>
        ))}
      </div>
    </div>
  );
};
