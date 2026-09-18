export default function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className = '',
}) {
  return (
    <div
      className={`
        flex flex-col gap-4
        sm:flex-row
        sm:items-start
        sm:justify-between
        ${className}
      `}
    >
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold text-brand-600">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}