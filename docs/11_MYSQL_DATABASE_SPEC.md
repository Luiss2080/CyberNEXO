# 11. MYSQL DATABASE SPECIFICATION

La persistencia del juego se centraliza en MySQL mediante Prisma ORM.

## Tablas Core (Auth & Profiling)
- **users**: `id`, `email`, `password_hash`, `status`, `created_at`.
- **profiles**: Info pública, avatar, preferencias de UI.
- **roles**: RBAC (Player, Admin).

## Tablas de Progresión (Game Engine)
- **player_progress**: `user_id`, `level`, `xp`, `accuracy_avg`, `streak_days`.
- **mission_attempts**: Crucial para analíticas. `user_id`, `mission_id`, `score`, `accuracy`, `hints_used`, `completed_at`.
- **achievements**: Catálogo de logros (`code`, `name`, `xpReward`).
- **player_achievements**: Tabla pivote para desbloqueos.

## Tablas de Contenido (CMS)
*Usadas cuando se construya el Panel Admin (Fase 15)*
- **categories / lessons**: Agrupación del contenido.
- **missions / mission_steps**: Estructura de las misiones extraída de código a base de datos.

## Tablas Sociales
- **leaderboard_entries**: Caché o vistas materializadas para el ranking global y semanal.
- **devices**: Registro de dispositivos conectados (PWA, Desktop, Web).

## Reglas de Seguridad DB
1. **Source of Truth**: MySQL es la autoridad absoluta sobre la XP, Niveles y Logros. El Frontend no puede forzar un `UPDATE xp = 999999`. El backend debe validar o auditar el salto de XP.
2. **Consultas Parametrizadas**: Delegadas 100% a Prisma ORM para evitar Inyección SQL.
