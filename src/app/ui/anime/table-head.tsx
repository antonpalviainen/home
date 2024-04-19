'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { ReactNode, useRef, useState } from 'react'

import useClickOutside from '@/lib/use-click-outside'

interface Option {
  label: string
  value: string
  selected: boolean
}

interface FilterOptions {
  status: Option[]
  type: Option[]
  season: Option[]
  rating: Option[]
}

function Select({
  options,
  handleSelect,
  handleSelectAll,
  handleClearAll,
}: {
  options: Option[]
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
  onClickOutside,
  handleSelect,
  handleSelectAll,
  handleClearAll,
}: {
  options?: Option[]
  handleSelectAll: () => void
  handleClearAll: () => void
  onClickOutside: () => void
  handleSelect: (n: number) => void
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

function HeaderCell({
  children,
  isActive,
  options,
  onClick,
  onClickOutside,
  handleSelect,
  handleSelectAll,
  handleClearAll,
}: {
  children?: ReactNode
  isActive: boolean
  options?: Option[]
  onClick: () => void
  onClickOutside: () => void
  handleSelect: (n: number) => void
  handleSelectAll: () => void
  handleClearAll: () => void
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
  const [options, setOptions] = useState<FilterOptions>(filterOptions)

  function handleSelect(n: number) {
    // setOptions(
    //   options?.map((o, i) => (i === n ? { ...o, selected: !o.selected } : o))
    // )
  }

  function handleSelectAll() {
    // setOptions({})
  }

  function handleClearAll() {
    // setOptions(options?.map((o) => ({ ...o, selected: false })))
  }

  function handleClickOutside() {
    setActiveIndex(null)
  }

  return (
    <thead>
      <tr>
        <HeaderCell
          isActive={activeIndex === 0}
          options={options.status}
          onClick={() => setActiveIndex(0)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        ></HeaderCell>
        <HeaderCell
          isActive={activeIndex === 1}
          onClick={() => setActiveIndex(1)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Title
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 2}
          onClick={() => setActiveIndex(2)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Progress
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 3}
          onClick={() => setActiveIndex(3)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Runtime
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 4}
          options={options.type}
          onClick={() => setActiveIndex(4)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Type
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 5}
          options={options.season}
          onClick={() => setActiveIndex(5)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Premiered
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 6}
          options={options.rating}
          onClick={() => setActiveIndex(6)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Rating
        </HeaderCell>
        <HeaderCell
          isActive={activeIndex === 7}
          onClick={() => setActiveIndex(7)}
          onClickOutside={handleClickOutside}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleClearAll={handleClearAll}
        >
          Studios
        </HeaderCell>
      </tr>
    </thead>
  )
}
