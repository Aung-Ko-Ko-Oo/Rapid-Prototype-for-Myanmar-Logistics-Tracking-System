import { OfflineQueue, QueueStatus } from './OfflineQueue'

export class SyncManager {
  constructor() {
    this.queue = new OfflineQueue()
    this.isBrowserOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
    this.isSimulatedOffline = false
    this.isSyncing = false
    this.listeners = new Set()
    this.syncHandler = null

    this.setupNetworkListeners()
  }

  get isEffectiveOnline() {
    return this.isBrowserOnline && !this.isSimulatedOffline
  }

  get connectionState() {
    if (this.isSimulatedOffline) return 'SIMULATED_OFFLINE'
    if (!this.isBrowserOnline) return 'NETWORK_OFFLINE'
    return 'ONLINE'
  }

  setupNetworkListeners() {
    if (typeof window === 'undefined') return

    window.addEventListener('online', () => {
      this.isBrowserOnline = true
      this.notifyListeners()
      if (this.isEffectiveOnline) {
        this.triggerSync()
      }
    })

    window.addEventListener('offline', () => {
      this.isBrowserOnline = false
      this.notifyListeners()
    })
  }

  setSimulatedOffline(isSimulated) {
    this.isSimulatedOffline = !!isSimulated
    this.notifyListeners()

    if (this.isEffectiveOnline) {
      this.triggerSync()
    }
  }

  toggleSimulatedOffline() {
    this.setSimulatedOffline(!this.isSimulatedOffline)
    return this.isSimulatedOffline
  }

  setSyncHandler(handler) {
    this.syncHandler = handler
  }

  subscribe(callback) {
    this.listeners.add(callback)
    this.getQueueStatus().then((status) => callback(status))
    return () => this.listeners.delete(callback)
  }

  async getQueueStatus() {
    const all = await this.queue.getAll()
    const pending = all.filter(
      (item) => item.status === QueueStatus.PENDING || item.status === QueueStatus.FAILED
    )
    const syncing = all.filter((item) => item.status === QueueStatus.SYNCING)
    const synced = all.filter((item) => item.status === QueueStatus.SYNCED)

    return {
      connectionState: this.connectionState,
      isOnline: this.isEffectiveOnline,
      isSimulatedOffline: this.isSimulatedOffline,
      totalCount: all.length,
      pendingCount: pending.length,
      syncingCount: syncing.length,
      syncedCount: synced.length,
      pendingItems: pending,
      syncedItems: synced,
    }
  }

  async notifyListeners() {
    const status = await this.getQueueStatus()
    for (const listener of this.listeners) {
      try {
        listener(status)
      } catch (err) {
        console.error('[SyncManager] Error in listener:', err)
      }
    }
  }

  async triggerSync() {
    if (!this.isEffectiveOnline || this.isSyncing) {
      return { success: false, reason: this.isSyncing ? 'ALREADY_SYNCING' : 'OFFLINE' }
    }

    this.isSyncing = true
    await this.notifyListeners()

    try {
      const pending = await this.queue.getPending()
      const results = []

      for (const item of pending) {
        await this.queue.markSyncing(item.client_event_id)
        await this.notifyListeners()

        try {
          let response = null
          if (this.syncHandler) {
            response = await this.syncHandler(item)
          } else {
            // Default mock server resolution for standalone demo
            await new Promise((resolve) => setTimeout(resolve, 300))
            response = { success: true, processedAt: new Date().toISOString() }
          }

          await this.queue.markSynced(item.client_event_id, response)
          results.push({ id: item.client_event_id, success: true, response })
        } catch (error) {
          console.warn('[SyncManager] Failed to sync item:', item.client_event_id, error)
          await this.queue.markFailed(item.client_event_id, error)
          results.push({ id: item.client_event_id, success: false, error })
        }

        await this.notifyListeners()
      }

      return { success: true, syncedCount: results.filter((r) => r.success).length, results }
    } finally {
      this.isSyncing = false
      await this.notifyListeners()
    }
  }
}

// Export singleton instance for app-wide reactivity
export const syncManager = new SyncManager()
