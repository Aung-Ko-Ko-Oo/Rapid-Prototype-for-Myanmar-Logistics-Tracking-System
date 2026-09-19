const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-9 w-9 border-[3px]',
}

export default function Spinner({
  size = 'md',
  label = 'Loading',
  className = '',
}) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center ${className}`}
    >
      <span
        aria-hidden="true"
        className={`
          inline-block
          animate-spin
          rounded-full
          border-brand-200
          border-t-brand-600
          ${sizes[size]}
        `}
      />

      <span className="sr-only">
        {label}
      </span>
    </div>
  )
}