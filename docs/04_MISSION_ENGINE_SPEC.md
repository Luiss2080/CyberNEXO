# 04. MISSION ENGINE SPECIFICATION

El `MissionEngine` es el núcleo de CyberNexo. Su principal objetivo es desacoplar la lógica del juego de las vistas de React, permitiendo que las misiones sean impulsadas por datos (Data-Driven).

## 1. Responsabilidades del Motor
- Cargar la estructura JSON de la misión.
- Controlar el flujo y la paginación de pasos (steps).
- Recibir las interacciones y decisiones del jugador.
- Validar las respuestas a través del `RuleEngine`.
- Calcular resultados matemáticos a través del `ScoreEngine`.
- Despachar el resultado final al backend.

## 2. Flujo de Ejecución (Core Loop)
Toda misión, independientemente de si es Phishing, Password o Privacidad, obedece al siguiente flujo de estados internos:

1. **IDLE**: Estado inicial de reposo.
2. **LOADING**: El motor recupera el JSON de la misión (local o del backend) y precarga assets.
3. **PRESENT**: Despliega la interfaz al usuario (Ej: Simulación de Email o Chat).
4. **OBSERVE & INTERACT**: El jugador inspecciona la interfaz. Se registran clics y uso de `hints` (pistas).
5. **DECIDE**: El jugador emite una respuesta (`submitAnswer()`).
6. **EVALUATE**: Transición al estado `EVALUATING`. Se invoca `RuleEngine.evaluate()`.
7. **FEEDBACK**: Se presenta la pantalla de conclusión de la misión, mostrando aciertos y errores detallados de forma didáctica.
8. **SAVE**: Se ejecuta `persistToBackend()` / `saveToSyncQueue()`. El estado pasa a `COMPLETED`.

## 3. Estructura de Datos (JSON) de la Misión
Para que el motor funcione sin crear componentes nuevos por misión, la estructura de datos debe ser estrictamente tipada (TypeScript):

```typescript
type MissionType = 'EMAIL_ANALYSIS' | 'PASSWORD' | 'PRIVACY' | 'INCIDENT' | 'SAFE_BROWSING' | 'SOCIAL_ENG';

interface MissionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

interface MissionStep {
  id: string;
  content: string;
  hints: string[];
  options?: MissionOption[];
}

interface MissionDefinition {
  id: string;
  type: MissionType;
  title: string;
  difficulty: number; // 1-5
  scenario: string;
  basePoints: number; // XP base a otorgar
  steps: MissionStep[];
}
```

## 4. Implementación en Zustand
El motor de estado (`store`) maneja la inmutabilidad y expone métodos imperativos para la UI:

- `loadMission(mission: MissionDefinition): void`
- `startMission(): void`
- `useHint(): string | null` // Descuenta puntos
- `submitAnswer(isCorrect: boolean): void`
- `finishMission(): Promise<void>`

## 5. Prevención de Riesgos de Arquitectura
**Anti-Patrón (Prohibido)**: 
```jsx
// Incorrecto
if (mission.id === 'phishing-1') {
  givePlayerPoints(100);
}
```

**Patrón SDD (Obligatorio)**:
```jsx
// Correcto
const result = RuleEngine.evaluate(currentMission, correctAnswers, totalSteps, hintsUsed, errors);
MissionEngine.dispatchResult(result);
```
El motor no debe contener lógica quemada (hardcoded) para misiones individuales. Todas las decisiones dependen matemáticamente de los campos del objeto JSON.
