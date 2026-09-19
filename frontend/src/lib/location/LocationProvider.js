/**
 * Abstract LocationProvider interface
 * Implemented by LiveGPSProvider and SimulationProvider
 */
export class LocationProvider {
  constructor(type) {
    if (new.target === LocationProvider) {
      throw new TypeError('Cannot construct LocationProvider instances directly')
    }
    this.type = type
    this.isRunning = false
    this.onUpdateCallback = null
    this.onErrorCallback = null
  }

  start(onUpdate, onError) {
    this.onUpdateCallback = onUpdate
    this.onErrorCallback = onError
    this.isRunning = true
  }

  stop() {
    this.isRunning = false
    this.onUpdateCallback = null
    this.onErrorCallback = null
  }

  getCurrentPosition() {
    throw new Error('getCurrentPosition() must be implemented')
  }

  notifyUpdate(point) {
    if (this.isRunning && this.onUpdateCallback) {
      this.onUpdateCallback(point)
    }
  }

  notifyError(error) {
    if (this.isRunning && this.onErrorCallback) {
      this.onErrorCallback(error)
    }
  }
}
