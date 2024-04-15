export function HeaderSkeleton() {
  return (
    <div className="animate-pulse flex justify-between px-3 py-2 border-b dark:border-white/10">
      <div className="flex space-x-2">
        <div className="inline-block w-16 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
        <div className="inline-block w-16 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
      </div>
      <div className="flex space-x-2">
        <div className="inline-block w-6 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
        <div className="inline-block w-6 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
      </div>
    </div>
  )
}

export function SeriesListItemSkeleton() {
  return (
    <li className="relative overflow-hidden px-2 py-1">
      <div className="flex justify-between space-x-2">
        {/* Name */}
        <div className="w-3/4 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
        {/* Episodes */}
        <div className="w-6 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
      </div>
    </li>
  )
}

export function SeriesListSkeleton() {
  return (
    <ul className="animate-pulse w-full max-w-7xl border rounded-lg divide-y dark:border-white/10 dark:divide-white/10">
      {Array.from({ length: 50 }).map((_, index) => (
        <SeriesListItemSkeleton key={index} />
      ))}
    </ul>
  )
}

export function TableRowSkeleton() {
  return (
    <tr>
      {/* Number */}
      <td className="px-2 py-1.5">
        <div className="w-10 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
      </td>
      {/* Title */}
      <td className="py-1.5 w-full">
        <div className="w-3/4 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
      </td>
      {/* Date */}
      <td className="px-2 py-1.5">
        <div className="w-20 h-6 bg-neutral-100 rounded-lg dark:bg-white/10"></div>
      </td>
    </tr>
  )
}

export function EpisodeTableSkeleton() {
  return (
    <div className="w-full max-w-7xl border rounded-lg dark:border-white/10">
      <table className="animate-pulse relative overflow-hidden">
        <tbody className="divide-y dark:divide-white/10">
          {Array.from({ length: 50 }).map((_, index) => (
            <TableRowSkeleton key={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
