import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { syncManager } from '../lib/offline/SyncManager'

export default function DriverLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [syncStatus, setSyncStatus] = useState({
    connectionState: 'ONLINE',
    pendingCount: 0,
  })

  useEffect(() => {
    const unsubscribe = syncManager.subscribe((status) => {
      setSyncStatus({
        connectionState: status.connectionState,
        pendingCount: status.pendingCount,
      })
    })
    return () => unsubscribe()
  }, [])

  const navItems = [
    { label: 'Active Trip', path: '/driver', icon: '🚚' },
    { label: 'Report', path: '/driver/report', icon: '⚠' },
    { label: 'Corridors', path: '/driver/routes', icon: '🛣' },
    {
      label: 'Offline Queue',
      path: '/driver/sync',
      icon: '🔄',
      badge: syncStatus.pendingCount > 0 ? syncStatus.pendingCount : null,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              KZ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white">Ko Zaw</p>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Driver
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Truck: YGN 7D-4892 (12-Wheel)</p>
            </div>
          </div>

          {/* Quick Role Switcher for Demo */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2">
              <span>Demo Switch:</span>
              <Link
                to="/admin"
                className="text-slate-300 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                Admin
              </Link>
              <Link
                to="/trader"
                className="text-slate-300 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                Trader
              </Link>
            </div>

            {/* Connection Indicator Pill */}
            <div
              className={`
                inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold
                ${
                  syncStatus.connectionState === 'ONLINE'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }
              `}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  syncStatus.connectionState === 'ONLINE' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'
                }`}
              />
              <span className="hidden xs:inline text-[11px]">
                {syncStatus.connectionState === 'ONLINE' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main App Content */}
      <main className="flex-1 pb-20 pt-3 px-3 md:px-6">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>

      {/* Bottom Sticky Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  relative flex flex-col items-center gap-1 py-1 px-3 text-xs font-medium transition
                  ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }
                `}
              >
                <span className="text-lg relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
