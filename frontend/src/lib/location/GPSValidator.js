import { calculateDistanceKm, LocationSource } from './types'

export class GPSValidator {
  constructor(options = {}) {
    this.maxAccuracyMeters = options.maxAccuracyMeters ?? 100
    this.maxSpeedKmh = options.maxSpeedKmh ?? 120 // Maximum feasible truck speed in Myanmar
    this.lastValidPoint = null
  }

  reset() {
    this.lastValidPoint = null
  }

  validate(point) {
    if (!point || typeof point.latitude !== 'number' || typeof point.longitude !== 'number') {
      return {
        isValid: false,
        reason: 'INVALID_COORDINATES',
        isEligibleForReinforcement: false,
      }
    }

    // Latitude and longitude bounding box for Myanmar region (roughly 9.0 to 29.0 N, 92.0 to 102.0 E)
    if (
      point.latitude < 9.0 ||
      point.latitude > 29.0 ||
      point.longitude < 92.0 ||
      point.longitude > 102.5
    ) {
      return {
        isValid: false,
        reason: 'OUT_OF_BOUNDS_MYANMAR',
        isEligibleForReinforcement: false,
      }
    }

    // Accuracy filter
    if (typeof point.accuracy === 'number' && point.accuracy > this.maxAccuracyMeters) {
      return {
        isValid: false,
        reason: 'LOW_ACCURACY',
        isEligibleForReinforcement: false,
      }
    }

    // Impossible jump detection (speed check compared to last known position)
    if (this.lastValidPoint && point.timestamp && this.lastValidPoint.timestamp) {
      const distKm = calculateDistanceKm(
        this.lastValidPoint.latitude,
        this.lastValidPoint.longitude,
        point.latitude,
        point.longitude
      )
      const timeDiffHours =
        (new Date(point.timestamp).getTime() - new Date(this.lastValidPoint.timestamp).getTime()) /
        (1000 * 3600)

      if (timeDiffHours > 0) {
        const impliedSpeed = distKm / timeDiffHours
        if (impliedSpeed > this.maxSpeedKmh) {
          return {
            isValid: false,
            reason: 'IMPOSSIBLE_JUMP',
            impliedSpeedKmh: Math.round(impliedSpeed),
            isEligibleForReinforcement: false,
          }
        }
      }
    }

    // Production Route Reinforcement Rule:
    // SIMULATED points demonstrate UI behavior but NEVER reinforce production route confidence
    const isLiveGps = point.source === LocationSource.LIVE_GPS
    const isEligible = isLiveGps && (!point.accuracy || point.accuracy <= 30)

    this.lastValidPoint = point

    return {
      isValid: true,
      reason: null,
      isEligibleForReinforcement: isEligible,
    }
  }
}
