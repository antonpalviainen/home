import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { useState, useRef } from 'react'

import {
  HeaderDataWithFilter,
  SortKey,
  SortDirection,
} from '@/lib/anime/definitions'
import useClickOutside from '@/lib/use-click-outside'

export function HeaderWithFilter({
  data,
  isActive,
  onActivate,
  onDeactivate,
}: {
  data: HeaderDataWithFilter
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  const [selected, setSelected] = useState<boolean[]>(
    Array(data.filterOptions.length).fill(true)
  )
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

  function createFilterURL() {
    const params = new URLSearchParams(searchParams)

    // If all options are selected or deselected, remove the filter
    if (selected.every((s) => s === selected[0])) {
      params.delete(data.key)
      return `${pathname}?${params.toString()}`
    } else {
      const selectedOptions = []
      for (let i = 0; i < selected.length; i++) {
        if (selected[i]) selectedOptions.push(data.filterOptions[i].value)
      }
      params.set(data.key, selectedOptions.join(','))
      return `${pathname}?${params.toString()}`
    }
  }

  function handleSelect(i: number) {
    setSelected(selected.map((s, j) => (i === j ? !s : s)))
  }

  function handleSelectAll() {
    setSelected(Array(data.filterOptions.length).fill(true))
  }

  function handleSelectClear() {
    setSelected(Array(data.filterOptions.length).fill(false))
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
            <div>
              <button onClick={handleSelectAll}>All</button>
              <button onClick={handleSelectClear}>Clear</button>
            </div>
            <div>
              {data.filterOptions.map((option, i) => (
                <div key={option.value}>
                  <input
                    type="checkbox"
                    id={option.value}
                    checked={selected[i]}
                    onChange={() => handleSelect(i)}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
            <Link href={createFilterURL()}>Apply</Link>
          </div>
        </div>
      ) : null}
    </th>
  )
}
