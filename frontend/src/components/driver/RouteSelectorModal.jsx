import Button from '../ui/Button'

export default function RouteSelectorModal({
  isOpen,
  onClose,
  routes = [],
  activeRouteId,
  onSelectRoute,
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Select Active Corridor / Detour</h3>
            <p className="text-xs text-slate-500">
              Driver has operational authority to reroute (Q62 / Q90)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {routes.map((route) => {
            const isActive = route.id === activeRouteId
            const isObserved = route.source === 'DRIVER_OBSERVED'
            const isBlocked = route.operational_status === 'BLOCKED'

            return (
              <div
                key={route.id}
                className={`
                  p-4 rounded-xl border transition
                  ${
                    isActive
                      ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-600'
                      : isBlocked
                      ? 'border-red-200 bg-red-50/40'
                      : 'border-slate-200 hover:bg-slate-50'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{route.name}</h4>
                      {isObserved && (
                        <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          Observed Route
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold text-brand-700 bg-brand-100 px-2 py-0.5 rounded-full">
                          Currently Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {route.distanceKm} km · Approx {route.estimatedHours} hrs transit
                    </p>
                  </div>

                  {/* Confidence Score Pill */}
                  <div className="text-right">
                    <span
                      className={`
                        inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold
                        ${
                          (route.confidence_score || 50) >= 70
                            ? 'bg-emerald-100 text-emerald-800'
                            : (route.confidence_score || 50) >= 40
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-purple-100 text-purple-800'
                        }
                      `}
                    >
                      ★ {route.confidence_score || 50}% Trust
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {route.uniqueDrivers || 1} Drivers corroborate
                    </p>
                  </div>
                </div>

                {route.note && (
                  <p className="mt-2 text-xs text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-100 italic">
                    ℹ {route.note}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <span
                    className={`
                      text-xs font-semibold
                      ${
                        isBlocked
                          ? 'text-red-600'
                          : route.operational_status === 'DISRUPTED'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }
                    `}
                  >
                    ● Status: {route.operational_status || 'CLEAR'}
                  </span>

                  {!isActive && (
                    <Button
                      size="sm"
                      variant={isBlocked ? 'danger' : 'primary'}
                      onClick={() => {
                        onSelectRoute(route.id)
                        onClose()
                      }}
                      className="text-xs h-8"
                    >
                      {isBlocked ? 'Reroute Here Anyway' : 'Select This Route'}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex justify-end pt-3 border-t border-slate-100">
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
