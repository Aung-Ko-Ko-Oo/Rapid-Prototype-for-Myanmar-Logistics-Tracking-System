import { useState, useEffect, useRef } from 'react'
import TripSummaryCard from '../../components/driver/TripSummaryCard'
import SimulationControls from '../../components/driver/SimulationControls'
import OfflineBanner from '../../components/driver/OfflineBanner'
import LogisticsMap from '../../components/map/LogisticsMap'
import StatusUpdateModal from '../../components/driver/StatusUpdateModal'
import ReportCheckpointModal from '../../components/driver/ReportCheckpointModal'
import RouteSelectorModal from '../../components/driver/RouteSelectorModal'
import Button from '../../components/ui/Button'

import { TrackingService } from '../../lib/location/TrackingService'
import { TrackingMode } from '../../lib/location/types'
import { syncManager } from '../../lib/offline/SyncManager'
import { QueueActionType } from '../../lib/offline/OfflineQueue'
import {
  SEEDED_ROUTES,
  NORTHERN_PRIMARY_WAYPOINTS,
  GATES,
} from '../../lib/routes/myanmarCorridors'

export default function DriverDashboard() {
  // Active shipment state
  const [shipment, setShipment] = useState({
    id: 'SHP-001',
    trackingNumber: 'MM-YGN-2026-001',
    origin: 'Yangon (Hlaing Tharyar Hub)',
    destination: 'Muse Border Gate (Ruili Crossing)',
    cargoDescription: '24T Agricultural Produce (Sesame & Pulses)',
    vehicleNumber: 'YGN 7D-4892 (12-Wheel)',
    status: 'IN_TRANSIT',
    eta: '20 Sep, 14:00 MMT',
    activeRouteId: 'ROUTE-NORTH-PRIMARY',
  })

  // Dynamic routes and checkpoints
  const routes = SEEDED_ROUTES
  const [gates, setGates] = useState(GATES)
  const [activeRouteId, setActiveRouteId] = useState('ROUTE-NORTH-PRIMARY')
  const [reportCoordinates, setReportCoordinates] = useState(null)

  // Modals
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [routeModalOpen, setRouteModalOpen] = useState(false)
  const [deliverySuccessMessage, setDeliverySuccessMessage] = useState(null)

  // Sync Manager state
  const [syncStatus, setSyncStatus] = useState({
    isOnline: true,
    isSimulatedOffline: false,
    pendingCount: 0,
    isSyncing: false,
  })

  // Tracking & GPS state
  const trackingServiceRef = useRef(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  const [trackingMode, setTrackingMode] = useState(TrackingMode.SIMULATION)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0)
  const [breadcrumbs, setBreadcrumbs] = useState([])

  // Active route points
  const activeRoute = routes.find((r) => r.id === activeRouteId) || routes[0]
  const currentWaypoints = activeRoute.waypoints || NORTHERN_PRIMARY_WAYPOINTS

  // Initialize tracking service once
  useEffect(() => {
    const service = new TrackingService({
      waypoints: NORTHERN_PRIMARY_WAYPOINTS,
      initialMode: TrackingMode.SIMULATION,
      simulationOptions: { intervalMs: 2200, speedMultiplier: 1 },
    })

    trackingServiceRef.current = service

    const unsubPos = service.subscribe((point) => {
      setCurrentPosition(point)
      if (typeof point.waypointIndex === 'number') {
        setCurrentWaypointIndex(point.waypointIndex)
      }
      setBreadcrumbs([...service.breadcrumbs])

      // If online and moving, we can buffer GPS batch
      if (!syncManager.isEffectiveOnline) {
        syncManager.queue.enqueue(QueueActionType.GPS_BATCH, {
          latitude: point.latitude,
          longitude: point.longitude,
          timestamp: point.timestamp,
          source: point.source,
        })
      }
    })

    service.start()

    // Sync Manager subscription
    const unsubSync = syncManager.subscribe((status) => {
      setSyncStatus({
        isOnline: status.isOnline,
        isSimulatedOffline: status.isSimulatedOffline,
        pendingCount: status.pendingCount,
        isSyncing: syncManager.isSyncing,
      })
    })

    return () => {
      unsubPos()
      unsubSync()
      service.stop()
    }
  }, [])

  // Handle route change
  const handleSelectRoute = async (newRouteId) => {
    const targetRoute = routes.find((r) => r.id === newRouteId)
    if (!targetRoute) return

    setActiveRouteId(newRouteId)
    setShipment((prev) => ({ ...prev, activeRouteId: newRouteId }))

    if (trackingServiceRef.current) {
      trackingServiceRef.current.setWaypoints(targetRoute.waypoints, 0)
      trackingServiceRef.current.simProvider.jumpTo(0)
    }

    // Queue action if offline
    if (!syncStatus.isOnline) {
      await syncManager.queue.enqueue(QueueActionType.ROUTE_SELECTION, {
        shipmentId: shipment.id,
        routeId: newRouteId,
        routeName: targetRoute.name,
      })
    }
  }

  // Handle Status Update
  const handleUpdateStatus = async (newStatus, note) => {
    setShipment((prev) => ({ ...prev, status: newStatus }))

    const payload = {
      shipmentId: shipment.id,
      previousStatus: shipment.status,
      newStatus,
      note,
      timestamp: new Date().toISOString(),
      location: currentPosition,
    }

    if (!syncStatus.isOnline) {
      await syncManager.queue.enqueue(QueueActionType.STATUS_UPDATE, payload)
    }

    if (newStatus === 'DELIVERED') {
      setDeliverySuccessMessage('Proof of Delivery confirmed. Shipment marked DELIVERED.')
      if (trackingServiceRef.current) {
        trackingServiceRef.current.simProvider.pause()
        setIsPlaying(false)
      }
    }
  }

  // Handle Checkpoint Report
  const handleReportCheckpoint = async (reportData) => {
    const newGate = {
      id: `GATE-REPORT-${Date.now()}`,
      name: reportData.name,
      latitude: reportData.latitude,
      longitude: reportData.longitude,
      status: reportData.condition,
      type: 'TEMPORARY',
      isVerified: false,
      description: `${reportData.note || 'Driver reported'} (Delay: ${reportData.delayEstimate})`,
    }

    setGates((prev) => [newGate, ...prev])

    const payload = {
      ...reportData,
      shipmentId: shipment.id,
      driverId: 'KZ-DRIVER-01',
    }

    if (!syncStatus.isOnline) {
      await syncManager.queue.enqueue(QueueActionType.GATE_REPORT, payload)
    }
  }

  // Simulation play/pause handlers
  const handlePlay = () => {
    trackingServiceRef.current?.simProvider.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    trackingServiceRef.current?.simProvider.pause()
    setIsPlaying(false)
  }

  const handleStepNext = () => {
    trackingServiceRef.current?.simProvider.stepNext()
  }

  const handleStepPrev = () => {
    trackingServiceRef.current?.simProvider.stepPrev()
  }

  const handleJumpTo = (index) => {
    trackingServiceRef.current?.simProvider.jumpTo(index)
  }

  const handleChangeSpeed = (multiplier) => {
    setSpeedMultiplier(multiplier)
    trackingServiceRef.current?.simProvider.setSpeed(multiplier)
  }

  const handleToggleTrackingMode = () => {
    const nextMode =
      trackingMode === TrackingMode.SIMULATION ? TrackingMode.LIVE : TrackingMode.SIMULATION
    setTrackingMode(nextMode)
    trackingServiceRef.current?.setMode(nextMode)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-4">
      {/* Offline Banner & Network Blackout Simulator */}
      <OfflineBanner
        isOnline={syncStatus.isOnline}
        isSimulatedOffline={syncStatus.isSimulatedOffline}
        pendingCount={syncStatus.pendingCount}
        isSyncing={syncStatus.isSyncing}
        onToggleSimulatedOffline={() => syncManager.toggleSimulatedOffline()}
        onTriggerSync={() => syncManager.triggerSync()}
      />

      {/* Delivery Success Notice */}
      {deliverySuccessMessage && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎉</span>
            <div>
              <p className="font-bold text-sm">Delivery Completed</p>
              <p className="text-xs text-emerald-400">{deliverySuccessMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDeliverySuccessMessage(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Active Consignment Card */}
      <TripSummaryCard
        shipment={shipment}
        currentWaypointName={currentPosition?.name}
      />

      {/* Interactive Logistics Map */}
      <LogisticsMap
        role="driver"
        activeRouteId={activeRouteId}
        truckPosition={currentPosition}
        customGates={gates}
        breadcrumbs={breadcrumbs}
        onSelectCoordinates={(coords) => {
          setReportCoordinates(coords)
          setReportModalOpen(true)
        }}
      />

      {/* Operational Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <Button
          variant="primary"
          onClick={() => setStatusModalOpen(true)}
          className="w-full flex items-center justify-center gap-1.5 py-3 text-xs"
        >
          <span>📋</span> Update Status
        </Button>

        <Button
          variant="secondary"
          onClick={() => setReportModalOpen(true)}
          className="w-full flex items-center justify-center gap-1.5 py-3 text-xs border-amber-300 text-amber-900 bg-amber-50 hover:bg-amber-100"
        >
          <span>⚠</span> Report Gate
        </Button>

        <Button
          variant="secondary"
          onClick={() => setRouteModalOpen(true)}
          className="w-full flex items-center justify-center gap-1.5 py-3 text-xs border-purple-200 text-purple-900 bg-purple-50 hover:bg-purple-100"
        >
          <span>🛣</span> Choose Route
        </Button>

        <Button
          variant="success"
          onClick={() => handleUpdateStatus('DELIVERED', 'Cargo handed over to Muse customs consignee')}
          className="w-full flex items-center justify-center gap-1.5 py-3 text-xs"
        >
          <span>✔</span> Mark Delivered
        </Button>
      </div>

      {/* Simulation Controls & GPS Toolbar */}
      <SimulationControls
        mode={trackingMode}
        onToggleMode={handleToggleTrackingMode}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepNext={handleStepNext}
        onStepPrev={handleStepPrev}
        onJumpTo={handleJumpTo}
        speedMultiplier={speedMultiplier}
        onChangeSpeed={handleChangeSpeed}
        currentWaypointIndex={currentWaypointIndex}
        totalWaypoints={currentWaypoints.length}
      />

      {/* Modals */}
      <StatusUpdateModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        currentStatus={shipment.status}
        onUpdateStatus={handleUpdateStatus}
      />

      <ReportCheckpointModal
        isOpen={reportModalOpen}
        onClose={() => {
          setReportModalOpen(false)
          setReportCoordinates(null)
        }}
        currentCoordinates={reportCoordinates || currentPosition}
        isOnline={syncStatus.isOnline}
        onSubmitReport={handleReportCheckpoint}
      />

      <RouteSelectorModal
        isOpen={routeModalOpen}
        onClose={() => setRouteModalOpen(false)}
        routes={routes}
        activeRouteId={activeRouteId}
        onSelectRoute={handleSelectRoute}
      />
    </div>
  )
}
