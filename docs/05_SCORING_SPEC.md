# 05. SCORING & EVALUATION SPECIFICATION

Este documento define la matemática exacta detrás de la recompensa de misiones, cálculo de XP y obtención de estrellas. Todas las reglas aquí listadas deben ser implementadas en `RuleEngine.ts` y `ScoreEngine.ts`.

## 1. Parámetros Base
- **Puntuación Base (XP)**: Cada misión tiene un `basePoints` predefinido (ej: 100, 150, 200).
- **Precisión (Accuracy)**: Se calcula como `(Respuestas Correctas / Total de Pasos) * 100`.

## 2. Reglas de Penalización
- **Error (Decisión incorrecta)**: Descuenta un **20%** de la XP base de esa pregunta/paso.
- **Uso de Pista (Hint)**: Descuenta **10 XP** planos del total.
- **Tiempo excedido (Modo Desafío)**: Descuenta **1 XP** por cada 5 segundos por encima de la media esperada.

*Ejemplo Matemático:*
Misión Base: 100 XP (1 paso).
El usuario pide 1 pista (-10).
El usuario se equivoca 1 vez (pierde el 20% del valor del paso).
Total: 100 - 10 - 20 = 70 XP finales.

## 3. Bonificaciones
- **Respuesta Rápida (Speed Bonus)**: +10 XP (Aplicable solo si la precisión es > 90% para evitar "speed hacking").
- **Flawless Victory (Sin errores, sin pistas)**: Multiplicador de `1.2x` al XP total.
- **Todos los indicios hallados**: En misiones de phishing, si hace clic en todos los elementos sospechosos (+20 XP).

## 4. Cálculo de Estrellas (Rendimiento)
Las estrellas dictan la percepción del jugador sobre su desempeño. Se basan puramente en la métrica de Precisión (Accuracy):

- **⭐⭐⭐ (3 Estrellas)**: Precisión del **90% al 100%**.
- **⭐⭐ (2 Estrellas)**: Precisión del **60% al 89%**.
- **⭐ (1 Estrella)**: Precisión menor al **60%** y mayor al **0%**.
- **0 Estrellas**: Fracaso crítico (Penalización severa). En misiones críticas como Respuesta a Incidentes, equivocarse en el primer paso (Ej: Pagar Ransomware) baja automáticamente a 0 estrellas.

## 5. Casos Límite y Abuso
- Si la XP calculada resulta negativa (Ej: 100 errores y 5 pistas usadas), el motor asignará un piso de **0 XP**. Nadie pierde XP acumulado (para evitar frustración extrema).
- **Farm prevention**: Una misión completada al 100% (3 estrellas) NO vuelve a otorgar su XP base en reintentos. Solo otorga XP parcial si el jugador mejora un récord anterior (Ej: de 2 a 3 estrellas, se le otorga la diferencia).
