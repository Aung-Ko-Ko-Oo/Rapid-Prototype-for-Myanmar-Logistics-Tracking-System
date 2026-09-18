export default function Card({
  children,
  className = '',
}) {
  return (
    <section
      className={`
        rounded-2xl
        border border-slate-200/80
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {children}
    </section>
  )
}