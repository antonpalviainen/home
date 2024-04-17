'use client'

import { ReactNode, useState } from 'react'

function Select({ options }: { options: string[] }) {
  const [selected, setSelected] = useState(options.map(() => true))

  function handleSelect(i: number) {
    const newSelected = selected.map((s, j) => (i === j ? !s : s))
    setSelected(newSelected)
  }

  function handleSelectAll() {
    setSelected(selected.map(() => true))
  }

  function handleClearAll() {
    setSelected(selected.map(() => false))
  }

  return (
    <div className="my-2 space-y-2">
      <div className="space-x-3">
        <button
          onClick={handleSelectAll}
          className="border px-1 rounded-md hover:bg-slate-100 hover:text-blue-600"
        >
          All
        </button>
        <button
          onClick={handleClearAll}
          className="border px-1 rounded-md hover:bg-slate-100 hover:text-blue-600"
        >
          Clear
        </button>
      </div>
      <div className="text-left max-h-80 min-w-32 overflow-y-auto">
        {options.map((option, i) => (
          <div
            key={option}
            className="flex px-3 py-0.5 overscroll-contain hover:bg-slate-100 hover:text-blue-600"
          >
            <input
              type="checkbox"
              id={option}
              className=" accent-slate-500 cursor-pointer"
              checked={selected[i]}
              onChange={() => handleSelect(i)}
            />
            <label htmlFor={option} className="w-full pl-2 cursor-pointer ">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function Dropdown({ options }: { options?: string[] }) {
  return (
    <div className="relative flex justify-center cursor-default">
      <div className="absolute top-2 font-normal bg-white whitespace-nowrap shadow-lg shadow-neutral-300">
        <div>
          <button className="block w-full px-3 py-1 hover:bg-slate-100">
            Sort A-Z
          </button>
          <button className="block w-full px-3 py-1 hover:bg-slate-100">
            Sort Z-A
          </button>
          {options ? <Select options={options} /> : null}
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
}: {
  children?: ReactNode
  isActive: boolean
  filterOptions?: string[]
  onClick: () => void
}) {
  return (
    <th onClick={onClick} className="p-1 cursor-pointer hover:bg-slate-100">
      {children}
      {isActive ? <Dropdown options={filterOptions} /> : null}
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

  const [activeIndex, setActiveIndex] = useState<number | null>(1)

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
