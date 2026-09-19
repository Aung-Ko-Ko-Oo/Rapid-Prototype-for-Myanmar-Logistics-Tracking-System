import { LiveGPSProvider } from './LiveGPSProvider'
import { SimulationProvider } from './SimulationProvider'
import { GPSValidator } from './GPSValidator'
import { TrackingMode, calculateDistanceKm } from './types'

export class TrackingService {
  constructor(options = {}) {
    this.validator = new GPSValidator(options.validatorOptions)
    this.simProvider = new SimulationProvider(options.waypoints, options.simulationOptions)
    this.liveProvider = new LiveGPSProvider(options.liveOptions)

    this.mode = options.initialMode ?? TrackingMode.SIMULATION
    this.listeners = new Set()
    this.batchListeners = new Set()

    this.currentPosition = null
    this.breadcrumbs = []
    this.buffer = []
    this.batchIntervalMs = options.batchIntervalMs ?? 10000 // 10s default batch
    this.batchTimer = null
    this.minMovementDistKm = 0.05 // 50m minimum movement to store breadcrumb
  }

  get activeProvider() {
    return this.mode === TrackingMode.LIVE ? this.liveProvider : this.simProvider
  }

  start() {
    this.startBatchTimer()
    this.activeProvider.start(
      (point) => this.handlePointUpdate(point),
      (err) => this.handlePointError(err)
    )
  }

  stop() {
    this.stopBatchTimer()
    this.liveProvider.stop()
    this.simProvider.stop()
  }

  setMode(newMode) {
    if (this.mode === newMode) return
    const wasRunning = this.activeProvider.isRunning
    this.activeProvider.stop()
    this.mode = newMode
    this.validator.reset()

    if (wasRunning) {
      this.activeProvider.start(
        (point) => this.handlePointUpdate(point),
        (err) => this.handlePointError(err)
      )
    }
  }

  setWaypoints(waypoints, startIndex = 0) {
    this.simProvider.setWaypoints(waypoints, startIndex)
  }

  subscribe(callback) {
    this.listeners.add(callback)
    if (this.currentPosition) {
      callback(this.currentPosition)
    }
    return () => this.listeners.delete(callback)
  }

  subscribeBatch(callback) {
    this.batchListeners.add(callback)
    return () => this.batchListeners.delete(callback)
  }

  handlePointUpdate(point) {
    const validation = this.validator.validate(point)
    if (!validation.isValid) {
      console.warn('[TrackingService] Discarded invalid GPS point:', validation.reason, point)
      return
    }

    const validatedPoint = {
      ...point,
      isEligibleForReinforcement: validation.isEligibleForReinforcement,
    }

    this.currentPosition = validatedPoint

    // Breadcrumbs management
    const lastCrumb = this.breadcrumbs[this.breadcrumbs.length - 1]
    const dist = lastCrumb
      ? calculateDistanceKm(
          lastCrumb.latitude,
          lastCrumb.longitude,
          validatedPoint.latitude,
          validatedPoint.longitude
        )
      : 999

    if (dist >= this.minMovementDistKm) {
      this.breadcrumbs.push(validatedPoint)
      if (this.breadcrumbs.length > 200) {
        this.breadcrumbs.shift()
      }
    }

    this.buffer.push(validatedPoint)

    // Notify position subscribers
    for (const listener of this.listeners) {
      try {
        listener(validatedPoint)
      } catch (err) {
        console.error('[TrackingService] Error in position listener:', err)
      }
    }
  }

  handlePointError(error) {
    console.error('[TrackingService] Provider error:', error)
  }

  startBatchTimer() {
    this.stopBatchTimer()
    this.batchTimer = setInterval(() => {
      this.flushBatch()
    }, this.batchIntervalMs)
  }

  stopBatchTimer() {
    if (this.batchTimer) {
      clearInterval(this.batchTimer)
      this.batchTimer = null
    }
  }

  flushBatch() {
    if (this.buffer.length === 0) return
    const batch = [...this.buffer]
    this.buffer = []

    for (const listener of this.batchListeners) {
      try {
        listener(batch)
      } catch (err) {
        console.error('[TrackingService] Error in batch listener:', err)
      }
    }
  }
}
