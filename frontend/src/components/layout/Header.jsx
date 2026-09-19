export default function Header({
  userName = 'Admin User',
  role = 'Admin',
  unreadCount = 0,
  onMenuClick,
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          ☰
        </button>

        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">
            Logistics Monitoring
          </p>

          <p className="text-xs text-slate-500">
            Myanmar trading operations
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100"
        >
          <span aria-hidden="true">
            🔔
          </span>

          {unreadCount > 0 && (
            <span
              className="
                absolute -right-1 -top-1
                flex min-h-5 min-w-5
                items-center justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px] font-bold text-white
              "
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              bg-brand-100
              text-sm font-bold
              text-brand-700
            "
          >
            {userName
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {userName}
            </p>

            <p className="text-xs text-slate-500">
              {role}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}