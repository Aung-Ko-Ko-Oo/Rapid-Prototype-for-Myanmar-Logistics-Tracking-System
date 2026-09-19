/**
 * Pheromone-Inspired Route Confidence Engine
 * Grounded in doc/09-route-learning-pheromone.md
 */

export const RouteConfidenceRules = {
  INITIAL_CONFIDENCE: 20,
  TRAVERSAL_BONUS: 10,
  UNIQUE_DRIVER_BONUS: 10,
  BLOCKAGE_PENALTY: 20,
  INACTIVITY_DECAY: 5,
  AUTO_CONFIRM_MIN_CONFIDENCE: 50,
  AUTO_CONFIRM_MIN_DRIVERS: 2,
  MAX_CONFIDENCE: 100,
  MIN_CONFIDENCE: 0,
}

/**
 * Applies reinforcement from a completed traversal.
 * Rejects SIMULATION or unverified traversals from production scoring.
 */
export function applyTraversalReinforcement(route, traversal) {
  if (!traversal) return route

  // Strict check: simulated traversals never reinforce production confidence
  if (!traversal.isEligibleForReinforcement || traversal.source === 'SIMULATED') {
    return {
      ...route,
      reinforcementRejected: true,
      rejectionReason: 'Traversals from simulation or invalid GPS cannot reinforce route confidence.',
    }
  }

  let newConfidence = route.confidence_score ?? RouteConfidenceRules.INITIAL_CONFIDENCE
  let uniqueDrivers = new Set(route.drivers || [])
  const isNewDriver = traversal.driverId && !uniqueDrivers.has(traversal.driverId)

  if (traversal.isSuccess) {
    newConfidence += RouteConfidenceRules.TRAVERSAL_BONUS
    if (isNewDriver) {
      newConfidence += RouteConfidenceRules.UNIQUE_DRIVER_BONUS
      uniqueDrivers.add(traversal.driverId)
    }
  } else if (traversal.isBlocked) {
    newConfidence -= RouteConfidenceRules.BLOCKAGE_PENALTY
  }

  // Clamp within 0 - 100
  newConfidence = Math.max(
    RouteConfidenceRules.MIN_CONFIDENCE,
    Math.min(RouteConfidenceRules.MAX_CONFIDENCE, newConfidence)
  )

  const driverCount = uniqueDrivers.size
  const tripCount = (route.tripCount || 0) + 1

  // Auto-confirmation condition
  const shouldAutoConfirm =
    route.trust_status === 'UNCONFIRMED' &&
    newConfidence >= RouteConfidenceRules.AUTO_CONFIRM_MIN_CONFIDENCE &&
    driverCount >= RouteConfidenceRules.AUTO_CONFIRM_MIN_DRIVERS

  return {
    ...route,
    confidence_score: newConfidence,
    tripCount,
    uniqueDrivers: driverCount,
    drivers: Array.from(uniqueDrivers),
    trust_status: shouldAutoConfirm ? 'CONFIRMED' : route.trust_status,
    operational_status: traversal.isBlocked ? 'BLOCKED' : route.operational_status,
    lastTraversedAt: new Date().toISOString(),
    autoConfirmed: shouldAutoConfirm,
  }
}

/**
 * Calculates decay for inactive routes (e.g. > 30 days without traversal).
 */
export function applyInactivityDecay(route, daysInactive = 30) {
  if (daysInactive < 30) return route
  const decayPeriods = Math.floor(daysInactive / 30)
  const penalty = decayPeriods * RouteConfidenceRules.INACTIVITY_DECAY
  const newConfidence = Math.max(
    RouteConfidenceRules.MIN_CONFIDENCE,
    (route.confidence_score || RouteConfidenceRules.INITIAL_CONFIDENCE) - penalty
  )

  return {
    ...route,
    confidence_score: newConfidence,
  }
}

/**
 * Recommends routes based on operational status, confidence, distance, and active incidents.
 * Driver always has final operational decision.
 */
export function rankRouteRecommendations(routes, activeIncidents = []) {
  if (!routes || routes.length === 0) return []

  const scoredRoutes = routes.map((route) => {
    let score = route.confidence_score || 50
    const reasons = []

    // Severe penalty if route is blocked
    if (route.operational_status === 'BLOCKED') {
      score -= 80
      reasons.push('Route currently blocked')
    } else if (route.operational_status === 'DISRUPTED') {
      score -= 35
      reasons.push('Active congestion or checkpoint delay reported')
    }

    // Incidents overlap check
    const relatedIncident = activeIncidents.find(
      (inc) => inc.routeId === route.id || inc.corridorId === route.corridorId
    )
    if (relatedIncident) {
      if (relatedIncident.severity === 'CRITICAL') {
        score -= 50
        reasons.push(`Critical incident: ${relatedIncident.title}`)
      } else if (relatedIncident.severity === 'WARNING') {
        score -= 20
        reasons.push(`Warning: ${relatedIncident.title}`)
      }
    }

    // Trust level
    if (route.trust_status === 'CONFIRMED') {
      score += 15
      reasons.push('Confirmed standard trade route')
    } else {
      reasons.push('Driver-observed path (caution advised)')
    }

    // Distance efficiency (slight bonus for shorter distance)
    if (route.distanceKm) {
      const distanceBonus = Math.max(-15, Math.min(15, (1000 - route.distanceKm) / 50))
      score += distanceBonus
    }

    return {
      ...route,
      recommendationScore: Math.round(score),
      recommendationNotes: reasons,
    }
  })

  return scoredRoutes.sort((a, b) => b.recommendationScore - a.recommendationScore)
}
