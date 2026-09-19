import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import AdminLayout from '../layouts/AdminLayout'
import TraderLayout from '../layouts/TraderLayout'

import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminShipments from '../pages/admin/AdminShipments'
import AdminIncidents from '../pages/admin/AdminIncidents'
import AdminAlerts from '../pages/admin/AdminAlerts'

import TraderDashboard from '../pages/trader/TraderDashboard'
import TraderShipments from '../pages/trader/TraderShipments'
import CreateShipment from '../pages/trader/CreateShipment'
import TraderShipmentDetail from '../pages/trader/TraderShipmentDetail'
import TraderAlerts from '../pages/trader/TraderAlerts'

import DesignSystemShowcase from '../pages/DesignSystemShowcase'
import AdminMap from '../pages/admin/AdminMap'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/trader" replace />}
      />

      <Route
        path="/design-system"
        element={<DesignSystemShowcase />}
      />

      <Route
        path="/trader"
        element={<TraderLayout />}
      >
        <Route index element={<TraderDashboard />} />

        <Route
          path="shipments"
          element={<TraderShipments />}
        />

        <Route
          path="shipments/new"
          element={<CreateShipment />}
        />

        <Route
          path="shipments/:id"
          element={<TraderShipmentDetail />}
        />

        <Route
          path="alerts"
          element={<TraderAlerts />}
        />
      </Route>

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route index element={<AdminDashboard />} />

        <Route
          path="shipments"
          element={<AdminShipments />}
        />

        <Route
          path="incidents"
          element={<AdminIncidents />}
        />

        <Route
          path="alerts"
          element={<AdminAlerts />}
        />
        <Route
          path="map"
          element={<AdminMap />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/trader" replace />}
      />
    </Routes>
    

  )
}