import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { syncManager } from '../../lib/offline/SyncManager'

export default function DriverSync() {
  const [queueStatus, setQueueStatus] = useState({
    connectionState: 'ONLINE',
    isOnline: true,
    isSimulatedOffline: false,
    totalCount: 0,
    pendingCount: 0,
    syncedCount: 0,
    pendingItems: [],
    syncedItems: [],
  })
  const [isSyncing, setIsSyncing] = useState(false)

  const refreshStatus = async () => {
    const status = await syncManager.getQueueStatus()
    setQueueStatus(status)
  }

  useEffect(() => {
    let isMounted = true
    syncManager.getQueueStatus().then((status) => {
      if (isMounted) setQueueStatus(status)
    })
    const unsub = syncManager.subscribe((status) => {
      if (isMounted) setQueueStatus(status)
    })
    return () => {
      isMounted = false
      unsub()
    }
  }, [])

  const handleSyncNow = async () => {
    setIsSyncing(true)
    await syncManager.triggerSync()
    setIsSyncing(false)
    await refreshStatus()
  }

  const handleClearSynced = async () => {
    await syncManager.queue.clearSynced()
    await refreshStatus()
  }

  const allItems = [...queueStatus.pendingItems, ...queueStatus.syncedItems]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">IndexedDB Offline Sync Inspector</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Local queue (`rlts_offline_db`). Stores driver events during internet blackouts with idempotent UUIDs.
        </p>
      </div>

      {/* Sync Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3.5 bg-slate-950/70 border border-white/10 text-slate-200">
          <p className="text-[11px] text-slate-400 font-semibold uppercase">Connection</p>
          <p
            className={`text-sm font-bold mt-1 ${
              queueStatus.isOnline ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {queueStatus.connectionState}
          </p>
        </Card>

        <Card className="p-3.5 bg-slate-950/70 border border-white/10 text-slate-200">
          <p className="text-[11px] text-slate-400 font-semibold uppercase">Pending Sync</p>
          <p className="text-lg font-bold text-amber-400 mt-0.5">
            {queueStatus.pendingCount}
          </p>
        </Card>

        <Card className="p-3.5 bg-slate-950/70 border border-white/10 text-slate-200">
          <p className="text-[11px] text-slate-400 font-semibold uppercase">Synced to Server</p>
          <p className="text-lg font-bold text-emerald-400 mt-0.5">
            {queueStatus.syncedCount}
          </p>
        </Card>

        <Card className="p-3.5 bg-slate-950/70 border border-white/10 text-slate-200">
          <p className="text-[11px] text-slate-400 font-semibold uppercase">Total Stored</p>
          <p className="text-lg font-bold text-slate-200 mt-0.5">
            {queueStatus.totalCount}
          </p>
        </Card>
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/10">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={handleSyncNow}
            disabled={!queueStatus.isOnline || isSyncing || queueStatus.pendingCount === 0}
          >
            {isSyncing ? 'Syncing...' : `⚡ Force Sync Now (${queueStatus.pendingCount})`}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearSynced}
            disabled={queueStatus.syncedCount === 0}
            className="text-xs border border-white/10 hover:bg-white/10"
          >
            Clear Synced History
          </Button>
        </div>

        <button
          type="button"
          onClick={() => syncManager.toggleSimulatedOffline()}
          className={`
            rounded-xl px-3 py-1.5 text-xs font-semibold transition border
            ${
              queueStatus.isSimulatedOffline
                ? 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
                : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/20'
            }
          `}
        >
          {queueStatus.isSimulatedOffline ? 'End Blackout (Go Online)' : 'Simulate Blackout'}
        </button>
      </div>

      {/* Queued Action Records Table */}
      <Card className="p-4 bg-slate-950/70 border border-white/10 text-slate-200">
        <h3 className="text-sm font-bold text-white mb-3">Queue Records in IndexedDB</h3>

        {allItems.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No queued actions recorded yet. Perform actions on the Active Trip screen to populate the queue.
          </div>
        ) : (
          <div className="space-y-2">
            {allItems.map((item) => (
              <div
                key={item.client_event_id}
                className="p-3 rounded-xl bg-slate-900 border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase">{item.action_type}</span>
                    <span
                      className={`
                        text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${
                          item.status === 'SYNCED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : item.status === 'SYNCING'
                            ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    UUID: {item.client_event_id}
                  </p>
                </div>

                <div className="text-right text-slate-400 text-[11px]">
                  <span>{new Date(item.created_at).toLocaleTimeString()}</span>
                  {item.retry_count > 0 && (
                    <span className="ml-2 text-amber-400 font-semibold">
                      (Retry #{item.retry_count})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
