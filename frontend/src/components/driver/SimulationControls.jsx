import Button from '../ui/Button'

export default function SimulationControls({
  mode = 'SIMULATION', // 'SIMULATION' | 'LIVE'
  onToggleMode,
  isPlaying = false,
  onPlay,
  onPause,
  onStepNext,
  onStepPrev,
  onJumpTo,
  speedMultiplier = 1,
  onChangeSpeed,
  currentWaypointIndex = 0,
  totalWaypoints = 1,
  className = '',
}) {
  const progressPercent =
    totalWaypoints > 1
      ? Math.round((currentWaypointIndex / (totalWaypoints - 1)) * 100)
      : 0

  return (
    <div
      className={`
        rounded-2xl border border-slate-200 bg-white p-4 shadow-sm
        ${className}
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            GPS Controller:
          </span>
          <span
            className={`
              inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold
              ${
                mode === 'LIVE'
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
              }
            `}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                mode === 'LIVE' ? 'bg-emerald-500' : 'bg-indigo-500'
              }`}
            />
            {mode === 'LIVE' ? 'Live Device GPS' : 'Simulation Mode'}
          </span>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleMode}
          className="text-xs font-medium border border-slate-200"
        >
          Switch to {mode === 'LIVE' ? 'Simulator' : 'Live GPS'}
        </Button>
      </div>

      {mode === 'SIMULATION' && (
        <div className="mt-3 space-y-3">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Route Progress</span>
              <span className="font-semibold text-slate-700">
                {progressPercent}% (Leg {currentWaypointIndex + 1} of {totalWaypoints})
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-brand-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              {isPlaying ? (
                <Button size="sm" variant="secondary" onClick={onPause}>
                  ⏸ Pause
                </Button>
              ) : (
                <Button size="sm" variant="primary" onClick={onPlay}>
                  ▶ Play Run
                </Button>
              )}

              <Button size="sm" variant="ghost" onClick={onStepPrev} title="Step Back">
                ⏮ Back
              </Button>
              <Button size="sm" variant="ghost" onClick={onStepNext} title="Step Forward">
                ⏭ Next Leg
              </Button>
            </div>

            {/* Speed Multiplier */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 mr-1">Speed:</span>
              {[1, 2, 5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => onChangeSpeed?.(speed)}
                  className={`
                    px-2 py-1 text-xs rounded-md font-semibold transition
                    ${
                      speedMultiplier === speed
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }
                  `}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Quick Jump Buttons for Live Presentation */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-medium text-slate-400 mb-1.5">
              Quick Jumps for Presentation Demo:
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onJumpTo?.(0)}
                className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
              >
                1. Yangon Hub
              </button>
              <button
                type="button"
                onClick={() => onJumpTo?.(4)}
                className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
              >
                2. Mandalay Depot
              </button>
              <button
                type="button"
                onClick={() => onJumpTo?.(8)}
                className="rounded-lg bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 text-xs font-medium hover:bg-amber-100 transition"
              >
                3. Lashio Checkpoint
              </button>
              <button
                type="button"
                onClick={() => onJumpTo?.(totalWaypoints - 1)}
                className="rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 text-xs font-medium hover:bg-emerald-100 transition"
              >
                4. Muse Border Gate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
