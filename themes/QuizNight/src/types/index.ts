/**
 * Quiz Types
 */
export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  questionsCount: number;
  estimatedTime: number; // in minutes
  image?: string;
  tags: string[];
  plays: number;
  rating: number;
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  timeLimit?: number; // in seconds
}

export type QuizCategory =
  | 'trivia'
  | 'logic'
  | 'math'
  | 'sudoku'
  | 'crossword'
  | 'riddles'
  | 'memory'
  | 'word-games'
  | 'general';

export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'text-input'
  | 'multi-select';

/**
 * User & Progress Types
 */
export interface UserProgress {
  quizId: string;
  score: number;
  completedAt: Date;
  timeSpent: number;
  answers: UserAnswer[];
}

export interface UserAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
}

/**
 * Component Props Types
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface QuizCardProps extends BaseComponentProps {
  quiz: Quiz;
  onPlay?: (quizId: string) => void;
}

export interface CategoryCardProps extends BaseComponentProps {
  category: QuizCategory;
  count: number;
  icon?: React.ReactNode;
}
