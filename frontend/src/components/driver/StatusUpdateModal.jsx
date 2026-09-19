import { useState } from 'react'
import Button from '../ui/Button'
import ShipmentStatusBadge from '../logistics/ShipmentStatusBadge'

const ALLOWED_STATUSES = [
  { value: 'PICKED_UP', label: 'Cargo Picked Up', desc: 'Loaded at origin terminal' },
  { value: 'IN_TRANSIT', label: 'In Transit', desc: 'Moving along active corridor' },
  { value: 'AT_CHECKPOINT', label: 'Arrived at Checkpoint', desc: 'Waiting at inspection or toll gate' },
  { value: 'CUSTOMS', label: 'Customs Processing', desc: 'Cleared border terminal or undergoing inspection' },
  { value: 'DELIVERED', label: 'Delivered to Consignee', desc: 'Cargo safely delivered with proof' },
]

export default function StatusUpdateModal({
  isOpen,
  onClose,
  currentStatus,
  onUpdateStatus,
}) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || 'IN_TRANSIT')
  const [note, setNote] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateStatus(selectedStatus, note)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Update Shipment Status</h3>
            <p className="text-xs text-slate-500">Record field progression event</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select New Operational Status:
            </label>
            <div className="space-y-2">
              {ALLOWED_STATUSES.map((status) => (
                <label
                  key={status.value}
                  className={`
                    flex items-center justify-between p-3 rounded-xl border cursor-pointer transition
                    ${
                      selectedStatus === status.value
                        ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={selectedStatus === status.value}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{status.label}</p>
                      <p className="text-xs text-slate-500">{status.desc}</p>
                    </div>
                  </div>
                  <ShipmentStatusBadge status={status.value} />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Field Driver Note (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Arrived at Lashio toll gate, line is moving steadily."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button size="sm" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Submit Status Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
