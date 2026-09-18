export default function Sidebar({
  role = 'admin',
  items = [],
  activePath,
  onNavigate,
  mobile = false,
  onClose,
}) {
  return (
    <aside
      className={`
        flex h-full w-64 flex-col
        bg-slate-950 text-white
        ${mobile ? '' : 'hidden lg:flex'}
      `}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
        <div>
          <p className="text-sm font-bold">
            Myanmar Logistics
          </p>

          <p className="text-xs text-slate-400">
            {role === 'admin' ? 'Operations' : 'Trading'}
          </p>
        </div>

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = item.path === activePath

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => {
                onNavigate?.(item.path)
                onClose?.()
              }}
              className={`
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-left text-sm font-medium
                transition
                ${
                  active
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {item.icon && (
                <span className="w-5 text-center">
                  {item.icon}
                </span>
              )}

              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="text-xs text-slate-500">
          Real-Time Logistics Monitoring
        </p>
      </div>
    </aside>
  )
}