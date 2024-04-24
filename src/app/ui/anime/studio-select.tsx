import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useState } from 'react'

export interface Studio {
  id: number
  name: string
}

function sortStudios(a: Studio, b: Studio) {
  return a.name.localeCompare(b.name)
}

export function StudioSelect({ studios }: { studios: Studio[] }) {
  const [selected, setSelected] = useState<Studio[]>([])
  const [nonSelected, setNonSelected] = useState<Studio[]>(studios)
  const [search, setSearch] = useState('')

  function handleSelect(id: number) {
    const studio = nonSelected.find((studio) => studio.id === id)

    if (studio) {
      setSelected((s) => [...s, studio].sort(sortStudios))
      setSearch('')
      setNonSelected(() => studios.filter((s) => s.id !== id))
    }
  }

  function handleRemove(id: number) {
    const studio = selected.find((studio) => studio.id === id)

    if (studio) {
      setSelected(selected.filter((s) => s.id !== id))
      setNonSelected((ns) => [...ns, studio].sort(sortStudios))
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
    setNonSelected(() =>
      studios.filter(
        (studio) =>
          !selected.includes(studio) &&
          studio.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const newStudio = { id: studios.length + selected.length + 1, name: search }
    setSelected((s) => [...s, newStudio].sort(sortStudios))
    setNonSelected(() =>
      studios.filter((studio) => studio.name.toLowerCase().includes(''))
    )
    setSearch('')
  }

  return (
    <div className="space-y-2">
      {selected.length ? (
        <div className="min-h-12 p-2 flex justify-start items-center gap-2 flex-wrap rounded-md bg-white/10">
          {selected.map((studio, i) => (
            <div
              key={studio.id}
              className="flex px-2 py-1 gap-2 bg-white/10 rounded-md whitespace-nowrap"
            >
              <span>{studio.name}</span>
              <input type="hidden" name="studios" value={studio.name} />
              <button
                onClick={() => handleRemove(studio.id)}
                title="Remove studio"
                tabIndex={0}
                className="p-0.5 bg-white/10 rounded-md hover:bg-white/15"
              >
                <XMarkIcon className="w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="p-2 space-y-2 bg-white/10 rounded-md">
        <div className="relative">
          <input
            type="text"
            className="block w-full pl-8 pr-2 py-1 bg-white/10 rounded-md placeholder:text-white/30 hover:bg-white/15"
            placeholder="Search or add new"
            value={search}
            onChange={handleSearch}
          />
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 w-5 -translate-y-1/2" />
        </div>
        <div className="max-h-32 overflow-y-scroll">
          {nonSelected.length ? (
            nonSelected.map((studio, i) => (
              <div key={studio.id}>
                <button
                  onClick={() => handleSelect(studio.id)}
                  title="Select studio"
                  className="w-full px-1.5 py-0.5 text-left rounded-md hover:bg-white/5"
                  tabIndex={i === 0 ? 0 : -1}
                >
                  {studio.name}
                </button>
              </div>
            ))
          ) : (
            <button
              onClick={handleAdd}
              className="w-full px-1.5 py-0.5 text-left rounded-md hover:bg-white/5"
            >
              Add new studio &quot;{search}&quot;
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
