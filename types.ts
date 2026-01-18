
export type Subject = 'GK' | 'GS' | 'Physics' | 'Mathematics' | 'SSC';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation?: string;
}

export interface LevelProgress {
  level: number;
  unlocked: boolean;
  score: number; // Highest score achieved (out of 10)
  completed: boolean;
}

export interface UserProgress {
  [key: string]: { // Subject name
    levels: LevelProgress[];
  };
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  isFinished: boolean;
  startTime: number;
}
