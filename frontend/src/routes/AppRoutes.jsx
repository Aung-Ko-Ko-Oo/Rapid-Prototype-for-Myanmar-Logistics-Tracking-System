import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import AdminLayout from '../layouts/AdminLayout'
import TraderLayout from '../layouts/TraderLayout'
import DriverLayout from '../layouts/DriverLayout'

import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminShipments from '../pages/admin/AdminShipments'
import AdminIncidents from '../pages/admin/AdminIncidents'
import AdminAlerts from '../pages/admin/AdminAlerts'
import AdminMap from '../pages/admin/AdminMap'

import TraderDashboard from '../pages/trader/TraderDashboard'
import TraderShipments from '../pages/trader/TraderShipments'
import CreateShipment from '../pages/trader/CreateShipment'
import TraderShipmentDetail from '../pages/trader/TraderShipmentDetail'
import TraderAlerts from '../pages/trader/TraderAlerts'

import DriverDashboard from '../pages/driver/DriverDashboard'
import DriverReport from '../pages/driver/DriverReport'
import DriverRoutes from '../pages/driver/DriverRoutes'
import DriverSync from '../pages/driver/DriverSync'

import DesignSystemShowcase from '../pages/DesignSystemShowcase'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/driver" replace />}
      />

      <Route
        path="/design-system"
        element={<DesignSystemShowcase />}
      />

      {/* Driver Mobile View */}
      <Route
        path="/driver"
        element={<DriverLayout />}
      >
        <Route index element={<DriverDashboard />} />
        <Route path="report" element={<DriverReport />} />
        <Route path="routes" element={<DriverRoutes />} />
        <Route path="sync" element={<DriverSync />} />
      </Route>

      {/* Trader Experience */}
      <Route
        path="/trader"
        element={<TraderLayout />}
      >
        <Route index element={<TraderDashboard />} />
        <Route path="shipments" element={<TraderShipments />} />
        <Route path="shipments/new" element={<CreateShipment />} />
        <Route path="shipments/:id" element={<TraderShipmentDetail />} />
        <Route path="alerts" element={<TraderAlerts />} />
      </Route>

      {/* Admin Operations Console */}
      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="shipments" element={<AdminShipments />} />
        <Route path="map" element={<AdminMap />} />
        <Route path="incidents" element={<AdminIncidents />} />
        <Route path="alerts" element={<AdminAlerts />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/driver" replace />}
      />
    </Routes>
  )
}