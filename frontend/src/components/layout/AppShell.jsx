import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AppShell({
  children,
  role = 'admin',
  userName = 'Admin User',
  navItems = [],
  activePath,
  unreadCount = 0,
  onNavigate,
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed inset-y-0 left-0 z-30">
        <Sidebar
          role={role}
          items={navItems}
          activePath={activePath}
          onNavigate={onNavigate}
        />
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileNavOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <div className="relative h-full w-64">
            <Sidebar
              role={role}
              items={navItems}
              activePath={activePath}
              onNavigate={onNavigate}
              mobile
              onClose={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <Header
          userName={userName}
          role={role === 'admin' ? 'Administrator' : 'Trader'}
          unreadCount={unreadCount}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}