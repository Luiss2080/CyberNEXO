import { MissionDefinition, EvaluationResult } from './types';

export class RuleEngine {
  static readonly PENALTY_HINT = 10;
  static readonly PENALTY_ERROR = 20;

  static evaluate(
    mission: MissionDefinition, 
    correctAnswers: number, 
    totalQuestions: number, 
    hintsUsed: number, 
    errors: number
  ): EvaluationResult {
    let score = mission.basePoints;
    
    // Penalizaciones
    score -= (hintsUsed * this.PENALTY_HINT);
    score -= (errors * this.PENALTY_ERROR);
    
    // Limitar puntaje mínimo a 0
    score = Math.max(0, score);

    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 100;
    
    // Cálculo de estrellas
    let stars: 1 | 2 | 3 = 1;
    if (accuracy >= 90 && hintsUsed === 0) stars = 3;
    else if (accuracy >= 70) stars = 2;

    const feedback = [];
    if (accuracy === 100) feedback.push("¡Excelente precisión! Detectaste todas las amenazas.");
    if (hintsUsed > 0) feedback.push(`Usaste ${hintsUsed} pista(s). Intenta observar mejor la próxima vez para ganar más XP.`);
    if (errors > 0) feedback.push("Cometiste algunos errores. Revisa la lección de aprendizaje para mejorar.");

    return { score, stars, accuracy, hintsUsed, feedback };
  }
}
