import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import AppShell from '../components/layout/AppShell'

const traderNavigation = [
  {
    label: 'Dashboard',
    path: '/trader',
    icon: '▦',
  },
  {
    label: 'My Shipments',
    path: '/trader/shipments',
    icon: '▤',
  },
  {
    label: 'Alerts',
    path: '/trader/alerts',
    icon: '◉',
  },
]

export default function TraderLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppShell
      role="trader"
      userName="Mya Trader"
      navItems={traderNavigation}
      activePath={location.pathname}
      unreadCount={2}
      onNavigate={navigate}
    >
      <Outlet />
    </AppShell>
  )
}