import { describe, expect, test } from 'vitest'
import {
  applyTraversalReinforcement,
  applyInactivityDecay,
  rankRouteRecommendations,
} from '../../lib/routes/routeConfidence'

describe('Route Confidence Engine', () => {
  const baseRoute = {
    id: 'ROUTE-TEST',
    name: 'Test Bypass',
    confidence_score: 20,
    trust_status: 'UNCONFIRMED',
    operational_status: 'CLEAR',
    tripCount: 0,
    uniqueDrivers: 0,
    drivers: [],
  }

  test('strictly rejects simulated traversals from confidence reinforcement', () => {
    const simTraversal = {
      driverId: 'D-01',
      isSuccess: true,
      source: 'SIMULATED',
      isEligibleForReinforcement: false,
    }

    const updated = applyTraversalReinforcement(baseRoute, simTraversal)
    expect(updated.reinforcementRejected).toBe(true)
    expect(updated.confidence_score).toBe(20) // Unchanged
  })

  test('applies +10 traversal and +10 unique driver diversity bonus for valid LIVE GPS', () => {
    const liveTraversal = {
      driverId: 'D-01',
      isSuccess: true,
      source: 'LIVE_GPS',
      isEligibleForReinforcement: true,
    }

    const updated = applyTraversalReinforcement(baseRoute, liveTraversal)
    expect(updated.confidence_score).toBe(40) // 20 + 10 + 10
    expect(updated.uniqueDrivers).toBe(1)
    expect(updated.tripCount).toBe(1)
  })

  test('auto-confirms route when reaching >= 50 confidence and >= 2 unique drivers', () => {
    // Step 1: First driver traversal (confidence -> 40)
    let route = applyTraversalReinforcement(baseRoute, {
      driverId: 'D-01',
      isSuccess: true,
      source: 'LIVE_GPS',
      isEligibleForReinforcement: true,
    })
    expect(route.trust_status).toBe('UNCONFIRMED')

    // Step 2: Second unique driver traversal (+10 traversal +10 driver bonus -> 60)
    route = applyTraversalReinforcement(route, {
      driverId: 'D-02',
      isSuccess: true,
      source: 'LIVE_GPS',
      isEligibleForReinforcement: true,
    })

    expect(route.confidence_score).toBe(60)
    expect(route.uniqueDrivers).toBe(2)
    expect(route.trust_status).toBe('CONFIRMED')
    expect(route.autoConfirmed).toBe(true)
  })

  test('penalizes confirmed blockage by -20 and marks operational status BLOCKED', () => {
    const blockedTraversal = {
      driverId: 'D-01',
      isSuccess: false,
      isBlocked: true,
      source: 'LIVE_GPS',
      isEligibleForReinforcement: true,
    }

    const startingRoute = { ...baseRoute, confidence_score: 50 }
    const updated = applyTraversalReinforcement(startingRoute, blockedTraversal)

    expect(updated.confidence_score).toBe(30) // 50 - 20
    expect(updated.operational_status).toBe('BLOCKED')
  })

  test('applies -5 decay for every 30 days of inactivity', () => {
    const route = { ...baseRoute, confidence_score: 50 }
    const decayed = applyInactivityDecay(route, 60) // 60 days = 2 periods x 5 = -10
    expect(decayed.confidence_score).toBe(40)
  })

  test('ranks routes prioritizing clear status, low incidents, and high trust', () => {
    const routes = [
      { id: 'R1', confidence_score: 90, operational_status: 'CLEAR', trust_status: 'CONFIRMED' },
      { id: 'R2', confidence_score: 80, operational_status: 'BLOCKED', trust_status: 'CONFIRMED' },
      { id: 'R3', confidence_score: 40, operational_status: 'CLEAR', trust_status: 'UNCONFIRMED' },
    ]

    const ranked = rankRouteRecommendations(routes)
    expect(ranked[0].id).toBe('R1') // Best
    expect(ranked[ranked.length - 1].id).toBe('R2') // Worst due to BLOCKED status
  })
})
