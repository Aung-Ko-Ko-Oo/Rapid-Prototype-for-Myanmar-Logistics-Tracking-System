export default function Select({
  children,
  className = '',
  error = false,
  ...props
}) {
  return (
    <select
      className={`
        block w-full
        rounded-xl
        border
        bg-white
        px-3.5 py-2.5
        text-sm text-slate-900
        shadow-sm
        outline-none
        transition
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
    >
      {children}
    </select>
  )
}