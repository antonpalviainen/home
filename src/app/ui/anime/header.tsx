'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { HeaderData, SortKey, SortDirection } from '@/lib/anime/definitions'

export function Header({ data }: { data: HeaderData }) {
  const [isActive, setIsActive] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function createSortURL(sortKey: SortKey, direction: SortDirection) {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sortKey)
    params.set('direction', direction)
    return `${pathname}?${params.toString()}`
  }

  return (
    <th
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="py-1 cursor-pointer rounded-md hover:bg-white/5"
    >
      {data.label}
      {isActive ? (
        <div className="relative flex justify-center">
          <div className="absolute inset-x-0 h-20"></div>
          <div className="absolute top-3 flex flex-col p-1 font-normal bg-white/10 backdrop-blur-md whitespace-nowrap rounded-md">
            <Link
              href={createSortURL(data.key, 'asc')}
              className="flex px-5 py-1 rounded-md hover:bg-white/10"
            >
              Sort A-Z
            </Link>
            <Link
              href={createSortURL(data.key, 'desc')}
              className="flex px-5 py-1 rounded-md hover:bg-white/10"
            >
              Sort Z-A
            </Link>
          </div>
        </div>
      ) : null}
    </th>
  )
}
