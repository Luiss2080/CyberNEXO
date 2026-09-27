# 🛡️ CYBERNEXO - 10 ARCHITECTURE SPEC

## 1. Patrones Arquitectónicos

### 1.1 Frontend (React + Vite)
El frontend utilizará **Feature-Sliced Design (FSD)**. Esta metodología organiza el código por alcance de negocio en lugar de tipo de archivo técnico, lo cual es ideal para proyectos que pueden escalar en múltiples "Misiones" y "Módulos".

**Estructura FSD:**
- `app/`: Configuración global, providers, entry point.
- `pages/`: Rutas principales y vistas (e.g., `MissionsPage`, `ProfilePage`).
- `widgets/`: Bloques de UI compuestos e independientes (e.g., `MissionDashboard`, `Header`).
- `features/`: Interacciones de usuario y casos de uso (e.g., `StartMission`, `AuthUser`).
- `entities/`: Lógica de negocio (e.g., `User`, `Mission`, `Score`).
- `shared/`: Código reusado, UI Kit, Utils, API clients.

### 1.2 Backend (Node + Express)
El backend implementará un **Modular Monolith** con **Clean Architecture**.

**Capas por Módulo:**
- **Domain Layer**: Entidades puras y reglas de negocio. No depende de ningún framework.
- **Application Layer**: Casos de uso e interfaces (ports). 
- **Infrastructure Layer**: Implementación de interfaces (adapters), conexión a MySQL vía Prisma, JWT.
- **Presentation Layer**: Controladores de Express.

### 1.3 Event Bus Interno
Para evitar alto acoplamiento en el backend, usaremos eventos internos:
- Cuando `MissionService` registra un éxito, emite `MissionCompletedEvent`.
- `ProgressService` escucha para actualizar XP.
- `AchievementService` escucha para desbloquear medallas.

## 2. Gestión de Estado y Sincronización

### 2.1 Estado Local
- **Zustand**: Para el estado local de UI y del Game Engine (ej. pistas utilizadas, paso actual de la misión).
- **TanStack Query (React Query)**: Para caché, sincronización en background y manejo del estado asíncrono con el servidor.

### 2.2 Offline-First
- Uso de `idb` (IndexedDB Wrapper).
- Mutation Queue (Outbox Pattern) configurado en React Query para guardar jugadas localmente si no hay red, e intentar enviarlas cuando el Service Worker detecte la recuperación de conexión.

## 3. Seguridad

- **API**: Validación de esquemas con Zod en el servidor. Rate limiting en endpoints de Auth.
- **Desktop (Electron)**: 
  - `nodeIntegration: false`
  - `contextIsolation: true`
  - Comunicación estricta a través de `preload.js` (IPC).
