# 01. GAME DESIGN DOCUMENT (GDD)

## 1. Historia y Contexto
El jugador ingresa al "CyberNexo Security Lab". Su instructora virtual le informa: *"Antes de proteger una organización, tienes que aprender a reconocer los riesgos que otros ignoran."*

## 2. Sistema de Rangos y Progresión
El jugador asciende según la XP acumulada:
- **Nivel 1**: Recluta Digital
- **Nivel 5**: Analista Junior
- **Nivel 10**: Analista
- **Nivel 20**: Especialista
- **Nivel 30**: Defensor Digital
- **Nivel 40**: Cyber Guardian

## 3. Mecánica Principal (El Motor del Juego)
Todas las misiones utilizan una misma máquina de estados en React (`MissionEngine`):
`LOAD → PRESENT → OBSERVE → INTERACT → DECIDE → EVALUATE → FEEDBACK → REWARD → SAVE`

**Principio SDD:** React NO debe tener la lógica dura del juego. La vista presenta, el motor (`RuleEngine`, `ScoreEngine`) decide.

## 4. Misiones (Basadas en Datos)
Para escalar el juego sin reprogramar, las misiones viven como objetos JSON con la estructura:
`id, type, title, difficulty, scenario, steps, rules, basePoints, feedback`

Tipos de misiones (Fase de módulos):
1. **EMAIL_ANALYSIS** (Phishing Hunter): Detectar urgencias y dominios falsos.
2. **PASSWORD** (Password Lab): Entropía local de contraseñas. *Regla de oro: No se guardan en la DB.*
3. **PRIVACY** (Privacy Check / Social Shield): Permisos de apps y sobreexposición en redes.
4. **SAFE_BROWSING** (Link Inspector): HTTPS y clonación web.
5. **SOCIAL_ENG** (Ingeniería Social): Chat simulado con extorsión o manipulación.
6. **INCIDENT** (Respuesta rápida): Ordenar acciones (Ej. Desconectar de la red primero ante un Ransomware).

## 5. Puntuación (Score Engine)
- **Base**: 100 XP
- **Errores**: -20 XP
- **Pista usada**: -10 XP
- **Estrellas**: Basadas en el % de precisión final (⭐ a ⭐⭐⭐).

## 6. Modos de Juego
- **Modo Historia**: Mapa de progreso clásico.
- **Desafío Diario**: Retos cronometrados (Ej. Analiza 5 correos en 3 mins).
- **Modo Entrenamiento**: Jugar sin penalizaciones ni pérdida de stats.
- **Modo Examen**: Sin feedback inmediato, evaluación cruda al final.
