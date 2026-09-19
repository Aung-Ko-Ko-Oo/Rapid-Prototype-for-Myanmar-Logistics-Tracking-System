import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import AppRoutes from '../routes/AppRoutes'

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('application routes', () => {
  test('renders trader dashboard', () => {
    renderRoute('/trader')
    expect(
      screen.getByRole('heading', {
        name: 'Trader Dashboard',
      }),
    ).toBeInTheDocument()
  })

  test('renders create shipment page', () => {
    renderRoute('/trader/shipments/new')
    expect(
      screen.getByRole('heading', {
        name: 'Create Shipment',
      }),
    ).toBeInTheDocument()
  })

  test('renders admin shipments page', () => {
    renderRoute('/admin/shipments')
    expect(
      screen.getByRole('heading', {
        name: 'Shipments',
      }),
    ).toBeInTheDocument()
  })

  test('renders design system showcase', () => {
    renderRoute('/design-system')
    expect(
      screen.getByRole('heading', {
        name: 'Design System',
      }),
    ).toBeInTheDocument()
  })

  test('renders admin fleet operations map', () => {
    renderRoute('/admin/map')
    expect(
      screen.getByRole('heading', {
        name: 'Fleet Operations Map',
      }),
    ).toBeInTheDocument()
  })

  test('renders driver dashboard with active trip', () => {
    renderRoute('/driver')
    expect(screen.getByText('Ko Zaw')).toBeInTheDocument()
    expect(screen.getByText(/Active Consignment/i)).toBeInTheDocument()
  })

  test('renders driver report page', () => {
    renderRoute('/driver/report')
    expect(
      screen.getByRole('heading', {
        name: 'Report Checkpoint / Disruption',
      }),
    ).toBeInTheDocument()
  })

  test('renders driver routes page', () => {
    renderRoute('/driver/routes')
    expect(
      screen.getByRole('heading', {
        name: 'Logistics Corridors & Route Learning',
      }),
    ).toBeInTheDocument()
  })

  test('renders driver offline sync inspector', () => {
    renderRoute('/driver/sync')
    expect(
      screen.getByRole('heading', {
        name: 'IndexedDB Offline Sync Inspector',
      }),
    ).toBeInTheDocument()
  })
})