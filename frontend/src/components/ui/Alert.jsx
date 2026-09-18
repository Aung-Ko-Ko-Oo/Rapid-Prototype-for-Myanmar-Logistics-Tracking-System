const variants = {
  info: {
    container: 'border-blue-200 bg-blue-50',
    title: 'text-blue-900',
    text: 'text-blue-700',
  },

  success: {
    container: 'border-green-200 bg-green-50',
    title: 'text-green-900',
    text: 'text-green-700',
  },

  warning: {
    container: 'border-amber-200 bg-amber-50',
    title: 'text-amber-900',
    text: 'text-amber-700',
  },

  danger: {
    container: 'border-red-200 bg-red-50',
    title: 'text-red-900',
    text: 'text-red-700',
  },
}

export default function Alert({
  title,
  children,
  variant = 'info',
  className = '',
}) {
  const styles = variants[variant] ?? variants.info

  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={`
        rounded-xl
        border
        p-4
        ${styles.container}
        ${className}
      `}
    >
      {title && (
        <p className={`text-sm font-semibold ${styles.title}`}>
          {title}
        </p>
      )}

      {children && (
        <div
          className={`
            text-sm
            ${title ? 'mt-1' : ''}
            ${styles.text}
          `}
        >
          {children}
        </div>
      )}
    </div>
  )
}