'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Order } from '@/lib/anime/definitions'

export function TableHead() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const order = searchParams.get('order') || 'status'
  const direction = searchParams.get('direction') || 'asc'

  function handleSort(field: Order) {
    const newDirection = order === field && direction === 'asc' ? 'desc' : 'asc'

    const params = new URLSearchParams(searchParams)
    params.set('order', field)
    params.set('direction', newDirection)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <thead>
      <tr>
        <th
          onClick={() => handleSort('status')}
          className="w-3 p-1 cursor-pointer hover:bg-gray-100"
        ></th>
        <th
          onClick={() => handleSort('title')}
          className="p-1 cursor-pointer hover:bg-gray-100"
        >
          Title
        </th>
        <th
          onClick={() => handleSort('progress')}
          className="p-1 cursor-pointer hover:bg-gray-100"
        >
          Progress
        </th>
        <th
          onClick={() => handleSort('runtime')}
          className="p-1 cursor-pointer hover:bg-gray-100"
        >
          Runtime
        </th>
        <th
          onClick={() => handleSort('type')}
          className="p-1 cursor-pointer hover:bg-gray-100"
        >
          Type
        </th>
        <th
          onClick={() => handleSort('premiered')}
          className="p-1 cursor-pointer hover:bg-gray-100"
        >
          Premiered
        </th>
        <th
          onClick={() => handleSort('rating')}
          className="p-1 cursor-pointer hover:bg-gray-100"
        >
          Rating
        </th>
        <th className="p-1">Studios</th>
      </tr>
    </thead>
  )
}
