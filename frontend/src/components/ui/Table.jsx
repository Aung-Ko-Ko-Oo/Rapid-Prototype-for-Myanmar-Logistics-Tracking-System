export default function Table({
  columns,
  rows,
  getRowKey = (row, index) => row.id ?? index,
  emptyMessage = 'No records found.',
  className = '',
}) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        border border-slate-200
        bg-white
        ${className}
      `}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`
                    px-4 py-3
                    text-left
                    text-xs font-semibold
                    uppercase tracking-wide
                    text-slate-500
                    ${column.headerClassName ?? ''}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={getRowKey(row, rowIndex)}
                  className="transition hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        px-4 py-3
                        text-slate-700
                        ${column.cellClassName ?? ''}
                      `}
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}