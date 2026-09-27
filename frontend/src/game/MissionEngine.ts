import { create } from 'zustand';
import { MissionDefinition, MissionState, EvaluationResult } from './types';
import { RuleEngine } from './RuleEngine';

interface MissionEngineState {
  state: MissionState;
  currentMission: MissionDefinition | null;
  currentStepIndex: number;
  hintsUsed: number;
  errors: number;
  correctAnswers: number;
  result: EvaluationResult | null;
  
  loadMission: (mission: MissionDefinition) => void;
  startMission: () => void;
  useHint: () => string | null;
  submitAnswer: (isCorrect: boolean) => void;
  finishMission: () => void;
  reset: () => void;
}

export const useMissionEngine = create<MissionEngineState>((set, get) => ({
  state: 'IDLE',
  currentMission: null,
  currentStepIndex: 0,
  hintsUsed: 0,
  errors: 0,
  correctAnswers: 0,
  result: null,

  loadMission: (mission) => set({ 
    currentMission: mission, 
    state: 'LOADING',
    currentStepIndex: 0,
    hintsUsed: 0,
    errors: 0,
    correctAnswers: 0,
    result: null
  }),

  startMission: () => set({ state: 'PLAYING' }),

  useHint: () => {
    const { currentMission, currentStepIndex, hintsUsed } = get();
    if (!currentMission) return null;
    
    const step = currentMission.steps[currentStepIndex];
    if (step && hintsUsed < step.hints.length) {
      set((state) => ({ hintsUsed: state.hintsUsed + 1 }));
      return step.hints[hintsUsed];
    }
    return null;
  },

  submitAnswer: (isCorrect) => {
    set((state) => ({
      correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      errors: isCorrect ? state.errors : state.errors + 1,
      currentStepIndex: state.currentStepIndex + 1
    }));

    const { currentMission, currentStepIndex } = get();
    if (currentMission && currentStepIndex >= currentMission.steps.length) {
      get().finishMission();
    }
  },

  finishMission: () => {
    const { currentMission, correctAnswers, hintsUsed, errors } = get();
    if (!currentMission) return;

    set({ state: 'EVALUATING' });
    
    const result = RuleEngine.evaluate(
      currentMission,
      correctAnswers,
      currentMission.steps.length,
      hintsUsed,
      errors
    );

    set({ state: 'COMPLETED', result });
  },

  reset: () => set({
    state: 'IDLE',
    currentMission: null,
    currentStepIndex: 0,
    hintsUsed: 0,
    errors: 0,
    correctAnswers: 0,
    result: null
  })
}));
