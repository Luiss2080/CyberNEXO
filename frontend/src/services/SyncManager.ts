export interface SyncPayload {
  id: string;
  type: 'MISSION_COMPLETION';
  payload: {
    missionId: string;
    score: number;
    accuracy: number;
    hintsUsed: number;
    errors: number;
  };
  timestamp: string;
  status: 'PENDING' | 'SYNCED';
}

const DB_NAME = 'CyberNexoDB';
const STORE_NAME = 'sync_queue';

class SyncManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error opening IndexedDB', event);
        reject('Error opening IndexedDB');
      };
    });
  }

  async enqueue(payload: Omit<SyncPayload, 'id' | 'timestamp' | 'status'>): Promise<void> {
    if (!this.db) await this.init();

    const newPayload: SyncPayload = {
      ...payload,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(newPayload);

      request.onsuccess = () => resolve();
      request.onerror = () => reject('Error enqueuing payload');
    });
  }

  async getPendingItems(): Promise<SyncPayload[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const allItems = (event.target as IDBRequest).result as SyncPayload[];
        resolve(allItems.filter(item => item.status === 'PENDING'));
      };
      request.onerror = () => reject('Error getting pending items');
    });
  }

  async removeItems(ids: string[]): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      ids.forEach(id => store.delete(id));

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject('Error deleting items');
    });
  }

  async attemptSync(token: string): Promise<void> {
    const pending = await this.getPendingItems();
    if (pending.length === 0) return;

    console.log(`Intentando sincronizar ${pending.length} misiones completadas offline...`);

    const syncedIds: string[] = [];

    // En un escenario real (Fase 15), esto se enviaría como un bulk POST.
    // Por ahora enviamos secuencialmente al endpoint existente de /xp.
    for (const item of pending) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/xp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ xpGained: item.payload.score })
        });

        if (response.ok) {
          syncedIds.push(item.id);
        }
      } catch (error) {
        console.warn('Error al sincronizar item, se mantendrá en cola:', item.id);
      }
    }

    if (syncedIds.length > 0) {
      await this.removeItems(syncedIds);
      console.log(`Sincronización exitosa: ${syncedIds.length} items enviados.`);
    }
  }
}

export const syncManager = new SyncManager();
