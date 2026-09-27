# Instrucciones para Agentes (AGENTS.md) - CyberNexo

Este archivo define el contexto, las reglas y el comportamiento esperado para todos los agentes de IA (skills) que trabajen en este proyecto. **Su cumplimiento es obligatorio**.

## 1. El Proyecto
- **Nombre**: CyberNexo
- **Descripción**: Videojuego didáctico multiplataforma sobre ciberseguridad, donde el jugador resuelve situaciones cotidianas (phishing, privacidad, etc.) en un entorno seguro y aprende mediante sus decisiones (Aprender Jugando).
- **Stack Tecnológico**: 
  - Frontend: React 18, Vite, TailwindCSS, Zustand, TanStack Query, Phaser.js.
  - Backend: Node.js, Express, MySQL 8.0, Prisma ORM.
  - Desktop: Electron.js.
  - Patrones: Feature-Sliced Design (FSD), Modular Monolith / Clean Architecture.

## 2. Flujo de Trabajo (SDD)
Estamos aplicando **Spec-Driven Development (SDD)**:
1. **Nunca se improvisa**: No se escribe código sin que exista un RF (Requisito Funcional) formal en `spec.md` utilizando notación EARS.
2. **Validación constante**: "Que el código diga la verdad y la especificación también". Las specs no son un deseo, son la ley.
3. **Roles activos**: 
   - *Spec Generator* crea la `spec.md`.
   - *QA Automation* define criterios.
   - *SDD Implement* y *Game/Frontend/Backend Dev* ejecutan.
   - *SDD Validate* corrobora contra la spec original.

## 3. Comandos Principales
- `npm run dev`: Iniciar entorno de desarrollo frontend.
- `npm run build`: Compilar producción.
- `npm run db:push`: Sincronizar Prisma schema con MySQL.

## 4. Reglas de Estilo
- **Clean Code**: Nombres descriptivos, funciones pequeñas (Single Responsibility).
- **Tipado Fuerte**: Usar TypeScript de forma estricta. Cero `any`.
- **Idioma**: El código (variables, funciones) debe escribirse en **Inglés**. La documentación técnica (`.md`) y el contenido de usuario final en español.
- **Manejo de Errores**: Nunca tragar errores silenciosamente. Responder con códigos HTTP apropiados y mensajes claros.

## 5. Verificación Obligatoria
Al finalizar cualquier implementación, el agente debe:
1. Leer nuevamente el `spec.md` correspondiente.
2. Verificar punto por punto los requisitos funcionales (RF-x) y los criterios de aceptación.
3. Confirmar que no ha introducido vulnerabilidades de seguridad (Security Expert).
4. Informar explícitamente al USER que la validación ha concluido satisfactoriamente.
