/**
 * IndexedDB persistence layer for offline Driver resilience
 * Database: rlts_offline_db
 */

const DB_NAME = 'rlts_offline_db'
const DB_VERSION = 1

export const STORES = {
  ACTION_QUEUE: 'action_queue',
  CACHED_ROUTES: 'cached_routes',
  OFFLINE_CACHE: 'offline_cache',
}

let dbInstance = null

export function openOfflineDB() {
  if (dbInstance) {
    return Promise.resolve(dbInstance)
  }

  return new Promise((resolve, _reject) => {
    if (typeof indexedDB === 'undefined') {
      // In non-browser/test environments without polyfill
      console.warn('[IndexedDB] indexedDB is undefined. Falling back to in-memory store.')
      dbInstance = createInMemoryStore()
      resolve(dbInstance)
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      // Action Queue Store
      if (!db.objectStoreNames.contains(STORES.ACTION_QUEUE)) {
        const queueStore = db.createObjectStore(STORES.ACTION_QUEUE, {
          keyPath: 'client_event_id',
        })
        queueStore.createIndex('status', 'status', { unique: false })
        queueStore.createIndex('created_at', 'created_at', { unique: false })
        queueStore.createIndex('action_type', 'action_type', { unique: false })
      }

      // Cached Routes Store
      if (!db.objectStoreNames.contains(STORES.CACHED_ROUTES)) {
        db.createObjectStore(STORES.CACHED_ROUTES, { keyPath: 'id' })
      }

      // Offline Cache Store (Shipments, Gates, Metadata)
      if (!db.objectStoreNames.contains(STORES.OFFLINE_CACHE)) {
        db.createObjectStore(STORES.OFFLINE_CACHE, { keyPath: 'key' })
      }
    }

    request.onsuccess = (event) => {
      dbInstance = event.target.result
      resolve(dbInstance)
    }

    request.onerror = (event) => {
      console.error('[IndexedDB] Failed to open database:', event.target.error)
      // Fallback
      dbInstance = createInMemoryStore()
      resolve(dbInstance)
    }
  })
}

export async function putItem(storeName, item) {
  const db = await openOfflineDB()
  if (db._isMemoryStore) {
    return db.put(storeName, item)
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    const req = store.put(item)

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function getItem(storeName, key) {
  const db = await openOfflineDB()
  if (db._isMemoryStore) {
    return db.get(storeName, key)
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    const req = store.get(key)

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function getAllItems(storeName) {
  const db = await openOfflineDB()
  if (db._isMemoryStore) {
    return db.getAll(storeName)
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    const req = store.getAll()

    req.onsuccess = () => resolve(req.result || [])
    req.onerror = () => reject(req.error)
  })
}

export async function deleteItem(storeName, key) {
  const db = await openOfflineDB()
  if (db._isMemoryStore) {
    return db.delete(storeName, key)
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    const req = store.delete(key)

    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function clearStore(storeName) {
  const db = await openOfflineDB()
  if (db._isMemoryStore) {
    return db.clear(storeName)
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    const req = store.clear()

    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

/**
 * In-memory fallback for testing / environments without IndexedDB
 */
function createInMemoryStore() {
  const tables = {
    [STORES.ACTION_QUEUE]: new Map(),
    [STORES.CACHED_ROUTES]: new Map(),
    [STORES.OFFLINE_CACHE]: new Map(),
  }

  return {
    _isMemoryStore: true,
    put: (storeName, item) => {
      const keyField =
        storeName === STORES.ACTION_QUEUE
          ? 'client_event_id'
          : storeName === STORES.CACHED_ROUTES
            ? 'id'
            : 'key'
      const key = item[keyField]
      tables[storeName].set(key, item)
      return Promise.resolve(key)
    },
    get: (storeName, key) => {
      return Promise.resolve(tables[storeName].get(key) || null)
    },
    getAll: (storeName) => {
      return Promise.resolve(Array.from(tables[storeName].values()))
    },
    delete: (storeName, key) => {
      tables[storeName].delete(key)
      return Promise.resolve()
    },
    clear: (storeName) => {
      tables[storeName].clear()
      return Promise.resolve()
    },
  }
}
