import Button from './components/ui/Button'
import Badge from './components/ui/Badge'
import Card from './components/ui/Card'
import FormField from './components/ui/FormField'
import Input from './components/ui/Input'
import Select from './components/ui/Select'
import Textarea from './components/ui/Textarea'

function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-semibold text-brand-600">
            Myanmar Logistics
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Design System
          </h1>

          <p className="mt-2 text-slate-500">
            Modern Startup UI — Admin & Trader
          </p>
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Buttons
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Primary Action</Button>

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

        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Logistics Statuses
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <Badge>Requested</Badge>
            <Badge tone="primary">Assigned</Badge>
            <Badge tone="info">Picked Up</Badge>
            <Badge tone="teal">In Transit</Badge>
            <Badge tone="warning">At Checkpoint</Badge>
            <Badge tone="purple">Customs</Badge>
            <Badge tone="success">Delivered</Badge>
            <Badge tone="danger">Critical</Badge>
          </div>
        </Card>

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
      <Select id="vehicle" defaultValue="">
        <option value="" disabled>
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
      </div>
      
    </main>
  )
}

export default App