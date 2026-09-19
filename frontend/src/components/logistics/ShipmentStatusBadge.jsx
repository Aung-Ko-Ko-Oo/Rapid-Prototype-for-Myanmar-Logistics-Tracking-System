import { shipmentStatusStyles } from '../../lib/designTokens'

function formatFallbackStatus(status) {
  if (!status) {
    return 'Unknown'
  }

  return status
    .toLowerCase()
    .split('_')
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
}

export default function ShipmentStatusBadge({
  status,
  className = '',
}) {
  const config = shipmentStatusStyles[status] ?? {
    label: formatFallbackStatus(status),
    className:
      'bg-slate-100 text-slate-700 ring-slate-200',
  }

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-2.5 py-1
        text-xs font-semibold
        ring-1 ring-inset
        ${config.className}
        ${className}
      `}
    >
      {config.label}
    </span>
  )
}