import { useState } from 'react'
import Button from '../ui/Button'

export default function ReportCheckpointModal({
  isOpen,
  onClose,
  currentCoordinates = null,
  isOnline = true,
  onSubmitReport,
}) {
  const [name, setName] = useState('')
  const [condition, setCondition] = useState('CONGESTED')
  const [lat, setLat] = useState(currentCoordinates?.latitude || 22.3300)
  const [lon, setLon] = useState(currentCoordinates?.longitude || 96.8000)
  const [delayEstimate, setDelayEstimate] = useState('1-2 Hours')
  const [note, setNote] = useState('')
  const [photoName] = useState('waybill_inspection_doc.jpg')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitReport({
      name: name || 'Driver Discovered Checkpoint',
      condition,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      delayEstimate,
      note,
      photoName,
      type: 'TEMPORARY',
      isVerified: false,
      reportedAt: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Report Checkpoint / Disruption</h3>
            <p className="text-xs text-slate-500">
              Field evidence observation{' '}
              {!isOnline && (
                <span className="text-amber-600 font-semibold">(Will save to IndexedDB)</span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Checkpoint Name / Location:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Nawnghkio Gorge Checkpoint"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Condition:</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
              >
                <option value="CONGESTED">Congested (Heavy Queue)</option>
                <option value="BLOCKED">Blocked / Gate Closed</option>
                <option value="OPEN">Open (Inspection Required)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Delay Est.:</label>
              <select
                value={delayEstimate}
                onChange={(e) => setDelayEstimate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
              >
                <option value="30-45 Mins">30 - 45 Mins</option>
                <option value="1-2 Hours">1 - 2 Hours</option>
                <option value="3-5 Hours">3 - 5 Hours</option>
                <option value="Indefinite Closure">Indefinite Closure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Latitude:</label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-brand-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Longitude:</label>
              <input
                type="number"
                step="0.0001"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-brand-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Field Observation Note:
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Road temporarily barricaded for customs inspection; trucks queued for 2km."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Waybill / Checkpoint Photo Capture:
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <span className="text-base">📷</span>
              <span className="font-mono text-slate-700 truncate flex-1">{photoName}</span>
              <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                Attached
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button size="sm" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              {!isOnline ? 'Save Offline in Queue' : 'Submit Checkpoint Report'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
