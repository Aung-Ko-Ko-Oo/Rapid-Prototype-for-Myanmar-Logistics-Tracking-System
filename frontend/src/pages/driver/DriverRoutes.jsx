import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { SEEDED_ROUTES } from '../../lib/routes/myanmarCorridors'
import {
  applyTraversalReinforcement,
  rankRouteRecommendations,
} from '../../lib/routes/routeConfidence'

export default function DriverRoutes() {
  const [routes, setRoutes] = useState(SEEDED_ROUTES)
  const [selectedRouteId, setSelectedRouteId] = useState('ROUTE-NORTH-PRIMARY')
  const [reinforcementLog, setReinforcementLog] = useState(null)
  const [driverCounter, setDriverCounter] = useState(101)

  const ranked = rankRouteRecommendations(routes, [])

  const handleSimulateTraversal = (routeId) => {
    const route = routes.find((r) => r.id === routeId)
    if (!route) return

    const nextDriverNum = driverCounter
    setDriverCounter((c) => c + 1)

    // Simulate a successful LIVE GPS traversal by a new driver
    const traversal = {
      driverId: `DRIVER-${nextDriverNum}`,
      isSuccess: true,
      isBlocked: false,
      isEligibleForReinforcement: true,
      source: 'LIVE_GPS',
    }

    const updated = applyTraversalReinforcement(route, traversal)
    setRoutes((prev) => prev.map((r) => (r.id === routeId ? updated : r)))

    setReinforcementLog({
      routeName: route.name,
      oldConfidence: route.confidence_score,
      newConfidence: updated.confidence_score,
      drivers: updated.uniqueDrivers,
      autoConfirmed: updated.autoConfirmed,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Logistics Corridors & Route Learning</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Pheromone-inspired route confidence (doc/09). Driver observations gain trust through repeated successful traversals.
        </p>
      </div>

      {reinforcementLog && (
        <div className="rounded-2xl border border-purple-500/30 bg-purple-950/40 p-4 text-purple-200">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Pheromone Reinforcement Applied:
          </p>
          <p className="text-sm font-semibold mt-1">
            {reinforcementLog.routeName}: {reinforcementLog.oldConfidence}% →{' '}
            <span className="text-emerald-400 font-bold">{reinforcementLog.newConfidence}%</span> (
            {reinforcementLog.drivers} unique drivers)
          </p>
          {reinforcementLog.autoConfirmed && (
            <p className="text-xs text-emerald-400 font-bold mt-1">
              ✨ Auto-Confirmed: Threshold of 50% trust and 2+ unique drivers reached!
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {ranked.map((route) => {
          const isSelected = route.id === selectedRouteId
          const isObserved = route.source === 'DRIVER_OBSERVED'

          return (
            <Card
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`
                p-4 bg-slate-950/70 border text-slate-200 transition cursor-pointer
                ${isSelected ? 'border-brand-500 ring-1 ring-brand-500' : 'border-white/10 hover:border-white/20'}
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{route.name}</h3>
                    {isObserved && (
                      <span className="text-[10px] font-bold text-purple-300 bg-purple-900/50 border border-purple-500/30 px-2 py-0.5 rounded-full">
                        Driver Observed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {route.distanceKm} km · {route.estimatedHours} hrs transit
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`
                      inline-block px-2.5 py-1 text-xs font-bold rounded-lg
                      ${
                        route.confidence_score >= 70
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : route.confidence_score >= 40
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                          : 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                      }
                    `}
                  >
                    ★ {route.confidence_score}% Confidence
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {route.uniqueDrivers || 1} Drivers verified
                  </p>
                </div>
              </div>

              {route.note && (
                <p className="text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-white/5 mt-3 italic">
                  {route.note}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-xs text-slate-400">
                  Trust: <span className="font-semibold text-white">{route.trust_status}</span>
                </span>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSimulateTraversal(route.id)}
                  className="text-xs border border-purple-500/30 text-purple-300 hover:bg-purple-900/30"
                >
                  ⚡ Test +10 Traversal Bonus
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
