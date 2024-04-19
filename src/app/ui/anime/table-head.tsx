'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useRef, useState } from 'react'
import { z } from 'zod'

import { SortDirection } from '@/lib/anime/definitions'
import { parseParam } from '@/lib/anime/utils'
import useClickOutside from '@/lib/use-click-outside'

interface Option {
  label: string
  value: string
}

interface FilterOptions {
  status: Option[]
  type: Option[]
  year: Option[]
  season: Option[]
  rating: Option[]
}

interface Filter {
  field: keyof FilterOptions
  options: Option[]
}

const optionsSchema = z.object({
  status: z
    .array(
      z.enum([
        'watching',
        'rewatching',
        'completed',
        'on_hold',
        'dropped',
        'plan_to_watch',
      ])
    )
    .optional(),
  type: z.array(z.enum(['movie', 'ona', 'ova', 'tv'])).optional(),
  year: z.array(z.string()).optional(),
  season: z.array(z.enum(['winter', 'spring', 'summer', 'fall'])).optional(),
  rating: z
    .array(z.enum(['null', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']))
    .optional(),
  studios: z.array(z.string()).optional(),
})

function parseParams(param: string | null, options: Filter) {
  if (!param) return Array(options.options.length).fill(true)

  const schema = optionsSchema.pick({ [options.field]: true })
  const res = schema.safeParse({
    [options.field]: parseParam(param),
  })

  const parsedFilters = res.success ? res.data[options.field] ?? [] : []

  return options.options.map(
    (option) => parsedFilters.includes(option.value) ?? false
  )
}

function createParamString(selected: boolean[], options: Option[]) {
  if (selected.every((s) => s)) return null

  const selectedOptions = []
  for (let i = 0; i < selected.length; i++) {
    if (selected[i]) selectedOptions.push(options[i].value)
  }

  return selectedOptions.join(',')
}

function Select({ filter }: { filter: Filter }) {
  const searchParams = useSearchParams()
  const paramFilter = searchParams.get(filter.field)

  const [selected, setSelected] = useState(parseParams(paramFilter, filter))

  const pathname = usePathname()

  function handleSelect(n: number) {
    setSelected(selected.map((s, i) => (i === n ? !s : s)))
  }

  function handleSelectAll() {
    setSelected(Array(selected.length).fill(true))
  }

  function handleClearAll() {
    setSelected(Array(selected.length).fill(false))
  }

  function createPageURL() {
    const params = new URLSearchParams(searchParams)
    const value = createParamString(selected, filter.options)
    if (value) params.set(filter.field, value)

    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="my-2 space-y-2">
      <div className="space-x-3">
        <button
          onClick={handleSelectAll}
          className="border px-1 rounded-md hover:bg-slate-100"
        >
          All
        </button>
        <button
          onClick={handleClearAll}
          className="border px-1 rounded-md hover:bg-slate-100"
        >
          Clear
        </button>
      </div>
      <div className="text-left max-h-80 min-w-32 overflow-y-auto">
        {filter.options.map((option, i) => (
          <div
            key={option.value}
            className="flex px-3 py-0.5 overscroll-contain hover:bg-slate-100"
          >
            <input
              type="checkbox"
              id={option.value}
              className=" accent-slate-500 cursor-pointer"
              checked={selected[i]}
              onChange={() => handleSelect(i)}
            />
            <label
              htmlFor={option.value}
              className="w-full pl-2 cursor-pointer "
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <Link href={createPageURL()}>Apply</Link>
    </div>
  )
}

function Dropdown({
  field,
  filter,
  onClickOutside,
}: {
  field: string
  filter?: Filter
  onClickOutside: () => void
}) {
  const ref = useRef<HTMLTableCellElement>(null)
  useClickOutside(ref, onClickOutside)

  const searchParams = useSearchParams()
  const pathname = usePathname()

  function createPageURL(sortDirection: SortDirection) {
    const params = new URLSearchParams(searchParams)
    params.set('sort', field)
    params.set('direction', sortDirection)
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="relative flex justify-center cursor-default">
      <div
        ref={ref}
        className="absolute top-2 font-normal bg-white whitespace-nowrap rounded-md shadow-lg shadow-black/20"
      >
        <div>
          <Link
            href={createPageURL('asc')}
            className="block w-full px-3 py-1 rounded-t-md hover:bg-slate-100"
          >
            Sort A-Z
          </Link>
          <Link
            href={createPageURL('desc')}
            className={`${
              filter ?? 'rounded-b-md'
            } block w-full px-3 py-1 hover:bg-slate-100`}
          >
            Sort Z-A
          </Link>
          {filter ? <Select filter={filter} /> : null}
        </div>
      </div>
    </div>
  )
}

function HeaderCell({
  children,
  isActive,
  field,
  filter,
  onClick,
  onClickOutside,
}: {
  children?: ReactNode
  isActive: boolean
  field: string
  filter?: Filter
  onClick: () => void
  onClickOutside: () => void
}) {
  return (
    <th className="p-1 whitespace-nowrap">
      {children ?? <wbr />}
      <button
        onClick={onClick}
        className={`${
          children && 'ml-1'
        } p-0.5 border rounded-md hover:bg-slate-100`}
      >
        <FunnelIcon className="w-4" />
      </button>
      {isActive ? (
        <Dropdown
          field={field}
          filter={filter}
          onClickOutside={onClickOutside}
        />
      ) : null}
    </th>
  )
}

export function TableHead({
  filterOptions: options,
}: {
  filterOptions: FilterOptions
}) {
  // const searchParams = useSearchParams()
  // const pathname = usePathname()
  // const { replace } = useRouter()

  // const order = searchParams.get('order') || 'status'
  // const direction = searchParams.get('direction') || 'asc'

  // function handleSort(field: Order) {
  //   const newDirection = order === field && direction === 'asc' ? 'desc' : 'asc'

  //   const params = new URLSearchParams(searchParams)
  //   params.set('order', field)
  //   params.set('direction', newDirection)

  //   replace(`${pathname}?${params.toString()}`)
  // }

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleClickOutside() {
    setActiveIndex(null)
  }

  return (
    <thead>
      <tr>
        <HeaderCell
          isActive={activeIndex === 0}
          field="status"
          filter={{ field: 'status', options: options.status }}
          onClick={() => setActiveIndex(0)}
          onClickOutside={handleClickOutside}
        ></HeaderCell>
        <HeaderCell
          isActive={activeIndex === 1}
          field="title"
          onClick={() => setActiveIndex(1)}
          onClickOutside={handleClickOutside}
        >
          Title
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 2}
          field="progress"
          onClick={() => setActiveIndex(2)}
          onClickOutside={handleClickOutside}
        >
          Progress
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 3}
          field="runtime"
          onClick={() => setActiveIndex(3)}
          onClickOutside={handleClickOutside}
        >
          Runtime
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 4}
          field="type"
          filter={{ field: 'type', options: options.type }}
          onClick={() => setActiveIndex(4)}
          onClickOutside={handleClickOutside}
        >
          Type
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 5}
          field="year"
          filter={{ field: 'season', options: options.season }}
          onClick={() => setActiveIndex(5)}
          onClickOutside={handleClickOutside}
        >
          Premiered
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 6}
          field="rating"
          filter={{ field: 'rating', options: options.rating }}
          onClick={() => setActiveIndex(6)}
          onClickOutside={handleClickOutside}
        >
          Rating
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 7}
          field="studios"
          onClick={() => setActiveIndex(7)}
          onClickOutside={handleClickOutside}
        >
          Studios
        </HeaderCell>
      </tr>
    </thead>
  )
}
