import { backendUrl } from "@/lib/backend"

export type SyncQueueType = "propertyInquiry" | "maintenanceRequest"

export interface SyncQueueItem<TPayload = unknown> {
  id: string
  type: SyncQueueType
  endpoint: string
  payload: TPayload
  createdAt: string
}

const DB_NAME = "ondo-pwa-db"
const DB_VERSION = 1
const STORE_NAME = "syncQueue"

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" })
        store.createIndex("createdAt", "createdAt", { unique: false })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"))
  })
}

function createQueueItem<TPayload>(
  type: SyncQueueType,
  endpoint: string,
  payload: TPayload
): SyncQueueItem<TPayload> {
  return {
    id: `${type}-${crypto.randomUUID()}`,
    type,
    endpoint,
    payload,
    createdAt: new Date().toISOString(),
  }
}

export async function enqueueSyncItem<TPayload>(
  type: SyncQueueType,
  endpoint: string,
  payload: TPayload
): Promise<SyncQueueItem<TPayload>> {
  const db = await openDb()
  const item = createQueueItem(type, endpoint, payload)

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).put(item)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error("Failed to enqueue sync item"))
  })

  return item
}

export async function getQueuedSyncItems(): Promise<SyncQueueItem[]> {
  const db = await openDb()

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly")
    const request = tx.objectStore(STORE_NAME).getAll()
    request.onsuccess = () => {
      const items = (request.result as SyncQueueItem[]).sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      )
      resolve(items)
    }
    request.onerror = () => reject(request.error ?? new Error("Failed to read sync queue"))
  })
}

export async function removeQueuedSyncItem(id: string): Promise<void> {
  const db = await openDb()

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error("Failed to remove sync item"))
  })
}

export async function triggerSync(tag: SyncQueueType): Promise<void> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return
  }

  const registration = await navigator.serviceWorker.ready

  if ("sync" in registration) {
    try {
      await registration.sync.register(tag)
      return
    } catch {
      // Fallback below for browsers without Background Sync support.
    }
  }

  await flushQueueNow()
}

export async function flushQueueNow(): Promise<void> {
  const queuedItems = await getQueuedSyncItems()

  for (const item of queuedItems) {
    try {
      const response = await fetch(backendUrl(item.endpoint), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item.payload),
      })

      if (response.ok) {
        await removeQueuedSyncItem(item.id)
      }
    } catch {
      break
    }
  }
}
