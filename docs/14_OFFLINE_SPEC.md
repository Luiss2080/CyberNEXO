# 14. OFFLINE & SYNC QUEUE SPECIFICATION

CyberNexo está diseñado bajo el paradigma **Offline-First**. Las escuelas o usuarios con conexiones intermitentes deben poder jugar sin perder su progreso. Este documento detalla la implementación de IndexedDB y la Cola de Sincronización.

## 1. Almacenamiento Local (IndexedDB)
No se usará `localStorage` para datos críticos debido a límites de tamaño y vulnerabilidad (Sección 65).
Se utilizará `idb` (o un wrapper local de Zustand/Dexie) para manejar las siguientes tablas locales:
- `missions_cache`: Copia íntegra de los JSON de las misiones para cargar offline.
- `sync_queue`: Tabla transaccional para eventos pendientes de envío al backend.

## 2. La Cola de Sincronización (Sync Queue)
Cada vez que el `MissionEngine` intenta guardar el progreso, sigue este flujo:

### A. Intentar Red (Online)
1. `POST /api/v1/missions/:id/complete`
2. Si retorna `200 OK`, todo perfecto.
3. Si el fetch falla (Network Error) o lanza timeout, pasar al punto B.

### B. Guardar Offline (Fallback)
1. Construir el payload de sincronización:
```json
{
  "id": "uuid-sync-1234",
  "type": "MISSION_COMPLETION",
  "payload": {
    "missionId": "phishing-01",
    "score": 140,
    "accuracy": 100,
    "hintsUsed": 0,
    "timestamp": "2026-09-27T10:00:00Z"
  },
  "status": "PENDING"
}
```
2. Insertar en IndexedDB (`sync_queue`).
3. Notificar al UI: *"Progreso guardado localmente. Se sincronizará al volver la conexión."*
4. Sumar el XP visualmente en el frontend usando Zustand para que la progresión no se detenga.

## 3. Background Sync Process (Fase 15)
Se creará un servicio central en React (`SyncManager.ts`):
1. Escucha eventos del Service Worker o `window.addEventListener('online')`.
2. Al volver la conexión, extrae todos los registros donde `status === 'PENDING'`.
3. Agrupa las misiones en un array y las envía en bloque: `POST /api/v1/sync/bulk`.
4. El servidor procesa transaccionalmente todas de golpe.
5. Si el servidor detecta trampas (Ej: timestamps idénticos, XP inflada artificialmente), anula esas entradas específicas (La BD MySQL es la autoridad - Sección 64).
6. Los registros procesados en IndexedDB pasan a estado `SYNCED` y son eliminados.

## 4. Conflict Resolution (Resolución de Conflictos)
Si el usuario juega en 2 dispositivos (Móvil offline y PC online):
- La base de datos central en MySQL utilizará el `timestamp` del payload para reordenar la línea de tiempo.
- El servidor nunca resta XP. Siempre suma progresivamente tomando como verdad su propio registro histórico, mitigando problemas de sobrescritura.
