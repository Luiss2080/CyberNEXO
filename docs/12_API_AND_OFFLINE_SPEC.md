# 12. API & OFFLINE SPECIFICATION

## 1. Estructura de Endpoints REST (Express)
Todas las rutas operan bajo `/api/v1/`.

**Auth & Users**
- `POST /auth/register` | `POST /auth/login` | `POST /auth/refresh`
- `GET /profile` | `PUT /settings`

**Game Loop**
- `GET /missions`: Obtiene el manifiesto JSON de misiones.
- `POST /missions/:id/complete`: Registra un intento (`mission_attempts`), evalúa trampas, e incrementa XP.
- `GET /progress`: Devuelve XP, nivel, y logros desbloqueados.

**Social & Challenges**
- `GET /leaderboard`: Top jugadores.
- `GET /challenges/daily`: Reto cronometrado de hoy.

## 2. Offline-First y Sync Queue (Fase 12)
CyberNexo debe funcionar sin conexión a internet.

**Arquitectura Local:**
- **IndexedDB**: Almacena el manifiesto de misiones y los recursos del juego.
- **Sync Queue (Cola)**: Si el jugador termina una misión sin red, el payload (`missionId, score, accuracy, timestamp`) se encola en IndexedDB bajo `sync_pending`.

**Flujo de Restauración:**
1. Evento `window.addEventListener('online')` se dispara.
2. El Background Worker extrae los items de `sync_pending`.
3. Envía un POST bulk al backend.
4. Si el backend responde `200 OK`, mueve la data a `sync_completed` o la depura.

## 3. Seguridad de API
- **JWT**: Tokens asimétricos con expiración corta + Refresh Tokens (HttpOnly).
- **Rate Limiting**: Mitigar fuerza bruta en login e intentos masivos de misiones.
- **Validación Backend**: No confiar en el score del frontend sin validar los tiempos lógicos de la misión (Speedhack prevention).
