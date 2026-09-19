import { describe, expect, test } from 'vitest'
import { SimulationProvider } from '../../lib/location/SimulationProvider'
import { LocationSource } from '../../lib/location/types'

describe('SimulationProvider', () => {
  const waypoints = [
    { name: 'Yangon', latitude: 16.8661, longitude: 96.1951 },
    { name: 'Bago', latitude: 17.3221, longitude: 96.4660 },
    { name: 'Mandalay', latitude: 21.9588, longitude: 96.0891 },
    { name: 'Muse', latitude: 23.9917, longitude: 97.9014 },
  ]

  test('initializes with first waypoint and emits SIMULATED point', () => {
    const provider = new SimulationProvider(waypoints)
    const pos = provider.getCurrentPosition()

    expect(pos.latitude).toBe(16.8661)
    expect(pos.longitude).toBe(96.1951)
    expect(pos.name).toBe('Yangon')
    expect(pos.source).toBe(LocationSource.SIMULATED)
    expect(pos.waypointIndex).toBe(0)
    expect(provider.getProgress()).toBe(0)
  })

  test('steps forward through waypoints correctly', () => {
    const provider = new SimulationProvider(waypoints)
    provider.stepNext()

    const pos = provider.getCurrentPosition()
    expect(pos.name).toBe('Bago')
    expect(pos.waypointIndex).toBe(1)
    expect(provider.getProgress()).toBe(33)
  })

  test('jumps directly to specific waypoint index or name', () => {
    const provider = new SimulationProvider(waypoints)
    provider.jumpTo(2)

    expect(provider.getCurrentPosition().name).toBe('Mandalay')
    expect(provider.getProgress()).toBe(67)

    const found = provider.jumpToWaypointName('Muse')
    expect(found).toBe(true)
    expect(provider.getCurrentPosition().name).toBe('Muse')
    expect(provider.getProgress()).toBe(100)
  })

  test('steps backward without underflowing', () => {
    const provider = new SimulationProvider(waypoints)
    provider.jumpTo(1)
    provider.stepPrev()
    expect(provider.getCurrentPosition().name).toBe('Yangon')
    provider.stepPrev() // Should stay at 0
    expect(provider.getCurrentPosition().name).toBe('Yangon')
  })
})
