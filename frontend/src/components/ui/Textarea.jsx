export default function Textarea({
  className = '',
  error = false,
  rows = 4,
  ...props
}) {
  return (
    <textarea
  rows={rows}
  className={`
    block w-full
    min-h-24
    max-h-64
    resize-y
    rounded-xl
    border
    bg-white
    px-3.5 py-2.5
    text-sm text-slate-900
    shadow-sm
    outline-none
    transition
    placeholder:text-slate-400
    disabled:cursor-not-allowed
    disabled:bg-slate-100
    disabled:text-slate-500
    ${
      error
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
        : 'border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100'
    }
    ${className}
  `}
  {...props}
/>
  )
}