# 🛡️ CYBERNEXO - 00 PROJECT SPEC

## 1. Visión General
**CyberNexo** es un videojuego didáctico multiplataforma sobre ciberseguridad. El jugador asume el rol de un nuevo recluta en el *CyberNexo Security Lab* y debe superar misiones relacionadas con situaciones digitales cotidianas (phishing, privacidad, contraseñas, etc.).

## 2. Tecnologías Principales (Stack)
- **Frontend (Web, PWA, Desktop UI)**: React 18, TypeScript, Vite, TailwindCSS, Zustand, TanStack Query.
- **Game Engine (Minijuegos)**: Phaser.js 3+ (embebido en React).
- **Backend (API)**: Node.js, Express, TypeScript.
- **Base de Datos**: MySQL 8.0, Prisma ORM.
- **Desktop Wrapper**: Electron.js.
- **Arquitectura**: Feature-Sliced Design (Frontend), Modular Monolith / Clean Architecture (Backend).

## 3. Principios de Desarrollo (SDD)
- **Cero Código sin SPEC**: Toda nueva funcionalidad debe estar especificada y probada antes de la implementación final.
- **Offline-First**: La experiencia central debe sobrevivir a cortes de red (IndexedDB + Sync Queue).
- **Autoridad en el Servidor**: La UI es presentacional; el backend valida XP, niveles y logros.
- **Accesibilidad**: Navegación por teclado, modo alto contraste y sin dependencia exclusiva de colores para transmitir información.

## 4. Fases del Proyecto
Referirse al documento maestro de planificación para el desglose de las 16 fases.
El proyecto se dividirá en 4 grandes bloques:
- **BLOQUE I**: Foundation & Design
- **BLOQUE II**: Game Core & Content
- **BLOQUE III**: Progression & Data
- **BLOQUE IV**: Escala, Offline & Despliegue
