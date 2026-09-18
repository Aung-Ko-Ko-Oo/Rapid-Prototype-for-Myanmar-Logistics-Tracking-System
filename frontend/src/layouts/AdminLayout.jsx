import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import AppShell from '../components/layout/AppShell'

const adminNavigation = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: '▦',
  },
  {
    label: 'Shipments',
    path: '/admin/shipments',
    icon: '▤',
  },
  {
    label: 'Operations Map',
    path: '/admin/map',
    icon: '⌖',
  },
  {
    label: 'Incidents',
    path: '/admin/incidents',
    icon: '⚠',
  },
  {
    label: 'Broadcast Alerts',
    path: '/admin/alerts',
    icon: '◉',
  },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppShell
      role="admin"
      userName="Aung Admin"
      navItems={adminNavigation}
      activePath={location.pathname}
      unreadCount={3}
      onNavigate={navigate}
    >
      <Outlet />
    </AppShell>
  )
}