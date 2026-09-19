import { LocationProvider } from './LocationProvider'
import { LocationSource } from './types'

export class LiveGPSProvider extends LocationProvider {
  constructor(options = {}) {
    super(LocationSource.LIVE_GPS)
    this.watchId = null
    this.lastPosition = null
    this.options = {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000,
      ...options,
    }
  }

  start(onUpdate, onError) {
    super.start(onUpdate, onError)

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      this.notifyError(new Error('Geolocation is not supported on this device/browser'))
      return
    }

    this.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const point = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          speed: pos.coords.speed !== null ? pos.coords.speed * 3.6 : null, // convert m/s to km/h
          heading: pos.coords.heading ?? null,
          altitude: pos.coords.altitude ?? null,
          timestamp: pos.timestamp ? new Date(pos.timestamp).toISOString() : new Date().toISOString(),
          source: LocationSource.LIVE_GPS,
        }
        this.lastPosition = point
        this.notifyUpdate(point)
      },
      (err) => {
        this.notifyError(err)
      },
      this.options
    )
  }

  stop() {
    if (this.watchId !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
    super.stop()
  }

  getCurrentPosition() {
    return this.lastPosition
  }
}
