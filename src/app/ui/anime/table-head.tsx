'use client'

import { ReactNode, useState } from 'react'

function Select({
  options,
  handleSelect,
  handleSelectAll,
  handleClearAll,
}: {
  options: Options
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
            key={option[0]}
            className="flex px-3 py-0.5 overscroll-contain hover:bg-slate-100"
          >
            <input
              type="checkbox"
              id={option[0]}
              className=" accent-slate-500 cursor-pointer"
              checked={option[1]}
              onChange={() => handleSelect(i)}
            />
            <label htmlFor={option[0]} className="w-full pl-2 cursor-pointer ">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

type Options = [string, boolean][]

function Header({
  children,
  isActive,
  filterOptions,
  onClick,
}: {
  children: ReactNode
  isActive: boolean
  filterOptions?: string[]
  onClick: () => void
}) {
  const [options, setOptions] = useState<Options | undefined>(
    filterOptions?.map((o) => [o, true])
  )

  function handleSelect(n: number) {
    setOptions(options?.map((o, i) => (i === n ? [o[0], !o[1]] : o)))
  }

  function handleSelectAll() {
    setOptions(options?.map((o) => [o[0], true]))
  }

  function handleClearAll() {
    setOptions(options?.map((o) => [o[0], false]))
  }

  return (
    <th onClick={onClick} className="p-1 cursor-pointer hover:bg-slate-100">
      {children}
      {isActive ? (
        <div className="relative flex justify-center cursor-default">
          <div className="absolute top-2 font-normal bg-white whitespace-nowrap shadow-lg shadow-neutral-300">
            <div>
              <button className="block w-full px-3 py-1 hover:bg-slate-100">
                Sort A-Z
              </button>
              <button className="block w-full px-3 py-1 hover:bg-slate-100">
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
      ) : null}
    </th>
  )
}

export function TableHead({
  filterOptions,
}: {
  filterOptions: { [key: string]: string[] }
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

  return (
    <thead>
      <tr>
        <Header
          isActive={activeIndex === 0}
          filterOptions={filterOptions.status}
          onClick={() => setActiveIndex(0)}
        >
          <wbr />
        </Header>
        <Header isActive={activeIndex === 1} onClick={() => setActiveIndex(1)}>
          Title
        </Header>
        <Header isActive={activeIndex === 2} onClick={() => setActiveIndex(2)}>
          Progress
        </Header>
        <Header isActive={activeIndex === 3} onClick={() => setActiveIndex(3)}>
          Runtime
        </Header>
        <Header
          isActive={activeIndex === 4}
          filterOptions={filterOptions.type}
          onClick={() => setActiveIndex(4)}
        >
          Type
        </Header>
        <Header
          isActive={activeIndex === 5}
          filterOptions={filterOptions.season}
          onClick={() => setActiveIndex(5)}
        >
          Premiered
        </Header>
        <Header
          isActive={activeIndex === 6}
          filterOptions={filterOptions.rating}
          onClick={() => setActiveIndex(6)}
        >
          Rating
        </Header>
        <Header isActive={activeIndex === 7} onClick={() => setActiveIndex(7)}>
          Studios
        </Header>
      </tr>
    </thead>
  )
}
