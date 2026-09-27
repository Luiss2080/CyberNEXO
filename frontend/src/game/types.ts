export type MissionType = 'EMAIL_ANALYSIS' | 'PASSWORD' | 'PRIVACY' | 'INCIDENT' | 'SAFE_BROWSING' | 'SOCIAL_ENG';

export interface MissionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface MissionStep {
  id: string;
  content: string;
  options?: MissionOption[];
  hints: string[];
}

export interface MissionDefinition {
  id: string;
  type: MissionType;
  title: string;
  difficulty: number;
  scenario: string;
  basePoints: number;
  steps: MissionStep[];
}

export type MissionState = 'IDLE' | 'LOADING' | 'PLAYING' | 'EVALUATING' | 'COMPLETED';

export interface EvaluationResult {
  score: number;
  stars: 0 | 1 | 2 | 3;
  accuracy: number;
  hintsUsed: number;
  feedback: string[];
}
