const tones = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  primary: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  info: 'bg-blue-50 text-blue-700 ring-blue-200',
  teal: 'bg-teal-50 text-teal-700 ring-teal-200',
  success: 'bg-green-50 text-green-700 ring-green-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-red-50 text-red-700 ring-red-200',
  purple: 'bg-purple-50 text-purple-700 ring-purple-200',
}

export default function Badge({
  children,
  tone = 'neutral',
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-2.5 py-1
        text-xs font-semibold
        ring-1 ring-inset
        ${tones[tone]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}