import { describe, expect, test, beforeEach } from 'vitest'
import { OfflineQueue, QueueActionType, QueueStatus } from '../../lib/offline/OfflineQueue'

describe('OfflineQueue', () => {
  let queue

  beforeEach(async () => {
    queue = new OfflineQueue()
    await queue.clearAll()
  })

  test('enqueues actions with unique UUID and PENDING status', async () => {
    const item = await queue.enqueue(QueueActionType.GATE_REPORT, {
      name: 'Nawnghkio Checkpoint',
      condition: 'CONGESTED',
    })

    expect(item.client_event_id).toBeDefined()
    expect(item.action_type).toBe(QueueActionType.GATE_REPORT)
    expect(item.status).toBe(QueueStatus.PENDING)

    const pending = await queue.getPending()
    expect(pending.length).toBe(1)
    expect(pending[0].client_event_id).toBe(item.client_event_id)
  })

  test('transitions through SYNCING and SYNCED states', async () => {
    const item = await queue.enqueue(QueueActionType.STATUS_UPDATE, {
      status: 'AT_CHECKPOINT',
    })

    await queue.markSyncing(item.client_event_id)
    let pending = await queue.getPending()
    expect(pending.length).toBe(0) // SYNCING is excluded from pending retry

    await queue.markSynced(item.client_event_id, { processed: true })
    const all = await queue.getAll()
    const synced = all.find((x) => x.client_event_id === item.client_event_id)
    expect(synced.status).toBe(QueueStatus.SYNCED)
    expect(synced.synced_at).toBeDefined()
  })

  test('handles failed sync and preserves item for retry', async () => {
    const item = await queue.enqueue(QueueActionType.DOCUMENT_UPLOAD, {
      fileName: 'waybill.jpg',
    })

    await queue.markFailed(item.client_event_id, 'Network timeout')
    const pending = await queue.getPending()
    expect(pending.length).toBe(1)
    expect(pending[0].status).toBe(QueueStatus.FAILED)
    expect(pending[0].retry_count).toBe(1)
    expect(pending[0].last_error).toBe('Network timeout')
  })

  test('clears only synced records while preserving pending items', async () => {
    const item1 = await queue.enqueue(QueueActionType.STATUS_UPDATE, { s: 1 })
    const item2 = await queue.enqueue(QueueActionType.STATUS_UPDATE, { s: 2 })

    await queue.markSynced(item1.client_event_id)

    await queue.clearSynced()
    const remaining = await queue.getAll()
    expect(remaining.length).toBe(1)
    expect(remaining[0].client_event_id).toBe(item2.client_event_id)
  })
})
