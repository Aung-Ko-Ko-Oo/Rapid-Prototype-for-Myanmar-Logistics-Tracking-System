import Button from './components/ui/Button'
import Badge from './components/ui/Badge'
import Card from './components/ui/Card'
import FormField from './components/ui/FormField'
import Input from './components/ui/Input'
import Select from './components/ui/Select'
import Textarea from './components/ui/Textarea'
import Alert from './components/ui/Alert'
import Spinner from './components/ui/Spinner'
import EmptyState from './components/ui/EmptyState'
import Table from './components/ui/Table'

import ShipmentStatusBadge from './components/logistics/ShipmentStatusBadge'

import AppShell from './components/layout/AppShell'
import PageHeader from './components/layout/PageHeader'

const shipmentColumns = [
  {
    key: 'tracking',
    header: 'Tracking',
    cellClassName: 'font-semibold text-slate-900',
  },
  {
    key: 'trader',
    header: 'Trader',
  },
  {
    key: 'route',
    header: 'Route',
  },
  {
    key: 'status',
    header: 'Status',
    render: (shipment) => (
      <ShipmentStatusBadge status={shipment.status} />
    ),
  },
  {
    key: 'eta',
    header: 'ETA',
  },
]

const shipmentRows = [
  {
    id: 1,
    tracking: 'SHP-001',
    trader: 'ABC Trading',
    route: 'Yangon → Mandalay',
    status: 'IN_TRANSIT',
    eta: '18 Sep',
  },
  {
    id: 2,
    tracking: 'SHP-002',
    trader: 'Ocean Co.',
    route: 'Mandalay → Muse',
    status: 'AT_CHECKPOINT',
    eta: '19 Sep',
  },
  {
    id: 3,
    tracking: 'SHP-003',
    trader: 'Green Leaf',
    route: 'Yangon → Bago',
    status: 'DELIVERED',
    eta: 'Delivered',
  },
  {
    id: 4,
    tracking: 'SHP-004',
    trader: 'Myanmar Foods',
    route: 'Bago → Yangon',
    status: 'REQUESTED',
    eta: '20 Sep',
  },
]

const adminNavigation = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: '▦',
  },
  {
    label: 'Shipments',
    path: '/admin/shipments',
    icon: '▤',
  },
  {
    label: 'Operations Map',
    path: '/admin/map',
    icon: '⌖',
  },
  {
    label: 'Incidents',
    path: '/admin/incidents',
    icon: '⚠',
  },
  {
    label: 'Broadcast Alerts',
    path: '/admin/alerts',
    icon: '◉',
  },
]

function App() {
  return (
    <AppShell
      role="admin"
      userName="Aung Admin"
      navItems={adminNavigation}
      activePath="/admin"
      unreadCount={3}
      onNavigate={(path) => {
        console.log('Navigate:', path)
      }}
    >
      <PageHeader
        eyebrow="Admin"
        title="Design System"
        description="Shared interface components for Myanmar logistics operations."
        actions={
          <>
            <Button variant="secondary">
              Export
            </Button>

            <Button>
              Create Shipment
            </Button>
          </>
        }
      />

      <div className="mt-8">
        {/* Buttons */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Buttons
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button>
              Primary Action
            </Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="success">
              Confirm
            </Button>

            <Button variant="danger">
              Critical
            </Button>

            <Button variant="ghost">
              Cancel
            </Button>
          </div>
        </Card>

        {/* Generic badges */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Logistics Statuses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            General semantic badges used across the interface.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Badge>
              Requested
            </Badge>

            <Badge tone="primary">
              Assigned
            </Badge>

            <Badge tone="info">
              Picked Up
            </Badge>

            <Badge tone="teal">
              In Transit
            </Badge>

            <Badge tone="warning">
              At Checkpoint
            </Badge>

            <Badge tone="purple">
              Customs
            </Badge>

            <Badge tone="success">
              Delivered
            </Badge>

            <Badge tone="danger">
              Critical
            </Badge>
          </div>
        </Card>

        {/* Metrics */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <p className="text-sm text-slate-500">
              Total Shipments
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              248
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-slate-500">
              In Transit
            </p>

            <p className="mt-2 text-3xl font-bold text-teal-600">
              86
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-slate-500">
              Active Incidents
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              6
            </p>
          </Card>
        </div>

        {/* Forms */}
        <Card className="mt-6 p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Form Components
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Shared form controls for Admin and Trader workflows.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <FormField
              label="Cargo Description"
              htmlFor="cargo"
              required
            >
              <Input
                id="cargo"
                placeholder="e.g. Electronic components"
              />
            </FormField>

            <FormField
              label="Vehicle Type"
              htmlFor="vehicle"
              required
            >
              <Select
                id="vehicle"
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                >
                  Select vehicle
                </option>

                <option value="truck">
                  Cargo Truck
                </option>

                <option value="container">
                  Container Truck
                </option>

                <option value="van">
                  Delivery Van
                </option>
              </Select>
            </FormField>

            <FormField
              label="Origin"
              htmlFor="origin"
              hint="Shipment pickup location."
            >
              <Input
                id="origin"
                placeholder="Yangon"
              />
            </FormField>

            <FormField
              label="Destination"
              htmlFor="destination"
              hint="Shipment delivery location."
            >
              <Input
                id="destination"
                placeholder="Muse"
              />
            </FormField>

            <FormField
              label="Additional Notes"
              htmlFor="notes"
              className="md:col-span-2"
            >
              <Textarea
                id="notes"
                placeholder="Special cargo handling instructions..."
              />
            </FormField>

            <FormField
              label="Error Example"
              htmlFor="error-example"
              error="This field is required."
              className="md:col-span-2"
            >
              <Input
                id="error-example"
                error
                placeholder="Invalid field example"
              />
            </FormField>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-6">
            <Button variant="secondary">
              Cancel
            </Button>

            <Button>
              Create Shipment
            </Button>
          </div>
        </Card>

        {/* Feedback states */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Feedback & States
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Alerts, loading states and empty states used across logistics workflows.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Alert
              variant="info"
              title="Shipment Updated"
            >
              The latest shipment information has been received.
            </Alert>

            <Alert
              variant="success"
              title="Driver Assigned"
            >
              The shipment is now assigned and ready for pickup.
            </Alert>

            <Alert
              variant="warning"
              title="Checkpoint Delay"
            >
              A checkpoint on the active route is reporting congestion.
            </Alert>

            <Alert
              variant="danger"
              title="Route Blocked"
            >
              The active route is currently blocked. Affected shipments may require rerouting.
            </Alert>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-700">
              Loading
            </h3>

            <div className="mt-4 flex items-center gap-6">
              <Spinner size="sm" />
              <Spinner />
              <Spinner size="lg" />
            </div>
          </div>

          <div className="mt-8">
            <EmptyState
              title="No shipments yet"
              description="Create your first transport request to start tracking cargo."
              action={
                <Button>
                  Create Shipment
                </Button>
              }
            />
          </div>
        </Card>

        {/* Shipment table */}
        <Card className="mt-6 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Shipment Table
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Reusable responsive data table for Admin and Trader shipment views.
            </p>
          </div>

          <Table
            columns={shipmentColumns}
            rows={shipmentRows}
          />
        </Card>

        {/* Shipment status system */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Shipment Status System
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Shared shipment lifecycle indicators.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <ShipmentStatusBadge status="REQUESTED" />
            <ShipmentStatusBadge status="ASSIGNED" />
            <ShipmentStatusBadge status="PICKED_UP" />
            <ShipmentStatusBadge status="IN_TRANSIT" />
            <ShipmentStatusBadge status="AT_CHECKPOINT" />
            <ShipmentStatusBadge status="CUSTOMS" />
            <ShipmentStatusBadge status="DELIVERED" />
            <ShipmentStatusBadge status="CANCELLED" />
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

export default App