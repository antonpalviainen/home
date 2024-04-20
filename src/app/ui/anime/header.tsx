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
    <th onClick={onActivate}>
      {data.label}
      {isActive ? (
        <div className="relative flex justify-center">
          <div
            ref={ref}
            className="absolute top-2 flex flex-col font-normal bg-white whitespace-nowrap border border-red-500"
          >
            <Link href={createSortURL(data.key, 'asc')}>Sort A-Z</Link>
            <Link href={createSortURL(data.key, 'desc')}>Sort Z-A</Link>
          </div>
        </div>
      ) : null}
    </th>
  )
}
