'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { ReactNode, useRef, useState } from 'react'

import useClickOutside from '@/lib/use-click-outside'

interface Option {
  label: string
  value: string
}

interface FilterOptions {
  [key: string]: Option[]
}

function Select({
  options,
  handleSelect,
  handleSelectAll,
  handleClearAll,
}: {
  options: Array<Option & { selected: boolean }>
  handleSelect: (n: number) => void
  handleSelectAll: () => void
  handleClearAll: () => void
}) {
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
        {options.map((option, i) => (
          <div
            key={option.value}
            className="flex px-3 py-0.5 overscroll-contain hover:bg-slate-100"
          >
            <input
              type="checkbox"
              id={option.value}
              className=" accent-slate-500 cursor-pointer"
              checked={option.selected}
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
    </div>
  )
}

function Dropdown({
  options,
  handleSelect,
  handleSelectAll,
  handleClearAll,
  onClickOutside,
}: {
  options?: Array<Option & { selected: boolean }>
  handleSelect: (n: number) => void
  handleSelectAll: () => void
  handleClearAll: () => void
  onClickOutside: () => void
}) {
  const ref = useRef<HTMLTableCellElement>(null)
  useClickOutside(ref, onClickOutside)

  return (
    <div className="relative flex justify-center cursor-default">
      <div
        ref={ref}
        className="absolute top-2 font-normal bg-white whitespace-nowrap rounded-md shadow-lg shadow-black/20"
      >
        <div>
          <button className="block w-full px-3 py-1 rounded-t-md hover:bg-slate-100">
            Sort A-Z
          </button>
          <button
            className={`${
              options ?? 'rounded-b-md'
            } block w-full px-3 py-1 hover:bg-slate-100`}
          >
            Sort Z-A
          </button>
          {options ? (
            <Select
              options={options}
              handleSelect={handleSelect}
              handleSelectAll={handleSelectAll}
              handleClearAll={handleClearAll}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function Header({
  children,
  isActive,
  filterOptions,
  onClick,
  onClickOutside,
}: {
  children?: ReactNode
  isActive: boolean
  filterOptions?: Option[]
  onClick: () => void
  onClickOutside: () => void
}) {
  const [options, setOptions] = useState(
    filterOptions?.map((o) => ({ ...o, selected: true }))
  )

  function handleSelect(n: number) {
    setOptions(
      options?.map((o, i) => (i === n ? { ...o, selected: !o.selected } : o))
    )
  }

  function handleSelectAll() {
    setOptions(options?.map((o) => ({ ...o, selected: true })))
  }

  function handleClearAll() {
    setOptions(options?.map((o) => ({ ...o, selected: false })))
  }

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
          options={options}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
          onClickOutside={onClickOutside}
        />
      ) : null}
    </th>
  )
}

export function TableHead({ filterOptions }: { filterOptions: FilterOptions }) {
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
        <Header
          isActive={activeIndex === 0}
          filterOptions={filterOptions.status}
          onClick={() => setActiveIndex(0)}
          onClickOutside={handleClickOutside}
        ></Header>
        <Header
          isActive={activeIndex === 1}
          onClick={() => setActiveIndex(1)}
          onClickOutside={handleClickOutside}
        >
          Title
        </Header>
        <Header
          isActive={activeIndex === 2}
          onClick={() => setActiveIndex(2)}
          onClickOutside={handleClickOutside}
        >
          Progress
        </Header>
        <Header
          isActive={activeIndex === 3}
          onClick={() => setActiveIndex(3)}
          onClickOutside={handleClickOutside}
        >
          Runtime
        </Header>
        <Header
          isActive={activeIndex === 4}
          filterOptions={filterOptions.type}
          onClick={() => setActiveIndex(4)}
          onClickOutside={handleClickOutside}
        >
          Type
        </Header>
        <Header
          isActive={activeIndex === 5}
          filterOptions={filterOptions.season}
          onClick={() => setActiveIndex(5)}
          onClickOutside={handleClickOutside}
        >
          Premiered
        </Header>
        <Header
          isActive={activeIndex === 6}
          filterOptions={filterOptions.rating}
          onClick={() => setActiveIndex(6)}
          onClickOutside={handleClickOutside}
        >
          Rating
        </Header>
        <Header
          isActive={activeIndex === 7}
          onClick={() => setActiveIndex(7)}
          onClickOutside={handleClickOutside}
        >
          Studios
        </Header>
      </tr>
    </thead>
  )
}
