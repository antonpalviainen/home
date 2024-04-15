// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent dark:before:via-white/5'

export function HeaderSkeleton() {
  return (
    <div className="flex justify-between px-3 py-2 border-b dark:border-slate-700">
      <div className="flex space-x-2">
        <div className="inline-block w-16 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
        <div className="inline-block w-16 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
      </div>
      <div className="flex space-x-2">
        <div className="inline-block w-6 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
        <div className="inline-block w-6 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
      </div>
    </div>
  )
}

export function SeriesListItemSkeleton() {
  return (
    <li className={`${shimmer} relative overflow-hidden px-2 py-1`}>
      <div className="flex justify-between space-x-2">
        {/* Name */}
        <div className="w-3/4 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
        {/* Episodes */}
        <div className="w-6 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
      </div>
    </li>
  )
}

export function SeriesListSkeleton() {
  return (
    <ul className="w-full max-w-7xl border rounded-lg divide-y dark:border-slate-700 dark:divide-slate-700">
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
        <div className="w-10 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
      </td>
      {/* Title */}
      <td className="py-1.5 w-full">
        <div className="w-3/4 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
      </td>
      {/* Date */}
      <td className="px-2 py-1.5">
        <div className="w-20 h-6 bg-neutral-100 rounded dark:bg-white/10"></div>
      </td>
    </tr>
  )
}

export function EpisodeTableSkeleton() {
  return (
    <div className="w-full max-w-7xl border rounded-lg dark:border-slate-700">
      <table className={`${shimmer} relative overflow-hidden`}>
        <tbody className="divide-y dark:divide-slate-700">
          {Array.from({ length: 50 }).map((_, index) => (
            <TableRowSkeleton key={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
