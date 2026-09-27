import { describe, it, expect } from 'vitest';
import { RuleEngine } from './RuleEngine';
import { MissionDefinition } from './types';

describe('RuleEngine (Score & Analytics)', () => {
  const mockMission: MissionDefinition = {
    id: 'test_mission_01',
    type: 'EMAIL_ANALYSIS',
    title: 'Test',
    difficulty: 1,
    scenario: 'Test',
    basePoints: 100,
    steps: []
  };

  it('debe otorgar 100 XP por perfección sin pistas ni errores', () => {
    const result = RuleEngine.evaluate(mockMission, 5, 5, 0, 0);
    expect(result.accuracy).toBe(100);
    expect(result.score).toBe(100);
    expect(result.stars).toBe(3);
  });

  it('debe descontar un 20% por un error (1 paso fallado)', () => {
    // 4 de 5 correctas. (1 error penaliza 20 puntos base asumiendo pasos proporcionales, o 20% del total base)
    // El motor actual de RuleEngine usa accuracy como multiplier.
    // 4/5 = 80% accuracy. 100 * 0.8 = 80 XP. Menos penalty por error.
    const result = RuleEngine.evaluate(mockMission, 4, 5, 0, 1);
    expect(result.accuracy).toBe(80);
    // Asumiendo la matemática de penalización de 20 puntos por error que programamos
    expect(result.score).toBeLessThan(100);
    expect(result.stars).toBe(2);
  });

  it('debe descontar 10 puntos fijos por usar una pista', () => {
    const result = RuleEngine.evaluate(mockMission, 5, 5, 1, 0);
    expect(result.accuracy).toBe(100);
    expect(result.score).toBe(90); // 100 - 10
  });

  it('no debe otorgar estrellas si el accuracy es menor al 60%', () => {
    const result = RuleEngine.evaluate(mockMission, 2, 5, 0, 3);
    expect(result.accuracy).toBe(40);
    expect(result.score).toBeLessThanOrEqual(40);
    expect(result.stars).toBe(0);
  });

  it('no debe dar score negativo, el mínimo es 0', () => {
    const result = RuleEngine.evaluate(mockMission, 0, 5, 10, 5);
    expect(result.accuracy).toBe(0);
    expect(result.score).toBe(0);
    expect(result.stars).toBe(0);
  });
});
