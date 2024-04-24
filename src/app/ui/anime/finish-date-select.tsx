import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React from 'react'

export function FinishDates({ defaultValues }: { defaultValues?: Date[] }) {
  const [finishDates, setFinishDates] = React.useState<Date[]>(
    defaultValues ?? []
  )

  function handleAddDate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setFinishDates([...finishDates, new Date()])
  }

  function handleRemoveDate(e: React.MouseEvent<HTMLButtonElement>, i: number) {
    e.preventDefault()
    setFinishDates(finishDates.filter((_, index) => index !== i))
  }

  return (
    <div className="space-y-2">
      <label htmlFor="finishDates">Finish dates</label>
      <div className="min-h-[50px] flex justify-start items-center gap-2 flex-wrap p-2 bg-white/10 rounded-md">
        {finishDates.map((date, i) => (
          <div
            key={i}
            className="flex pl-2 pr-1 py-1 gap-2 bg-white/10 rounded-md hover:bg-white/15"
          >
            <input
              type="date"
              name="finishDates"
              id="finishDates"
              title="Add finish date"
              defaultValue={date.toISOString().split('T')[0]}
              className="bg-transparent"
            />
            <button
              onClick={(e) => handleRemoveDate(e, i)}
              title="Remove finish date"
              tabIndex={0}
              className="p-0.5 bg-white/10 rounded-md hover:bg-white/15"
            >
              <XMarkIcon className="w-5" />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddDate}
          className="p-1 bg-white/10 rounded-md hover:bg-white/15"
        >
          <PlusIcon className="w-5" />
        </button>
      </div>
    </div>
  )
}
