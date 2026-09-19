export default function MapLegend({ className = '' }) {
  return (
    <div
      className={`
        rounded-xl border border-slate-200 bg-white/95 p-3
        text-xs shadow-sm backdrop-blur-sm
        ${className}
      `}
    >
      <p className="font-semibold text-slate-800">Map Legend</p>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-5 rounded bg-brand-600" />
          <span>Active Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-purple-600" />
          <span>Observed Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-5 rounded bg-red-500" />
          <span>Blocked Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 text-[9px] text-white">
            !
          </span>
          <span>Pending Gate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500 ring-2 ring-brand-200" />
          <span>Active Truck</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />
          <span>Open Gate</span>
        </div>
      </div>
    </div>
  )
}
