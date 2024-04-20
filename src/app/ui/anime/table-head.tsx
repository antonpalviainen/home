'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

import useClickOutside from '@/lib/use-click-outside'

type SortKey =
  | 'status'
  | 'title'
  | 'progress'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'studios'

type SortDirection = 'asc' | 'desc'

interface FilterOption {
  label: string
  value: string
}

interface HeaderData {
  label: string
  key: SortKey
}

interface HeaderDataWithFilter extends HeaderData {
  filterOptions: FilterOption[]
}

function HeaderWithFilter({
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

function Header({
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

export default function TableHead() {
  const headers: (HeaderData | HeaderDataWithFilter)[] = [
    {
      label: '',
      key: 'status',
      filterOptions: [
        { label: 'Watching', value: 'watching' },
        { label: 'Rewatching', value: 'rewatching' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Dropped', value: 'dropped' },
        { label: 'Plan to Watch', value: 'plan-to-watch' },
      ],
    },
    { label: 'Title', key: 'title' },
    { label: 'Progress', key: 'progress' },
    { label: 'Runtime', key: 'runtime' },
    {
      label: 'Type',
      key: 'type',
      filterOptions: [
        { label: 'TV', value: 'tv' },
        { label: 'OVA', value: 'ova' },
        { label: 'Movie', value: 'movie' },
        { label: 'ONA', value: 'ona' },
      ],
    },
    {
      label: 'Premiered',
      key: 'premiered',
    },
    {
      label: 'Rating',
      key: 'rating',
      filterOptions: [
        { label: '10', value: '10' },
        { label: '9', value: '9' },
        { label: '8', value: '8' },
        { label: '7', value: '7' },
        { label: '6', value: '6' },
        { label: '5', value: '5' },
        { label: '4', value: '4' },
        { label: '3', value: '3' },
        { label: '2', value: '2' },
        { label: '1', value: '1' },
        { label: '-', value: 'null' },
      ],
    },
    { label: 'Studios', key: 'studios' },
  ]
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleDeactivate() {
    setActiveIndex(null)
  }

  return (
    <thead>
      <tr>
        {headers.map((header, i) =>
          'filterOptions' in header ? (
            <HeaderWithFilter
              data={header}
              isActive={i === activeIndex}
              onActivate={() => setActiveIndex(i)}
              onDeactivate={handleDeactivate}
              key={header.key}
            />
          ) : (
            <Header
              data={header}
              isActive={i === activeIndex}
              onActivate={() => setActiveIndex(i)}
              onDeactivate={handleDeactivate}
              key={header.key}
            />
          )
        )}
      </tr>
    </thead>
  )
}
