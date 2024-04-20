'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  HeaderDataWithFilter,
  SortKey,
  SortDirection,
} from '@/lib/anime/definitions'

export function HeaderWithFilter({ data }: { data: HeaderDataWithFilter }) {
  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState<boolean[]>(
    Array(data.filterOptions.length).fill(true)
  )
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
    <th
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="py-1 cursor-pointer rounded-md hover:bg-white/5"
    >
      {data.label || <wbr />}
      {isActive ? (
        <div className="relative flex justify-center">
          <div className="absolute min-w-36 w-full h-20 border border-red-400"></div>
          <div className="absolute top-3 flex flex-col items-center p-1 space-y-2 font-normal bg-white/10 backdrop-blur-md whitespace-nowrap cursor-default rounded-md">
            <div className="w-full flex flex-col">
              <Link
                href={createSortURL(data.key, 'asc')}
                className="py-1 rounded-md hover:bg-white/10"
              >
                Sort A-Z
              </Link>
              <Link
                href={createSortURL(data.key, 'desc')}
                className="py-1 rounded-md hover:bg-white/10"
              >
                Sort Z-A
              </Link>
            </div>
            <div className="space-x-2">
              <button
                onClick={handleSelectAll}
                className="px-2 py-0.5 bg-white/20 rounded-md hover:bg-white/30"
              >
                All
              </button>
              <button
                onClick={handleSelectClear}
                className="px-2 py-0.5 bg-white/20 rounded-md hover:bg-white/30"
              >
                Clear
              </button>
            </div>
            <div className="max-h-80 min-w-32 overflow-y-auto text-left">
              {data.filterOptions.map((option, i) => (
                <div
                  key={option.value}
                  className="flex px-3 py-0.5 rounded-md hover:bg-white/10"
                >
                  <input
                    type="checkbox"
                    id={option.value}
                    checked={selected[i]}
                    onChange={() => handleSelect(i)}
                    className="accent-white cursor-pointer"
                  />
                  <label
                    htmlFor={option.value}
                    className="w-full flex ml-2 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <Link
              href={createFilterURL()}
              className="px-5 py-0.5 bg-white/20 rounded-md hover:bg-white/30"
            >
              Apply
            </Link>
          </div>
        </div>
      ) : null}
    </th>
  )
}
