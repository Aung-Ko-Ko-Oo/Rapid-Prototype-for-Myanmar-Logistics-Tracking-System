import { STORES, putItem, getItem, getAllItems, deleteItem, clearStore } from './db'

export const QueueActionType = {
  GPS_BATCH: 'GPS_BATCH',
  STATUS_UPDATE: 'STATUS_UPDATE',
  GATE_REPORT: 'GATE_REPORT',
  DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
  DELIVERY_EVENT: 'DELIVERY_EVENT',
  ROUTE_SELECTION: 'ROUTE_SELECTION',
}

export const QueueStatus = {
  PENDING: 'PENDING',
  SYNCING: 'SYNCING',
  SYNCED: 'SYNCED',
  FAILED: 'FAILED',
}

/**
 * Generates an RFC-4122 compliant UUIDv4.
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export class OfflineQueue {
  async enqueue(actionType, payload, customId = null) {
    const item = {
      client_event_id: customId || generateUUID(),
      action_type: actionType,
      payload,
      status: QueueStatus.PENDING,
      created_at: new Date().toISOString(),
      synced_at: null,
      retry_count: 0,
      last_error: null,
    }

    await putItem(STORES.ACTION_QUEUE, item)
    return item
  }

  async getAll() {
    const items = await getAllItems(STORES.ACTION_QUEUE)
    return items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }

  async getPending() {
    const items = await this.getAll()
    return items.filter(
      (item) => item.status === QueueStatus.PENDING || item.status === QueueStatus.FAILED
    )
  }

  async getPendingCount() {
    const pending = await this.getPending()
    return pending.length
  }

  async markSyncing(client_event_id) {
    const item = await getItem(STORES.ACTION_QUEUE, client_event_id)
    if (!item) return null

    item.status = QueueStatus.SYNCING
    await putItem(STORES.ACTION_QUEUE, item)
    return item
  }

  async markSynced(client_event_id, serverResponse = null) {
    const item = await getItem(STORES.ACTION_QUEUE, client_event_id)
    if (!item) return null

    item.status = QueueStatus.SYNCED
    item.synced_at = new Date().toISOString()
    item.serverResponse = serverResponse
    item.last_error = null
    await putItem(STORES.ACTION_QUEUE, item)
    return item
  }

  async markFailed(client_event_id, error) {
    const item = await getItem(STORES.ACTION_QUEUE, client_event_id)
    if (!item) return null

    item.status = QueueStatus.FAILED
    item.retry_count = (item.retry_count || 0) + 1
    item.last_error = error ? (typeof error === 'string' ? error : error.message) : 'Sync failed'
    await putItem(STORES.ACTION_QUEUE, item)
    return item
  }

  async remove(client_event_id) {
    await deleteItem(STORES.ACTION_QUEUE, client_event_id)
  }

  async clearSynced() {
    const all = await this.getAll()
    for (const item of all) {
      if (item.status === QueueStatus.SYNCED) {
        await deleteItem(STORES.ACTION_QUEUE, item.client_event_id)
      }
    }
  }

  async clearAll() {
    await clearStore(STORES.ACTION_QUEUE)
  }
}
