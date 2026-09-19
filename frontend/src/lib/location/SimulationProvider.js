import { LocationProvider } from './LocationProvider'
import { LocationSource, calculateBearing, calculateDistanceKm } from './types'

export class SimulationProvider extends LocationProvider {
  constructor(waypoints = [], options = {}) {
    super(LocationSource.SIMULATED)
    this.waypoints = waypoints
    this.currentIndex = 0
    this.intervalId = null
    this.intervalMs = options.intervalMs ?? 2000
    this.speedMultiplier = options.speedMultiplier ?? 1
    this.isPlaying = false
  }

  setWaypoints(waypoints, startIndex = 0) {
    this.waypoints = waypoints || []
    this.currentIndex = Math.min(Math.max(0, startIndex), Math.max(0, this.waypoints.length - 1))
    if (this.waypoints.length > 0) {
      this.emitCurrentPoint()
    }
  }

  start(onUpdate, onError) {
    super.start(onUpdate, onError)
    this.emitCurrentPoint()
    this.play()
  }

  play() {
    if (this.isPlaying) return
    this.isPlaying = true

    const effectiveInterval = Math.max(200, this.intervalMs / this.speedMultiplier)
    this.intervalId = setInterval(() => {
      this.stepNext()
    }, effectiveInterval)
  }

  pause() {
    this.isPlaying = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  setSpeed(multiplier) {
    this.speedMultiplier = multiplier
    if (this.isPlaying) {
      this.pause()
      this.play()
    }
  }

  stepNext() {
    if (this.waypoints.length === 0) return
    if (this.currentIndex < this.waypoints.length - 1) {
      this.currentIndex += 1
      this.emitCurrentPoint()
    } else {
      this.pause() // reached end of route
    }
  }

  stepPrev() {
    if (this.waypoints.length === 0) return
    if (this.currentIndex > 0) {
      this.currentIndex -= 1
      this.emitCurrentPoint()
    }
  }

  jumpTo(index) {
    if (this.waypoints.length === 0) return
    this.currentIndex = Math.min(Math.max(0, index), this.waypoints.length - 1)
    this.emitCurrentPoint()
  }

  jumpToWaypointName(name) {
    const idx = this.waypoints.findIndex(
      (wp) => wp.name && wp.name.toLowerCase().includes(name.toLowerCase())
    )
    if (idx !== -1) {
      this.jumpTo(idx)
      return true
    }
    return false
  }

  stop() {
    this.pause()
    super.stop()
  }

  getCurrentPosition() {
    return this.buildPoint(this.currentIndex)
  }

  getProgress() {
    if (this.waypoints.length <= 1) return 100
    return Math.round((this.currentIndex / (this.waypoints.length - 1)) * 100)
  }

  emitCurrentPoint() {
    const point = this.buildPoint(this.currentIndex)
    if (point) {
      this.notifyUpdate(point)
    }
  }

  buildPoint(index) {
    if (!this.waypoints || this.waypoints.length === 0) return null
    const current = this.waypoints[index]
    const prev = index > 0 ? this.waypoints[index - 1] : current
    const next = index < this.waypoints.length - 1 ? this.waypoints[index + 1] : current

    const bearing = calculateBearing(
      current.latitude,
      current.longitude,
      next.latitude,
      next.longitude
    )

    const distKm = calculateDistanceKm(
      prev.latitude,
      prev.longitude,
      current.latitude,
      current.longitude
    )
    // Simulated truck speed between 40 - 65 km/h
    const simulatedSpeed = distKm > 0.05 ? 55 : 0

    return {
      latitude: current.latitude,
      longitude: current.longitude,
      accuracy: 5,
      speed: simulatedSpeed,
      heading: bearing,
      altitude: current.altitude ?? 150,
      timestamp: new Date().toISOString(),
      source: LocationSource.SIMULATED,
      name: current.name ?? null,
      waypointIndex: index,
      totalWaypoints: this.waypoints.length,
      checkpointId: current.checkpointId ?? null,
    }
  }
}
