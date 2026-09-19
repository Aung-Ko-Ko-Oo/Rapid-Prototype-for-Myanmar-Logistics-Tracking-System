import { useParams } from 'react-router-dom'

export default function TraderShipmentDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Shipment Details
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Shipment ID: {id}
      </p>
    </div>
  )
}