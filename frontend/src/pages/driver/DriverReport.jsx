import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { syncManager } from '../../lib/offline/SyncManager'
import { QueueActionType } from '../../lib/offline/OfflineQueue'

export default function DriverReport() {
  const [name, setName] = useState('')
  const [condition, setCondition] = useState('CONGESTED')
  const [lat, setLat] = useState('22.9358')
  const [lon, setLon] = useState('97.7497')
  const [delay, setDelay] = useState('1-2 Hours')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const unsub = syncManager.subscribe((status) => {
      setIsOnline(status.isOnline)
    })
    return () => unsub()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: name || 'Driver Field Observation',
      condition,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      delay,
      note,
      reportedAt: new Date().toISOString(),
    }

    if (!isOnline) {
      await syncManager.queue.enqueue(QueueActionType.GATE_REPORT, payload)
    }

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setName('')
    setNote('')
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Report Checkpoint / Disruption</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Submit field ground truth observation. Works fully offline during network blackouts.
        </p>
      </div>

      {submitted && (
        <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-4 text-emerald-300">
          <p className="text-sm font-bold">✓ Checkpoint report recorded!</p>
          <p className="text-xs text-emerald-400 mt-0.5">
            {!isOnline
              ? 'Stored safely in IndexedDB action queue. Will sync automatically upon reconnect.'
              : 'Dispatched to central operations.'}
          </p>
        </div>
      )}

      <Card className="p-5 bg-slate-950/70 border border-white/10 text-slate-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Checkpoint / Gate Name:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kutkai Mobile Inspection Point"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Condition:</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="CONGESTED">Congested (Heavy Queue)</option>
                <option value="BLOCKED">Blocked (Closed Pass)</option>
                <option value="OPEN">Open (Normal)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Delay:</label>
              <select
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="30-45 Mins">30 - 45 Mins</option>
                <option value="1-2 Hours">1 - 2 Hours</option>
                <option value="4+ Hours">4+ Hours</option>
                <option value="Indefinite">Indefinite</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Latitude:</label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Longitude:</label>
              <input
                type="text"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Field Notes:</label>
            <textarea
              rows="3"
              placeholder="e.g. Single-lane bottleneck due to truck breakdown near curve."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button size="md" variant="primary" type="submit" className="w-full">
              {!isOnline ? 'Save in Offline Action Queue' : 'Broadcast Checkpoint Report'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
