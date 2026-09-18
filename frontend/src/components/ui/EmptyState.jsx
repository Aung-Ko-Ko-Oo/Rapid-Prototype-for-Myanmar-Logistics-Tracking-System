export default function EmptyState({
  title,
  description,
  action,
  icon,
  className = '',
}) {
  return (
    <div
      className={`
        flex flex-col items-center
        justify-center
        rounded-2xl
        border border-dashed border-slate-300
        bg-slate-50/70
        px-6 py-12
        text-center
        ${className}
      `}
    >
      {icon && (
        <div className="mb-4 text-slate-400">
          {icon}
        </div>
      )}

      <h3 className="text-base font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  )
}