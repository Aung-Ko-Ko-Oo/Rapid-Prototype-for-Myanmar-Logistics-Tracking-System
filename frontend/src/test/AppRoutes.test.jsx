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
})