import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

import { HeaderData, SortKey, SortDirection } from '@/lib/anime/definitions'
import useClickOutside from '@/lib/use-click-outside'

export function Header({
  data,
  isActive,
  onActivate,
  onDeactivate,
}: {
  data: HeaderData
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  const ref = useRef<HTMLTableCellElement>(null)
  useClickOutside(ref, onDeactivate)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function createSortURL(sortKey: SortKey, direction: SortDirection) {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sortKey)
    params.set('direction', direction)
    return `${pathname}?${params.toString()}`
  }

  return (
    <th onClick={onActivate} className="py-1 cursor-pointer rounded-md hover:bg-white/5">
      {data.label}
      {isActive ? (
        <div className="relative flex justify-center">
          <div
            ref={ref}
            className="absolute top-3 flex flex-col font-normal bg-white/10 backdrop-blur-md whitespace-nowrap rounded-md"
          >
            <Link
              href={createSortURL(data.key, 'asc')}
              className="flex px-5 py-1 rounded-t-md hover:bg-white/10"
            >
              Sort A-Z
            </Link>
            <Link
              href={createSortURL(data.key, 'desc')}
              className="flex px-5 py-1 rounded-b-md hover:bg-white/10"
            >
              Sort Z-A
            </Link>
          </div>
        </div>
      ) : null}
    </th>
  )
}
