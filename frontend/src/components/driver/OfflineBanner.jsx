import Button from '../ui/Button'

export default function OfflineBanner({
  isOnline = true,
  isSimulatedOffline = false,
  pendingCount = 0,
  isSyncing = false,
  onToggleSimulatedOffline,
  onTriggerSync,
  className = '',
}) {
  return (
    <div
      className={`
        rounded-2xl border p-3.5 transition-all shadow-xs
        ${
          !isOnline
            ? 'border-amber-300 bg-amber-50 text-amber-900'
            : 'border-slate-200 bg-white text-slate-800'
        }
        ${className}
      `}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span
              className={`
                absolute inline-flex h-full w-full rounded-full opacity-75
                ${
                  !isOnline
                    ? 'animate-ping bg-amber-400'
                    : 'bg-emerald-400'
                }
              `}
            />
            <span
              className={`
                relative inline-flex h-3 w-3 rounded-full
                ${!isOnline ? 'bg-amber-500' : 'bg-emerald-500'}
              `}
            />
          </span>

          <div>
            <p className="text-xs font-bold leading-tight">
              {!isOnline
                ? isSimulatedOffline
                  ? 'OFFLINE MODE (Simulated Internet Blackout)'
                  : 'OFFLINE (No Internet Connection)'
                : 'ONLINE (Connected to Central Dispatch)'}
            </p>

            <p className="text-[11px] text-slate-500">
              {!isOnline
                ? 'Field reports & GPS telemetry are saving locally to IndexedDB.'
                : pendingCount > 0
                ? `${pendingCount} item${pendingCount > 1 ? 's' : ''} ready for synchronization.`
                : 'Local queue synchronized.'}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {pendingCount > 0 && isOnline && (
            <Button
              size="sm"
              variant="primary"
              onClick={onTriggerSync}
              disabled={isSyncing}
              className="text-xs h-8 px-3"
            >
              {isSyncing ? 'Syncing...' : `Sync Queue (${pendingCount})`}
            </Button>
          )}

          <button
            type="button"
            onClick={onToggleSimulatedOffline}
            className={`
              rounded-xl px-3 py-1.5 text-xs font-semibold transition border
              ${
                isSimulatedOffline
                  ? 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }
            `}
          >
            {isSimulatedOffline ? '⚡ Reconnect (End Offline)' : '🔌 Simulate Blackout'}
          </button>
        </div>
      </div>
    </div>
  )
}
