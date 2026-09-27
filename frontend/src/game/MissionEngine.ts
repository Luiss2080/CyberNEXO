import { create } from 'zustand';
import { MissionDefinition, MissionState, EvaluationResult } from './types';
import { RuleEngine } from './RuleEngine';
import { useAuthStore } from '../store/authStore';
import { syncManager } from '../services/SyncManager';

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

  submitAnswer: async (isCorrect) => {
    set((state) => ({
      correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      errors: isCorrect ? state.errors : state.errors + 1,
      currentStepIndex: state.currentStepIndex + 1
    }));

    const { currentMission, currentStepIndex } = get();
    if (currentMission && currentStepIndex >= currentMission.steps.length) {
      await get().finishMission();
    }
  },

  finishMission: async () => {
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

    // Integración Full-Stack y Offline-First (RF-29 / Fase 12)
    const { token } = useAuthStore.getState();
    if (token) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/xp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ xpGained: result.score })
        });
        
        if (!response.ok) throw new Error('Servidor retornó error');
        
      } catch (e) {
        console.warn("Fallo en sincronización online. Guardando en IndexedDB (Cola Offline)...");
        // Fallback: Guardar en la cola local
        await syncManager.enqueue({
          type: 'MISSION_COMPLETION',
          payload: {
            missionId: currentMission.id,
            score: result.score,
            accuracy: result.accuracy,
            hintsUsed: hintsUsed,
            errors: errors
          }
        });
      }
    }

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
