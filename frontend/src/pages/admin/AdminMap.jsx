import { useState } from 'react'
import LogisticsMap from '../../components/map/LogisticsMap'
import Card from '../../components/ui/Card'
import { GATES } from '../../lib/routes/myanmarCorridors'

const fleetTrucks = [
  {
    id: 'TRUCK-01',
    label: 'SHP-001 (Ko Zaw)',
    latitude: 22.0350,
    longitude: 96.4560,
    speed: 52,
    heading: 45,
    corridor: 'Northern Corridor (Yangon → Muse)',
    cargo: 'Agricultural Goods',
  },
  {
    id: 'TRUCK-02',
    label: 'SHP-002 (U Myint)',
    latitude: 16.8906,
    longitude: 97.6333,
    speed: 60,
    heading: 110,
    corridor: 'Eastern Corridor (Yangon → Myawaddy)',
    cargo: 'Consumer Electronics',
  },
  {
    id: 'TRUCK-03',
    label: 'SHP-003 (Ko Aung)',
    latitude: 19.7633,
    longitude: 96.0785,
    speed: 68,
    heading: 15,
    corridor: 'Northern Corridor (Yangon → Mandalay)',
    cargo: 'Textiles & Garments',
  },
]

export default function AdminMap() {
  const [selectedTruck, setSelectedTruck] = useState(fleetTrucks[0])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Operations Map</h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time GPS tracking across Northern (China) and Eastern (Thailand) corridors.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4 bg-white border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase">Active Fleet</p>
          <p className="text-xl font-bold text-slate-900 mt-1">3 Trucks</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">● All transmitting GPS</p>
        </Card>

        <Card className="p-4 bg-white border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase">Border Gates</p>
          <p className="text-xl font-bold text-slate-900 mt-1">6 Monitored</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">1 Congested, 1 Blocked</p>
        </Card>

        <Card className="p-4 bg-white border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase">Northern Corridor</p>
          <p className="text-xl font-bold text-slate-900 mt-1">Open</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Muse 105-Mile (Congested)</p>
        </Card>

        <Card className="p-4 bg-white border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase">Eastern Corridor</p>
          <p className="text-xl font-bold text-slate-900 mt-1 text-amber-600">Disrupted</p>
          <p className="text-[11px] text-red-500 font-medium mt-0.5">Kawkareik Gate Closed</p>
        </Card>
      </div>

      {/* Shared Logistics Map in Admin Mode */}
      <LogisticsMap
        role="admin"
        truckPosition={selectedTruck}
        additionalTrucks={fleetTrucks.filter((t) => t.id !== selectedTruck.id)}
        customGates={GATES}
      />

      {/* Fleet Quick Selector Table */}
      <Card className="p-4 bg-white border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Active Monitored Vehicles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {fleetTrucks.map((truck) => (
            <div
              key={truck.id}
              onClick={() => setSelectedTruck(truck)}
              className={`
                p-3 rounded-xl border cursor-pointer transition
                ${
                  selectedTruck.id === truck.id
                    ? 'border-brand-600 bg-brand-50/40 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{truck.label}</span>
                <span className="text-xs font-semibold text-emerald-600">{truck.speed} km/h</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{truck.corridor}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Cargo: {truck.cargo}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}