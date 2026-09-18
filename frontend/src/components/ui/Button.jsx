const variants = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-600',

  secondary:
    'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',

  success:
    'bg-green-600 text-white shadow-sm hover:bg-green-700',

  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700',

  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
}

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-medium
        transition
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        disabled:pointer-events-none
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}