import React, { useState, useEffect } from 'react';
import { cn } from '@lib/utils/cn';
import { AdSlot } from '@components/molecules/AdSlot';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  timeLimit: number;
  questions: Question[];
}

export interface QuizPlayerProps {
  quiz: Quiz;
}

/**
 * QuizPlayer Component - Interactive Quiz Player
 *
 * Handles quiz logic, scoring, and progression
 */
const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quiz.questions.length).fill(false)
  );
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert minutes to seconds

  const currentQuestion = quiz.questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    if (isQuizCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizCompleted]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after auto-submission

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    // Check if answer is correct
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Mark question as answered
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setIsQuizCompleted(true);
  };

  const getScorePercentage = () => {
    return Math.round((score / quiz.questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return { message: 'Outstanding! 🏆', color: 'text-accent-600' };
    if (percentage >= 75) return { message: 'Great job! 🎉', color: 'text-primary-600' };
    if (percentage >= 60) return { message: 'Good effort! 👍', color: 'text-secondary-600' };
    if (percentage >= 40) return { message: 'Keep practicing! 💪', color: 'text-dark-700' };
    return { message: 'Try again! 📚', color: 'text-dark-600' };
  };

  // Quiz completed view
  if (isQuizCompleted) {
    const scoreInfo = getScoreMessage();
    const percentage = getScorePercentage();

    return (
      <div class="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <div className="text-6xl mb-6">
            {percentage >= 90 ? '🏆' : percentage >= 75 ? '🎉' : percentage >= 60 ? '👍' : percentage >= 40 ? '💪' : '📚'}
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
            Quiz Completed!
          </h2>

          <p className={cn('text-2xl font-bold mb-8', scoreInfo.color)}>
            {scoreInfo.message}
          </p>

          {/* Score Display */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8">
            <p className="text-dark-600 text-sm uppercase tracking-wide mb-2">Your Score</p>
            <p className="text-6xl font-display font-bold text-dark-900 mb-2">
              {score}/{quiz.questions.length}
            </p>
            <p className="text-2xl font-semibold text-primary-600">
              {percentage}%
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-dark-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-primary-600">{score}</p>
              <p className="text-sm text-dark-600">Correct</p>
            </div>
            <div className="bg-dark-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-dark-700">{quiz.questions.length - score}</p>
              <p className="text-sm text-dark-600">Incorrect</p>
            </div>
            <div className="bg-dark-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-secondary-600">{quiz.questions.length}</p>
              <p className="text-sm text-dark-600">Total</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`/quizzes/${quiz.id}/play`}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
            >
              Try Again
            </a>
            <a
              href={`/quizzes/${quiz.id}`}
              className="px-6 py-3 bg-white border-2 border-dark-200 hover:border-primary-300 text-dark-700 hover:text-primary-600 font-semibold rounded-lg transition-all"
            >
              Back to Quiz
            </a>
            <a
              href="/quizzes"
              className="px-6 py-3 bg-white border-2 border-dark-200 hover:border-primary-300 text-dark-700 hover:text-primary-600 font-semibold rounded-lg transition-all"
            >
              More Quizzes
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Quiz playing view
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar & Timer */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-dark-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <span className={cn(
              'text-sm font-bold',
              timeRemaining < 60 ? 'text-red-600' : 'text-dark-900'
            )}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Ad on question 1, then every 3 questions (1, 3, 6, 9, 12...) */}
      {((currentQuestionIndex + 1) === 1 || (currentQuestionIndex + 1) % 3 === 0) && (
        <div className="mb-8 flex justify-center">
          <AdSlot
            format="banner"
            slotId={`quiz-question-ad-${currentQuestionIndex + 1}`}
          />
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-dark-900 mb-8">
          {currentQuestion.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all font-medium',
                  !showFeedback && !isSelected && 'border-dark-200 hover:border-primary-300 hover:bg-primary-50',
                  !showFeedback && isSelected && 'border-primary-500 bg-primary-50',
                  showCorrect && 'border-green-500 bg-green-50 text-green-900',
                  showIncorrect && 'border-red-500 bg-red-50 text-red-900',
                  showFeedback && !isCorrect && !isSelected && 'border-dark-100 opacity-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm',
                    !showFeedback && !isSelected && 'border-dark-300 text-dark-600',
                    !showFeedback && isSelected && 'border-primary-600 bg-primary-600 text-white',
                    showCorrect && 'border-green-600 bg-green-600 text-white',
                    showIncorrect && 'border-red-600 bg-red-600 text-white'
                  )}>
                    {showCorrect ? '✓' : showIncorrect ? '✗' : String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Button - Only show after answer is selected */}
        {showFeedback && (
          <div className="mt-8">
            <button
              onClick={handleNextQuestion}
              className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
            >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}

        {/* Feedback Message */}
        {showFeedback && (
          <div className={cn(
            'mt-4 p-4 rounded-xl',
            selectedAnswer === currentQuestion.correctAnswer
              ? 'bg-green-50 text-green-900'
              : 'bg-red-50 text-red-900'
          )}>
            <p className="font-semibold">
              {selectedAnswer === currentQuestion.correctAnswer
                ? '✓ Correct! Well done!'
                : `✗ Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
            </p>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-dark-600 mb-1">Current Score</p>
        <p className="text-2xl font-bold text-primary-600">
          {score}/{answeredQuestions.filter(Boolean).length}
        </p>
      </div>
    </div>
  );
};

export default QuizPlayer;
