import ShipmentStatusBadge from '../logistics/ShipmentStatusBadge'
import Card from '../ui/Card'

export default function TripSummaryCard({ shipment, currentWaypointName = null }) {
  if (!shipment) {
    return (
      <Card className="p-4 bg-white">
        <p className="text-sm text-slate-500">No active shipment assigned.</p>
      </Card>
    )
  }

  return (
    <Card className="p-4 bg-white border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Consignment
            </span>
            <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
              {shipment.trackingNumber}
            </span>
          </div>

          <h2 className="mt-1 text-base font-bold text-slate-900">
            {shipment.origin} → {shipment.destination}
          </h2>
        </div>

        <ShipmentStatusBadge status={shipment.status} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
        <div>
          <span className="text-slate-400">Cargo:</span>{' '}
          <span className="font-medium text-slate-800">{shipment.cargoDescription}</span>
        </div>
        <div>
          <span className="text-slate-400">Vehicle:</span>{' '}
          <span className="font-medium text-slate-800">{shipment.vehicleNumber}</span>
        </div>
        <div>
          <span className="text-slate-400">Current Leg:</span>{' '}
          <span className="font-semibold text-brand-700">
            {currentWaypointName || 'En route'}
          </span>
        </div>
        <div>
          <span className="text-slate-400">ETA:</span>{' '}
          <span className="font-medium text-slate-800">{shipment.eta}</span>
        </div>
      </div>
    </Card>
  )
}
