import { describe, expect, test } from 'vitest'
import { GPSValidator } from '../../lib/location/GPSValidator'
import { LocationSource } from '../../lib/location/types'

describe('GPSValidator', () => {
  test('accepts valid coordinates within Myanmar bounds', () => {
    const validator = new GPSValidator()
    const point = {
      latitude: 16.8661, // Yangon
      longitude: 96.1951,
      accuracy: 10,
      timestamp: new Date().toISOString(),
      source: LocationSource.LIVE_GPS,
    }

    const result = validator.validate(point)
    expect(result.isValid).toBe(true)
    expect(result.isEligibleForReinforcement).toBe(true)
  })

  test('rejects coordinates outside Myanmar geographic bounding box', () => {
    const validator = new GPSValidator()
    const point = {
      latitude: 51.5074, // London
      longitude: -0.1278,
      accuracy: 10,
      source: LocationSource.LIVE_GPS,
    }

    const result = validator.validate(point)
    expect(result.isValid).toBe(false)
    expect(result.reason).toBe('OUT_OF_BOUNDS_MYANMAR')
  })

  test('rejects low accuracy coordinates (> 100m)', () => {
    const validator = new GPSValidator({ maxAccuracyMeters: 100 })
    const point = {
      latitude: 21.9588, // Mandalay
      longitude: 96.0891,
      accuracy: 250,
      source: LocationSource.LIVE_GPS,
    }

    const result = validator.validate(point)
    expect(result.isValid).toBe(false)
    expect(result.reason).toBe('LOW_ACCURACY')
  })

  test('detects impossible speed jumps (> 120 km/h)', () => {
    const validator = new GPSValidator({ maxSpeedKmh: 120 })
    const t0 = new Date('2026-09-20T10:00:00Z').toISOString()
    const t1 = new Date('2026-09-20T10:05:00Z').toISOString() // 5 mins later

    // Point 1: Yangon
    validator.validate({
      latitude: 16.8661,
      longitude: 96.1951,
      timestamp: t0,
      source: LocationSource.LIVE_GPS,
    })

    // Point 2: Mandalay (~600km in 5 minutes = 7200 km/h jump)
    const result = validator.validate({
      latitude: 21.9588,
      longitude: 96.0891,
      timestamp: t1,
      source: LocationSource.LIVE_GPS,
    })

    expect(result.isValid).toBe(false)
    expect(result.reason).toBe('IMPOSSIBLE_JUMP')
  })

  test('marks SIMULATED points as valid but not eligible for reinforcement', () => {
    const validator = new GPSValidator()
    const point = {
      latitude: 22.0350,
      longitude: 96.4560,
      accuracy: 5,
      timestamp: new Date().toISOString(),
      source: LocationSource.SIMULATED,
    }

    const result = validator.validate(point)
    expect(result.isValid).toBe(true)
    expect(result.isEligibleForReinforcement).toBe(false)
  })
})
