import { useState, useMemo } from 'react'
import { GATES, SEEDED_ROUTES } from '../../lib/routes/myanmarCorridors'
import MapLegend from './MapLegend'

// Geographic bounds for Myanmar logistics corridors
const BOUNDS = {
  minLat: 15.8,
  maxLat: 24.4,
  minLon: 95.0,
  maxLon: 99.2,
}

const SVG_WIDTH = 800
const SVG_HEIGHT = 680
const PADDING = 50

export default function LogisticsMap({
  role = 'driver', // 'driver' | 'admin' | 'trader'
  activeRouteId = 'ROUTE-NORTH-PRIMARY',
  truckPosition = null, // { latitude, longitude, speed, heading, name }
  additionalTrucks = [],
  customGates = [],
  breadcrumbs = [],
  onSelectCoordinates = null,
  className = '',
}) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedEntity, setSelectedEntity] = useState(null)
  const [showLegend, setShowLegend] = useState(true)

  // Project geographic coords (lat, lon) to SVG coords (x, y)
  const project = useMemo(() => {
    return (lat, lon) => {
      const xRatio = (lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)
      const yRatio = (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)

      const x = PADDING + xRatio * (SVG_WIDTH - 2 * PADDING)
      const y = SVG_HEIGHT - PADDING - yRatio * (SVG_HEIGHT - 2 * PADDING)
      return { x, y }
    }
  }, [])

  // Invert SVG coords back to geographic coords (for map click reporting)
  const unproject = (svgX, svgY) => {
    const xRatio = (svgX - PADDING) / (SVG_WIDTH - 2 * PADDING)
    const yRatio = (SVG_HEIGHT - PADDING - svgY) / (SVG_HEIGHT - 2 * PADDING)

    const lon = BOUNDS.minLon + xRatio * (BOUNDS.maxLon - BOUNDS.minLon)
    const lat = BOUNDS.minLat + yRatio * (BOUNDS.maxLat - BOUNDS.minLat)
    return {
      latitude: parseFloat(lat.toFixed(4)),
      longitude: parseFloat(lon.toFixed(4)),
    }
  }

  const allGates = useMemo(() => {
    const map = new Map()
    for (const g of GATES) {
      map.set(g.id, g)
    }
    for (const g of customGates) {
      map.set(g.id, g)
    }
    return Array.from(map.values())
  }, [customGates])

  // Filter routes based on role
  const visibleRoutes = useMemo(() => {
    if (role === 'admin') {
      return SEEDED_ROUTES
    }
    if (role === 'driver') {
      // Driver sees active corridor and its candidate/detour routes
      const active = SEEDED_ROUTES.find((r) => r.id === activeRouteId)
      const corridor = active ? active.corridorId : 'corridor-northern'
      return SEEDED_ROUTES.filter((r) => r.corridorId === corridor)
    }
    // Trader sees active route
    return SEEDED_ROUTES.filter((r) => r.id === activeRouteId)
  }, [role, activeRouteId])

  // Fleet trucks for Admin, or active single truck for Driver/Trader
  const trucksToRender = useMemo(() => {
    const list = []
    if (truckPosition) {
      list.push({
        id: 'primary-truck',
        ...truckPosition,
        isPrimary: true,
        label: role === 'driver' ? 'My Truck' : 'SHP-001 (In Transit)',
      })
    }
    if (role === 'admin' && additionalTrucks.length > 0) {
      list.push(...additionalTrucks)
    }
    return list
  }, [truckPosition, additionalTrucks, role])

  const handleMapClick = (e) => {
    if (!onSelectCoordinates) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * SVG_WIDTH
    const clickY = ((e.clientY - rect.top) / rect.height) * SVG_HEIGHT

    // Adjust for pan and zoom
    const adjustedX = (clickX - pan.x) / zoom
    const adjustedY = (clickY - pan.y) / zoom

    const coords = unproject(adjustedX, adjustedY)
    onSelectCoordinates(coords)
  }

  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  return (
    <div
      className={`
        relative flex flex-col
        overflow-hidden rounded-2xl
        border border-slate-200 bg-slate-900
        shadow-sm select-none
        ${className}
      `}
    >
      {/* Top Map Header & Controls */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Myanmar Logistics Map ({role.toUpperCase()})
        </span>

        {selectedEntity && (
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/90 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md">
            <span>{selectedEntity.title}</span>
            <button
              type="button"
              onClick={() => setSelectedEntity(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </span>
        )}
      </div>

      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
          title="Zoom In"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-950/80 text-sm font-bold text-white hover:bg-slate-800 backdrop-blur-md"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
          title="Zoom Out"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-950/80 text-sm font-bold text-white hover:bg-slate-800 backdrop-blur-md"
        >
          −
        </button>
        <button
          type="button"
          onClick={resetView}
          title="Reset View"
          className="flex h-8 px-2.5 items-center justify-center rounded-lg border border-white/10 bg-slate-950/80 text-xs font-medium text-slate-300 hover:bg-slate-800 backdrop-blur-md"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setShowLegend((v) => !v)}
          title="Toggle Legend"
          className="flex h-8 px-2.5 items-center justify-center rounded-lg border border-white/10 bg-slate-950/80 text-xs font-medium text-slate-300 hover:bg-slate-800 backdrop-blur-md"
        >
          Legend
        </button>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-[450px] md:h-[540px] cursor-crosshair">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full bg-[#0a0f1d]"
          onClick={handleMapClick}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="1"
              />
            </pattern>

            {/* Glowing Truck Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Myanmar Region Outlines / Aesthetic Contours */}
            <path
              d="M 280 620 L 330 520 L 390 420 L 410 320 L 480 220 L 520 120 L 580 80 L 590 140 L 530 250 L 560 380 L 520 480 L 480 560 L 380 640 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(100, 116, 139, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Major City Geographic Anchors */}
            {[
              { name: 'Yangon', lat: 16.8661, lon: 96.1951, align: 'left' },
              { name: 'Naypyidaw', lat: 19.7633, lon: 96.0785, align: 'left' },
              { name: 'Mandalay', lat: 21.9588, lon: 96.0891, align: 'left' },
              { name: 'Pyin Oo Lwin', lat: 22.0350, lon: 96.4560, align: 'right' },
              { name: 'Lashio', lat: 22.9358, lon: 97.7497, align: 'right' },
              { name: 'Muse (China Border)', lat: 23.9917, lon: 97.9014, align: 'right' },
              { name: 'Bago', lat: 17.3221, lon: 96.4660, align: 'right' },
              { name: 'Hpa-An', lat: 16.8906, lon: 97.6333, align: 'right' },
              { name: 'Myawaddy (Thai Border)', lat: 16.6908, lon: 98.5133, align: 'right' },
            ].map((city) => {
              const pt = project(city.lat, city.lon)
              return (
                <g key={city.name} className="pointer-events-none">
                  <circle cx={pt.x} cy={pt.y} r="2.5" fill="#64748b" />
                  <text
                    x={city.align === 'right' ? pt.x + 6 : pt.x - 6}
                    y={pt.y + 3}
                    textAnchor={city.align === 'right' ? 'start' : 'end'}
                    className="text-[10px] font-medium fill-slate-400"
                  >
                    {city.name}
                  </text>
                </g>
              )
            })}

            {/* Route Polylines */}
            {visibleRoutes.map((route) => {
              const pointsStr = route.waypoints
                .map((wp) => {
                  const pt = project(wp.latitude, wp.longitude)
                  return `${pt.x},${pt.y}`
                })
                .join(' ')

              const isActive = route.id === activeRouteId
              const isObserved = route.source === 'DRIVER_OBSERVED'
              const isBlocked = route.operational_status === 'BLOCKED'

              let strokeColor = '#3b82f6' // Default blue
              let strokeDash = 'none'
              let strokeWidth = 3.5

              if (isBlocked) {
                strokeColor = '#ef4444' // Red warning
              } else if (isObserved) {
                strokeColor = '#a855f7' // Violet observed
                strokeDash = '6 4'
                strokeWidth = 2.5
              } else if (isActive) {
                strokeColor = '#6366f1' // Brand Indigo active
                strokeWidth = 4.5
              } else {
                strokeColor = '#475569' // Inactive candidate
                strokeWidth = 2
              }

              return (
                <g key={route.id}>
                  {/* Outer glow for active route */}
                  {isActive && (
                    <polyline
                      points={pointsStr}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="10"
                      strokeOpacity="0.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  <polyline
                    points={pointsStr}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDash}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedEntity({
                        type: 'route',
                        title: `${route.name} (${route.distanceKm} km)`,
                        details: route,
                      })
                    }}
                  />
                </g>
              )
            })}

            {/* Breadcrumb Trailing Path */}
            {breadcrumbs.length > 1 && (
              <polyline
                points={breadcrumbs
                  .map((b) => {
                    const pt = project(b.latitude, b.longitude)
                    return `${pt.x},${pt.y}`
                  })
                  .join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="2 3"
                strokeOpacity="0.7"
              />
            )}

            {/* Gates and Checkpoints */}
            {allGates.map((gate) => {
              const pt = project(gate.latitude, gate.longitude)
              const isCongested = gate.status === 'CONGESTED'
              const isBlocked = gate.status === 'BLOCKED'
              const isPending = gate.status === 'PENDING' || !gate.isVerified

              let gateColor = '#10b981' // Green open
              if (isBlocked) gateColor = '#ef4444'
              else if (isCongested) gateColor = '#f59e0b'
              else if (isPending) gateColor = '#f97316'

              return (
                <g
                  key={gate.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedEntity({
                      type: 'gate',
                      title: gate.name,
                      details: gate,
                    })
                  }}
                >
                  {/* Status Indicator Icon */}
                  <circle
                    r="8"
                    fill={gateColor}
                    fillOpacity={isPending ? '0.3' : '0.85'}
                    stroke={gateColor}
                    strokeWidth="1.5"
                    strokeDasharray={isPending ? '2 2' : 'none'}
                  />

                  {isPending ? (
                    <text
                      y="3"
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-white pointer-events-none"
                    >
                      !
                    </text>
                  ) : (
                    <circle r="3" fill="#ffffff" />
                  )}

                  {/* Checkpoint Name Tag */}
                  <text
                    y="-12"
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  >
                    {gate.name.split(' ')[0]}
                  </text>
                </g>
              )
            })}

            {/* Active Trucks */}
            {trucksToRender.map((truck) => {
              const pt = project(truck.latitude, truck.longitude)
              const heading = truck.heading || 0

              return (
                <g
                  key={truck.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedEntity({
                      type: 'truck',
                      title: `${truck.label || 'Truck'} · Speed: ${truck.speed || 0} km/h`,
                      details: truck,
                    })
                  }}
                >
                  {/* Radar Pulse Animation */}
                  <circle
                    r="18"
                    fill="#6366f1"
                    fillOpacity="0.25"
                    className="animate-ping"
                  />

                  {/* Truck Background Pin */}
                  <circle
                    r="13"
                    fill="#4f46e5"
                    stroke="#ffffff"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />

                  {/* Truck Heading Arrow */}
                  <g transform={`rotate(${heading})`}>
                    <path
                      d="M 0 -8 L 5 4 L 0 2 L -5 4 Z"
                      fill="#ffffff"
                    />
                  </g>

                  {/* Truck Label */}
                  <g transform="translate(0, 22)">
                    <rect
                      x="-42"
                      y="-10"
                      width="84"
                      height="18"
                      rx="6"
                      fill="rgba(15, 23, 42, 0.85)"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1"
                    />
                    <text
                      y="2"
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-white"
                    >
                      {truck.label}
                    </text>
                  </g>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Floating Legend */}
      {showLegend && (
        <div className="absolute bottom-3 left-3 z-10 max-w-xs">
          <MapLegend />
        </div>
      )}

      {/* Coordinate Click Helper for Drivers */}
      {onSelectCoordinates && (
        <div className="absolute bottom-3 right-3 z-10 rounded-xl bg-slate-950/80 px-3 py-1.5 text-[11px] text-slate-300 border border-white/10 backdrop-blur-md">
          💡 Click anywhere on map to select checkpoint coordinates
        </div>
      )}
    </div>
  )
}
